import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Actions/userActions';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Success from '../Components/Success';

export default function LoginScreens() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector(state => state.loginUserReducer);
  const { loading, success, error: loginError, user } = loginState;

  useEffect(() => {
    if (success && user) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 1500);
    }
  }, [success, user, navigate]);

  useEffect(() => {
    if(localStorage.getItem("currentUser")){
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !checked) {
      setError('Please fill all fields and accept Terms & Conditions.');
      return;
    }
    setError('');
    dispatch(loginUser({ email, password }));
  };

    useEffect(() => {
    setError('');
    // Optionally, you can dispatch an action to reset login error in redux if needed
    // dispatch({ type: 'USER_LOGIN_RESET' });
  }, [email, password, checked, navigate]);

  useEffect(() => {
  dispatch({ type: 'USER_LOGIN_RESET' });
}, [dispatch]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f8fafc 60%, #ffe5e5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "7vh"
    }}>
      <div className="card shadow" style={{ maxWidth: 400, width: "100%", padding: 32, borderRadius: 16, background: "#fff" }}>
        <h2 className="mb-4" style={{ fontFamily: "Montserrat", fontWeight: 700, textAlign: "center" }}>Login</h2>
        {loading && <Loading />}
        {showSuccess && <Success message="Login Successful!" />}
        {(error || loginError) && <Error error={error || loginError} />}      
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" checked={checked}
              onChange={e => setChecked(e.target.checked)} id="termsCheck" />
            <label className="form-check-label" htmlFor="termsCheck">
              I accept Terms & Conditions
            </label>
          </div>
          <div className="mb-2">
            <a href="#" style={{ color: "#d50000", fontSize: 14, textDecoration: "underline" }}>Forgot password?</a>
          </div>
          <button
            type="submit"
            className="btn btn-danger w-100"
            style={{ fontWeight: 600, fontSize: 18, transition: "background 0.2s" }}
            onMouseOver={e => e.currentTarget.style.background = "#b71c1c"}
            onMouseOut={e => e.currentTarget.style.background = "#dc3545"}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <span
            style={{ color: "#d50000", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate('/register')}
          >
            Click To Register
          </span>
        </div>
      </div>
    </div>
  );
}