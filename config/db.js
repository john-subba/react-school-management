const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
    //Exit code 1 is for when unhandled fatal exceptions occur that was not handled by the domain. process. ... process. exit() is one of the methods for Node
  }
};

module.exports = connectDB;
