const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const protect = async (req, res, next) => {

   let token = req.cookies.jwt; // Récupère le token depuis le cookie

   if (token) {
      try {
         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // Get user from the token without password
         req.user = await UserModel.findById(decoded.userId).select('-password'); // Exclut le mot de passe
         next();
      } catch (error) {
         res.status(401).json({ error: 'Not authorized, invalid token' });
      }
   } else {
      res.status(401).json({ error: 'Not authorized, no token' });
   }
};

module.exports = { protect };