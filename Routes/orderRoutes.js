const express = require("express")
const router = express.Router()
const Order = require("../MODELS/orderModel")

router.post("/placeorder", async (req, res) => {
    const { name, address, pincode, cardNumber, cvv, cartItems, user, orderAmount } = req.body;
    try {
        const newOrder = new Order({
            name,
            address,
            pincode,
            cardNumber,
            cvv,
            cartItems,
            user,
            orderAmount
        });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/getuserorders/:email", async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.email }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders (for admin)
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update order status
router.put("/status/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        order.status = req.body.status;
        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;