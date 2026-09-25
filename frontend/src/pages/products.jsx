// Import React hooks.
// useState stores information that can change on the page.
// useEffect allows us to run code when the page loads.
// useMemo helps calculate the filtered products efficiently.

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products as fallbackProducts, OCCASIONS } from "../../data/products";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import "./Products.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the selected occasion from the URL.
  const activeOccasion = searchParams.get("occasion") || "";

  // Store the user's search text.
  const [search, setSearch] = useState("");

  // Start with an empty list so the old products do not flash
  // before the real products are loaded from the API.
  const [products, setProducts] = useState([]);

  // Keep track of which product was just added to the cart.
  const [justAdded, setJustAdded] = useState(null);

  // Keep track of whether the products are still loading.
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  // Load products from the live API.
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        // The API may return the products directly or
        // inside a "data" property.
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];

        if (list.length > 0) {
          // MongoDB uses "_id", while the frontend uses "id".
          // Convert "_id" to "id" so the cart and buttons
          // can identify each product correctly.
          setProducts(
            list.map((p) => ({
              ...p,
              id: p.id ?? p._id,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Failed to load products:", error);

        // If the API cannot be reached, use the local products
        // as a fallback.
        setProducts(fallbackProducts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter products based on the selected occasion and search text.
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // The backend stores occasion as an array,
      // while the fallback products use a string.
      const matchesOccasion =
        !activeOccasion ||
        (Array.isArray(p.occasion)
          ? p.occasion.includes(activeOccasion)
          : p.occasion === activeOccasion);

      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesOccasion && matchesSearch;
    });
  }, [products, activeOccasion, search]);

  // Select or remove an occasion filter.
  const toggleOccasion = (occasion) => {
    if (occasion === activeOccasion) {
      searchParams.delete("occasion");
    } else {
      searchParams.set("occasion", occasion);
    }

    setSearchParams(searchParams);
  };

  // Add one product to the cart.
  const handleAdd = (product) => {
    addToCart(product);

    // Only the clicked product will show "Added ✓".
    setJustAdded(product.id);

    // Return the button to "Add to cart" after 1.2 seconds.
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <div className="page">
      <h1 className="page-title">Our Gifts</h1>

      <p className="page-subtitle">
        Browse the full collection, or filter by occasion below.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search gifts…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search gifts"
      />

      <div className="occasion-filters">
        {OCCASIONS.map((occasion) => (
          <button
            key={occasion}
            className={
              "filter-chip" +
              (occasion === activeOccasion ? " filter-chip-active" : "")
            }
            onClick={() => toggleOccasion(occasion)}
          >
            {occasion}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="empty-state">Loading gifts...</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">
          No gifts match your search. Try a different term or occasion.
        </p>
      ) : (
        <div className="card-grid product-grid">
          {filtered.map((product) => (
            <div className="card product-card" key={product.id}>
              <h3>{product.name}</h3>

              <p className="product-occasion">
                {Array.isArray(product.occasion)
                  ? product.occasion.join(", ")
                  : product.occasion}
              </p>

              <p className="product-price">R{product.price}</p>

              <button
                className="btn btn-primary btn-block"
                onClick={() => handleAdd(product)}
              >
                {justAdded === product.id ? "Added ✓" : "Add to cart"}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="products-footer">
        <p>
          Can't find what you're looking for? Try our personalized gift
          recommendations.
        </p>

        <Link to="/recommendation" className="btn btn-secondary">
          Get Recommendations
        </Link>
      </div>
    </div>
  );
}