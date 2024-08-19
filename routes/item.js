const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

// Create Item
router.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Item by Category
router.get('/categories/:categoryId/items', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const items = await Item.find({ categoryId: category._id });
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Item by Subcategory
router.get('/subcategories/:subCategoryId/items', async (req, res) => {
    try {
        const subCategoryId = req.params.subCategoryId;
        
        const subcategory = await SubCategory.findById(subCategoryId);
        if (!subcategory) {
            return res.status(404).json({ error: "Subcategory not found" });
        }

        const items = await Item.find({ subCategoryId: subCategoryId });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Item by ID or Name
router.get('/items/:idOrName', async (req, res) => {
    const { idOrName } = req.params;
    try {
        let item;
        if (/^[0-9a-fA-F]{24}$/.test(idOrName)) {
            // If idOrName is numeric, assume it's an ID
            item = await Item.findById(idOrName);
        } else {
            // Otherwise, treat it as a name
            item = await Item.findOne({ name: idOrName });
        }

        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Edit Item
router.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).send({ error: 'Item not found' });
        res.status(200).send(item);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Search Item by Name
router.get('/search/items', async (req, res) => {
    try {
        const items = await Item.find({ name: new RegExp(req.query.name, 'i') });
        res.status(200).send(items);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
