import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/", createNote);        // Create
router.get("/", getNotes);           // Get all
router.get("/:id", getNote);         // Get one
router.put("/:id", updateNote);      // Update
router.delete("/:id", deleteNote);   // Delete

export default router;
