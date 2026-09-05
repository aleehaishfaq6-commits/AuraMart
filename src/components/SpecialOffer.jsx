
import React from "react";

const SpecialOffer = () => {
  return (
    <section className="special-offer">
      <div className="offer-content">
        <span className="offer-tag">LIMITED TIME OFFER</span>

        <h2>
          Shop More. <span>Save More.</span>
        </h2>

        <p>
          Get up to <strong>50% OFF</strong> on selected products.
          Don't miss out on these amazing deals!
        </p>

        <button className="offer-btn">
          Shop Deals
        </button>
      </div>

      <div className="offer-discount">
        <span>UP TO</span>
        <strong>50%</strong>
        <small>OFF</small>
      </div>

      <div className="offer-circle circle-one"></div>
      <div className="offer-circle circle-two"></div>
    </section>
  );
};

export default SpecialOffer;
