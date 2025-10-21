const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Ruta para obtener el perfil del usuario
// La ruta está protegida por el middleware 'protect'
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
