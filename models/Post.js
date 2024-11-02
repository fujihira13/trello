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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
