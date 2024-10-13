const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  propertiesOwned: {
    type: Number,
    default: 0
  },
  propertyName: {
    type: String,
    required: false
  },
  propertyAddress: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  bathrooms: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  description: {
    type: String,
    maxlength: 250,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  propertyCertificateNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  squareFootage: {
    type: Number,
    required: true
  },
  coverPhoto: {
    type: String, // Store the URL or path to the uploaded file
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Landlord', LandlordSchema);
