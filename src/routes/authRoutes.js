const express = require('express');
const router = express.Router();
const { signup, login, getMe, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/signup', authLimiter, validate(schemas.signup), signup);
router.post('/login', authLimiter, validate(schemas.login), login);
router.get('/me', authenticate, getMe);
router.post('/change-password', authenticate, changePassword);

module.exports = router;
