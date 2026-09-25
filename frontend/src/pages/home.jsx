
import { Link } from "react-router-dom";
import { OCCASIONS } from "../../data/products";
import "./Home.css";

const STEPS = [
  { title: "Choose an Occasion", body: "Choose the special moment you're shopping for." },
  { title: "Get Recommendations", body: "Tell us your budget and occasion." },
  { title: "Choose the gift", body: "Browse and select the perfect gift." },
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Giftly</p>
          <h1 className="hero-title">Find the perfect gift</h1>
          <p className="hero-subtitle">Thoughtful gifts for every special moment.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Browse Gifts</Link>
            <Link to="/recommendation" className="btn btn-secondary">Get Recommendations</Link>
          </div>
        </div>
      </section>

      <section className="page home-columns">
        <div>
          <h2>How Giftly Works</h2>
          <div className="steps">
            {STEPS.map((step, i) => (
              <div className="card step-card" key={step.title}>
                <span className="step-number">{i + 1}</span>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Shop by Occasion</h2>
          <div className="occasion-list">
            {OCCASIONS.map((occasion) => (
              <Link
                key={occasion}
                to={`/products?occasion=${encodeURIComponent(occasion)}`}
                className="card occasion-card"
              >
                {occasion}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2 className="cta-heading">Ready to find the perfect gift?</h2>
        <p className="cta-body">Explore our gifts and make someone's day special.</p>
        <Link to="/products" className="btn btn-primary">Browse Gifts</Link>
      </section>
    </div>
  );
}


