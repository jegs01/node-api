const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');
const swaggerRouter = require('./routes/swaggerRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());

app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));

app.use('/', swaggerRouter);
app.use('/', viewRouter);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  console.error(err);
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
