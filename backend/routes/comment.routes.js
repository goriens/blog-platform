const express = require("express");
const { authenticateUser } = require("../middleware/authentication");
const {
  createComment,
  getBlogComments,
} = require("../controllers/comment.controller");
const router = express.Router();

router.route("/").post(authenticateUser, createComment);
router.route("/:id").get(getBlogComments);

module.exports = router;
