const express = require('express')
const router = express.Router()
const Pizza = require('../MODELS/pizzamodels')

// Get all pizzas (already exists)
router.get("/getpizzas", async (req, res) => {
    try {
        const pizzas = await Pizza.find({})
        res.send(pizzas) 
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Delete pizza by id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Pizza.findByIdAndDelete(req.params.id)
        res.json({ success: true })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Edit pizza by id
router.put("/edit/:id", async (req, res) => {
        console.log("Edit pizza route hit", req.params.id);
        try {
        const pizza = await Pizza.findById(req.params.id)
        if (!pizza) return res.status(404).json({ message: "Pizza not found" })
        pizza.name = req.body.name
        pizza.variants = req.body.variants
        pizza.prices = req.body.prices
        pizza.category = req.body.category
        pizza.image = req.body.image
        pizza.description = req.body.description
        await pizza.save()
        res.json({ success: true, pizza })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// adding pizza by the admin Routes Here : ---- 
router.post("/add", async (req, res) => {
    try {
        const pizza = new Pizza(req.body);
        await pizza.save();
        res.status(201).json({ success: true, pizza });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;