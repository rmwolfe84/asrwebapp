require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API Running - Direct MongoDB Connection');
});

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    // Get database and collection
    const database = client.db('allsquare');
    const blogPostsCollection = database.collection('blogposts');
    
    // Get all published blog posts
    app.get('/api/posts', async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Get only published posts
        const query = { 
          status: 'approved', 
          publishDate: { $lte: new Date() } 
        };
        
        // Count total posts matching the query
        const totalPosts = await blogPostsCollection.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        
        // Get posts for current page
        const posts = await blogPostsCollection.find(query)
          .sort({ publishDate: -1 }) // Sort by publish date (newest first)
          .skip(skip)
          .limit(limit)
          .toArray();
        
        res.json({
          posts,
          currentPage: page,
          totalPages,
          totalPosts
        });
      } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Server Error' });
      }
    });
    
    // Get a specific blog post
    app.get('/api/posts/:id', async (req, res) => {
      try {
        const post = await blogPostsCollection.findOne({ 
          _id: new ObjectId(req.params.id)
        });
        
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(post);
      } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ error: 'Server Error' });
      }
    });
    
    // Start server
    const PORT = process.env.PORT || 3020;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    // Handle shutdown
    process.on('SIGINT', async () => {
      await client.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });
    
  } catch (err) {
    console.error('Error starting server:', err);
    await client.close();
    process.exit(1);
  }
}

startServer();