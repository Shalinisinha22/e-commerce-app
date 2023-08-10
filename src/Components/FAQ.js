import React from "react";

function FAQ() {
  return (
    <div class="about-container" style={{ marginBottom: "4rem" }}>
      <h3 style={{ color: "#4cd137" }}>FAQ</h3>
      <div class="about-content">
        <p>
          Kindly check the FAQ below if you are not very familiar with the
          functioning of this website. If your query is of urgent nature and is
          different from the set of questions then call us on{" "}
          <a href="tel:9155492401" style={{ textDecoration: "none" }}>
            <span style={{ color: "green" }}> &nbsp;9155492401</span>
          </a>
          &nbsp; between 10am & 7pm on all days including Sunday to get our immediate
          help.
        </p>
      </div>
      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          How do I register?
        </h3>
        <p>
          You can register by clicking on the "login" link at the top left
          corner of the homepage. Please provide the information in the form
          that appears. You can review the terms and conditions, provide your
          payment mode details and submit the registration information.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          What kind of products do you sell?
        </h3>
        <p>
          You can choose from over 10,000 products spread across various
          categories such as grocery, bakery, beverages, personal care products,
          baby care products, pet products and much more.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          What locations do you Deliver in?
        </h3>
        <p>Matardana.com Currently Deliver in Patna.</p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          What is the minimum order value?
        </h3>
        <p>
          Minimum order value to qualify for free delivery is 500. In case you
          do not reach the limit, a delivery charge will be levied against that
          order.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          How can I make changes to my order before and after confirmation?
        </h3>
        <p>
          You can edit your products in the cart before checkout. If you’ve
          already placed your order, you can cancel and reorder with the
          required list from the app and this will be soon released on web as
          well.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          How will the delivery be done?
        </h3>
        <p>
          We have a dedicated team of delivery personnel and a fleet of vehicles
          operating across the city which ensures timely and accurate delivery
          to our customers.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          How do I change the delivery info (address to which I want products
          delivered)?
        </h3>
        <p>
          You can change your delivery address on our website once you log into
          your account. Click on "My Account" at the top right hand corner and
          go to the "Update My Profile" section to change your delivery address.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Do you have offline stores?
        </h3>
        <p>
          No we are a purely internet based company and do not have mortar
          stores.
        </p>
      </div>

      <div class="about-points">
        <h3
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          What do I do if an item is defective (broken, leaking, expired)?
        </h3>
        <p>
          We have a no questions asked return policy. In case you are not
          satisfied with a product received you can return it to the delivery
          personnel at time of delivery or you can contact our customer support
          team and we will do the needful.
        </p>
      </div>

      
    </div>
  );
}

export default FAQ;
