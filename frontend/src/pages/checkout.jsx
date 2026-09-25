// Checkout page.
// Collects the shipping address, then places the order using the
// items already sitting in the cart (via CartContext).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Checkout() {
  const { items, total, checkout } = useCart();
  const navigate = useNavigate();

  // Store the shipping address entered by the customer.
  const [shippingAddress, setShippingAddress] = useState("");

  // Store messages that we want to display to the customer.
  const [message, setMessage] = useState("");

  // Whether the order is currently being submitted.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If the cart is empty, there is nothing to check out.
  if (items.length === 0) {
    return (
      <div className="page page-narrow">
        <h1 className="page-title">Checkout</h1>
        <p className="empty-state">Your cart is empty — add something before checking out.</p>
      </div>
    );
  }

  // This function runs when the checkout form is submitted.
  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!shippingAddress.trim()) {
      setMessage("Please enter a shipping address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Places the order using the cart's items/total, and includes
      // the shipping address the customer just entered.
      await checkout(shippingAddress);

      // Send them to My Orders so they can see the order they just placed.
      navigate("/my-order");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page page-narrow">
      <h1 className="page-title">Checkout</h1>

      {message && <p className="empty-state">{message}</p>}

      <div className="cart-total">Total: R{total}</div>

      <form onSubmit={handleCheckout}>
        <div>
          <label>Shipping Address</label>
          <br />
          <textarea
            value={shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
            placeholder="Enter your shipping address"
            rows="4"
            cols="40"
          />
        </div>

        <br />

        <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
