const OpenAI = require('openai');
const logger = require('../utils/logger');

let _openai = null;
const getClient = () => {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured.");
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
};

/**
 * Build a structured prompt for resume generation
 */
const buildPrompt = (candidate) => {
  const projectList = (candidate.projects || [])
    .map((p, i) => `  ${i + 1}. ${p.title}: ${p.description || 'No description'} (${p.link || 'No link'})`)
    .join('\n');

  return `
You are an expert technical resume writer for a platform called TalentFlow.
Generate a professional resume in JSON format for the following candidate.

Candidate Profile:
- Name: ${candidate.name}
- Headline: ${candidate.headline || 'Software Professional'}
- Bio: ${candidate.bio || 'N/A'}
- Location: ${candidate.location || 'Not specified'}
- Experience: ${candidate.experience_years || 0} years
- Skills: ${(candidate.skills || []).join(', ') || 'Not specified'}
- GitHub: ${candidate.github_url || 'N/A'}
- LinkedIn: ${candidate.linkedin_url || 'N/A'}
- Portfolio: ${candidate.portfolio_url || 'N/A'}

Projects:
${projectList || '  No projects listed'}

Instructions:
1. Write a compelling 2-3 sentence professional summary
2. Create 5-7 achievement-focused bullet points highlighting their value
3. List their top 5 technical skills with context
4. Suggest a professional headline if none exists

Respond ONLY with a valid JSON object with this structure:
{
  "summary": "...",
  "bullet_points": ["...", "..."],
  "top_skills": ["...", "..."],
  "suggested_headline": "...",
  "resume_text": "Full plain-text resume..."
}
`;
};

/**
 * Generate AI resume for a candidate
 * @param {Object} candidate - Mongoose candidate document
 * @returns {Object} { summary, bullet_points, top_skills, suggested_headline, resume_text }
 */
const generateResume = async (candidate) => {
  const prompt = buildPrompt(candidate);

  const response = await getClient().chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned empty response');

  try {
    const parsed = JSON.parse(content);
    logger.info(`AI resume generated for candidate: ${candidate._id}`);
    return parsed;
  } catch {
    logger.error('Failed to parse AI resume JSON');
    throw new Error('AI returned malformed JSON');
  }
};

module.exports = { generateResume };
