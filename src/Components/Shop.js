import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as shopType from "./state";
import "./Shop.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart, removeFromCart, viewItem } from "../redux/action";
import { connect } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

function Shop(props) {
  const { id } = useParams();
  const [myCart, setCart] = useState([]);
  const [qty, setQty] = useState(1);

  // console.log(id.includes("Vegetables"));
  // console.log(id === "Vegetables");
  const navigate = useNavigate();

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  let newarr = [];

  if (id === "Super Saving") {
    shopType.SuperSaving.forEach((item) => newarr.push(item));
  } else if (id === "Vegetables") {
    shopType.Vegetables.forEach((item) => newarr.push(item));
  } else if (id === "Fruits") {
    shopType.Fruits.forEach((item) => newarr.push(item));
  } else if (id === "Groceries") {
    shopType.Groceries.forEach((item) => newarr.push(item));
  } else if (id === "Flours") {
    shopType.Flours.forEach((item) => newarr.push(item));
  } else if (id === "Pulses") {
    shopType.Pulses.forEach((item) => newarr.push(item));
  } else if (id === "Rice & Rice Products") {
    shopType.Rice.forEach((item) => newarr.push(item));
  } else if (id === "Salt, sugar & Jaggery") {
    shopType.Salt.forEach((item) => newarr.push(item));
  } else if (id === "Oil & ghee") {
    shopType.Oil.forEach((item) => newarr.push(item));
  } else if (id === "Spices") {
    shopType.Spices.forEach((item) => newarr.push(item));
  } else if (id === "Dry Fruits & Nuts") {
    shopType.Dry.forEach((item) => newarr.push(item));
  } else if (id === "Snacks & Beverages") {
    shopType.Snacks.forEach((item) => newarr.push(item));
  } else if (id === "Household Care") {
    shopType.Household.forEach((item) => newarr.push(item));
  } else if (id === "Eggs & Dairy") {
    shopType.Eggs.forEach((item) => newarr.push(item));
  } else if (id === "Personal Care") {
    shopType.Personal.forEach((item) => newarr.push(item));
  } else if (id === "Pooja Samagri") {
    shopType.Pooja.forEach((item) => newarr.push(item));
  } else if (id === "Medical care") {
    shopType.Medical.forEach((item) => newarr.push(item));
  } else if (id === "Frozen Products") {
    shopType.Frozen.forEach((item) => newarr.push(item));
  } else if (id === "Essential") {
    shopType.Essential.forEach((item) => newarr.push(item));
  }

  const handleViewItem = async (item) => {
    await props.viewItem(item);
    navigate("/overview");
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

  const myfirestore = getFirestore();
  const getCartItem = () => {
    const unsub = myfirestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        setCart(snapshot.data().cart);
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    if (props.auth.uid) {
      getCartItem();
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

  const isItemInCart = (item) => {
    return myCart.some((product) => product.name == item.name);
  };

  return (
    <div class="containers">
      {newarr.length == 0 ? (
        <></>
      ) : (
        newarr.map((item) => (
          <div key={item.id} class="item-container">
            <div class="item-details">
              <div class="img-box" style={{ position: "relative" }}>
                <img
                  src={item.img[0]}
                  alt={item.name}
                  onClick={() => handleViewItem(item)}
                ></img>
                {item.discount && (
                  <div
                    className="tag"
                    style={{
                      position: "absolute",
                      top: "0rem",
                      left: "0rem",
                    }}
                  >
                    <span class="dot"></span>
                    &nbsp; {item.discount}&nbsp;
                  </div>
                )}
              </div>

              <div class="about" style={{ fontWeight: "bold" }}>
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
                  }}
                  onClick={() => handleBrand(item.brand)}
                >
                  {item.brand}
                </span>
                <div
                  style={{ fontWeight: "700", cursor: "pointer",fontSize:"0.85rem" }}
                  onClick={() => handleViewItem(item)}
                >
                  {item.name}
                </div>
                <div
                  style={{fontWeight: "700", cursor: "pointer",fontSize:"0.85rem"}}
                  onClick={() => handleViewItem(item)}
                >
                  {item.nameH}
                </div>
              </div>

              <div class="price">
                {item.oldprice && (
                  <div style={{ fontSize: "1rem" }}>
                    <CurrencyRupeeIcon
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "gray",
                      }}
                    ></CurrencyRupeeIcon>
                    <span style={{ color: "gray" }}>
                      <s>{item.oldprice}</s>
                    </span>
                  </div>
                )}

                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  <CurrencyRupeeIcon
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  ></CurrencyRupeeIcon>
                  <span>{item.newprice}</span>{" "}
                </div>
              </div>

              <div class="btn-cont">
                <FormControl>
                  <Select
                    sx={{
                      borderRadius: "2rem",
                      height: "2rem",
                      fontSize: "0.85rem",
                      width: { md: "30rem", xs: "7rem" },
                    }}
                    value={item.qty}
                  >
                    <MenuItem value={item.qty}>{item.qty}</MenuItem>
                  </Select>
                </FormControl>

                {item.available ? (
                  <Button
                    size="small"
                    fullwidth
                    variant="contained"
                    color="error"
                  >
                    SOLD OUT
                  </Button>
                ) : isItemInCart(item) ? (
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
                    onClick={() => handleCart(item)}
                    sx={{ boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}
                  >
                    ADD TO CART&nbsp;&nbsp;{" "}
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    // <div>SuperSaving {id}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewItem: (item) => dispatch(viewItem(item)),
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (name) => dispatch(removeFromCart(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
