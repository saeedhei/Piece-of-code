// Reading from MongoDB (Query Side)

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/cqrs_read', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
});

const User = mongoose.model('User', userSchema);

router.get('/getUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Read from MongoDB
  try {
    const user = await User.findOne({ userId });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user from MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
