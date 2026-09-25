// Import React hooks.
// useState stores information that can change on the page.
// useEffect allows us to run code when the page loads.

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./MyOrder.css";

export default function MyOrder() {
  const { isLoggedIn } = useAuth();
  const { orders, addToCart } = useCart();

  if (!isLoggedIn) {
    return (
      <div className="page page-narrow">
        <h1 className="page-title">My Orders</h1>
        <p className="empty-state">Log in to see your order history.</p>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <p className="empty-state">No orders yet — your checked-out gifts will show up here.</p>
      ) : (
        orders.map((order) => (
          <div className="card order-card" key={order.id}>
            <p className="order-date">{new Date(order.placedAt).toLocaleDateString()}</p>

            {order.items.map((item) => (
              <div className="order-line" key={item.id}>
                <span>{item.name}</span>
                <span>x{item.qty}</span>
              </div>
            ))}

            <div className="order-total">Total: R{order.total}</div>

            <button
              className="btn btn-secondary btn-block"
              onClick={() => order.items.forEach((item) => addToCart(item))}
            >
              Order Again
            </button>
          </div>
        ))
      )}
    </div>
  );
}

