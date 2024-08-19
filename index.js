const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/subCategory');
const itemRoutes = require('./routes/item');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes);
app.use('/api', itemRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
