/**
 * Deployability Score Engine
 *
 * Formula: (skill_score + hr_rating_normalized + project_quality + consistency) / 4
 * All components are normalized to 0–10 scale.
 * Final score: 0–10
 */

/**
 * Compute skill score based on number of skills
 * Caps at 30 skills for full score
 */
const computeSkillScore = (skills = []) => {
  const count = skills.length;
  if (count === 0) return 0;
  return Math.min((count / 15) * 10, 10); // 15 skills → full score
};

/**
 * Normalize HR rating (1–5) → (0–10)
 */
const normalizeHRRating = (rating = 0) => {
  if (!rating) return 0;
  return ((rating - 1) / 4) * 10;
};

/**
 * Compute average project quality from all projects
 * Each project has a quality_score 0–10
 */
const computeProjectQuality = (projects = []) => {
  if (!projects.length) return 0;
  const total = projects.reduce((acc, p) => acc + (p.quality_score || 0), 0);
  return total / projects.length;
};

/**
 * Consistency score based on profile completeness
 * Checks: bio, headline, portfolio, intro_video, github
 */
const computeConsistency = (candidate) => {
  const fields = [
    candidate.bio,
    candidate.headline,
    candidate.portfolio_url,
    candidate.intro_video_url,
    candidate.github_url,
    candidate.linkedin_url,
    candidate.resume_url,
    candidate.avatar_url,
    candidate.location,
    candidate.experience_years > 0 ? true : null,
  ];
  const filled = fields.filter(Boolean).length;
  return (filled / fields.length) * 10;
};

/**
 * Main scoring function
 * @param {Object} candidate - Mongoose candidate document
 * @returns {number} score 0–10 (rounded to 2 decimals)
 */
const computeDeployabilityScore = (candidate) => {
  const skillScore = computeSkillScore(candidate.skills);
  const hrScore = normalizeHRRating(candidate.hr_rating);
  const projectScore = computeProjectQuality(candidate.projects);
  const consistencyScore = computeConsistency(candidate);

  const raw = (skillScore + hrScore + projectScore + consistencyScore) / 4;
  return Math.round(raw * 100) / 100;
};

module.exports = { computeDeployabilityScore };
