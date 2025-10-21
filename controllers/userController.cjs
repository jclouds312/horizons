const asyncHandler = require('express-async-handler');
const User = require('../models/User.cjs');

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

module.exports = { getUserProfile };
