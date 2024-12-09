const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const UserModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user/ Set token
// @route   POST /api/users/signup
// @access  Public
const registerUser = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ username, email, password: hashedPassword });

      if (user) {
         // Generate token and store it in a HTTP-only cookie
         generateToken(res, user._id);
         res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
         });
      }
   } catch (error) {
      // console.error('Erreur lors de la création de l’utilisateur :', error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
   try {
      const { username, password } = req.body;

      // Check for username
      const user = await UserModel.findOne({ username });

      if (user) {
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (passwordMatch) {
            generateToken(res, user._id);
            res.status(201).json({
               _id: user._id,
               username: user.username,
               email: user.email,
            });
         } else {
            res.status(400).json('Password doesn\'t match');
         }
      } else {
         res.status(404).json('User not found');
      }
   } catch (error) {
      res.status(500).json('Invalid email or password');
   }
};

// @desc    Get user
// @route   GET /api/users/user
// @access  Private
const getUser = async (req, res) => {
   try {
      if (!req.user) {
         return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = await UserModel.findById(req.user._id);

      if (user) {
         res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
         });
      } else {
         res.status(404);
         throw new Error('User not found');
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur interne' });
   }

};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
   });
   res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, getUser, logoutUser };