const express = require('express');
const router = express.Router();
const {getBooks, addBook,updateBook,deleteBook} = require('../Controller/BookController');

router.get('/', getBooks);
router.post('/addBook', addBook);
router.put('/updateBook', updateBook);
router.delete('/deleteBook', deleteBook);
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
