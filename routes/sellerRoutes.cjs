const express = require('express');
const router = express.Router();
const {
  createSellerProfile,
  getSellers,
  getSellerProfileByUserId,
} = require('../controllers/sellerController.cjs');
const { protect } = require('../middleware/authMiddleware.cjs');

router.route('/').get(getSellers);
router.route('/profile').post(protect, createSellerProfile);
router.route('/user/:userId').get(getSellerProfileByUserId);

module.exports = router;
