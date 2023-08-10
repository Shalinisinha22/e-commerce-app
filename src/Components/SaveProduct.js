import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { viewItem } from "../redux/action";
import { getFirestore } from "redux-firestore";
import { useNavigate } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./Cart.css";

function SaveProduct({ auth, viewItem }) {
  const [save, setSave] = useState([]);

  const firestore = getFirestore();
  const getData=()=>{
    const unsub = firestore
    .collection("users")
    .doc(auth.uid)
    .onSnapshot((snapshot) => {
      setSave(snapshot.data().saveItem);
    });
  return () => {
    unsub();
  };
  }

  useEffect(() => {
    if(auth.uid){
       getData()
    }
    else{
      let save = JSON.parse(localStorage.getItem("save" || "[]"));
    
      if (save != null) {
        setSave(save);
      }
     
    }
   
  }, [auth.uid]);

  const navigate = useNavigate();

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  const handleViewItem = async (item) => {
    await viewItem(item);
    navigate("/overview");
  };

  const handleRemove = async (name) => {
    if(auth.uid){
      let user = await firestore.collection("users").doc(auth.uid).get();
      user = user.data();
      let obj = [];
      obj = user.saveItem.filter((product) => product.name !== name);
      await firestore.collection("users").doc(auth.uid).update({
        saveItem: obj,
      });

    }
    else{
      let save = JSON.parse(localStorage.getItem("save" || "[]"));
      if (save.length != 0) {
        save = save.filter((product) => product.name != name);
        localStorage.setItem("save", JSON.stringify(save));
        setSave(save);
      }
    }
  
  };

  return (
    <>
      <div class="containers">
        {save.length === 0 ? (
          <p tyle={{fontSize:"0.75rem"}}>No Data found </p>
        ) : (
          save.map((item) => (
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
                      style={{ fontWeight: "700", cursor: "pointer",fontSize:"0.85rem" }}
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
                      <span>{item.newprice}</span>
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

                    <Button
                      size="small"
                      fullwidth
                      variant="contained"
                      color="error"
                      onClick={() => handleRemove(item.name)}
                      sx={{boxShadow:"rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}
                    >
                      <DeleteIcon></DeleteIcon> Remove
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    viewItem: (item) => dispatch(viewItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveProduct);
