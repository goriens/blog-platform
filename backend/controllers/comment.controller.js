const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Blog = require("../models/blog.model");
const Comment = require("../models/comments.model");

const createComment = async (req, res) => {
  req.body.user = req.user.userId;
  const { blog: blogId } = req.body;
  const checkBlog = await Blog.findOne({ _id: blogId });
  if (!checkBlog) {
    throw new BadRequestError(`No blog found with this id ${blogId}`);
  }
  const comment = await Comment.create(req.body);
  return res.status(StatusCodes.OK).json({ comment });
};
const getBlogComments = async (req, res) => {
  const { id: blogId } = req.params;
  const comments = await Comment.find({ blog: blogId }).populate({
    path: "user",
    select: "name",
  });
  return res.status(StatusCodes.OK).json({ count: comments.length, comments });
};

module.exports = { createComment, getBlogComments };
