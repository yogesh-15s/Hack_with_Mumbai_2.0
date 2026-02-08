const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all records for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const records = await prisma.medicalRecord.findMany({
            where: { userId: req.user.id },
            orderBy: { date: 'desc' }
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
});

// Create a new record (with optional file upload)
router.post('/', auth, upload.single('file'), async (req, res) => {
    try {
        const { type, bodyPart, description, date } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const record = await prisma.medicalRecord.create({
            data: {
                type,
                bodyPart,
                description,
                date: new Date(date),
                fileUrl,
                userId: req.user.id
            }
        });
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create record' });
    }
});

// Delete a record
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const record = await prisma.medicalRecord.findUnique({ where: { id: parseInt(id) } });

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        if (record.userId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await prisma.medicalRecord.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete record' });
    }
});

module.exports = router;
