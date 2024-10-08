const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authenticate');

// CRUD routes
router.get('/', getUsers);
router.post('/', isAuthenticated, createUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

module.exports = router;
