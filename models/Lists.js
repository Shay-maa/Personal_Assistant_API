const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    fav: {
      type: Boolean,
      default: false,
    },
    tasks: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
        dueDate: {
          type: Date,
          default: Date.now,
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        completed: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        taskupdatedAt: {
          type: Date,
          default: Date.now,
        },
        fav: {
          type: Boolean,
          default: false,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
