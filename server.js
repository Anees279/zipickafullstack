require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


// Import dealer routes
const dealerRoutes = require('./dealer'); // Adjust path if needed
const ambassadorRoutes = require('./ambassador');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Use body-parser for JSON parsing
app.use(express.json()); // Parse JSON request bodies

// Use the dealer routes
app.use(dealerRoutes); //
app.use(ambassadorRoutes); //
app.set('view engine', 'ejs');

// Specify the 'views' directory inside the 'public' folder
app.set('views', path.join(__dirname, 'public', 'views'));

// Serve static files (CSS, JS, images) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI_CONTACT; 
console.log("Mongo URI:", mongoURI);

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a Mongoose Schema and Model for contact form data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderNumber: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);




// Default route to render 'index.ejs'
app.get('*', (req, res) => {
  // Get the page name from the URL path (default to 'home' if no page is provided)
  const page = req.path.slice(1) || 'home'; 

  // Dynamically check if the requested page has a corresponding .ejs file in the views folder
  const filePath = path.join(__dirname, 'public', 'views', `${page}.ejs`);

  // If the file exists, render it; otherwise, return a 404 error
  res.render(filePath, (err, html) => {
    if (err) {
      return res.status(404).render('index', {
        title: '404 Not Found',
        content: 'The page you are looking for does not exist.'
      });
    }
    res.send(html);
  });
});

// Route to handle the contact form submission
app.post('/contact_us', async (req, res) => {
  const contactData = req.body;

  // Validation
  if (
    !contactData.name ||
    !contactData.email ||
    !contactData.message ||
    !contactData.orderNumber ||
    !contactData.subject
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new contact document
    const newContact = new Contact(contactData);

    // Save the data to MongoDB
    await newContact.save();

    // Respond with a success message
    res.status(200).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({
      message: 'An error occurred while saving the contact information.',
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
