const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
   });

   // Save the token in a cookie
   res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'none', // Allow the cookie to be sent in cross-site requests
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
   });

   return token;
};

module.exports = generateToken;