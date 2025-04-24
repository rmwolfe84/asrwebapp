require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection options
const uri = process.env.MONGODB_URI;
console.log('Using URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

// Get all published blog posts
app.get('/api/posts', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB for posts request');
    
    const database = client.db('allsquare');
    const blogPostsCollection = database.collection('blogposts');
    
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
  } finally {
    await client.close();
    console.log('MongoDB connection closed after posts request');
  }
});

// Get a specific blog post
app.get('/api/posts/:id', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB for post detail request');
    
    const database = client.db('allsquare');
    const blogPostsCollection = database.collection('blogposts');
    
    let post;
    try {
      post = await blogPostsCollection.findOne({ 
        _id: new ObjectId(req.params.id)
      });
    } catch (idErr) {
      console.error('Invalid ObjectId format:', idErr);
      return res.status(400).json({ error: 'Invalid post ID format' });
    }
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Server Error' });
  } finally {
    await client.close();
    console.log('MongoDB connection closed after post detail request');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('API Running - Minimal Server');
});

// Start server
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});