const express = require('express');
const router = express.Router();
const {
  createOrUpdate, getById, list, update, uploadResume, uploadVideo, getMyProfile,
} = require('../controllers/candidateController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');
const { uploadResume: resumeUpload, uploadVideo: videoUpload } = require('../config/cloudinary');

// All routes require authentication
router.use(authenticate);

// Own profile
router.get('/me', getMyProfile);
router.post('/create', authorize('candidate'), validate(schemas.createCandidate), createOrUpdate);
router.put('/update', authorize('candidate'), validate(schemas.createCandidate), update);

// File uploads
router.post('/upload-resume', authorize('candidate'), resumeUpload.single('resume'), uploadResume);
router.post('/upload-video', authorize('candidate'), videoUpload.single('video'), uploadVideo);

// Public browsing (any authenticated user)
router.get('/', validate(schemas.listQuery, 'query'), list);
router.get('/:id', getById);

module.exports = router;
