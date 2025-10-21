const express = require('express');
const router = express.Router();
const {
  createSeller,
  getSeller,
  updateSeller
} = require('../controllers/sellerController.cjs');
const { protect } = require('../middleware/authMiddleware.cjs');

router.route('/').post(protect, createSeller);
router.route('/:id').get(protect, getSeller).put(protect, updateSeller);

module.exports = router;
