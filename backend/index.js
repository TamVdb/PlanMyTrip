const express = require('express'); // To create the server
const cors = require('cors'); // To allow cross-origin requests
const dotenv = require('dotenv'); // To load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const activityRoutes = require('./routes/activityRoutes');


const port = process.env.PORT;

connectDB();

const app = express(); // Create an instance of express

app.use(express.json()); // To parse JSON in the request body
app.use(express.urlencoded({ extended: true })); // Pour traiter les requêtes POST des formulaires
app.use(cors({
   origin: process.env.API_URL, // Allow requests from this origin
   credentials: true, // To allow cookies
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(cookieParser());

// Call the users route
app.use('/api/users', userRoutes);
// Call the trips route
app.use('/api/trips', tripRoutes);
// Call the activities route
app.use('/api/trip', activityRoutes);


// app.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
// });

module.exports = app; // Export app for Vercel