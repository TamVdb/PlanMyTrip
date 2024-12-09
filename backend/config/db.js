const mongoose = require('mongoose'); // To connect to MongoDB

const connectDB = async () => {
   try {
      const connexion = await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
   }
};

module.exports = connectDB;