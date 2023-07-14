const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const multer = require("multer");

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); // Initialize multer middleware


const {
 getAllNotes,
 getNoteById,
 createNote,
 updateNote,
 deleteNote
} = require("../controllers/notes");

router.post("/", auth, upload.single("voiceNote"), createNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteById);
router.delete("/:id", auth, deleteNote);
router.put("/:id", auth ,updateNote)

module.exports = router;
