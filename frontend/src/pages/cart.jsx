// Import React hooks.
// useState stores information that can change on the page.
// useEffect allows us to run code when the page loads.

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { items, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="page page-narrow">
      <h1 className="page-title">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="empty-state">Your cart is empty — go find something thoughtful.</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="card cart-item" key={item.id}>
              <p className="cart-item-occasion">{item.occasion}</p>
              <h3>{item.name}</h3>

              <div className="qty-control">
                <button onClick={() => updateQty(item.id, -1)} aria-label={`Decrease quantity of ${item.name}`}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} aria-label={`Increase quantity of ${item.name}`}>+</button>
              </div>

              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">Total: R{total}</div>
          <button className="btn btn-primary btn-block" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

