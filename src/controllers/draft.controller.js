import * as Diff from "diff";
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

async function syncDraftMarkdownDoc(draftId) {
  const draft = await Draft.findByPk(draftId, {
    include: [
      {
        model: DocumentPrompt,
        as: "documentPrompts",
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

  if (draft.documentPrompts.length === 0) {
    draft.processedMarkdownString = draft.initialMarkdownString;
    await draft.save();
    return;
  }

  const initialDocument = draft.initialMarkdownString;
  const documentDiffs = draft.documentPrompts[0].documentSuggestions
    .map((documentSuggestion) => documentSuggestion.documentDiffStructured)
    .flat();

  // console.log({ documentDiffs });

  let patchedDocument = initialDocument;

  documentDiffs.forEach((diff) => {
    patchedDocument = patchedDocument.replace(
      diff.remove.value,
      diff.add.value
    );
    // if (diff.added) {
    //   // console.log({ addedLen: diff.value.length });
    //   patchedDocument = Diff.applyPatch(patchedDocument, [
    //     { value: diff.value, offset, removed: 0 },
    //   ]);
    //   offset += diff.value.length;
    // } else if (diff.removed) {
    //   // console.log({ offset, value: diff.value });
    //   console.log({ removedLen: diff.value.length });
    //   patchedDocument = Diff.applyPatch(patchedDocument, [
    //     { value: diff.value, offset, removed: diff.value.length },
    //   ]);
    //   // offset -= diff.value.length;
    // }
  });

  console.log({ patchedDocument });

  // Append remaining content if any
  // if (offset < patchedDocument.length) {
  //   patchedDocument += initialDocument.substring(offset);
  // }

  draft.processedMarkdownString = patchedDocument;
  await draft.save();
  return;
}

let draftController = {
  add: async (req, res, next) => {
    return res.sendStatus(200);
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
