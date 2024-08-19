# Menu App Documentation

## Overview

The Menu App is a RESTful API application built using Express.js and MongoDB. It allows CRUD operations on categories, subcategories, and items. The application is designed to manage and search through categories and items efficiently.

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/kaushiktak19/menu-app.git
cd menu-app
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```text
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.uirtb.mongodb.net/menu-app
```

### Start the Application

```bash
npm start
```

The server will run on [http://localhost:3000](http://localhost:3000).

## Local Setup and Run Guide

1. **Ensure Node.js and npm are installed**:
   - You can download and install Node.js from [nodejs.org](https://nodejs.org).
   - Verify installation by running:

   ```bash
   node -v
   npm -v
   ```

2. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd menu-app
   ```

3. **Install the necessary dependencies**:

   ```bash
   npm install
   ```

4. **Set up the MongoDB database**:
   - Create a MongoDB Atlas account or use a local MongoDB server.
   - Update the `MONGODB_URI` in the `.env` file with your database connection string.

5. **Run the application**:

   ```bash
   npm start
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Category Endpoints

- **Create Category**

  - Method: `POST /api/categories`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "taxApplicable": "boolean",
      "tax": "number",
      "taxType": "string"
    }
    ```

- **Get All Categories**

  - Method: `GET /api/categories`

- **Get Category by ID or Name**

  - Method: `GET /api/categories/:idOrName`
  
  - Example: `GET /api/categories/66c34f194b9df6bb393408e9`

- **Edit Category**

  - Method: `PUT /api/categories/:id`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "taxApplicable": "boolean",
      "tax": "number",
      "taxType": "string"
    }
    ```

### SubCategory Endpoints

- **Create SubCategory**

  - Method: `POST /api/subcategories`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "categoryId": "string",
      "taxApplicable": "boolean",
      "tax": "number"
    }
    ```

- **Get All SubCategories**

  - Method: `GET /api/subcategories`

- **Get SubCategories by Category**

  - Method: `GET /api/categories/:categoryId/subcategories`
  
  - Example: `GET /api/categories/66c34f194b9df6bb393408e9/subcategories`

- **Get SubCategory by ID or Name**

  - Method: `GET /api/subcategories/:idOrName`
  
  - Example: `GET /api/subcategories/66c34f4f4b9df6bb393408eb`

- **Edit SubCategory**

  - Method: `PUT /api/subcategories/:id`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "categoryId": "string",
      "taxApplicable": "boolean",
      "tax": "number"
    }
    ```

### Item Endpoints

- **Create Item**

  - Method: `POST /api/items`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "categoryId": "string",
      "subCategoryId": "string",
      "taxApplicable": "boolean",
      "tax": "number",
      "baseAmount": "number",
      "discount": "number",
      "totalAmount": "number"
    }
    ```

- **Get All Items**

  - Method: `GET /api/items`

- **Get Items by Category**

  - Method: `GET /api/categories/:categoryId/items`
  
  - Example: `GET /api/categories/66c34f194b9df6bb393408e9/items`

- **Get Items by SubCategory**

  - Method: `GET /api/subcategories/:subCategoryId/items`
  
  - Example: `GET /api/subcategories/66c34f4f4b9df6bb393408eb/items`

- **Get Item by ID or Name**

  - Method: `GET /api/items/:idOrName`
  
  - Example: `GET /api/items/66c34fa04b9df6bb393408ed`

- **Edit Item**

  - Method: `PUT /api/items/:id`
  
  - Request Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "description": "string",
      "categoryId": "string",
      "subCategoryId": "string",
      "taxApplicable": "boolean",
      "tax": "number",
      "baseAmount": "number",
      "discount": "number",
      "totalAmount": "number"
    }
    ```

- **Search Items by Name**

  - Method: `GET /api/search/items?name=<query>`
  
  - Example: `GET /api/search/items?name=iPhone`

## Models

### Category Model

```javascript
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    taxType: { type: String }
});
```

### Item Model

```javascript
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
```

### SubCategory Model

```javascript
const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
});
```

## Configuration

### Dependencies

- **body-parser**: Middleware for parsing request bodies.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **mongoose**: ODM library for MongoDB.

### Environment Variables

- **NODE_ENV**: Specifies the environment mode (e.g., development).
- **MONGODB_URI**: MongoDB connection string.
