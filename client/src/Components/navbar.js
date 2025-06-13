import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from '../logo.png';
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const cartState = useSelector((state) => state.CartReducer);
  const totalQuantity = cartState.cartItems
    ? cartState.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const userState = useSelector((state) => state.loginUserReducer);
  const { user } = userState || {};

  const dispatch = useDispatch();

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

   // Add this state for filter
  const [pizzaFilter, setPizzaFilter] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

   // Handler for filter change
  const handleFilterChange = (e) => {
    setPizzaFilter(e.target.value);
    // If not already on home, navigate to home to show pizzas
    if (location.pathname !== "/") navigate("/");
    // Save filter to localStorage so HomeScreen can read it
    localStorage.setItem("pizzaFilter", e.target.value);
    // Optionally, you can use Redux for global state
  };


  return (
    <nav className="navbar navbar-expand-lg shadow p-3 rounded sticky-top bg-white">
      <a className="navbar-brand d-flex align-items-center" href="/" style={{ gap: 10 }}>
        <img
          src={logo}
          alt="SliceNation Logo"
          style={{
            height: 64,           // Make it bigger
            width: 64,
            borderRadius: "50%",  // Make it round (if pizza is round)
            marginRight: 16,
            objectFit: "cover",   // Crop to fit
            objectPosition: "center top", // Adjust to show only pizza part (tweak as needed)
            boxShadow: "0 2px 8px rgba(213,0,0,0.12)"
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#d50000", letterSpacing: 1 }}>
            Slice<span style={{ color: "#23225c" }}>Nation</span>
          </span>
          <span style={{ fontSize: 12, color: "#23225c", fontWeight: 500 }}>
            One Nation. Unlimited Flavors.
          </span>
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          {user ? (
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                <strong>{user.name}</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a className="nav-item nav-link" href="/login">
              <strong>Login</strong>
            </a>
          )}
          <a className="nav-item nav-link" href="/cart">
            <strong> Cart {totalQuantity}</strong>
          </a>
          {/* Filter Dropdown */}
      <select
        className="form-select ms-3"
        style={{ width: 120, display: "inline-block" }}
        value={pizzaFilter}
        onChange={handleFilterChange}
        title="Filter pizzas"
      >
        <option value="ALL">ALL</option>
        <option value="VEG">VEG</option>
        <option value="NON-VEG">NON-VEG</option>
      </select>
      {/* ...rest of navbar... */}
          
        </div>
      </div>
    </nav>
  );
}