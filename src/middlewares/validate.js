const Joi = require('joi');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Generic validation middleware factory
 * @param {Joi.Schema} schema - Joi schema
 * @param {string} property - 'body' | 'query' | 'params'
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((d) => d.message.replace(/['"]/g, ''));
      return errorResponse(res, 'Validation failed', 422, errors);
    }
    req[property] = value; // replace with sanitised values
    next();
  };
};

// ─── Schemas ────────────────────────────────────────────────────────────────

const schemas = {
  // Auth
  signup: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('candidate', 'recruiter', 'hr').default('candidate'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Candidate
  createCandidate: Joi.object({
    headline: Joi.string().max(200).optional(),
    bio: Joi.string().max(1000).optional(),
    location: Joi.string().max(100).optional(),
    skills: Joi.array().items(Joi.string()).max(30).optional(),
    projects: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          link: Joi.string().uri().optional().allow(''),
          description: Joi.string().optional(),
          techStack: Joi.array().items(Joi.string()).optional(),
        })
      )
      .optional(),
    intro_video_url: Joi.string().uri().optional().allow(''),
    portfolio_url: Joi.string().uri().optional().allow(''),
    github_url: Joi.string().uri().optional().allow(''),
    linkedin_url: Joi.string().uri().optional().allow(''),
    twitter_url: Joi.string().uri().optional().allow(''),
    is_open_to_work: Joi.boolean().optional(),
    experience_years: Joi.number().min(0).max(50).optional(),
  }),

  // HR Evaluation
  hrEvaluate: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    notes: Joi.string().max(2000).optional().allow(''),
    strengths: Joi.array().items(Joi.string()).max(10).optional(),
    areas_for_improvement: Joi.array().items(Joi.string()).max(10).optional(),
    recommended_for: Joi.string().valid('hire', 'hold', 'reject', 'pending').optional(),
  }),

  // Pagination/filter query
  listQuery: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    skill: Joi.string().optional(),
    min_rating: Joi.number().min(0).max(5).optional(),
    min_score: Joi.number().min(0).max(10).optional(),
    is_open_to_work: Joi.boolean().optional(),
    sort: Joi.string()
      .valid('deployability_score', 'hr_rating', 'createdAt', '-deployability_score', '-hr_rating', '-createdAt')
      .default('-deployability_score'),
  }),
};

module.exports = { validate, schemas };
