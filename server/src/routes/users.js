const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Configure Multer for avatar uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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
    const { name, age, gender, bloodGroup, weight, height, avatar, emergencyContactName, emergencyContactPhone, emergencyContactRelation } = req.body;
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
                height,
                avatar,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelation
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
            height: updatedUser.height,
            avatar: updatedUser.avatar,
            emergencyContactName: updatedUser.emergencyContactName,
            emergencyContactPhone: updatedUser.emergencyContactPhone,
            emergencyContactRelation: updatedUser.emergencyContactRelation
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
            height: user.height,
            avatar: user.avatar,
            emergencyContactName: user.emergencyContactName,
            emergencyContactPhone: user.emergencyContactPhone,
            emergencyContactRelation: user.emergencyContactRelation
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

// Upload Avatar
router.post('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user.id;
    const avatarUrl = `/uploads/${req.file.filename}`;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { avatar: avatarUrl }
        });

        res.json({
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            avatar: updatedUser.avatar
        });
    } catch (error) {
        console.error("Avatar upload error:", error);
        res.status(500).json({ error: 'Failed to upload avatar' });
    }
});

module.exports = router;
