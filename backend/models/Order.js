const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String, // optional, if user is logged in
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  address: {      // <-- make this an object
    fullName: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String
  },
  paymentMethod: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
