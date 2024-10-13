const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
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
  preferredLocation: {
    type: String,
    required: false
  },
  savedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Landlord' // Reference to the Landlord model or properties
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tenant', TenantSchema);
