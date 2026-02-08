require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const recordRoutes = require('./routes/records');
const usersRoutes = require('./routes/users');

const path = require('path');
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

console.log(`Attempting to start server on port ${PORT}...`);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/users', usersRoutes);

// Serve Frontend
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on http://localhost:${PORT}`);
});
