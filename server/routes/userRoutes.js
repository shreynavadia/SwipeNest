const express = require('express');
const router = express.Router();
const multer = require('multer');
const Landlord = require('../models/Landlord');
const Tenant = require('../models/Tenant');

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

    const amenitiesArray = Array.isArray(amenities) ? amenities : [];

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
      coverPhoto: req.file ? req.file.path : null 
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

// Route to save a property to a tenant's saved properties
router.post('/tenant/:id/save-property', async (req, res) => {
  const { id } = req.params;
  const { propertyId } = req.body;

  try {
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    if (!tenant.savedProperties.includes(propertyId)) {
      tenant.savedProperties.push(propertyId);
      await tenant.save();
    }

    res.status(200).json({ message: 'Property saved successfully' });
  } catch (error) {
    console.error('Error saving property for tenant:', error);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

module.exports = router;
