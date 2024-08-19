const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
