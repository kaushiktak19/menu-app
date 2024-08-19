const express = require('express');
const router = express.Router();
const SubCategory = require('../models/subCategory');
const Category = require('../models/category');  // Add this to the subCategory routes file

// Create SubCategory
router.post('/subcategories', async (req, res) => {
    try {
        const subCategory = new SubCategory(req.body);
        await subCategory.save();
        res.status(201).send(subCategory);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All SubCategories
router.get('/subcategories', async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).send(subCategories);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get SubCategory by Category
router.get('/categories/:categoryId/subcategories', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const subcategories = await SubCategory.find({ categoryId: category._id });
        res.status(200).json(subcategories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Get SubCategory by ID or Name
router.get('/subcategories/:idOrName', async (req, res) => {
    const { idOrName } = req.params;
    try {
        let subcategory;
        if (/^[0-9a-fA-F]{24}$/.test(idOrName)) {
            // ID pattern
            subcategory = await SubCategory.findById(idOrName);
        } else {
            // Assume it's a name
            subcategory = await SubCategory.findOne({ name: idOrName });
        }

        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
        res.status(200).json(subcategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit SubCategory
router.put('/subcategories/:id', async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subCategory) return res.status(404).send({ error: 'SubCategory not found' });
        res.status(200).send(subCategory);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
