const express = require('express');
const router = express.Router();
const { getStats, getUsers, toggleUserActive, deleteCandidate } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.patch('/users/:id/toggle-active', toggleUserActive);
router.delete('/candidate/:id', deleteCandidate);

module.exports = router;
