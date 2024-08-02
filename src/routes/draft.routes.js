import { Router } from "express";
import draftController from "../controllers/draft.controller.js";

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
draftRoutes.post("/draft", draftController.add);
// draftRoutes.get("/draft", noteController.get);

export { draftRoutes };
