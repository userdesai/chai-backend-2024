import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.db.js';

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of the Express app
const app = express();

// Set the port from environment variables or fallback to 8000
const port = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
