import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/m1.jpg";
import img2 from "../assets/m2.png";
import img3 from "../assets/m3.jpg";
import img4 from "../assets/m4.png";
import f21 from "../assets/fruits/f21.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFirestore } from "react-redux-firebase";
import "./MostSelling.css";
import { addToCart, viewItem } from "../redux/action";
import { connect } from "react-redux";
import { getFirestore } from "redux-firestore";

function MostSelling(props) {
  const [myCart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  const[myProduct,setProduct]=useState([])
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/shop/${name}`);
  };


  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };
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

  var product = [
    {
      id: 1,
      name: "Shimla Apple",
      nameH: "शिमला एप्पल",
      newprice: "58.00",
      qty: "500 Gram",
      oldprice: "65.00",
      discount: "11% off",
      img: [img1],
      brand: "Matardana",
      quantity:1
    },
    {
      id: 2,
      name: "Singhara Fruit (kuchha)",
      nameH: "सिंघाड़ा फल (कच्चा)",
      newprice: " 75.00",
      qty: "1 KG",
      oldprice: "100.00",
      discount: "25% off",
      img: [img2],
      brand: "Matardana",
      quantity:1
    },
    {
      id: 3,
      name: "Coconut(Medium)",
      nameH: "नारियल",
      newprice: "35.00",
      qty: " 1 Piece",
      oldprice: "50.00",
      discount: "30% off",
      img: [img3],
      brand: "Matardana",
      quantity:1
    },
    {
      id: 4,
      name: "Papaya",
      nameH: "पपीता",
      newprice: " 42.00",
      qty: "1 KG",
      oldprice: "60.00",
      discount: "30% off",
      img: [img4],
      brand: "Matardana",
      quantity:1
    },
    {
      id: 6,
      name: "Guava",
      nameH: "अमरुद",
      brand: "Matardana",
      oldprice: "75.00",
      newprice: "57.00",
      qty: "500 Gram",
      discount: "24% off",
      img: [f21],
      quantity:1  
    },
  ];
  useEffect(()=>{
    setProduct(product)
  },[product])
 

  
  const myfirestore = getFirestore();
  const getCartItem = async() => {
     const unsub = await myfirestore
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
    <div className="most-selling-container">
      <div className="most-selling-heading">Most Selling Product</div>
      <p class="view-all" onClick={() => handleClick("Vegetables")}>
        View All
      </p>

      <div className="most-selling-lists">
        {myProduct.map((item) => (
          <div key={item.id} className="mItem">
            <Card
              sx={{
                padding: "1rem 1rem",
                boxShadow: "none",
                height: "auto",
                width: { md: "14rem", xs: "9.5rem" },
              }}
            >
              {item.discount && (
                <div className="tag">
                  <span class="dot"></span>
                  &nbsp; {item.discount}&nbsp;
                </div>
              )}

              <CardMedia
                component="img"
                alt={item.name}
                height="100%"
                image={item.img[0]}
                onClick={() => handleViewItem(item)}
              />
              <CardContent>
                <Typography variant="body2" color="success">
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
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontSize: "0.75rem" }}
                  onClick={() => handleViewItem(item)}
                >
                  {item.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "100", fontSize: "0.75rem" }}
                >
                  {item.nameH}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                >
                  {item.oldprice != null && (
                    <span style={{ color: "gray" }}>
                      <CurrencyRupeeIcon
                        sx={{ fontWeight: "bold", fontSize: "0.65rem" }}
                      ></CurrencyRupeeIcon>
                      <s>{item.oldprice}</s>&nbsp;
                    </span>
                  )}
                  <CurrencyRupeeIcon
                    sx={{ fontWeight: "bold", fontSize: "0.65rem" }}
                  ></CurrencyRupeeIcon>
                  <span>{item.newprice}</span>
                </Typography>

                <FormControl fullWidth>
                  <Select
                    sx={{
                      borderRadius: "2rem",
                      height: "1.8rem",
                      fontSize: "0.65rem",
                    }}
                    //   labelId="demo-simple-select-label"
                    //   id="demo-simple-select"
                    value={item.qty}
                    //   label=""
                    //   onChange={handleChange}
                  >
                    <MenuItem value={item.qty}>{item.qty}</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isItemInCart(item) ? (
                  <div style={{ margin: "0", display: "flex" }}>
                    <button
                      style={{
                        border: "2px solid red",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      
                      
                    >
                      -
                    </button>
                    <input value={item.quantity} className="qty-input"></input>
                    <button
                      style={{
                        border: "2px solid green",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
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
                    <span style={{ fontSize: "0.65rem" }}>ADD TO CART</span>
                    &nbsp;
                    <ShoppingCartIcon
                      sx={{ fontSize: "1rem" }}
                    ></ShoppingCartIcon>
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MostSelling);
