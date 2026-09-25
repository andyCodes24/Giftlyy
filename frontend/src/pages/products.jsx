// Import React hooks.
// useState stores information that can change on the page.
// useEffect allows us to run code when the page loads.

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products as fallbackProducts, OCCASIONS } from "../../data/products";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import "./Products.css";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeOccasion = searchParams.get("occasion") || "";
  const [search, setSearch] = useState("");
 const [products, setProducts] = useState([]);
  const [justAdded, setJustAdded] = useState(null);
  const { addToCart } = useCart();

  // Try the real API first; silently fall back to the local catalogue
  // (e.g. while the backend team is still wiring up GET /api/products).
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : res?.data?.data;
        if (Array.isArray(list) && list.length > 0) {
          // Mongo documents come back with `_id`, not `id`, and `occasion`
          // is stored as an array. Normalize the id so add-to-cart and the
          // cart can rely on it, and leave occasion as-is (handled below).
          setProducts(list.map((p) => ({ ...p, id: p.id ?? p._id })));
        }
      })
      .catch(() => {
        /* keep fallbackProducts */
      });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesOccasion =
        !activeOccasion ||
        (Array.isArray(p.occasion)
          ? p.occasion.includes(activeOccasion)
          : p.occasion === activeOccasion);
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesOccasion && matchesSearch;
    });
  }, [products, activeOccasion, search]);

  const toggleOccasion = (occasion) => {
    if (occasion === activeOccasion) {
      searchParams.delete("occasion");
    } else {
      searchParams.set("occasion", occasion);
    }

    setSearchParams(searchParams);
  };

  const handleAdd = (product) => {
    addToCart(product);
    setJustAdded(product.id);

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

      {filtered.length === 0 ? (
        <p className="empty-state">
          No gifts match your search. Try a different term or occasion.
        </p>
      ) : (
        <div className="card-grid product-grid">
          {filtered.map((product) => (
            <div className="card product-card" key={product.id}>
              <h3>{product.name}</h3>

              <p className="product-occasion">
                {product.occasion}
              </p>

              <p className="product-price">
                R{product.price}
              </p>

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
};