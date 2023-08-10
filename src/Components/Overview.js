import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFirestore } from "redux-firestore";

import "./Overview.css";
import { addToCart, addToWishlist, removeFromWishlist } from "../redux/action";
import { useFirestore } from "react-redux-firebase";

function Overview(props) {
  const navigate = useNavigate();

  const [myWishlist, setWishlist] = useState([]);
  const [myCart, setCart] = useState([]);
  const [qty, setQty] = useState(1);

  const myfirestore = getFirestore();

  const getData = () => {
    const unsub = myfirestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.data().wishlist)
        setWishlist(snapshot.data().wishlist);
        setCart(snapshot.data().cart);
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    if (props.auth.uid) {
      getData();
    }
    else{
      const cart=JSON.parse(localStorage.getItem("cart" || "[]"))
      if(cart!=null){
        setCart(cart)
      }
      else{
        setCart([])
      }
       
      
    }
  }, [props.auth.uid,myCart]);

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  let firestore = useFirestore();

  const handleCart = async (item) => {
    await props.addToCart(item);
    let newData = [];
    if (props.auth.uid == null) {
      // navigate("/login");
      // return;

      let oldData = JSON.parse(localStorage.getItem("cart") || "[]");
      if (oldData != null) {
        const isPresentLocal = oldData.some(
          (product) => product.name == item.name
        );
       
        if (isPresentLocal) {
          newData = oldData.map((product) =>
            product.name == item.name
              ? {
                  ...product,
                  qtyy: Number(product.qtyy) + 1,
                  itemPrice: (product.qtyy + 1) * product.newprice,
                }
              : product
          );
        } else {
          newData = [...oldData, { ...item, qtyy: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(newData));
      } else {
        localStorage.setItem("cart", JSON.stringify({ ...item }));
      }
    }
     else {
      let user = await firestore.collection("users").doc(props.auth.uid).get();

      user = user.data();
      let saveObj = [];
      saveObj = user.saveItem.filter((product) => product.name !== item.name);

      // get data from localStorage and update firebase cart

      let obj = [];

      const isPresent = user.cart.some((product) => product.name === item.name);

      if (isPresent) {
        obj = user.cart.map((product) =>
          product.name == item.name
            ? {
                ...product,
                qtyy: Number(product.qtyy) + 1,
                itemPrice: (product.qtyy + 1) * product.newprice,
              }
            : product
        );
      } else {
        obj = [...user.cart, { ...item, qtyy: 1 }];
      }   

      await firestore.collection("users").doc(props.auth.uid).update({
        cart: obj,
        saveItem: saveObj,
      });
    }
  };

  const handleWishlist = async (item) => {
    await props.addToWishlist(item);

    if (props.auth.uid == null) {
      navigate("/login");
      return;
    }

    let user = await firestore.collection("users").doc(props.auth.uid).get();
    user = user.data();
    console.log(user);
    let list = [];

    // console.log(isPresent)
    list = [...user.wishlist, item];

    await firestore.collection("users").doc(props.auth.uid).update({
      wishlist: list,
    });
  };

  const handleRemoveFromWishlist = async (item) => {
    await props.removeFromWishlist(item);

    let user = await firestore.collection("users").doc(props.auth.uid).get();
    user = user.data();
    let list = [];
    list = user.wishlist.filter((product) => product.name !== item.name);
    await firestore.collection("users").doc(props.auth.uid).update({
      wishlist: list,
    });
  };
  const isItemInWishlist = (product) => {
    return myWishlist.some((item) => item.name === product.name);
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 3 },
  };

  const isItemInCart = (item) => {
    return myCart.some((product) => product.name == item.name);
  };
  return (
    // <div>{props.currItem.name}</div>
    <>
      {props.currItem != null ? (
        <div className="overview-container">
          <div className="image-containers">
            <AliceCarousel
              autoPlay
              autoPlayInterval="3000"
              infinite
              disableButtonsControls
              disableDotsControls
              responsive={responsive}
            >
              <img src={props.currItem.img[0]} alt={props.currItem.name}></img>

              <img
                class="secondImage"
                src={props.currItem.img[0]}
                alt={props.currItem.name}
              ></img>
            </AliceCarousel>
          </div>

          <div class="wishlist">
            {isItemInWishlist(props.currItem) ? (
              <a onClick={() => handleRemoveFromWishlist(props.currItem)}>
                <FavoriteIcon
                  className="icon"
                  style={{
                    color: "red",
                    marginBottom: "1rem",
                    fontSize: "3rem",
                    cursor: "pointer",
                  }}
                ></FavoriteIcon>
              </a>
            ) : (
              <a onClick={() => handleWishlist(props.currItem)}>
                <FavoriteIcon
                  className="icon"
                  style={{
                    color: "gray",
                    marginBottom: "1rem",
                    fontSize: "3rem",
                    cursor: "pointer",
                  }}
                ></FavoriteIcon>
              </a>
            )}
          </div>

          <div class="item-overview">
            <div class="item-name">
              <h4 style={{ margin: "0" }}>{props.currItem.name}</h4>
              <h4 style={{ marginTop: "0.4rem" }}>{props.currItem.nameH}</h4>
              <LocalOfferIcon
                color="success"
                sx={{ fontSize: "1rem", paddingTop: "0.2rem" }}
              ></LocalOfferIcon>
              &nbsp;
              <span
                style={{
                  color: "green",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => handleBrand(props.currItem.brand)}
              >
                {props.currItem.brand}
              </span>
              <div
                class="price"
                style={{
                  display: "flex",
                  gap: "1rem",
                  margin: "0.5rem",
                  justifyContent: "center",
                }}
              >
                {props.currItem.oldprice && (
                  <div style={{ fontSize: "1rem" }}>
                    <CurrencyRupeeIcon
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "gray",
                      }}
                    ></CurrencyRupeeIcon>
                    <span style={{ color: "gray" }}>
                      <s>{props.currItem.oldprice}</s>
                    </span>
                  </div>
                )}

                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  <CurrencyRupeeIcon
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  ></CurrencyRupeeIcon>
                  <span>{props.currItem.newprice}</span>{" "}
                </div>
              </div>
              <Button
                size="small"
                fullwidth
                variant="contained"
                color="success"
              >
                {props.currItem.qty}
              </Button>
              <div class="cartBtn">
                {props.currItem.available ? (
                  <Button
                    size="small"
                    fullwidth
                    variant="contained"
                    color="error"
                  >
                    SOLD OUT
                  </Button>
                ) : isItemInCart(props.currItem) ? (
                  <div style={{ margin: "0", display: "flex" }}>
                    <button
                      style={{
                        border: "2px solid red",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      -
                    </button>
                    <input
                      value={qty}
                      style={{
                        width: "4rem",
                        height: "2rem",
                        margin: "0 0.5rem",
                        textAlign: "center",
                      }}
                    ></input>
                    <button
                      style={{
                        border: "2px solid green",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Button
                    size="small"
                    fullwidth
                    variant="contained"
                    color="success"
                    onClick={() => handleCart(props.currItem)}
                    sx={{ boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}
                  >
                    ADD TO CART&nbsp;&nbsp;{" "}
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currItem: state.Reducer.currItem,
    wishlist: state.Reducer.wishlist,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => dispatch(addToWishlist(item)),
    removeFromWishlist: (item) => dispatch(removeFromWishlist(item)),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
