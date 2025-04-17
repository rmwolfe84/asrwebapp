const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Adjust path if needed

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
  const { name, description } = req.body; // Make sure body-parser is used in server.js

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

module.exports = router;