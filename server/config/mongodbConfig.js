const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://shreynavadia:Shrey123*@swipenestt.ef5du.mongodb.net/?retryWrites=true&w=majority&appName=SwipeNestt', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
