const express = require('express');
const router = express.Router();
const { getDashboard, getCandidates, getCandidateDetail } = require('../controllers/recruiterController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');

router.use(authenticate, authorize('recruiter', 'admin'));

router.get('/dashboard', getDashboard);
router.get('/candidates', validate(schemas.listQuery, 'query'), getCandidates);
router.get('/candidate/:id', getCandidateDetail);

module.exports = router;
