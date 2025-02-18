const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    throw new UnauthenticatedError("No user found");
  }
  return res.status(StatusCodes.OK).json(user);
};

const updateUser = async (req, res) => {
  return res.json("update user");
};

module.exports = { getUserProfile, updateUser };
