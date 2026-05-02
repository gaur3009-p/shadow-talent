const express = require('express');
const router = express.Router();
const { generateAIResume, getAIResume } = require('../controllers/aiController');
const { authenticate, authorize } = require('../middlewares/auth');
const { aiLimiter } = require('../middlewares/rateLimiter');

router.use(authenticate);

router.post('/generate-resume', aiLimiter, authorize('candidate', 'hr', 'admin'), generateAIResume);
router.get('/resume/:candidateId', authorize('recruiter', 'hr', 'admin'), getAIResume);

module.exports = router;
