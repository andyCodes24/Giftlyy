import { useState } from "react";
import { products as fallbackProducts, OCCASIONS } from "../../data/products";
import { useCart } from "../context/CartContext";
import { apiRequest } from "../services/api";
import "./Recommendation.css";

export default function Recommendation() {
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState(500);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();

  const handleRecommend = async (event) => {
    if (event) event.preventDefault();
    if (!occasion) return;
    setMessage("");

    try {
      const params = new URLSearchParams();
      params.append("occasion", occasion);
      if (budget) params.append("budget", budget);

      // Attempt to fetch from the live backend
      const result = await apiRequest(`/recommendations?${params.toString()}`);
      
      const fetchedProducts = result.data || [];
      setResults(fetchedProducts);

      if (fetchedProducts.length === 0) {
        setMessage("No gifts matched your search.");
      }
    } catch (error) {

      // Log the error to the console so you can see what went wrong
      console.error("Failed to fetch from backend:", error);
      // If the backend fails, silently fall back to filtering the local mock data
      const localResults = fallbackProducts.filter(
        (p) => (p.occasion === occasion || p.category === occasion) && p.price <= budget
      );
      setResults(localResults);
      
      if (localResults.length === 0) {
        setMessage("No gifts matched your search in the local catalog.");
      }
    }
  };

  return (
    <div className="page page-narrow">
      <h1 className="page-title">Find Your Perfect Gift</h1>
      <p className="page-subtitle">Tell us the occasion and your budget, and we'll recommend gifts for you.</p>

      <h3>Occasion</h3>
      <div className="occasion-filters">
        {OCCASIONS.map((o) => (
          <button
            key={o}
            className={"filter-chip" + (o === occasion ? " filter-chip-active" : "")}
            onClick={() => setOccasion(o)}
          >
            {o}
          </button>
        ))}
      </div>

      <h3>Maximum Budget</h3>
      <div className="budget-field">
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <span className="budget-value">R{budget}</span>
      </div>

      <button className="btn btn-primary btn-block" onClick={handleRecommend} disabled={!occasion}>
        Get Recommendations
      </button>

      {message && <p style={{ marginTop: "1rem", color: "#d9534f" }}>{message}</p>}

      {results && (
        <div className="recommendation-results">
          <p className="selected-occasion">Selected Occasion: {occasion}</p>

          {results.length === 0 ? (
            <p className="empty-state">No gifts under R{budget} for {occasion} yet — try raising the budget.</p>
          ) : (
            results.map((gift) => (
              <div className="card recommendation-card" key={gift.id || gift._id}>
                <p className="rec-occasion">{gift.occasion || gift.category}</p>
                <h3>{gift.name}</h3>
                <p className="rec-price">Price: R{gift.price}</p>

                {/* Display stock if the backend provides it */}
                {gift.stock !== undefined && (
                  <p className="product-stock" style={{ fontSize: "0.85rem", color: "#666" }}>
                    Stock: {gift.stock}
                  </p>
                )}

                <button className="btn btn-secondary btn-block" onClick={() => addToCart(gift)}>
                  Add to cart
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}