const express = require('express');
const router = express.Router();
const {getBorrowers, createBorrower,updateBorrower} = require('../Controller/BorrowerController');

router.get('/', getBorrowers);
router.post('/addBorrower', createBorrower);
router.put('/updateBorrower', updateBorrower);
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
