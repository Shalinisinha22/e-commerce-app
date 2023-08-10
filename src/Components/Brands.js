import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "./data";
import Product from "./Product";
import "./Brands.css";

function Brands() {
  const product = productData.map((item) => (
    <Product id={item.id} url={item.imageurl} name={item.name} />
  ));

  return (
    <div className="brand-logo">
      <div className="brand-heading">Shop by Brand</div>
      <div className="logo-cont">
        <Carousel
          showDots={false}
          autoPlay={true}
          responsive={responsive}
          infinite={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          partialVisbile={false}
        >
          {product}
        </Carousel>
      </div>
    </div>
  );
}

export default Brands;
