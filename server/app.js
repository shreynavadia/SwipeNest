const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodbConfig');
const firebaseAdmin = require('./config/firebaseConfig'); // Ensure firebase-admin is set up correctly
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
