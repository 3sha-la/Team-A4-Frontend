const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MongoDB Connected: Mock Database (Temporary Mode)');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;