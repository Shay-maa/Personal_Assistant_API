const Note = require("../models/notes");
// const multer = require("multer");

// // Configure multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
// });



// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    let voiceNotePath = null;

    // Check if a voice note file was uploaded
    if (req.file) {
      voiceNotePath = req.file.path;
    }

    const note = new Note({
      title,
      content,
      voiceNote: voiceNotePath,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    // Delete the uploaded file if an error occurred
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting uploaded file:', unlinkErr);
        }
      });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
