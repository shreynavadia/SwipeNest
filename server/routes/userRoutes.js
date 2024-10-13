// routes/userRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Landlord = require('../models/Landlord');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/landlord', upload.single('coverPhoto'), async (req, res) => {
  const {
    firebaseUID,
    email,
    name,
    phone,
    propertiesOwned,
    propertyName,
    propertyAddress,
    propertyCertificateNumber,
    squareFootage,
    bedrooms,
    bathrooms,
    description,
    amenities
  } = req.body;

  try {
    // Handle the uploaded cover photo file
    let coverPhotoUrl = '';
    if (req.file) {
      // Simulate saving file; in practice, you'd upload to a storage service
      coverPhotoUrl = `/uploads/${req.file.originalname}`; // Example file path
    }

    const newLandlord = new Landlord({
      firebaseUID,
      email,
      name,
      phone,
      propertiesOwned,
      propertyName,
      propertyAddress,
      propertyCertificateNumber,
      squareFootage,
      bedrooms,
      bathrooms,
      description,
      amenities: JSON.parse(amenities), // Convert JSON string back to array
      coverPhoto: coverPhotoUrl
    });

    await newLandlord.save();
    res.status(201).json({ message: 'Landlord profile created successfully' });
  } catch (error) {
    console.error('Error saving landlord data:', error);
    res.status(500).json({ error: 'Failed to create landlord profile' });
  }
});

module.exports = router;
