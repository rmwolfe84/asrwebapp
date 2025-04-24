const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Try to require BlogPost model but continue if it fails (in case DB is not connected)
let BlogPost;
try {
  BlogPost = require('../models/BlogPost');
} catch (err) {
  console.warn('Could not load BlogPost model:', err.message);
}

// ========== Item Routes ==========

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 }); // Sort by date descending
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Public (adjust access control as needed)
router.post('/items', async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ msg: 'Please include a name' });
  }

  try {
    const newItem = new Item({
      name: name,
      description: description,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ========== Blog Post Routes ==========

// @route   GET api/posts
// @desc    Get published blog posts with pagination
// @access  Public
router.get('/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get only published posts (status=approved and publishDate ≤ now)
    const currentDate = new Date();
    const query = { 
      status: 'approved', 
      publishDate: { $lte: currentDate } 
    };

    // Count total posts matching the query
    const totalPosts = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    // Get posts for current page
    const posts = await BlogPost.find(query)
      .sort({ publishDate: -1 }) // Sort by publish date (newest first)
      .skip(skip)
      .limit(limit)
      .select('-prompt'); // Exclude the prompt field

    res.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts
    });
  } catch (err) {
    console.error('Error fetching published posts:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   GET api/posts/:id
// @desc    Get a specific blog post by ID
// @access  Public
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).select('-prompt');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only return the post if it's approved and published
    const currentDate = new Date();
    if (post.status !== 'approved' || post.publishDate > currentDate) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(`Error fetching post ${req.params.id}:`, err.message);
    
    // Handle invalid ID format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   POST api/posts
// @desc    Submit a new blog post for approval
// @access  Public (could be restricted in the future)
router.post('/posts', async (req, res) => {
  const { title, content, prompt, publishDate } = req.body;

  // Validate required fields
  if (!title || !content || !prompt) {
    return res.status(400).json({ 
      error: 'Please provide title, content, and prompt for the blog post' 
    });
  }

  try {
    const newPost = new BlogPost({
      title,
      content,
      prompt,
      status: 'pending',
      publishDate: publishDate || null
    });

    const savedPost = await newPost.save();
    res.status(201).json({ 
      message: 'Blog post submitted for approval',
      post: savedPost
    });
  } catch (err) {
    console.error('Error submitting blog post:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   GET api/approvals/pending
// @desc    Get pending blog posts
// @access  Admin only (authorization check should be added)
router.get('/approvals/pending', async (req, res) => {
  try {
    // TODO: Add authorization middleware
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total pending posts
    const totalPosts = await BlogPost.countDocuments({ status: 'pending' });
    const totalPages = Math.ceil(totalPosts / limit);

    // Get pending posts for current page
    const posts = await BlogPost.find({ status: 'pending' })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts
    });
  } catch (err) {
    console.error('Error fetching pending posts:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   PATCH api/approvals/:id
// @desc    Approve or deny a pending blog post
// @access  Admin only (authorization check should be added)
router.patch('/approvals/:id', async (req, res) => {
  try {
    // TODO: Add authorization middleware
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    const { action, publishDate } = req.body;
    
    if (!action || !['approve', 'deny'].includes(action)) {
      return res.status(400).json({ error: 'Action must be "approve" or "deny"' });
    }

    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.status !== 'pending') {
      return res.status(400).json({ 
        error: `Cannot ${action} post that is not pending approval` 
      });
    }

    // Update post status and publish date if approving
    post.status = action === 'approve' ? 'approved' : 'denied';
    
    if (action === 'approve') {
      post.publishDate = publishDate || new Date(); // Use provided date or current date
    }

    await post.save();

    res.json({
      message: `Post ${action === 'approve' ? 'approved' : 'denied'} successfully`,
      post
    });
  } catch (err) {
    console.error(`Error ${req.body.action}ing post:`, err.message);
    
    // Handle invalid ID format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   POST api/generate-blog
// @desc    Generate blog content from a prompt
// @access  Public (could be restricted)
router.post('/generate-blog', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Please provide a prompt' });
  }

  try {
    // For now, we'll just return a placeholder response
    // In a real implementation, this would call an AI service
    const mockContent = `
# Generated Blog Post

This is a placeholder for generated content based on your prompt: "${prompt}"

## Introduction
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis 
felis vel metus faucibus, in sagittis dolor ultricies.

## Main Content
Phasellus eu lectus vitae justo ullamcorper faucibus. Donec at risus vel 
libero pellentesque fermentum. Sed condimentum magna in sapien mollis, 
ac scelerisque enim facilisis.

## Conclusion
Fusce egestas enim in diam pharetra, at laoreet libero dapibus. Mauris 
fermentum diam vel ipsum placerat, vel varius ligula sollicitudin.
    `;

    // Add a delay to simulate AI processing time
    setTimeout(() => {
      res.json({ content: mockContent });
    }, 1500);
  } catch (err) {
    console.error('Error generating blog content:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;