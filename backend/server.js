const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// const { protect } = require('./middleware/authMiddleware');
const flatRoutes = require('./routes/flatRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// app.get('/api/protected', protect, (req, res) => {
//     res.json({ message: 'You are authorized!', user: req.user || req.admin });
// });

app.get('/', (req, res) => {
  res.send('APP HAS STARTED');
});
app.post('/api/auth/login', (req, res, next) => {
  console.log('Probe hit. Body:', req.body);
  next(); // let your real auth route handle it
});


app.use(morgan('dev'));
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/flats', flatRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
