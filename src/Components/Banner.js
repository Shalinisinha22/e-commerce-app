import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import banner from "../assets/bannerImage.jpeg";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import "./Banner.css";
import Button from "@mui/material/Button";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Carousel } from "react-responsive-carousel";

import axios from "axios";

export default function Banner() {
  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };

  const [banner, setBanner] = useState([]);

  const loadBanner = async () => {
    const res = await axios.get("https://matardana-api-xrjf.vercel.app/banner");
    const data = res.data;
    // console.log(data)
    setBanner(data);
  };

  useEffect(() => {
    loadBanner();
  });
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <>
      <div class="banner-cont">
        {banner.length != 0 ? (
          <>
            <AliceCarousel
              autoPlay
              autoPlayInterval="500"
              // infinite
              disableButtonsControls
              disableDotsControls
              responsive={responsive}
            >
              {banner.map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  style={{ width: "100%", height: "45%" }}
                  alt="Banner-Image"
                ></img>
              ))}
            </AliceCarousel>
          </>
        ) : (
          <></>
        )}

        <div className="slider-text">
          <marquee width="60%" direction="left">
            <h4>
              What Would You Want To Get.....&nbsp; For any enquiry&nbsp;Please
              Contact&nbsp;
              <a href="tel:9155492401" style={{ textDecoration: "none" }}>
                <span style={{ color: "#efff00" }}> &nbsp;9155492401</span>
              </a>
            </h4>
          </marquee>
        </div>
      </div>
    </>
  );
}
