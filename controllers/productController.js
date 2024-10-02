const Product = require('../models/productModel');
const { handleErrors } = require('./errorController');
const Joi = require('joi');

// Validation schema
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  category: Joi.string().required()
});

const productSchemaForUpdate = Joi.object({
  name: Joi.string().min(3).optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional()
});

exports.getProducts = handleErrors(async (req, res) => {
  //#swagger.tags=['Product']
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

exports.createProduct = handleErrors(async (req, res) => {
  //#swagger.tags=['Product']
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product details to create',
        required: true,
        schema: {
            name: 'Sample Product',
            price: 99.99,
            category: 'Electronics'
        }
    } */
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch {
    res.status(500).json({ error: 'Error creating product' });
  }
});

exports.updateProduct = handleErrors(async (req, res) => {
  //#swagger.tags=['Product']
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product details to update',
        schema: {
            name: 'Updated Product Name',
            price: 120.50,
            category: 'Appliances'
        }
    } */
  const { id } = req.params;
  const { error } = productSchemaForUpdate.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch {
    res.status(500).json({ error: 'Error updating product' });
  }
});

exports.deleteProduct = handleErrors(async (req, res) => {
  //#swagger.tags=['Product']
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting product' });
  }
});
