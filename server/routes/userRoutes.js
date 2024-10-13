const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const Landlord = require('../models/Landlord');

// Route to save tenant data
router.post('/tenant', async (req, res) => {
  const { firebaseUID, email, name, phone, preferredLocation } = req.body;

  try {
    const newTenant = new Tenant({ firebaseUID, email, name, phone, preferredLocation });
    await newTenant.save();
    res.status(201).json({ message: 'Tenant profile created successfully' });
  } catch (error) {
    console.error('Error saving tenant data:', error);
    res.status(500).json({ error: 'Failed to create tenant profile' });
  }
});

// Route to save landlord data
router.post('/landlord', async (req, res) => {
  const { firebaseUID, email, name, phone, propertiesOwned } = req.body;

  try {
    const newLandlord = new Landlord({ firebaseUID, email, name, phone, propertiesOwned });
    await newLandlord.save();
    res.status(201).json({ message: 'Landlord profile created successfully' });
  } catch (error) {
    console.error('Error saving landlord data:', error);
    res.status(500).json({ error: 'Failed to create landlord profile' });
  }
});

module.exports = router;
