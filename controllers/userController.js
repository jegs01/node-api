const User = require('../models/userModel');
const { handleErrors } = require('./errorController');
const Joi = require('joi');

// Validation schema
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  phone: Joi.string().optional(),
  role: Joi.string().valid('user', 'admin').default('user')
});

const userSchemaForUpdate = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  age: Joi.number().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  role: Joi.string().valid('user', 'admin').optional()
});

exports.getUsers = handleErrors(async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

exports.createUser = handleErrors(async (req, res) => {
  //#swagger.tags=['Users']
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User details to create a new user',
        required: true,
        schema: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            age: 30,
            address: '123 Main St',
            phone: '123-456-7890',
            role: 'user'
        }
    } */

  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: 'Error creating user' });
  }
});

exports.updateUser = handleErrors(async (req, res) => {
  //#swagger.tags=['Users']
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User details to update an existing user',
        schema: {
            name: 'John Doe Updated',
            email: 'updated.john@example.com',
            password: 'newpassword123',
            age: 35,
            address: '456 Elm St',
            phone: '987-654-3210',
            role: 'admin'
        }
    } */

  const { id } = req.params;
  const { error } = userSchemaForUpdate.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch {
    res.status(500).json({ error: 'Error updating user' });
  }
});

exports.deleteUser = handleErrors(async (req, res) => {
  //#swagger.tags=['Users']
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting user' });
  }
});
