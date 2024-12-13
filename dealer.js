const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB connection string
const mongoURI =process.env.MONGO_URI_DEALER

// Connect to MongoDB
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to cluster database");
//   })
//   .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define a schema and model for the dealer form
const dealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  distributionType: { type: String, required: true },
  message: { type: String, required: true },
});

const Dealer = mongoose.model('Dealer', dealerSchema);

// Define the dealer POST route
router.post('/dealer', async (req, res) => {
  const dealerData = req.body;

  // Check if all required fields are present
  if (
    !dealerData.name ||
    !dealerData.email ||
    !dealerData.phone ||
    !dealerData.website ||
    !dealerData.distributionType ||
    !dealerData.message
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save the new dealer to the database
    const newDealer = new Dealer(dealerData);
    await newDealer.save();
    res.status(201).json(newDealer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create dealer' });
  }
});

// Export the router
module.exports = router;
