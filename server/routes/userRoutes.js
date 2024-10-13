const express = require('express');
const router = express.Router();
const multer = require('multer');
const Landlord = require('../models/Landlord');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Update this path as needed

// Route to save landlord data
router.post('/landlord', upload.single('coverPhoto'), async (req, res) => {
  try {
    const {
      firebaseUID,
      email,
      name,
      phone,
      city,
      propertiesOwned,
      propertyName,
      propertyAddress,
      bedrooms,
      bathrooms,
      description,
      propertyCertificateNumber,
      squareFootage,
      amenities
    } = req.body;

    // Check if amenities is an array, if not, make it an empty array
    const amenitiesArray = Array.isArray(amenities) ? amenities : [];

    // Create a new landlord entry
    const newLandlord = new Landlord({
      firebaseUID,
      email,
      name,
      phone,
      city,
      propertiesOwned,
      propertyName,
      propertyAddress,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      description,
      propertyCertificateNumber,
      squareFootage: Number(squareFootage),
      amenities: amenitiesArray,
      coverPhoto: req.file ? req.file.path : null // Path to uploaded file
    });

    await newLandlord.save();
    res.status(201).json({ message: 'Landlord profile created successfully' });
  } catch (error) {
    console.error('Error saving landlord data:', error);
    res.status(500).json({ error: 'Failed to create landlord profile' });
  }
});

// Route to fetch properties based on search criteria
router.get('/properties', async (req, res) => {
  const { city, bedrooms, bathrooms } = req.query;

  try {
    const properties = await Landlord.find({
      city,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms)
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

module.exports = router;
