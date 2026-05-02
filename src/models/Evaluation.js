const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    strengths: {
      type: [String],
      validate: [(val) => val.length <= 10, 'Max 10 strengths'],
    },
    areas_for_improvement: [String],
    recommended_for: {
      type: String,
      enum: ['hire', 'hold', 'reject', 'pending'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// One HR evaluation per candidate per evaluator
evaluationSchema.index({ candidate: 1, evaluator: 1 }, { unique: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
