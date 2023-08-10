import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as brand from "./state";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { connect } from "react-redux";
import { addToCart, viewItem } from "../redux/action";
import { useFirestore } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

function BrandShop(props) {
  const { id } = useParams();
  const [myCart, setCart] = useState([]);
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();

  const handleViewItem = async (item) => {
    await props.viewItem(item);
    navigate("/overview");
  };

  console.log(id);

  let brandArr = [];

  if (id == "Matardana") {
    brand.Matardana.forEach((item) => brandArr.push(item));
  } else if (id == "Everest") {
    brand.Everest.forEach((item) => brandArr.push(item));
  } else if (id == "Fortune") {
    brand.Fortune.forEach((item) => brandArr.push(item));
  } else if (id == "Cycle") {
    brand.Cycle.forEach((item) => brandArr.push(item));
  } else if (id == "Kissan") {
    brand.Kissan.forEach((item) => brandArr.push(item));
  } else if (id == "Dabur") {
    brand.Dabur.forEach((item) => brandArr.push(item));
  } else if (id == "Tata") {
    brand.Tata.forEach((item) => brandArr.push(item));
  } else if (id == "Maggi") {
    brand.Maggi.forEach((item) => brandArr.push(item));
  } else if (id == "Weikfield") {
    brand.Weikfield.forEach((item) => brandArr.push(item));
  } else if (id == "Chings") {
    brand.Chings.forEach((item) => brandArr.push(item));
  } else if (id == "Tops") {
    brand.Tops.forEach((item) => brandArr.push(item));
  } else if (id == "Vim") {
    brand.Vim.forEach((item) => brandArr.push(item));
  } else if (id == "Surf Excel") {
    brand.SurfExcel.forEach((item) => brandArr.push(item));
  } else if (id == "Ghadi") {
    brand.Ghadi.forEach((item) => brandArr.push(item));
  } else if (id == "Patanjali") {
    brand.Patanjali.forEach((item) => brandArr.push(item));
  } else if (id == "Amul") {
    brand.Amul.forEach((item) => brandArr.push(item));
  } else if (id == "MDH") {
    brand.MDH.forEach((item) => brandArr.push(item));
  } else if (id == "Rakesh") {
    brand.Rakesh.forEach((item) => brandArr.push(item));
  } else if (id == "Aashirvaad") {
    brand.Aashirvaad.forEach((item) => brandArr.push(item));
  }

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
      {brandArr.length !== 0 ? (
        brandArr.map((item) => (
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
                  style={{ fontWeight: "700", cursor: "pointer",fontSize:"0.85rem"}}
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
      ) : (
        <></>
      )}
    </div>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrandShop);
