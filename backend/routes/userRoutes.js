const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUserProfile } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserProfile);

module.exports = router;
