
const express = require('express')

const app = express()

app.use(express.json());

const port = process.env.PORT || 5000

const db = require("./db")

const Pizza = require('./MODELS/pizzamodels');
// to getting the pizzas -----
app.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong', error });
  }
});

const userRoutes = require('./Routes/userRoutes')

app.use('/api/users/' , userRoutes);

const orderRoutes = require('./Routes/orderRoutes')
app.use('/api/placeorder' , orderRoutes)

// adding a root for the admin panel edit function 
const pizzasRoutes = require('./Routes/pizzasRoutes');
app.use('/api/pizzas', pizzasRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
