const express = require('express');
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/signup', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.get('/user', protect, getUser);

module.exports = userRoutes;