const { expressjwt: jwt } = require('express-jwt');

// Ensure your JWT_SECRET is defined in your .env file!
const isAuthenticated = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

// Helper function to extract token from headers
function getTokenFromHeaders(req) {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return null;
}

module.exports = { isAuthenticated };
