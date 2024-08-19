const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Create Category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Category by ID or Name
router.get('/categories/:idOrName', async (req, res) => {
    const { idOrName } = req.params;
    try {
        let category;
        if (/^[0-9a-fA-F]{24}$/.test(idOrName)) {
            // ID pattern
            category = await Category.findById(idOrName);
        } else {
            // Assume it's a name
            category = await Category.findOne({ name: idOrName });
        }

        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Edit Category
router.put('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).send({ error: 'Category not found' });
        res.status(200).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
