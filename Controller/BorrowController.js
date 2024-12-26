const Books = require("../Models/BookModel");
const Borrower = require("../Models/BorrowerModel");

const borrowBook = async (req, res) => {
    try {
        const book = await Books.findById(req.body.bookId);
        const borrower = await Borrower.findById(req.body.borrowerId);
        if (!book || !borrower) {
            return res.status(404).json({ message: 'Book or Borrower not found' });
        }
        if (book.availableCopies ===0) {
            return res.status(400).json({ message: 'Book is not available' });
        }
        if (borrower.hasOverdueBooks) {
            return res.status(400).json({ message: 'Cannot borrow more books because the borrower has overdue books' });
        }
        if(!borrower.membershipActive){
            return res.status(400).json({ message: 'Cannot borrow books since user has inactive membership' });
        }
        book.availableCopies -= 1;
        borrower.borrowedBooks.push(book._id);
        await book.save();
        await borrower.save();
        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const book = await Books.findById(req.body.bookId);
        const borrower = await Borrower.findById(req.body.borrowerId);
        if (!book || !borrower) {
            return res.status(404).json({ message: 'Book or Borrower not found' });
        }
        if (!borrower.borrowedBooks.includes(book._id)) {
            return res.status(400).json({ message: 'Book is not borrowed by this borrower' });
        }
        book.availableCopies += 1;
        borrower.borrowedBooks.pull(book._id);
        await book.save();
        await borrower.save();
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { borrowBook, returnBook };