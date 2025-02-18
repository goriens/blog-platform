const { mongoose } = require("mongoose");

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("mongo connected successfully");
    return;
  } catch (error) {
    console.log(`Mongo error ${error.message}`);
  }
};

module.exports = connect;
