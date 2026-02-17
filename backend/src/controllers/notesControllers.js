import Note from "../models/Note.js";

export async function getAllNote(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
