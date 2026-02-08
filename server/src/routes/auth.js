const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Register
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        console.log('Attempting to register user:', email);
        const user = await prisma.user.create({
            data: { email, password, name }, // In a real app, hash the password!
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({
            token, user: {
                id: user.id, email: user.email, name: user.name,
                age: null, gender: null, bloodGroup: null, weight: null, height: null
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: error.message || 'Registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Attempting login for:', email);
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({
            token, user: {
                id: user.id, email: user.email, name: user.name,
                age: user.age, gender: user.gender, bloodGroup: user.bloodGroup,
                weight: user.weight, height: user.height
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

module.exports = router;
