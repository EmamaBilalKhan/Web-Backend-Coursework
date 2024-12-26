const Author = require('../Models/AuthorModel');

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        email: req.body.email,
        phoneNumber : req.body.phoneNumber,
        books: req.body.books
    });

    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const exceedingBookLimitAuthor = async (req, res) => {
    try {
        const authors = await Author.find();
        if (!authors) {
            return res.status(404).json({ message: 'Authors not found' });
        }
        const exceedingAuthors = authors.filter(author => author.books.length > 5);

        if (exceedingAuthors.length === 0) {
            return res.status(200).json({ message: 'No authors found with more than 5 books linked' });
        }

        res.status(200).json({message: `Authors found with exceeding limit: ${exceedingAuthors.length}`,exceedingAuthors});


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.body.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllAuthors, addAuthor, updateAuthor, deleteAuthor, exceedingBookLimitAuthor };
