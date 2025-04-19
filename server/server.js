const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path'); // Needed for serving static files in production

require('dotenv').config(); // Load .env variables

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Allows us to accept JSON data in the body

// Define Routes
app.get('/', (req, res) => res.send('API Running')); // Simple test route
app.use('/api', require('./routes/api')); // Mount your API routes

// --- Production Setup ---
// If the NODE_ENV environment variable is set to 'production' (common on deployment platforms)
if (process.env.NODE_ENV === 'production') {
  // Set static folder path. '__dirname' is the current directory (server).
  // We go up one level ('..') then into the 'client' folder, then into 'dist' (where Vite builds).
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

  // For any GET request that doesn't match an API route or a static file,
  // serve the index.html file from the build folder.
  // This is crucial for single-page applications (SPAs) or client-side routing.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}
// --- End Production Setup ---


const PORT = process.env.PORT || 3020; // Use port from .env or default to 3020

app.listen(PORT, () => {
  // Modified console.log
  console.log(`Server listening at http://localhost:${PORT}`);
});