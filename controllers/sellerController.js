const Seller = require('../models/Seller');
const User = require('../models/User');

// @desc    Crear o actualizar un perfil de vendedor
// @route   POST /api/sellers/profile
// @access  Private
const createSellerProfile = async (req, res) => {
  const { shopName, shopDescription } = req.body;

  try {
    // Buscar si ya existe un perfil para este usuario
    let seller = await Seller.findOne({ user: req.user._id });

    if (seller) {
      // Actualizar el perfil existente
      seller.shopName = shopName || seller.shopName;
      seller.shopDescription = shopDescription || seller.shopDescription;
    } else {
      // Crear un nuevo perfil de vendedor
      seller = new Seller({
        user: req.user._id,
        shopName,
        shopDescription,
      });
    }

    const savedSeller = await seller.save();

    // Actualizar el modelo de usuario con la referencia al perfil del vendedor
    await User.findByIdAndUpdate(req.user._id, { seller: savedSeller._id });

    res.status(201).json(savedSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener todos los perfiles de vendedores
// @route   GET /api/sellers
// @access  Public
const getSellers = async (req, res) => {
    try {
      const sellers = await Seller.find({}).populate('user', ['name', 'email']); // Poblar con datos del usuario
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// @desc    Obtener un perfil de vendedor por ID de usuario
// @route   GET /api/sellers/user/:userId
// @access  Public
const getSellerProfileByUserId = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

    if (seller) {
      res.json(seller);
    } else {
      res.status(404).json({ message: 'Perfil de vendedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createSellerProfile, getSellers, getSellerProfileByUserId };
