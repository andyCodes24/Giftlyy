// My Orders page.
//
// Displays the customer's real orders from MongoDB.
//
// The backend returns orders using MongoDB/Mongoose fields such as:
// _id, createdAt, totalAmount, items, quantity and product.
//
// This page converts those fields into the information
// that the customer needs to see.

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
        <p className="empty-state">
          No orders yet — your checked-out gifts will show up here.
        </p>
      ) : (
        orders.map((order) => (
          <div className="card order-card" key={order._id}>
            {/* Show when the order was created */}
            <p className="order-date">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Date unavailable"}
            </p>

            {/* Show each product in the order */}
            {order.items?.map((item) => (
              <div
                className="order-line"
                key={item.product?._id || item._id}
              >
                <span>
                  {item.product?.name || "Product"}
                </span>

                <span>
                  x{item.quantity}
                </span>
              </div>
            ))}

            {/* Show the total amount */}
            <div className="order-total">
              Total: R{order.totalAmount}
            </div>

            {/* Add the products from this order back to the cart */}
            <button
              className="btn btn-secondary btn-block"
              onClick={async () => {
                for (const item of order.items || []) {
                  if (item.product) {
                    for (let i = 0; i < item.quantity; i++) {
                      try {
                        await addToCart(item.product);
                      } catch (error) {
                        console.error(
                          "Failed to add product to cart:",
                          error
                        );
                      }
                    }
                  }
                }
              }}
            >
              Order Again
            </button>
          </div>
        ))
      )}
    </div>
  );
};