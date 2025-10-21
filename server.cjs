const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.cjs');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.cjs');

const productRoutes = require('./routes/productRoutes.cjs');
const userRoutes = require('./routes/userRoutes.cjs');
const sellerRoutes = require('./routes/sellerRoutes.cjs');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
