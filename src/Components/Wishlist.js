import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart, removeFromWishlist, viewItem } from "../redux/action";
import { connect } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFirestore } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

function Wishlist(props) {
  const [myWishlist, setWishlist] = useState([]);
  const [userName, setName] = useState("");
  const [myCart, setCart] = useState([]);
  const [qty, setQty] = useState(1);

  const myfirestore = getFirestore();

  useEffect(() => {
    const unsub = myfirestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.data().wishlist)
        setWishlist(snapshot.data().wishlist);
        setName(snapshot.data().name);
        setCart(snapshot.data().cart);
      });
    return () => {
      unsub();
    };
  }, [props.auth.uid]);

  const navigate = useNavigate();
  let firestore = useFirestore();

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  const handleViewItem = async (item) => {
    await props.viewItem(item);
    navigate("/overview");
  };
  const handleCart = async (item) => {
    await props.addToCart(item);
    if (props.auth.uid == null) {
      navigate("/login");
      return;
    }
    let user = await firestore.collection("users").doc(props.auth.uid).get();
    user = user.data();
    let saveObj = [];
    saveObj = user.saveItem.filter((product) => product.name !== item.name);

    let obj = [];

    const isPresent = user.cart.some((product) => product.name === item.name);

    if (isPresent) {
      // alert("Already added in the cart");
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

  const isItemInCart = (item) => {
    return myCart.some((product) => product.name == item.name);
  };

  return (
    <div class="containers">
      {myWishlist.length == 0 ? (
        <h4>Hey! {userName}, Your wishlist is Empty </h4>
      ) : (
        myWishlist.map((item) => (
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
                  style={{fontWeight: "700", cursor: "pointer",fontSize:"0.85rem" }}
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
                {/* <FormControl>
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
                </FormControl> */}

                <div class="wishlist" style={{ width: "10%" }}>
                  <a onClick={() => handleRemoveFromWishlist(item)}>
                    <FavoriteIcon
                      className="icon"
                      style={{
                        color: "red",
                        marginBottom: "1rem",
                        fontSize: "2rem",
                        cursor: "pointer",
                      }}
                    ></FavoriteIcon>
                  </a>

                  {/* <Checkbox checkedIcon={<FavoriteBorder sx={{fontSize:"3rem"}} />} icon={<Favorite sx={{color:"red",fontSize:"3rem"}}></Favorite>} /> */}
                </div>

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
    wishlist: state.Reducer.wishlist,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewItem: (item) => dispatch(viewItem(item)),
    removeFromWishlist: (item) => dispatch(removeFromWishlist(item)),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
