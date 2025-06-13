import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OrdersScreen() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { user } = userState || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/placeorder/getuserorders/${user.email}`);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch orders.");
        setLoading(false);
      }
    }
    if (user && user.email) fetchOrders();
  }, [user]);

  if (!user) return <div className="text-center mt-5">Please login to view your orders.</div>;
  if (loading) return <div className="text-center mt-5">Loading orders...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h2 className="mb-4" style={{ fontWeight: 700, textAlign: "center" }}>My Orders</h2>
      {orders.length === 0 && <div className="text-center">No orders found.</div>}
      <div className="row justify-content-center">
        {orders.map((order) => (
          <div className="col-md-6 mb-4" key={order._id}>
            <div className="card shadow-sm" style={{ borderRadius: 14 }}>
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: "#d50000" }}>
                  Order ID: <span style={{ fontWeight: 400 }}>{order._id}</span>
                </h5>
                <div>
                  <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="mt-2">
                  <strong>Shipping Address:</strong>
                  <div style={{ marginLeft: 10 }}>
                    {order.address || order.shippingAddress?.address}<br />
                    Pincode: {order.pincode || order.shippingAddress?.pincode}
                  </div>
                </div>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul style={{ marginLeft: 10 }}>
                    {order.cartItems && order.cartItems.map((item, idx) => (
                      <li key={idx}>
                        {item.name} [{item.varient}] × {item.quantity} = <b>{item.price} ₹</b>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <strong>Total Amount:</strong> <span style={{ color: "#00C853", fontWeight: 600 }}>{order.orderAmount} ₹</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}