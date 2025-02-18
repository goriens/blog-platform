const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/blog.model");
const { NotFoundError } = require("../errors");

const createBlog = async (req, res) => {
  req.body.user = req.user.userId;
  await Blog.create(req.body);
  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: "blog created successfully" });
};
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  return res.status(StatusCodes.OK).json({ count: blogs.length, blogs });
};
const getSingleBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) {
    throw new NotFoundError(`No Blog Post found id:${blogId}`);
  }
  return res.status(StatusCodes.OK).json({ blog });
};
const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.findOneAndUpdate({ _id: blogId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    throw new NotFoundError(`No Blog Post found id:${blogId}`);
  }
  return res.status(StatusCodes.OK).json({ blog });
};
const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await Blog.findOneAndDelete({ _id: blogId });
  if (!blog) {
    throw new NotFoundError(`No Blog Post found id:${blogId}`);
  }
  return res.status(StatusCodes.OK).json({ blog });
};
const likeBlogPost = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(blog);
};
module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  likeBlogPost,
  deleteBlog,
};
