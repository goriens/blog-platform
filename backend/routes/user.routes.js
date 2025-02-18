const express = require("express");
const { getUserProfile } = require("../controllers/user.controller");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.route("/profile").get(authenticateUser, getUserProfile);

module.exports = router;
