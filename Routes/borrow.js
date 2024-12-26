const express = require('express');
const router = express.Router();
const {borrowBook,returnBook} = require('../Controller/BorrowController');

router.post('/borrowBook', borrowBook);
router.post('/returnBook', returnBook);

router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
