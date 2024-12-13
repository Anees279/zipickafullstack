
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI_AMBASSADOR;

// Connect to MongoDB Atlas
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch((err) => console.error('Could not connect to MongoDB:', err));

// Ambassador Schema
const ambassadorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  messageInterest: { type: String, required: true },
  messagePromotion: { type: String, required: true },
  socialMedia: String,
  date: { type: Date, default: Date.now },
});

// Create Ambassador model
const Ambassador = mongoose.model('Ambassador', ambassadorSchema);

// POST route to handle Ambassador form submissions
router.post('/ambassador', async (req, res) => {
  const { name, email, messageInterest, messagePromotion, socialMedia } = req.body;

  // Validate required fields
  if (!name || !email || !messageInterest || !messagePromotion) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  try {
    // Save data to the database
    const newAmbassador = new Ambassador({
      name,
      email,
      messageInterest,
      messagePromotion,
      socialMedia,
    });

    await newAmbassador.save();
    res.status(201).json({ message: 'Ambassador application submitted successfully!' });
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
    res.status(500).json({ message: 'Failed to save data. Please try again later.' });
  }
});

module.exports = router;
