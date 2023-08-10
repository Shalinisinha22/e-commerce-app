import React from "react";
import "./About.css";
function About() {
  return (
    <div class="about-container">
      <h3 style={{ color: "#4cd137" }}>About Us</h3>
      <div class="about-content">
        <p>
          <span style={{ color: "orange", fontWeight: "bold" }}>Matardana</span>{" "}
          is one of the India's largest online store. With over 100 products and
          over a 100 brands in our catalogue you will find everything you are
          looking for. Right from Rice and Dals, Spices and Seasonings to
          Packaged products, Beverages, Personal care products, - we have it
          all. Choose from a wide range of options in every category,
          exclusively handpicked to help you find the best quality available at
          the lowest prices. Select a time slot for delivery and your order will
          be delivered right to your doorstep, anywhere in India. You can pay
          online using your debit / credit card or by cash. We guarantee on time
          delivery, and the best quality!
        </p>
      </div>
      <div class="about-points">
        <h3>Provide Trust</h3>
        <p>
          We always save the time of our clients and maintain trust of our
          clients.
        </p>
      </div>

      <div class="about-points">
        <h3>Business grow</h3>
        <p>
          We always save the time of our clients and help them grow as fast as
          we can.
        </p>
      </div>

      <div class="about-points">
        <h3>24/7 Support</h3>
        <p>
          We provide quick delivery to our customers and always fulfill their
          needs 24/7.
        </p>
      </div>
      <div class="about-points">
        <h3>Safe Planning</h3>
        <p>
          We have an expert team members who always make plans which are helpful
          for our clients.
        </p>
      </div>
    </div>
  );
}

export default About;
