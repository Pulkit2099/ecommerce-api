const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// Define an array to store the products
let products = [];

// Define the API endpoints

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create a new product
app.post('/products', (req, res) => {
  const product = req.body;
  product.id = uuidv4(); // Generate a unique ID for the product
  products.push(product);
  res.status(201).json(product);
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    products[productIndex] = req.body;
    products[productIndex].id = id; // Preserve the original ID
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0] );
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
