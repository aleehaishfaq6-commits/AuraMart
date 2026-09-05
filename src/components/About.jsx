import React from "react";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">
            <Sparkles size={16} />
            MORE THAN JUST SHOPPING
          </span>

          <h1>
            Shopping Made
            <span> Simple & Better.</span>
          </h1>

          <p>
            We bring together quality products, trusted brands and a smooth
            shopping experience — all in one place.
          </p>

          <button
            className="about-shop-btn"
            onClick={() => navigate("/Shop")}
          >
            Explore Products
            <ArrowRight size={19} />
          </button>
        </div>
      </section>


      {/* ABOUT */}
      <section className="about-story">
        <div className="about-content">

          <div className="about-left">
            <span className="section-tag">OUR STORY</span>

            <h2>
              Everything You Love,
              <br />
              <span>In One Place.</span>
            </h2>

            <p>
              Our goal is simple: make online shopping easier, more enjoyable
              and accessible for everyone. From everyday essentials to products
              you love, we help you discover more with ease.
            </p>

            <p>
              We focus on quality, convenience and a seamless experience from
              browsing to checkout.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <h3>Quality</h3>
              <p>Products selected with care</p>
            </div>

            <div className="stat-card">
              <h3>Simple</h3>
              <p>An easy shopping experience</p>
            </div>

            <div className="stat-card">
              <h3>Trusted</h3>
              <p>Shop with confidence</p>
            </div>

            <div className="stat-card">
              <h3>Fast</h3>
              <p>Quick and smooth service</p>
            </div>
          </div>

        </div>
      </section>


      {/* VALUES */}
      <section className="about-values">
        <div className="values-heading">
          <span className="section-tag">WHY CHOOSE US</span>
          <h2>Designed For A Better Experience</h2>
        </div>

        <div className="value-grid">

          <div className="value-card">
            <div className="value-icon">
              <ShoppingBag size={27} />
            </div>

            <h3>Easy Shopping</h3>
            <p>
              Browse products, explore categories and find what you need
              without the hassle.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <ShieldCheck size={27} />
            </div>

            <h3>Quality First</h3>
            <p>
              We focus on providing a reliable experience and products worth
              discovering.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Truck size={27} />
            </div>

            <h3>Convenient Experience</h3>
            <p>
              From browsing to your cart, everything is designed to feel
              simple and smooth.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Heart size={27} />
            </div>

            <h3>Made For You</h3>
            <p>
              Discover products across different categories and shop what you
              love.
            </p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="about-cta">
        <div>
          <span className="section-tag">START EXPLORING</span>
          <h2>Find Something You'll Love.</h2>

          <p>
            Discover products across multiple categories and enjoy shopping
            your way.
          </p>

          <button
            className="about-shop-btn light-btn"
            onClick={() => navigate("/Shop")}
          >
            Shop Now
            <ArrowRight size={19} />
          </button>
        </div>
      </section>

    </main>
  );
};

export default About;