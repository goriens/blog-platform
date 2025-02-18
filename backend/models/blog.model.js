const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter title"],
  },
  content: {
    type: String,
    required: [true, "Please enter blog content"],
  },
  tags: {
    type: String,
    trim: true,
    required: [true, "Please enter blog tags"],
  },
  feature_image: {
    type: String,
    trim: true,
    required: [true, "Please enter image link"],
  },
  likes: { type: Number, default: 0 },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
