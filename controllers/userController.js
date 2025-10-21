const User = require('../models/User');

// @desc    Obtener el perfil del usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // req.user es establecido por el middleware de autenticación
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // Se pueden añadir más campos aquí si es necesario
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

module.exports = { getUserProfile };
