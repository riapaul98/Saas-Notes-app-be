import Notes from "../models/Notes.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both title and content required!" });
  }
  try {
    const newNote = await Notes.create({ title, content, userId });
    return res.status(201).json({
      message: "New note created successfully",
      note: {
        title: newNote.title,
        content: newNote.content,
        userId: newNote.userId,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const myNotes = await Notes.find({ userId }).select("title content");
    if (!myNotes.length) {
      return res.status(404).json({ message: "No notes found for this user" });
    }
    return res.status(200).json({ notes: myNotes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getNoteById = async (req, res) => {
  const userId = req.userId;
  const noteId = req.params.id;
  try {
    const myNote = await Notes.findOne({ userId, _id: noteId }).select(
      "title content"
    );
    if (!myNote) {
      return res.status(404).json({ message: "No notes found" });
    }
    return res.status(200).json({ notes: myNote });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateNoteById = async (req, res) => {
  const userId = req.userId;
  const noteId = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both title and content are required" });
  }
  try {
    const updatedNote = await Notes.findOneAndUpdate(
      { userId, _id: noteId },
      { title, content },
      { new: true }
    ).select("title content");
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    return res
      .status(200)
      .json({
        message: "You have successfully updated your note!",
        notes: updatedNote,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteNoteById = async (req, res) => {
  const userId = req.userId;
  const noteId = req.params.id;

  try {
    const deletedNote = await Notes.findOneAndDelete({
      userId,
      _id: noteId,
    });

    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    return res
      .status(200)
      .json({ message: "Note deleted successfully", notes: deletedNote });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
