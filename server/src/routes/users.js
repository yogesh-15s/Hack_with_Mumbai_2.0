const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify token (should be extracted to a separate file, but inline for now)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Update Profile (Vitals)
router.put('/profile', authenticateToken, async (req, res) => {
    const { name, age, gender, bloodGroup, weight, height } = req.body;
    const userId = req.user.id;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                age: age ? parseInt(age) : undefined,
                gender,
                bloodGroup,
                weight,
                height
            }
        });

        // Return updated user info without password
        res.json({
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            age: updatedUser.age,
            gender: updatedUser.gender,
            bloodGroup: updatedUser.bloodGroup,
            weight: updatedUser.weight,
            height: updatedUser.height
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get Profile (Optional, for re-fetching)
router.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            gender: user.gender,
            bloodGroup: user.bloodGroup,
            weight: user.weight,
            height: user.height
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Change Password
router.put('/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user || user.password !== currentPassword) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }

        await prisma.user.update({
            where: { id: userId },
            data: { password: newPassword } // Again, search for hashing in production
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update password' });
    }
});

module.exports = router;
