const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { verifyJWT } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { name, email, userId } = verifyJWT({ token });
    req.user = { name, email, userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
module.exports = { authenticateUser };
