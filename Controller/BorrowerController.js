const Borrower = require('../Models/BorrowerModel');

const getBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.status(200).json(borrowers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBorrower = async (req, res) => {
    try {
    const borrower = new Borrower({
        name: req.body.name,
        borrowedBooks: req.body.borrowedBooks,
        membershipActive: req.body.membershipActive,
        membershipType: req.body.membershipType,
        hasOverdueBooks: req.body.hasOverdueBooks,
    });
        const newBorrower = await borrower.save();
        res.status(201).json(newBorrower);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.body.id);
        
        if (!borrower) {
            return res.status(404).json({ message: 'Borrower not found' });
        }
        
        if(req.body.hasOverdueBooks!==undefined){
            borrower.hasOverdueBooks = req.body.hasOverdueBooks;
            const UpdatedBorrower = await borrower.save();
            res.status(200).json(UpdatedBorrower);
        }
        if (borrower.hasOverdueBooks) {
            return res.status(400).json({ message: 'Cannot borrow more books because the borrower has overdue books' });
        }

        borrower.name = req.body.name || borrower.name;
        borrower.borrowedBooks = req.body.borrowedBooks || borrower.borrowedBooks;
        borrower.membershipActive = req.body.membershipActive !== undefined ? req.body.membershipActive : borrower.membershipActive;
        borrower.membershipType = req.body.membershipType || borrower.membershipType;
        borrower.hasOverdueBooks = req.body.hasOverdueBooks !== undefined ? req.body.hasOverdueBooks : borrower.hasOverdueBooks;

        const updatedBorrower = await borrower.save();
        
        res.status(200).json(updatedBorrower);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = { getBorrowers, createBorrower, updateBorrower };
