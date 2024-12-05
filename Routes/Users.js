const express = require('express');
const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser} = require('../Controller/UsersController');

router.get('/', getUsers);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
