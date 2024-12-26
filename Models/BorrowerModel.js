const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrowedBooks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    validate: {
      validator: function (value) {
        if (this.membershipType === 'premium' && value.length > 10) {
          return false;
        }
        if (this.membershipType === 'standard' && value.length > 5) {
          return false;
        }
        return true;
      },
      message: function () {
        return this.membershipType === 'premium'
          ? 'Premium members can borrow up to 10 books only.'
          : 'Standard members can borrow up to 5 books only.';
      },
    },
  },
  hasOverdueBooks: { type: Boolean, required: true },
  membershipActive: { type: Boolean, required: true },
  membershipType: {
    type: String,
    required: true,
    enum: ['standard', 'premium'],
  },
});

module.exports = mongoose.model('Borrower', borrowerSchema);
