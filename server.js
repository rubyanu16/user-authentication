
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api/auth', authRoutes);

// Protected example route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, this is protected data.` });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error', err));