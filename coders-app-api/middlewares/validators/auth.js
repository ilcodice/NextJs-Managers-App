const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);

      // Optional: Check if user role is allowed
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden: Not authorized' });
      }

      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = authMiddleware;
