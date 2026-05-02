const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Generate signed JWT
 */
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * POST /auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return errorResponse(res, 'Email already registered.', 409);

    const user = await User.create({ name, email, password, role });

    // Auto-create candidate profile if role is candidate
    if (role === 'candidate' || !role) {
      await Candidate.create({ user: user._id, name, email });
    }

    const token = signToken(user._id, user.role);
    logger.info(`New user registered: ${email} (${user.role})`);

    return successResponse(res, { token, user }, 'Account created successfully', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    if (!user.isActive) return errorResponse(res, 'Account is deactivated.', 403);

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id, user.role);
    logger.info(`User logged in: ${email}`);

    return successResponse(res, { token, user }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /auth/me
 */
const getMe = async (req, res) => {
  return successResponse(res, { user: req.user }, 'User fetched');
};

/**
 * POST /auth/change-password
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return errorResponse(res, 'Current password is incorrect.', 400);
    }

    user.password = newPassword;
    await user.save();
    return successResponse(res, {}, 'Password updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, getMe, changePassword };
