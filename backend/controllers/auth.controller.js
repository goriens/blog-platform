const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { createTokenUser, attachCookiesRes } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    throw new BadRequestError("Email already exist");
  }
  await User.create({ name, password, email });
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "Account created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide Email & Password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No user found");
  }
  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    throw new UnauthenticatedError("Email or password invalid");
  }
  const userToken = createTokenUser(user);
  attachCookiesRes({ res, user: userToken });
  return res.status(StatusCodes.ACCEPTED).json({ user: userToken });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "Logout successfully" });
};

module.exports = { register, login, logout };
