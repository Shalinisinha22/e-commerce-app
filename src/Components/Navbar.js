import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../redux/action";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { getFirestore } from "redux-firestore";
import ViewListIcon from '@mui/icons-material/ViewList';

function Navbar(props) {
  const navigate = useNavigate();
  const [myCart, setcart] = useState([]);

  const[active,setActive]=useState("home")

  const firestore = getFirestore();

  const getData = () => {
    const unsub = firestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.data().cart)
        setcart(snapshot.data().cart);
        return () => {
          unsub();
        };
      });
  };

 

  useEffect(() => {
    if(props.auth.uid) 
    {
      getData();
    } 
    else{
      let cart=JSON.parse(localStorage.getItem("cart" || "[]"))
      if(cart!=null){
        setcart(cart)  
      }
      else{
        setcart([])
      }
          
      }
    
  },[myCart,props.auth.uid]);

  // const handleLogout = async () => {
  //   const res = await props.logout();
  //   if (props.auth.uid == null) {
  //     navigate("/login");
  //   }
  //   console.log("The user will sign out");
  //   alert("Logout Succesfully");
  // };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

 
  const handleClick=()=>{
    navigate("/cart")
    setActive("cart")
  }

  return (
    <div className="navbar-cont">
      <div
        classname="items-cont"
        style={{
          background: "",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem 1rem",
          cursor: "pointer",
        }}
      >
        <div
          class="nav-item"
          onClick={()=>setActive("home")}
        >
          <Link to="/" style={{ textDecoration: "none", color: active=="home"?"yellow":"white" }}>
            <HomeIcon sx={{ color: active=="home"?"yellow":"white" }}></HomeIcon>
            Home
          </Link>
        </div>
        &nbsp;
        <div
          class="nav-item"
          onClick={()=>setActive("category")}
        
        >
       <a href="#category" style={{textDecoration:"none",color:active=="category"?"yellow": "white"}}><ViewListIcon></ViewListIcon>
          Category</a>   


          {/* {props.auth.uid ? (
            <div onClick={handleLogout}>
              <ExitToAppIcon></ExitToAppIcon>Logout
            </div>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              
              <PersonIcon sx={{ color: "white" }}></PersonIcon>
              Profile
            </Link>
          )} */}
        </div>
        &nbsp;
        <div classname="items">
          <Fab
            sx={{ color: "white", height: "2rem", width: "2.5rem" }}
            aria-label="add"
          >
            <AddIcon sx={{ color: "#20bf6b", fontSize: "2rem" }} />
          </Fab>
        </div>
        &nbsp;
        <div
          class="nav-item"
          // style={{ width: "7rem" }} 
          onClick={()=>setActive("offer")}
          >
          <i
            class="fa fa-gift"
            aria-hidden="true"
            style={{ fontSize: "1rem", color: active=="offer"?"yellow": "white" }}
          ></i>
          <Link
            to="/offer"
            style={{ textDecoration: "none", color: active=="offer"?"yellow": "white"}}
          >
            My Offer
          </Link>
        </div>
        &nbsp;

        <div
          class="nav-item"
          onClick={handleClick}
          // style={{background:"red"}}
          
          
          >
          {/* <Link to="/cart"    style={{ textDecoration: "none", color: active=="cart" ? "black": "white" }}> */}
            <IconButton aria-label="cart" onClick={handleClick} >
              <StyledBadge
                badgeContent={myCart?myCart.length:"0"}
                color="primary" 
              >
                <ShoppingCartIcon  sx={{ color:active=="cart" ? "yellow": "white"}} />
              </StyledBadge>
            </IconButton>
            <span style={{color:active=="cart" ? "yellow": "white"}}>Cart</span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    cart: state.Reducer.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
