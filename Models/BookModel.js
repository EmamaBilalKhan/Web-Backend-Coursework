const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author',
        required: true 
      },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { type: Number, required: true, min: [0, 'Must be a non-negative number']},
    borrowed: {
        type: Number,
        default: 0,
        min: [0, 'Borrowed count must be a non-negative number'],
        validate: {
            validator: function (value) {
              if (this.borrowed > 10 && value > 100) {
                return false;
              }
              return true;
            },
            message: 'Available copies cannot exceed 100 if the book has been borrowed more than 10 times',
          }
      },
});

module.exports = mongoose.model('Book', bookSchema);
