const mongoose = require("mongoose");

const diarySchema = mongoose.Schema(
  {
    title: String,
    content: String,
    // date: { type: Date, default: Date.now},
  },
  { timestmp: true }
);

// Create a diary entry model
module.exports =  mongoose.model("Diary", diarySchema);

