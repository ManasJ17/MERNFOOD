const express = require("express");
const router = express.Router();
const User = require("../MODELS/userModels");

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered. Please register first." });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect email or password." });
        }
        // Success
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// setting the admin panel to the project 
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;