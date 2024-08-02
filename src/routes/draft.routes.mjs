import { Router } from "express";
import draftController from "../controllers/draft.controller.mjs";

const draftRoutes = Router();
draftRoutes.post("/draft/documentprompt", draftController.addDocumentPrompt);
draftRoutes.post(
  "/draft/suggestion/:documentSuggestionId/reject",
  draftController.rejectDocumentSuggestion
);
draftRoutes.post(
  "/draft/suggestion/:documentSuggestionId/accept",
  draftController.acceptDocumentSuggestion
);
// draftRoutes.get("/draft", noteController.get);
draftRoutes.post("/draft", draftController.add);

export { draftRoutes };
