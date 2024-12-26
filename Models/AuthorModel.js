const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [
      /^\d{10}$/,
      'Please enter a valid 10-digit phone number',
    ],
  },
  books: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    validate: {
      validator: function (value) {
        return value.length <= 5;
      },
      message: 'An author can only be linked to up to 5 books',
    },
  },
});

module.exports = mongoose.model('Author', authorSchema);
