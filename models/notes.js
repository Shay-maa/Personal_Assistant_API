const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    voiceNote: {
      type: String, // Stores the path to the voice note file
      required: false,
    },
  } ,   { timestmp: true }
);

module.exports = mongoose.model("Note", noteSchema);
