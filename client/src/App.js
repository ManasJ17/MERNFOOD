import "./App.css";
import Navbar from "./Components/navbar";
import Homescreen from "./screen/homescreen";
import CartScreen from "./screen/cartScreen";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginScreens from "./screen/LoginScreens";
import RegisterScreen from "./screen/RegisterScreen";
import OrdersScreen from "./screen/OrdersScreen";
import AdminPanel from "./screen/Adminpanel";

function AppContent() {
  const location = useLocation();
  // Hide Navbar on /admin route
  const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Homescreen />}></Route>
        <Route exact path="/cart" element={<CartScreen/>}></Route>
        <Route exact path="/login" element={<LoginScreens/>}/>
        <Route exact path="/register" element={<RegisterScreen/>}/>
        <Route exact path="/orders" element={<OrdersScreen />} />
        <Route exact path="/admin" element={<AdminPanel/>}></Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;