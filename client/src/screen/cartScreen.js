import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, deleteCartItem } from "../Actions/cartActions";
import { placeOrder } from "../Actions/OrderActions";
export default function CartScreen() {
  // state and logic...
const cartstate = useSelector((state) => state.CartReducer);
  const cartItems = cartstate.cartItems;
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.loginUserReducer);
  const { user } = userState || {};
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const grandTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Modal and form state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    cardNumber: "",
    cvv: "",
  });

  // Handler for Pay Now
  const handlePayNow = () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 4000);
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // You can add validation here if you want
    dispatch(
      placeOrder({
        ...orderDetails,
        cartItems,
        user: user.email,
        orderAmount: grandTotal,
      })
    );
    setShowOrderModal(false);
    setPaymentSuccess(true); // Show success after payment
    // Optionally show a success message here
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
  };
  
  return (
    <div className="container" style={{ marginTop: 40 }}>
      <div className="row justify-content-center">
        {/* Cart Items Section */}
        <div className="col-md-7" style={{ minWidth: 350 }}>
          <h2 style={{ fontSize: "40px", marginBottom: "30px", fontWeight: 700 }}>
            My Cart
          </h2>
          {cartItems.map((item) => (
            <div
              className="d-flex align-items-center m-3 p-3 shadow-sm rounded position-relative"
              key={item._id + item.varient}
              style={{
                borderBottom: "1px solid #eee",
                background: "#fafbfc",
              }}
            >
              {/* Delete Button */}
              <button
                className="btn btn-danger btn-sm"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 2,
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  opacity: paymentSuccess ? 0.5 : 1,
                  pointerEvents: paymentSuccess ? "none" : "auto"
                }}
                title="Remove"
                onClick={() => dispatch(deleteCartItem(item))}
                disabled={paymentSuccess}
              >
                <i className="fa fa-trash" style={{ fontSize: 16 }}></i>
              </button>
              {/* Pizza Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginRight: 25,
                  border: "1px solid #ddd",
                  background: "#fff",
                }}
              />
              {/* Pizza Details */}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: 8 }}>
                  {item.name} [{item.varient}]
                </h4>
                <div style={{ fontSize: "17px", margin: "8px 0" }}>
                  Price: {item.quantity} × {item.prices[item.varient]} ={" "}
                  <b>{item.price} ₹</b>
                </div>
                <div style={{ fontSize: "17px" }}>
                  Quantity:
                  <i
                    className="fa-solid fa-plus"
                    style={{
                      color: "#00c853",
                      cursor: paymentSuccess ? "not-allowed" : "pointer",
                      margin: "0 10px",
                      opacity: paymentSuccess ? 0.5 : 1
                    }}
                    onClick={() => !paymentSuccess && dispatch(updateCartQuantity(item, 1))}
                  ></i>
                  <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                  <i
                    className="fa-solid fa-minus"
                    style={{
                      color: "#d50000",
                      cursor: paymentSuccess ? "not-allowed" : "pointer",
                      margin: "0 10px",
                      opacity: paymentSuccess ? 0.5 : 1
                    }}
                    onClick={() => !paymentSuccess && dispatch(updateCartQuantity(item, -1))}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Grand Total Section */}
        <div
          className="col-md-4 d-flex align-items-start"
          style={{ minWidth: 270, marginTop: 40 }}
        >
          <div
            className="w-100 p-4 shadow rounded"
            style={{ background: "#fff", minHeight: 200 }}
          >
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Grand Total
            </h3>
            <h2
              style={{
                color: "#d50000",
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              {grandTotal} ₹
            </h2>
            {showLoginAlert && (
              <div
                className="alert alert-danger text-center"
                style={{ fontWeight: 600 }}
              >
                Please login first to proceed with payment.
              </div>
            )}
            {paymentSuccess ? (
              <button
                className="btn btn-block w-100 mt-3"
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  background: "#00C853",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,200,83,0.15)"
                }}
                disabled
              >
                <i className="fa-solid fa-check-circle" style={{ marginRight: 8 }}></i>
                Payment Successful!
              </button>
            ) : (
              <button
                className="btn btn-danger btn-block w-100 mt-3"
                style={{ fontWeight: "bold", fontSize: 20 }}
                onClick={handlePayNow}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showOrderModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              padding: "32px 28px",
              minWidth: 340,
              maxWidth: 370,
              width: "100%",
              position: "relative",
            }}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#d50000",
                cursor: "pointer",
              }}
              title="Close"
            >
              ×
            </button>
            <h3
              style={{ fontWeight: 700, marginBottom: 24, textAlign: "center" }}
            >
              Payment Details
            </h3>
            <form onSubmit={handleOrderSubmit}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleOrderChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group mb-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleOrderChange}
                  required
                  placeholder="Enter your address"
                />
              </div>
              <div className="form-group mb-3">
                <label>Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={orderDetails.pincode}
                  onChange={handleOrderChange}
                  required
                  placeholder="Enter pincode"
                  pattern="\d{6}"
                  maxLength={6}
                />
              </div>
              <div className="form-group mb-3">
                <label>Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardNumber"
                  value={orderDetails.cardNumber}
                  onChange={handleOrderChange}
                  required
                  placeholder="Card Number"
                  pattern="\d{16}"
                  maxLength={16}
                />
              </div>
              <div className="form-group mb-4">
                <label>CVV</label>
                <input
                  type="password"
                  className="form-control"
                  name="cvv"
                  value={orderDetails.cvv}
                  onChange={handleOrderChange}
                  required
                  placeholder="CVV"
                  pattern="\d{3,4}"
                  maxLength={4}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                Pay {grandTotal} ₹
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}