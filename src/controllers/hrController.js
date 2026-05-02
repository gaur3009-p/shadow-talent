const Evaluation = require('../models/Evaluation');
const Candidate = require('../models/Candidate');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');
const { computeDeployabilityScore } = require('../services/scoreService');

/**
 * POST /hr/evaluate/:candidateId
 * Create or update an HR evaluation for a candidate
 */
const evaluate = async (req, res, next) => {
  try {
    const { candidateId } = req.params;
    const { rating, notes, strengths, areas_for_improvement, recommended_for } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return errorResponse(res, 'Candidate not found.', 404);

    // Upsert: one evaluation per HR per candidate
    const evaluation = await Evaluation.findOneAndUpdate(
      { candidate: candidateId, evaluator: req.user._id },
      { rating, notes, strengths, areas_for_improvement, recommended_for },
      { upsert: true, new: true, runValidators: true }
    );

    // Recompute candidate's average HR rating from all evaluations
    const allEvals = await Evaluation.find({ candidate: candidateId });
    const avgRating = allEvals.reduce((sum, e) => sum + e.rating, 0) / allEvals.length;
    candidate.hr_rating = Math.round(avgRating * 10) / 10;

    // Also update the embedded evaluations array (for quick access)
    const embeddedIdx = candidate.evaluations.findIndex(
      (e) => e.hr_id?.toString() === req.user._id.toString()
    );
    const embeddedEntry = { hr_id: req.user._id, rating, notes, strengths, evaluated_at: new Date() };
    if (embeddedIdx >= 0) candidate.evaluations[embeddedIdx] = embeddedEntry;
    else candidate.evaluations.push(embeddedEntry);

    candidate.deployability_score = computeDeployabilityScore(candidate);
    await candidate.save();

    return successResponse(res, { evaluation, candidate_score: candidate.deployability_score }, 'Evaluation saved');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /hr/candidates
 * HR sees all candidates with their evaluations
 */
const getCandidates = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, recommended_for } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Get candidates that this HR has evaluated
    const evalFilter = { evaluator: req.user._id };
    if (recommended_for) evalFilter.recommended_for = recommended_for;

    const [evaluations, total] = await Promise.all([
      Evaluation.find(evalFilter)
        .sort('-updatedAt')
        .skip(skip)
        .limit(Number(limit))
        .populate({
          path: 'candidate',
          select: 'name email skills deployability_score hr_rating projects',
        }),
      Evaluation.countDocuments(evalFilter),
    ]);

    return paginatedResponse(res, evaluations, total, page, limit);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /hr/evaluation/:candidateId
 * Get this HR's evaluation for a specific candidate
 */
const getEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findOne({
      candidate: req.params.candidateId,
      evaluator: req.user._id,
    }).populate('candidate', 'name email skills deployability_score');

    if (!evaluation) return errorResponse(res, 'No evaluation found.', 404);
    return successResponse(res, { evaluation });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /hr/stats
 * Summary stats for HR dashboard
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await Evaluation.aggregate([
      { $match: { evaluator: req.user._id } },
      {
        $group: {
          _id: '$recommended_for',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const totalEvaluated = await Evaluation.countDocuments({ evaluator: req.user._id });
    return successResponse(res, { totalEvaluated, breakdown: stats });
  } catch (err) {
    next(err);
  }
};

module.exports = { evaluate, getCandidates, getEvaluation, getStats };
