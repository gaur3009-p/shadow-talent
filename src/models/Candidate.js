const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  link: { type: String, trim: true },
  description: { type: String, trim: true },
  techStack: [String],
  // 0-10 score auto-assigned based on completeness
  quality_score: { type: Number, default: 0, min: 0, max: 10 },
});

const evaluationSchema = new mongoose.Schema(
  {
    hr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    notes: { type: String },
    strengths: [String],
    evaluated_at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const candidateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },

    // Core profile
    headline: { type: String, trim: true, maxlength: 200 },
    bio: { type: String, trim: true, maxlength: 1000 },
    location: { type: String, trim: true },
    skills: {
      type: [String],
      validate: [(val) => val.length <= 30, 'Max 30 skills allowed'],
    },

    // Proof of work
    projects: [projectSchema],

    // Media
    intro_video_url: { type: String },
    resume_url: { type: String },
    portfolio_url: { type: String },
    avatar_url: { type: String },

    // Scores
    hr_rating: { type: Number, min: 0, max: 5, default: 0 },
    deployability_score: { type: Number, min: 0, max: 10, default: 0 },

    // HR evaluations history
    evaluations: [evaluationSchema],

    // AI-generated resume (cached)
    ai_resume: {
      summary: String,
      bullet_points: [String],
      generated_at: Date,
    },

    // Availability
    is_open_to_work: { type: Boolean, default: true },
    experience_years: { type: Number, default: 0, min: 0, max: 50 },

    // Social links
    github_url: String,
    linkedin_url: String,
    twitter_url: String,
  },
  { timestamps: true }
);

// Index for fast filtering
candidateSchema.index({ skills: 1 });
candidateSchema.index({ deployability_score: -1 });
candidateSchema.index({ hr_rating: -1 });
candidateSchema.index({ is_open_to_work: 1 });

// Compute project quality score on save
candidateSchema.pre('save', function (next) {
  this.projects.forEach((p) => {
    let score = 0;
    if (p.title) score += 2;
    if (p.description && p.description.length > 50) score += 3;
    if (p.link) score += 3;
    if (p.techStack && p.techStack.length > 0) score += 2;
    p.quality_score = score;
  });
  next();
});

module.exports = mongoose.model('Candidate', candidateSchema);
