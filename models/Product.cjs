const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Referencia al usuario que creó el producto (vendedor)
  },
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio.'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'La imagen del producto es obligatoria.']
  },
  brand: {
    type: String,
    required: [true, 'La marca del producto es obligatoria.']
  },
  category: {
    type: String,
    required: [true, 'La categoría del producto es obligatoria.']
  },
  description: {
    type: String,
    required: [true, 'La descripción del producto es obligatoria.']
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio.'],
    default: 0
  },
  countInStock: {
    type: Number,
    required: [true, 'La cantidad en stock es obligatoria.'],
    default: 0
  },
}, {
  timestamps: true // Añade automáticamente createdAt y updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
