const Candidate = require('../models/Candidate');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');
const { computeDeployabilityScore } = require('../services/scoreService');

/**
 * POST /candidate/create  (or auto-created on signup)
 * Candidates update their own profile
 */
const createOrUpdate = async (req, res, next) => {
  try {
    let candidate = await Candidate.findOne({ user: req.user._id });

    if (!candidate) {
      candidate = new Candidate({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    }

    // Merge incoming fields
    const allowed = [
      'headline', 'bio', 'location', 'skills', 'projects',
      'intro_video_url', 'portfolio_url', 'github_url', 'linkedin_url',
      'twitter_url', 'is_open_to_work', 'experience_years',
    ];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) candidate[field] = req.body[field];
    });

    await candidate.save(); // triggers pre-save quality scoring

    // Recompute deployability score after save (needs quality_scores populated)
    candidate.deployability_score = computeDeployabilityScore(candidate);
    await candidate.save();

    return successResponse(res, { candidate }, 'Profile saved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /candidate/:id
 */
const getById = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate('user', 'name email role');
    if (!candidate) return errorResponse(res, 'Candidate not found.', 404);
    return successResponse(res, { candidate });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /candidates
 * Filters: skill, min_rating, min_score, is_open_to_work
 * Pagination: page, limit
 */
const list = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, skill, min_rating, min_score, is_open_to_work, sort = '-deployability_score' } = req.query;

    const filter = {};
    if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };
    if (min_rating) filter.hr_rating = { $gte: Number(min_rating) };
    if (min_score) filter.deployability_score = { $gte: Number(min_score) };
    if (is_open_to_work !== undefined) filter.is_open_to_work = is_open_to_work === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [candidates, total] = await Promise.all([
      Candidate.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .select('-evaluations -ai_resume')
        .populate('user', 'name email'),
      Candidate.countDocuments(filter),
    ]);

    return paginatedResponse(res, candidates, total, page, limit);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /candidate/update  (own profile)
 */
const update = async (req, res, next) => {
  return createOrUpdate(req, res, next);
};

/**
 * POST /candidate/upload-resume
 */
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded.', 400);

    const candidate = await Candidate.findOne({ user: req.user._id });
    if (!candidate) return errorResponse(res, 'Candidate profile not found.', 404);

    candidate.resume_url = req.file.path;
    candidate.deployability_score = computeDeployabilityScore(candidate);
    await candidate.save();

    return successResponse(res, { resume_url: req.file.path }, 'Resume uploaded successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * POST /candidate/upload-video
 */
const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded.', 400);

    const candidate = await Candidate.findOne({ user: req.user._id });
    if (!candidate) return errorResponse(res, 'Candidate profile not found.', 404);

    candidate.intro_video_url = req.file.path;
    candidate.deployability_score = computeDeployabilityScore(candidate);
    await candidate.save();

    return successResponse(res, { video_url: req.file.path }, 'Intro video uploaded successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /candidate/me  (own profile)
 */
const getMyProfile = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({ user: req.user._id });
    if (!candidate) return errorResponse(res, 'Profile not found. Please create one.', 404);
    return successResponse(res, { candidate });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrUpdate, getById, list, update, uploadResume, uploadVideo, getMyProfile };
