const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  shopName: {
    type: String,
    required: [true, 'El nombre de la tienda es obligatorio.'],
    trim: true
  },
  shopDescription: {
    type: String,
    required: [true, 'La descripción de la tienda es obligatoria.']
  },
}, {
  timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
