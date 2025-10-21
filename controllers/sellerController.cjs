const asyncHandler = require('express-async-handler');
const Seller = require('../models/Seller.cjs');
const User = require('../models/User.cjs');

const createSellerProfile = asyncHandler(async (req, res) => {
  const { shopName, shopDescription } = req.body;

  let seller = await Seller.findOne({ user: req.user._id });

  if (seller) {
    seller.shopName = shopName || seller.shopName;
    seller.shopDescription = shopDescription || seller.shopDescription;
  } else {
    seller = new Seller({
      user: req.user._id,
      shopName,
      shopDescription,
    });
  }

  const savedSeller = await seller.save();
  await User.findByIdAndUpdate(req.user._id, { seller: savedSeller._id });

  res.status(201).json(savedSeller);
});

const getSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({}).populate('user', ['name', 'email']);
  res.json(sellers);
});

const getSellerProfileByUserId = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

  if (seller) {
    res.json(seller);
  } else {
    res.status(404);
    throw new Error('Perfil de vendedor no encontrado');
  }
});

module.exports = { createSellerProfile, getSellers, getSellerProfileByUserId };
