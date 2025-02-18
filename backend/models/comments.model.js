const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please enter your comment"] },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
});

const Comment = mongoose.model("comment", commentsSchema);
module.exports = Comment;
