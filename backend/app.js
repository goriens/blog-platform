require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const blogRoutes = require("./routes/blog.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const connect = require("./config/db.js");
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow cookies and credentials to be sent
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comments", commentRoutes);

// error handler
// app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
