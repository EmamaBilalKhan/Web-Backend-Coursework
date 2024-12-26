const express = require('express');
const router = express.Router();
const {getAllAuthors, addAuthor,updateAuthor,deleteAuthor, exceedingBookLimitAuthor} = require('../Controller/AuthorController');

router.get('/', getAllAuthors);
router.post('/addAuthor', addAuthor);
router.get('/exceedingBookLimitAuthor', exceedingBookLimitAuthor);
router.put('/updateAuthor', updateAuthor);
router.delete('/deleteAuthor', deleteAuthor);
router.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = router;
