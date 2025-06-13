const mongoose = require('mongoose')

const pizzaSchema = mongoose.Schema({
  name: { type: String, required: true },
  variants: [String], 
  prices: { type: Object, required: true }, // <-- Change this line
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});
const Pizza = mongoose.model('pizzas' , pizzaSchema ) ; // (collection name in the compass , schemaName)

module.exports = Pizza;