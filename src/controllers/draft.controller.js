import * as Diff from "diff";
import * as Yup from "yup";
import OpenAI from "openai";
import axios from "axios";

import Note from "../models/Note.js";
import Draft from "../models/Draft.js";
import DocumentPrompt from "../models/DocumentPrompt.js";
import DocumentSuggestion from "../models/DocumentSuggestion.js";
import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError.js";
import { generateSuggestions } from "../services/openai.service.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // project: "$PROJECT_ID",
});

async function syncDraftMarkdownDoc(draftId) {
  const draft = await Draft.findByPk(draftId, {
    include: [
      {
        model: DocumentPrompt,
        as: "documentPrompt",
        include: [
          {
            model: DocumentSuggestion,
            as: "documentSuggestions",
            where: {
              status: "accepted",
            },
            order: ["id", "DESC"],
          },
        ],
      },
    ],
  });
  if (!draft) {
    throw new Error("Not found: " + draftId);
  }

  if (!draft.documentPrompt) {
    draft.processedMarkdownString = draft.initialMarkdownString;
    await draft.save();
    return;
  }

  const initialDocument = draft.initialMarkdownString;
  const documentDiffs = draft.documentPrompt.documentSuggestions
    .map((documentSuggestion) => documentSuggestion.documentDiffStructured)
    .flat();

  let patchedDocument = initialDocument;

  documentDiffs.forEach((diff) => {
    patchedDocument = patchedDocument.replace(
      diff.remove.value,
      diff.add.value
    );
  });

  draft.processedMarkdownString = patchedDocument;
  await draft.save();
  return;
}

let draftController = {
  add: async (req, res, next) => {
    return res.sendStatus(200);
  },
  addDocumentPrompt: async (req, res, next) => {
    try {
      console.log(req.body);
      const schema = Yup.object().shape({
        noteId: Yup.number().required(),
        promptString: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        // throw new ValidationError();
      }

      const { noteId, promptString } = req.body.data;

      const note = await Note.findByPk(noteId, {
        include: [{ model: Draft, as: "drafts", order: ["createdAt", "DESC"] }],
      });

      console.log({ note, noteId });

      const [currentDraft] = note.drafts;

      console.log({ currentDraft });

      const newDraft = await Draft.create({
        initialMarkdownString: currentDraft.processedMarkdownString,
        processedMarkdownString: currentDraft.processedMarkdownString,
        noteId,
      });

      const newDocumentPrompt = await DocumentPrompt.create({
        promptString,
        draftId: newDraft.id,
      });

      const suggestionsJSON = await generateSuggestions({
        promptString,
        draftMarkdownString: newDraft.processedMarkdownString,
      });

      console.log({ suggestionsJSON });

      await DocumentSuggestion.bulkCreate(
        suggestionsJSON.map((o) => ({
          ...o,
          documentPromptId: newDocumentPrompt.id,
        }))
      );

      return res.json({ draft: newDraft });
    } catch (err) {
      console.log({ err });
      return next(err);
    }
  },
  rejectDocumentSuggestion: async (req, res, next) => {
    try {
      const { documentSuggestionId } = req.params;
      const documentSuggestion = await DocumentSuggestion.findByPk(
        documentSuggestionId,
        {
          include: [
            {
              model: DocumentPrompt,
              as: "documentPrompt",
              attributes: ["draftId"],
            },
          ],
        }
      );
      if (!documentSuggestion) {
        throw new Error("Not found: " + documentSuggestionId);
      }
      documentSuggestion.status = "rejected";
      documentSuggestion.statusUpdatedAt = new Date();
      await documentSuggestion.save();
      const { draftId } = documentSuggestion.documentPrompt;
      await syncDraftMarkdownDoc(draftId);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
  acceptDocumentSuggestion: async (req, res, next) => {
    try {
      const { documentSuggestionId } = req.params;
      const documentSuggestion = await DocumentSuggestion.findByPk(
        documentSuggestionId,
        {
          include: [
            {
              model: DocumentPrompt,
              as: "documentPrompt",
              attributes: ["draftId"],
            },
          ],
        }
      );
      if (!documentSuggestion) {
        throw new Error("Not found: " + documentSuggestionId);
      }
      documentSuggestion.status = "accepted";
      documentSuggestion.statusUpdatedAt = new Date();
      await documentSuggestion.save();
      const { draftId } = documentSuggestion.documentPrompt;
      await syncDraftMarkdownDoc(draftId);
      return res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
};

export default draftController;
