const asyncHandler = require('express-async-handler');
const Seller = require('../models/Seller.cjs');

// @desc    Create a new seller profile
// @route   POST /api/sellers
// @access  Private
const createSeller = asyncHandler(async (req, res) => {
  const { shopName, shopDescription } = req.body;

  const seller = new Seller({
    user: req.user._id,
    shopName,
    shopDescription,
  });

  const createdSeller = await seller.save();
  res.status(201).json(createdSeller);
});

// @desc    Get seller profile
// @route   GET /api/sellers/:id
// @access  Private
const getSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).populate('user', 'name email');

  if (seller) {
    res.json(seller);
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

// @desc    Update seller profile
// @route   PUT /api/sellers/:id
// @access  Private
const updateSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (seller) {
    seller.shopName = req.body.shopName || seller.shopName;
    seller.shopDescription = req.body.shopDescription || seller.shopDescription;

    const updatedSeller = await seller.save();
    res.json(updatedSeller);
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

module.exports = { createSeller, getSeller, updateSeller };
