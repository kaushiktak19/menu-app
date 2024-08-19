const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
