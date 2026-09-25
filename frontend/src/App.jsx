
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Products from "./pages/products";
import Recommendation from "./pages/Recommendation";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import MyOrder from "./pages/MyOrder";
import Login from "./pages/login";
import Register from "./pages/register";
import "./theme.css";

import "./reponsiveUi.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}