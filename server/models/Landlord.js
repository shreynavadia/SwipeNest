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
  // Add additional landlord-specific fields here, e.g.:
  name: String,
  phone: String,
  propertiesOwned: Number,
});

module.exports = mongoose.model('Landlord', LandlordSchema);
