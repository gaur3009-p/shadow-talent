const Candidate = require('../models/Candidate');
const User = require('../models/User');
const { successResponse, paginatedResponse } = require('../utils/apiResponse');

/**
 * GET /recruiter/dashboard
 * Summary stats: total candidates, avg score, top skills, etc.
 */
const getDashboard = async (req, res, next) => {
  try {
    const [total, avgScoreResult, openToWork, topSkills] = await Promise.all([
      Candidate.countDocuments(),
      Candidate.aggregate([{ $group: { _id: null, avg: { $avg: '$deployability_score' } } }]),
      Candidate.countDocuments({ is_open_to_work: true }),
      Candidate.aggregate([
        { $unwind: '$skills' },
        { $group: { _id: '$skills', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    return successResponse(res, {
      total_candidates: total,
      open_to_work: openToWork,
      avg_deployability_score: Math.round((avgScoreResult[0]?.avg || 0) * 100) / 100,
      top_skills: topSkills.map((s) => ({ skill: s._id, count: s.count })),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /recruiter/candidates
 * Full filterable candidate list for recruiters
 * Filters: skill, min_rating, min_score, is_open_to_work
 */
const getCandidates = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      skill,
      min_rating,
      min_score,
      is_open_to_work,
      sort = '-deployability_score',
      experience_min,
    } = req.query;

    const filter = {};
    if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };
    if (min_rating) filter.hr_rating = { $gte: Number(min_rating) };
    if (min_score) filter.deployability_score = { $gte: Number(min_score) };
    if (is_open_to_work !== undefined) filter.is_open_to_work = is_open_to_work === 'true';
    if (experience_min) filter.experience_years = { $gte: Number(experience_min) };

    const skip = (Number(page) - 1) * Number(limit);

    const [candidates, total] = await Promise.all([
      Candidate.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .select('-evaluations -ai_resume -__v')
        .populate('user', 'name email createdAt'),
      Candidate.countDocuments(filter),
    ]);

    return paginatedResponse(res, candidates, total, page, limit);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /recruiter/candidate/:id
 * Full candidate view (excluding raw evaluations for privacy)
 */
const getCandidateDetail = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .select('-evaluations')
      .populate('user', 'name email createdAt');

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }
    return successResponse(res, { candidate });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard, getCandidates, getCandidateDetail };
