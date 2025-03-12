require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const shamirRoutes = require('./routes/shamir');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Check for MONGO_URI
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined');
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// ✅ Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// ✅ Routes
app.use('/api/shamir', shamirRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Welcome to Shamir’s Secret Sharing API!');
});

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

