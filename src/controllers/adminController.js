const User = require('../models/User');
const Candidate = require('../models/Candidate');
const Evaluation = require('../models/Evaluation');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');

/**
 * GET /admin/stats
 */
const getStats = async (req, res, next) => {
  try {
    const [users, candidates, evaluations, roleBreakdown] = await Promise.all([
      User.countDocuments(),
      Candidate.countDocuments(),
      Evaluation.countDocuments(),
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    ]);

    return successResponse(res, {
      total_users: users,
      total_candidates: candidates,
      total_evaluations: evaluations,
      roles: roleBreakdown,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /admin/users
 */
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role } = req.query;
    const filter = {};
    if (role) filter.role = role;
    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      User.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)).select('-password'),
      User.countDocuments(filter),
    ]);

    return paginatedResponse(res, users, total, page, limit);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /admin/users/:id/toggle-active
 */
const toggleUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return errorResponse(res, 'User not found.', 404);
    if (user._id.toString() === req.user._id.toString()) {
      return errorResponse(res, 'Cannot deactivate your own account.', 400);
    }
    user.isActive = !user.isActive;
    await user.save();
    return successResponse(res, { user }, `User ${user.isActive ? 'activated' : 'deactivated'}`);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /admin/candidate/:id
 */
const deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return errorResponse(res, 'Candidate not found.', 404);
    await Evaluation.deleteMany({ candidate: req.params.id });
    return successResponse(res, {}, 'Candidate deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats, getUsers, toggleUserActive, deleteCandidate };
