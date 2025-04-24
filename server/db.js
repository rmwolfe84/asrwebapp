const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    // Get the MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    // Log the connection URI for debugging (but mask the password)
    const logURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    console.log('Connecting to MongoDB with URI:', logURI);
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      dbName: 'allsquare', // Set database name explicitly
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second timeout for operations
      family: 4 // Force IPv4
    });
    
    // Check connection
    console.log('MongoDB Connected to:', mongoose.connection.host);
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Instead of exiting, return false to let the app continue
    return false;
  }
};

module.exports = connectDB;