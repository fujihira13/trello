const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 250,
    },
    title: {
      type: String,
      default: "today",
      max: 50,
    },
    isCard: {
      type: Boolean,
      default: false,
    },
    parentCardId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
