const express = require('express');
const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser, checkUserSession, loginUser,logoutUser} = require('../Controller/UsersController');

router.get('/', getUsers);
router.get('/checkSession', checkUserSession);
router.post('/createUser', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
