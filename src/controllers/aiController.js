const Candidate = require('../models/Candidate');
const { generateResume } = require('../services/aiResumeService');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * POST /ai/generate-resume
 * Generates (and caches) an AI resume for the logged-in candidate
 */
const generateAIResume = async (req, res, next) => {
  try {
    // Determine which candidate to generate for
    // Candidates: use their own profile
    // HR/Admin: can pass candidateId in body
    let candidate;

    if (req.user.role === 'candidate') {
      candidate = await Candidate.findOne({ user: req.user._id });
      if (!candidate) return errorResponse(res, 'Candidate profile not found.', 404);
    } else {
      const { candidateId } = req.body;
      if (!candidateId) return errorResponse(res, 'candidateId is required.', 400);
      candidate = await Candidate.findById(candidateId);
      if (!candidate) return errorResponse(res, 'Candidate not found.', 404);
    }

    // Use cached version if generated recently (< 24h)
    if (candidate.ai_resume?.generated_at) {
      const ageHours = (Date.now() - candidate.ai_resume.generated_at) / (1000 * 60 * 60);
      if (ageHours < 24) {
        logger.info(`Returning cached AI resume for candidate: ${candidate._id}`);
        return successResponse(res, { resume: candidate.ai_resume, cached: true }, 'Resume fetched from cache');
      }
    }

    // Generate fresh resume
    const resumeData = await generateResume(candidate);

    // Cache in DB
    candidate.ai_resume = {
      summary: resumeData.summary,
      bullet_points: resumeData.bullet_points,
      generated_at: new Date(),
    };
    await candidate.save();

    return successResponse(
      res,
      { resume: resumeData, cached: false },
      'AI resume generated successfully'
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /ai/resume/:candidateId
 * Fetch previously generated AI resume (no new generation)
 */
const getAIResume = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId).select('ai_resume name');
    if (!candidate) return errorResponse(res, 'Candidate not found.', 404);
    if (!candidate.ai_resume?.summary) return errorResponse(res, 'No AI resume generated yet.', 404);
    return successResponse(res, { resume: candidate.ai_resume });
  } catch (err) {
    next(err);
  }
};

module.exports = { generateAIResume, getAIResume };
