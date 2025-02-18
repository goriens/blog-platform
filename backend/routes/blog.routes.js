const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  likeBlogPost,
  deleteBlog,
} = require("../controllers/blog.controller");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.route("/").post(authenticateUser, createBlog).get(getAllBlogs);
router.route("/:id").get(getSingleBlog).patch(updateBlog).delete(deleteBlog);
router.route("/:id/like").post(likeBlogPost);

module.exports = router;
