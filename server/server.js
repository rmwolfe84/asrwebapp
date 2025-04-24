const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path'); // Needed for serving static files in production

require('dotenv').config(); // Load .env variables

const app = express();

// Init Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Allows us to accept JSON data in the body

// Mock data for blog posts (used when database is not available)
const mockPosts = [
  {
    _id: '1',
    title: 'Signs Your Roof Needs Replacement',
    content: '# Signs Your Roof Needs Replacement\n\nYour roof is one of the most critical components of your home, providing protection against the elements. Here are some signs it may need replacement:\n\n## 1. Age of Your Roof\n\nMost asphalt shingle roofs last between 20-25 years.\n\n## 2. Curling or Buckling Shingles\n\nWhen shingles begin to curl at the edges or buckle in the middle, it\'s a clear indication they\'re past their prime.',
    status: 'approved',
    publishDate: new Date('2024-04-01T12:00:00Z'),
    createdAt: new Date('2024-03-25T10:30:00Z'),
    updatedAt: new Date('2024-03-25T10:30:00Z')
  },
  {
    _id: '2',
    title: 'Choosing the Right Roofing Material for Your Home',
    content: '# Choosing the Right Roofing Material\n\nSelecting the right roofing material is a significant decision. Here\'s a quick guide:\n\n## Asphalt Shingles\n**Pros:** Affordable, easy to install\n**Cons:** Shorter lifespan (15-30 years)\n\n## Metal Roofing\n**Pros:** Extremely durable (50+ years), energy efficient\n**Cons:** Higher initial cost',
    status: 'approved',
    publishDate: new Date('2024-04-10T14:00:00Z'),
    createdAt: new Date('2024-04-05T09:15:00Z'),
    updatedAt: new Date('2024-04-05T09:15:00Z')
  }
];

// Define basic routes that don't need DB
app.get('/', (req, res) => res.send('API Running')); // Simple test route

// Main async function to start server
async function startServer() {
  let dbConnected = false;
  
  try {
    console.log('Attempting database connection...');
    dbConnected = await connectDB();
    console.log('Database connection result:', dbConnected);
  } catch (err) {
    console.error('Error during database connection:', err);
    dbConnected = false;
  }
  
  // Set up API routes based on DB connection status
  if (dbConnected) {
    // Use the real API router for all routes if DB is connected
    app.use('/api', require('./routes/api'));
    console.log('Using real database API routes');
  } else {
    // Use mock data for specific routes if DB is not connected
    console.log('Using mock API routes');
    
    app.get('/api/posts', (req, res) => {
      // Return mock data
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const totalPosts = mockPosts.length;
      const totalPages = Math.ceil(totalPosts / limit);
      
      res.json({
        posts: mockPosts,
        currentPage: page,
        totalPages,
        totalPosts
      });
    });
    
    app.get('/api/posts/:id', (req, res) => {
      // Return mock data
      const post = mockPosts.find(p => p._id === req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    });
    
    // For other API endpoints, return not implemented when DB is unavailable
    app.use('/api', (req, res) => {
      res.status(501).json({ 
        error: 'Database connection required for this endpoint',
        message: 'Mock data is only available for GET /api/posts and GET /api/posts/:id'
      });
    });
  }
  
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
    console.log(`Server listening at http://localhost:${PORT}`);
    if (!dbConnected) {
      console.log('⚠️  WARNING: Running with mock data (no database connection)');
      console.log('Only basic blog read functionality will work');
    }
  });
}

// Start the server
startServer().catch(err => {
  console.error('Failed to start server:', err);
});