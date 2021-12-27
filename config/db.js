const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('mongoDB connected');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed');
  }
};

module.exports = connectDB;
