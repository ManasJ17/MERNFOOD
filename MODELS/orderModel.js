const mongoose = require("mongoose")

// ...existing code...
const orderSchema = mongoose.Schema({
    name: String,
    address: String,
    pincode: String,
    cardNumber: String,
    cvv: String,
    cartItems: Array,
    user: String,
    orderAmount: Number,
    status: { type: String, default: "Pending" } // <-- Add this line
}, { timestamps: true });
// ...existing code...
module.exports = mongoose.model('orders', orderSchema);