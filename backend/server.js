require('dns').setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/dbConnect");
const authRoutes = require('./routes/authenticationRoute');
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const recommendationRoutes = require('./routes/Recommendationroutes');
// Database Connection
connectDB();

const app = express();

// Middleware Configuration
app.use(cors());
app.use(express.json());

//  Route 
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.get('/api/status', (req, res) => {
    res.json({ message: 'Giftly API is running' });
});

// Error Middleware Placeholder
app.use(require('./middleware/errorMiddleware').errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));