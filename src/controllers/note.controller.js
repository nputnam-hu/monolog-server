import fs from "fs";
import path from "path";
import * as Yup from "yup";

import Note from "../models/Note.mjs";
import Draft from "../models/Draft.mjs";
import DocumentPrompt from "../models/DocumentPrompt.mjs";
import DocumentSuggestion from "../models/DocumentSuggestion.mjs";
import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError";
import { transcribeAudioFile } from "../services/openai.service";

let noteController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        audioUrl: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }

      const { transcript, duration } = await transcribeAudioFile(
        req.body.audioUrl
      );

      const note = await Note.create({
        ...req.body,
        isLiked: false,
        transcript,
        duration,
      });

      fs.unlinkSync(tmpPath);

      return res.mjson({ note });
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
                as: "documentPrompt",
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

        const not.mjsON = note.t.mjsON();

        return {
          ...not.mjsON,
          paragraphs,
        };
      });

      return res.mjson({ notes: augmentedNotes });
    } catch (err) {
      next(err);
    }
  },
};

export default noteController;
