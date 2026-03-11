require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const recordRoutes = require('./routes/records');
const usersRoutes = require('./routes/users');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

console.log(`Attempting to start server on port ${PORT}...`);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('MedVault API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
