const Product = require('../models/Product');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id, // Asignar el usuario logueado como creador
      name: 'Producto de muestra',
      price: 0,
      image: '/images/sample.jpg',
      brand: 'Marca de muestra',
      category: 'Categoría de muestra',
      countInStock: 0,
      numReviews: 0,
      description: 'Descripción de muestra',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Verificar si el usuario que actualiza es el que creó el producto
      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'No autorizado para editar este producto' });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Verificar si el usuario que elimina es el que creó el producto
        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'No autorizado para eliminar este producto' });
        }

      await product.remove();
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
