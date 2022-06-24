import { Router } from "express";
const router = Router();

import * as notesController from "../controllers/notesController";
import { authJwt } from "../middlewares";

router.get("/",authJwt.verifyToken,notesController.getNotes)

router.get("/:noteId",authJwt.verifyToken,notesController.getNoteById)

router.get("/notas/:userId",authJwt.verifyToken,notesController.getNotesByUserId)

router.post("/:userId",authJwt.verifyToken,notesController.createNote)

router.put("/:noteId",authJwt.verifyToken,notesController.updateNoteById)

router.put("/notas/:noteId",authJwt.verifyToken,notesController.updateArchiveToTrueOrFalse)

router.delete("/:noteId/",authJwt.verifyToken,notesController.deleteNoteById)

export default router;