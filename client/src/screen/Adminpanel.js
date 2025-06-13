import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
const ADMIN_PASSWORD = "admin123"; // Change this to your desired admin password

export default function AdminPanel() {
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  // You can add pizzas and orders state later

  // Fetch users when tab is "users"
  useEffect(() => {
    if (activeTab === "users") {
      axios.get("/api/users/list")
        .then(res => setUsers(res.data))
        .catch(() => setUsers([]));
    }
  }, [activeTab]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowModal(false);
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  // adding the add pizza list and edit for the admin logic here - 
  const [pizzas, setPizzas] = useState([]);


useEffect(() => {
  if (activeTab === "pizzas") {
    axios.get("/api/pizzas/getpizzas")
      .then(res => setPizzas(res.data))
      .catch(() => setPizzas([]));
  }
}, [activeTab]);

//Add Delete and Edit Handlers:

const handleDeletePizza = async (id) => {
  if (!window.confirm("Are you sure you want to delete this pizza?")) return;
  await axios.delete(`/api/pizzas/delete/${id}`);
  setPizzas(pizzas.filter(p => p._id !== id));
};

// adding pizza by the admin---------
const [showAddPizza, setShowAddPizza] = useState(false);
const [addPizzaForm, setAddPizzaForm] = useState({
  name: "",
  variants: ["small", "medium", "large"],
  prices: { small: "", medium: "", large: "" },
  category: "",
  image: "",
  description: ""
});
const [addPizzaError, setAddPizzaError] = useState("");
const [addPizzaLoading, setAddPizzaLoading] = useState(false);


// handlers for Adding the Pizza in it by the ADMIN  ------
const handleAddPizzaChange = (e) => {
  const { name, value } = e.target;
  if (["small", "medium", "large"].includes(name)) {
    setAddPizzaForm((prev) => ({
      ...prev,
      prices: { ...prev.prices, [name]: value }
    }));
  } else {
    setAddPizzaForm((prev) => ({ ...prev, [name]: value }));
  }
};

const handleAddPizzaSubmit = async (e) => {
  e.preventDefault();
  setAddPizzaLoading(true);
  setAddPizzaError("");
  try {
    const payload = {
      ...addPizzaForm,
      prices: {
        small: Number(addPizzaForm.prices.small),
        medium: Number(addPizzaForm.prices.medium),
        large: Number(addPizzaForm.prices.large)
      }
    };
    await axios.post("/api/pizzas/add", payload);
    setShowAddPizza(false);
    setAddPizzaForm({
      name: "",
      variants: ["small", "medium", "large"],
      prices: { small: "", medium: "", large: "" },
      category: "",
      image: "",
      description: ""
    });
    // Refresh pizza list
    setActiveTab("pizzas");
    setTimeout(() => setActiveTab("addpizza"), 100); // quick tab switch to reload
  } catch (err) {
    setAddPizzaError(err.response?.data?.message || "Failed to add pizza.");
  }
  setAddPizzaLoading(false);
};

useEffect(() => {
  if (activeTab === "addpizza") setShowAddPizza(true);
  else setShowAddPizza(false);
}, [activeTab]);

// Preparing the order List panel for the Admin - 

const [orders, setOrders] = useState([]);
const [orderLoading, setOrderLoading] = useState(false);

useEffect(() => {
  if (activeTab === "orders") {
    setOrderLoading(true);
    axios.get("/api/placeorder/all")
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setOrderLoading(false));
  }
}, [activeTab]);

const handleDeliverOrder = async (orderId) => {
  await axios.put(`/api/placeorder/status/${orderId}`, { status: "Delivered" });
  setOrders(orders =>
    orders.map(order =>
      order._id === orderId ? { ...order, status: "Delivered" } : order
    )
  );
};



  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Password Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div style={{
            background: "#fff", borderRadius: 12, padding: 32, minWidth: 320, boxShadow: "0 4px 24px rgba(0,0,0,0.15)"
          }}>
            <h3 style={{ textAlign: "center", marginBottom: 24 }}>Admin Login</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
              {error && <div className="alert alert-danger py-1">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {!showModal && (
        <div>
          {/* Top Bar */}
          <div style={{
            background: "#23225c",
            color: "#fff",
            padding: "18px 0 0 0",
            marginBottom: 32,
            boxShadow: "0 2px 8px rgba(35,34,92,0.08)"
          }}>
            <h2 style={{ textAlign: "center", fontWeight: 700, marginBottom: 8 }}>Admin Panel</h2>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: 1
            }}>
              {["users", "pizzas", "addpizza", "orders"].map(tab => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    color: "#fff",
                    cursor: "pointer",
                    paddingBottom: 10,
                    borderBottom: activeTab === tab ? "3px solid #fff" : "3px solid transparent",
                    transition: "border-bottom 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.borderBottom = "3px solid #fff"}
                  onMouseOut={e => e.currentTarget.style.borderBottom = activeTab === tab ? "3px solid #fff" : "3px solid transparent"}
                >
                  {tab === "users" && "UsersList"}
                  {tab === "pizzas" && "Pizzas List"}
                  {tab === "addpizza" && "Add New Pizza"}
                  {tab === "orders" && "Orderlist"}
                </div>
              ))}
            </div>
          </div>
{/*             
              Add the Pizza List and Edit Form UI: */}

            {activeTab === "pizzas" && (
  <div>
    <h4 style={{ fontWeight: 700, marginBottom: 20 }}>Pizzas list</h4>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map(pizza => (
            <tr key={pizza._id}>
              <td>{pizza.name}</td>
              <td>
                Small : {pizza.prices.small} <br />
                Medium : {pizza.prices.medium} <br />
                Large : {pizza.prices.large}
              </td>
              <td>{pizza.category}</td>
              <td>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => handleDeletePizza(pizza._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pizzas.length === 0 && <div className="text-center">No pizzas found.</div>}
    </div>
    
    
  </div>
)}
{/* 
Showing the OrderList for the admin  */}

{activeTab === "orders" && (
  <div>
    <h4 style={{ fontWeight: 700, marginBottom: 20 }}>Orders List</h4>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderLoading ? (
            <tr><td colSpan={6} className="text-center">Loading...</td></tr>
          ) : orders.length === 0 ? (
            <tr><td colSpan={6} className="text-center">No orders found.</td></tr>
          ) : (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order._id}</td>
                <td>{order.orderAmount}</td>
                <td>{new Date(order.createdAt).toISOString().slice(0, 10)}</td>
                <td>
                  {order.status === "Delivered" ? (
                    <span style={{ color: "green", fontWeight: 600 }}>Delivered</span>
                  ) : (
                    <button
                      className="btn btn-danger"
                      style={{ fontWeight: 600, padding: "2px 18px" }}
                      onClick={() => handleDeliverOrder(order._id)}
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

{/* 
    Show add Pizza by the Admin  */}

    {showAddPizza && (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
  }}>
    <div style={{
      background: "#fff", borderRadius: 16, padding: 36, minWidth: 370, boxShadow: "0 8px 32px rgba(35,34,92,0.18)",
      border: "2px solid #23225c", position: "relative"
    }}>
      <button
        onClick={() => setShowAddPizza(false)}
        style={{
          position: "absolute", top: 16, right: 18, background: "none", border: "none",
          fontSize: 26, color: "#d50000", cursor: "pointer", fontWeight: 700
        }}
        title="Close"
      >×</button>
      <h3 style={{ textAlign: "center", fontWeight: 700, marginBottom: 24, color: "#23225c" }}>Add Pizza</h3>
      <form onSubmit={handleAddPizzaSubmit}>
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="name"
          placeholder="name"
          value={addPizzaForm.name}
          onChange={handleAddPizzaChange}
          required
        />
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="small"
          placeholder="small varient price"
          value={addPizzaForm.prices.small}
          onChange={handleAddPizzaChange}
          required
          type="number"
          min={0}
        />
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="medium"
          placeholder="medium varient price"
          value={addPizzaForm.prices.medium}
          onChange={handleAddPizzaChange}
          required
          type="number"
          min={0}
        />
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="large"
          placeholder="large varient price"
          value={addPizzaForm.prices.large}
          onChange={handleAddPizzaChange}
          required
          type="number"
          min={0}
        />
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="description"
          placeholder="description"
          value={addPizzaForm.description}
          onChange={handleAddPizzaChange}
          required
        />
        <input
          className="form-control mb-3"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="image"
          placeholder="imageurl"
          value={addPizzaForm.image}
          onChange={handleAddPizzaChange}
          required
        />
        <input
          className="form-control mb-4"
          style={{ borderColor: "#23225c", fontWeight: 500 }}
          name="category"
          placeholder="category"
          value={addPizzaForm.category}
          onChange={handleAddPizzaChange}
          required
        />
        {addPizzaError && <div className="alert alert-danger py-1">{addPizzaError}</div>}
        <button
          type="submit"
          className="btn w-100"
          style={{
            background: "linear-gradient(90deg, #23225c 60%, #d50000 100%)",
            color: "#fff", fontWeight: 700, fontSize: 18, borderRadius: 8,
            boxShadow: "0 2px 8px rgba(35,34,92,0.08)", border: "none",
            transition: "background 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #d50000 60%, #23225c 100%)"}
          onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #23225c 60%, #d50000 100%)"}
          disabled={addPizzaLoading}
        >
          {addPizzaLoading ? "Adding..." : "Add Pizza"}
        </button>
      </form>
    </div>
  </div>
)}

          {/* Content */}
          <div className="container">
            {activeTab === "users" && (
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: 20 }}>Users List</h4>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead style={{ background: "#f1f1f1" }}>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user._id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && <div className="text-center">No users found.</div>}
                </div>
              </div>
            )}
            {/* Add more tab content for pizzas, addpizza, orders here */}
          </div>
        </div>
      )}
    </div>
  );
}