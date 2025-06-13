import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Actions/userActions";
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    dispatch(registerUser({ name, email, password }));

    // Add your register logic here
    // On success, redirect to login
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff" ,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7vh"
      }}
    >
      <div
        className="card shadow"
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 32,
          borderRadius: 16,
          background: "#fff",
        }}
      >
        <h2
          className="mb-4"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{
              fontWeight: 600,
              fontSize: 18,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#b71c1c")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#dc3545")}
          >
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <span
            style={{ color: "#d50000", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </span>
        </div>
      </div>
    </div>
  );
}
