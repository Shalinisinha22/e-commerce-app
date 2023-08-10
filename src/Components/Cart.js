import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart, viewItem } from "../redux/action";
import { getFirestore } from "redux-firestore";
import { useNavigate } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useFirestore } from "react-redux-firebase";
import { pink } from "@mui/material/colors";

import "./Cart.css";

function Cart({ auth, removeItem, viewItem }) {
  const [myCart, setcart] = useState([]);
  const [userName, setName] = useState("");
  const [totalItem, setItem] = useState(0);
  const [totalPrice, setPrice] = useState(0);
  const [totalItemPrice, setTotalItemPrice] = useState(0);

  const firestore = getFirestore();

  const getDataFromDb = async () => {
    const unsub = firestore
      .collection("users")
      .doc(auth.uid)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data().cart);
        setcart(snapshot.data().cart);
        setName(snapshot.data().name);
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    if (auth.uid == null) {
      let cart = JSON.parse(localStorage.getItem("cart" || "[]"));
      console.log(cart);
      if (cart != null) {
        setcart(cart);
      }
    } else {
      getDataFromDb();
    }
  }, [auth.uid, myCart]);

  const navigate = useNavigate();

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  const handleViewItem = async (item) => {
    await viewItem(item);
    navigate("/overview");
  };

  const handleRemove = async (name) => {
    await removeItem(name);

    if (auth.uid) {
      let user = await firestore.collection("users").doc(auth.uid).get();
      user = user.data();
      let obj = [];
      obj = user.cart.filter((product) => product.name !== name);
      await firestore.collection("users").doc(auth.uid).update({
        cart: obj,
      });
    } else {
      let cart = JSON.parse(localStorage.getItem("cart" || "[]"));
      if (cart.length != 0) {
        cart = cart.filter((product) => product.name != name);
        localStorage.setItem("cart", JSON.stringify(cart));
        setcart(cart);
      }
    }
  };

  const handleQty = async (item, e) => {
    if (e.target.value > 0) {
      // updateqty(id, e.target.value);
      let updatedQty = Number(e.target.value);
      let itemPrice = 0;
      itemPrice = updatedQty * Number(item.newprice);

      if (auth.uid) {
        let user = await firestore.collection("users").doc(auth.uid).get();
        user = user.data();
        let obj = [];
        obj = user.cart.map((product) =>
          product.name == item.name
            ? { ...product, qtyy: updatedQty, itemPrice: itemPrice }
            : product
        );
        // console.log("obj",obj)
        await firestore.collection("users").doc(auth.uid).update({
          cart: obj,
        });
      } else {
        let cart = JSON.parse(localStorage.getItem("cart" || "[]"));
        if (cart != null) {
          cart = cart.map((product) =>
            product.name == item.name
              ? { ...product, qtyy: updatedQty, itemPrice: itemPrice }
              : product
          );
          localStorage.setItem("cart", JSON.stringify(cart));
          setcart(cart);
        }
      }
    }
  };

  let myfirestore = useFirestore();
  const saveItem = async (item) => {
    if (auth.uid == null) {
      // navigate("/login");
      // return;

      console.log("called");
      let oldData = JSON.parse(localStorage.getItem("save") || "[]");

      let newData = [];
      if (oldData != null) {
        newData = [...oldData, { ...item }];
        localStorage.setItem("save", JSON.stringify(newData));
      } else {
        localStorage.setItem("save", JSON.stringify({ ...item }));
      }

      //filtercart
      let cart = JSON.parse(localStorage.getItem("cart" || "[]"));
      if (cart.length != 0) {
        cart = cart.filter((product) => product.name != item.name);
        localStorage.setItem("cart", JSON.stringify(cart));
        setcart(cart);
      }
    } else {
      let user = await myfirestore.collection("users").doc(auth.uid).get();
      user = user.data();
      let obj = [];
      obj = user.cart.filter((product) => product.name !== item.name);
      let saveObj = [];
      saveObj = [...user.saveItem, { ...item }];

      await firestore.collection("users").doc(auth.uid).update({
        cart: obj,
        saveItem: saveObj,
      });
    }
  };

  useEffect(() => {
    let price = 0;

    myCart.map((item) => {
      let itemPrice = item.itemPrice ? item.itemPrice : item.newprice;
      price = Number(itemPrice) + price;
      console.log(price);
    });
    setPrice(price);
    setItem(myCart.length);
  }, [myCart, totalPrice]);



  const handleOrder=async(amt)=>{
    if(auth.uid){

      let user = await firestore.collection("users").doc(auth.uid).get();
      user = user.data();
      let obj=[]
       obj=[...user.cart]
       await firestore.collection("users").doc(auth.uid).update({
        order: obj,
        totalAmt:amt,
        cart:[]
      });
    
      navigate("/orderPage")
    }
    else{
      navigate("/login")
    }
  
     
  }

  return (
    <>
      <div class="containers">
        {myCart.length === 0 ? (
          <p> Your cart is empty </p>
        ) : (
          myCart.map((item) => (
            <>
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

                  <div class="about" style={{fontWeight: "bold"}}>
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
                      style={{
                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                      onClick={() => handleViewItem(item)}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
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
                    <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Total
                      <CurrencyRupeeIcon
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      ></CurrencyRupeeIcon>
                      {item.itemPrice ? (
                        <span> {item.itemPrice}.00</span>
                      ) : (
                        <span>{item.newprice}</span>
                      )}
                    </div>
                  </div>

                  <div class="btn-cont">
                    <Button
                      variant="outlined"
                      sx={{ color: pink[500] }}
                      onClick={() => saveItem(item)}
                      color="secondary"
                    >
                      <BookmarkIcon></BookmarkIcon>
                    </Button>
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

                    <Button
                      size="small"
                      fullwidth
                      variant="contained"
                      color="error"
                      sx={{
                        boxShadow:
                          "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
                      }}
                      onClick={() => handleRemove(item.name)}
                    >
                      <DeleteIcon></DeleteIcon> Delete
                    </Button>
                  </div>
                </div>

                <div className="itemQuantity" style={{}}>
                  <label htmlFor="qty">Qty:</label>
                  <input
                    min="1"
                    type="number"
                    id="qty"
                    name="qty"
                    value={item.qtyy}
                    onChange={(e) => handleQty(item, e)}
                    style={{ width: "3.5rem", marginLeft: "0.4rem" }}
                  />
                </div>
              </div>
            </>
          ))
        )}
      </div>
      {myCart.length !== 0 ? (
        <div class="price-container">
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "2rem", width: "40%" }}
            color="success"
            onClick={()=>handleOrder(totalPrice)}
          >
            {" "}
            Pay <CurrencyRupeeIcon></CurrencyRupeeIcon>
            {totalPrice}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.Reducer.cart,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (name) => dispatch(removeFromCart(name)),
    viewItem: (item) => dispatch(viewItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
