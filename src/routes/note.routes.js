import { Router } from "express";
import noteController from "../controllers/note.controller";

const noteRoutes = Router();
noteRoutes.post("/note", noteController.add);
noteRoutes.get("/note", noteController.get);

export { noteRoutes };
