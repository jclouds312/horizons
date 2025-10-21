const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController.cjs');
const { protect } = require('../middleware/authMiddleware.cjs');

router.route('/profile').get(protect, getUserProfile);

module.exports = router;
