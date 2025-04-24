require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API Running - Simple Server');
});

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  dbName: 'allsquare'
})
  .then(() => {
    console.log('MongoDB Connected');
    
    // Define Blog post schema
    const blogPostSchema = new mongoose.Schema({
      title: String,
      content: String,
      status: String,
      publishDate: Date,
      createdAt: Date,
      updatedAt: Date
    });
    
    // Create Blog post model
    const BlogPost = mongoose.model('BlogPost', blogPostSchema);
    
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
        const totalPosts = await BlogPost.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        
        // Get posts for current page
        const posts = await BlogPost.find(query)
          .sort({ publishDate: -1 }) // Sort by publish date (newest first)
          .skip(skip)
          .limit(limit);
        
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
        const post = await BlogPost.findById(req.params.id);
        
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
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });