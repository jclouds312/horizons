const asyncHandler = require('express-async-handler');
const Product = require('../models/Product.cjs');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
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
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('No autorizado para editar este producto');
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
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('No autorizado para eliminar este producto');
    }

    await product.remove();
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
