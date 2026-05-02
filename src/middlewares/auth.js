const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Verify JWT and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Access denied. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return errorResponse(res, 'User not found.', 401);
    if (!user.isActive) return errorResponse(res, 'Account is deactivated.', 403);

    req.user = user;
    next();
  } catch (err) {
    logger.warn(`Auth failure: ${err.message}`);
    if (err.name === 'TokenExpiredError') return errorResponse(res, 'Token expired.', 401);
    return errorResponse(res, 'Invalid token.', 401);
  }
};

/**
 * Role-based access control
 * Usage: authorize('admin', 'hr')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Role '${req.user.role}' is not authorized to access this resource.`,
        403
      );
    }
    next();
  };
};

module.exports = { authenticate, authorize };
