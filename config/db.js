  const mongoose = require('mongoose');

  const connectDB = async () => {
    try {
      console.log("MongoDB connection start.......");
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1); 
    }
  };

  module.exports = connectDB;
