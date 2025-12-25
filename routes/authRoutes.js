// has sign up and sign in routes

//SIGN-UP
import express from "express";
import { myInfo, signin, signup } from "../controllers/authControllers.js";
import { middlewareAuth } from "../middleware/auth.js";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/notesControllers.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/me", middlewareAuth, myInfo);

route.post("/create_note", middlewareAuth, createNote);
route.get("/notes", middlewareAuth, getAllNotes);
route.get("/note/:id", middlewareAuth, getNoteById);
route.put("/note/:id", middlewareAuth, updateNoteById);
route.delete("/note/:id", middlewareAuth, deleteNoteById);

export default route;
