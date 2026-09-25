// Import Link from React Router.
// Link allows us to move between pages without
// refreshing the entire React application.
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";


export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const [MenuOpen, setMenuOpen] = useState(false);
  const CloseMenu = ()=> setMenuOpen(false);



  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "");

  return (
    <header className= {MenuOpen ?"navbar navbar-open": "navbar"}>
      <NavLink to="/" className="nav-brand" onClick={CloseMenu}>Giftly</NavLink>

      {/*Toggle button*/}

      <button type = "button" className ="nav-toggle" aria-label = {MenuOpen ? "Close menu" : "Open menu"} aria-expanded = {MenuOpen} 
        onClick = {() => setMenuOpen((open) => !open)}>
        <span className ="nav-toggle-bar"></span>
           <span className ="nav-toggle-bar"></span>
              <span className ="nav-toggle-bar"></span>
      </button>

      <nav className="nav-links">
        <NavLink to="/" end className={linkClass} onClick= {CloseMenu}>Home</NavLink>
        <NavLink to="/products" className={linkClass} onClick = {CloseMenu}>Products</NavLink>
        <NavLink to="/recommendation" className={linkClass} onClick = {CloseMenu}>Recommendation</NavLink>
        <NavLink to="/cart" className={linkClass} onClick= {CloseMenu}>
          Cart{cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/my-order" className={linkClass} onClick= {CloseMenu}>My Order</NavLink>

        {isLoggedIn ? (
          <button className="nav-link nav-link-button" onClick={() => {
            logout();
             CloseMenu();
          }

          }>
            Log out{user?.username ? ` (${user.username})` : ""}
          </button>
        ) : (
          <>
            <NavLink to="/login" className={linkClass} onClick= {CloseMenu}>Login</NavLink>
            <NavLink to="/register" className={linkClass} onClick= {CloseMenu}>Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

