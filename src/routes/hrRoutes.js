const express = require('express');
const router = express.Router();
const { evaluate, getCandidates, getEvaluation, getStats } = require('../controllers/hrController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');

router.use(authenticate, authorize('hr', 'admin'));

router.post('/evaluate/:candidateId', validate(schemas.hrEvaluate), evaluate);
router.get('/candidates', validate(schemas.listQuery, 'query'), getCandidates);
router.get('/evaluation/:candidateId', getEvaluation);
router.get('/stats', getStats);

module.exports = router;
