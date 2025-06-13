
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPizzas } from "../Actions/pizzaActions";
import Pizza from "../Components/pizza";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getAllPizzasReducers) || {};
  const { pizzas, loading, error } = pizzaState;

  // Read filter from localStorage
  const [pizzaFilter, setPizzaFilter] = useState(localStorage.getItem("pizzaFilter") || "ALL");

  useEffect(() => {
    dispatch(getAllPizzas());
    // Listen for filter changes in localStorage
    const onStorage = () => setPizzaFilter(localStorage.getItem("pizzaFilter") || "ALL");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  // Optionally, update filter if user changes it in the same tab
  useEffect(() => {
    const interval = setInterval(() => {
      setPizzaFilter(localStorage.getItem("pizzaFilter") || "ALL");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Filter pizzas
const filteredPizzas = pizzas
  ? pizzas.filter((pizza) => {
      if (pizzaFilter === "ALL") return true;
      if (pizzaFilter === "VEG") return pizza.category?.toLowerCase() === "veg";
      if (pizzaFilter === "NON-VEG") return pizza.category?.toLowerCase() === "nonveg"; // <-- fix here
      return true;
    })
  : [];
  return (
    <div className="container" style={{ marginTop: 40 }}>
      <div className="row justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          filteredPizzas.map((pizza) => (
            <div className="col-md-4" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
