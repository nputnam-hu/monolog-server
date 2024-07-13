import fs from "fs";
import path from "path";
import * as Yup from "yup";
import OpenAI from "openai";
import axios from "axios";

import Note from "../models/Note";
import Draft from "../models/Draft";
import DocumentPrompt from "../models/DocumentPrompt";
import DocumentSuggestion from "../models/DocumentSuggestion";
import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // project: "$PROJECT_ID",
});

let noteController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        audioUrl: Yup.string().required(),
      });

      console.log(req.body, await schema.isValid(req.body));

      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }

      console.log(req.body.audioUrl);
      const tmpPath = "/tmp/temp.m4a";
      const downloadPath = path.resolve(__dirname, tmpPath);

      const writer = fs.createWriteStream(downloadPath);

      await new Promise(async (resolve, reject) => {
        const { data } = await axios.get(req.body.audioUrl, {
          responseType: "stream",
        });
        data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      const readStream = fs.createReadStream(downloadPath);

      const transcription = await openai.audio.transcriptions.create({
        file: readStream,
        response_format: "verbose_json",
        model: "whisper-1",
      });

      console.log({ transcription });

      // const paragraphs = [];

      // let numSentences = 0;
      // let currentParagraph = "";
      // for (const segment of transcription.segments) {
      //   if (segment.text.endsWith(".")) {
      //     numSentences++;
      //   }
      //   if (numSentences < 3) {
      //     currentParagraph += segment.text;
      //   } else {
      //     paragraphs.push(currentParagraph);
      //     numSentences = 0;
      //     currentParagraph = "";
      //   }
      // }

      const transcript = {
        fullText: transcription.text,
        segments: transcription.segments,
        // paragraphs,
      };

      console.log({ transcript }, transcription.data);

      const note = await Note.create({
        ...req.body,
        transcript,
        isLiked: false,
        duration: transcription.duration,
      });

      fs.unlinkSync(tmpPath);

      return res.json({ note });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const notes = await Note.findAll({
        include: [
          {
            model: Draft,
            as: "drafts",
            include: [
              {
                model: DocumentPrompt,
                as: "documentPrompts",
                include: [
                  {
                    model: DocumentSuggestion,
                    as: "documentSuggestions",
                    order: [["id", "ASC"]],
                  },
                ],
              },
            ],
          },
        ],
      });
      console.log(
        notes[0].drafts[0].documentPrompts[0].documentSuggestions.map(
          (x) => x.id
        )
      );
      const augmentedNotes = notes.map((note) => {
        let paragraphs = [];

        if (note.transcript.segments.length <= 3) {
          paragraphs = [[...note.transcript.segments]];
        } else {
          let numSentences = 0;
          let currentParagraph = [];
          for (const segment of note.transcript.segments) {
            if (segment.text.endsWith(".")) {
              numSentences++;
            }
            const cutoff = 3 || (Math.floor(Math.random() * 10) % 2) + 2;
            currentParagraph.push(segment);
            if (numSentences >= cutoff) {
              paragraphs.push(currentParagraph);
              numSentences = 0;
              currentParagraph = [];
            }
          }
        }

        const noteJSON = note.toJSON();

        if (noteJSON.drafts[0]) {
          console.log(noteJSON.drafts[0]);
          noteJSON.drafts[0].documentPrompts[0].documentSuggestions =
            noteJSON.drafts[0].documentPrompts[0].documentSuggestions.sort(
              (a, b) => a.id - b.id
            );
        }
        return {
          ...noteJSON,
          paragraphs,
        };
      });

      console.log(
        augmentedNotes[0].drafts[0].documentPrompts[0].documentSuggestions.map(
          (x) => x.id
        )
      );

      return res.json({ notes: augmentedNotes });
    } catch (err) {
      next(err);
    }
  },
};

export default noteController;
