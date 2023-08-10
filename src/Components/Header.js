import * as React from "react";
import { useEffect, useRef } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/matardanalogo.png";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import user from "../assets/user.png";
import Avatar from "@mui/material/Avatar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ModeIcon from "@mui/icons-material/Mode";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { getFirestore } from "redux-firestore";
import { connect } from "react-redux";
import { logout } from "../redux/action";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { listItemIconClasses } from "@mui/material";
import { LogoDevOutlined } from "@mui/icons-material";

function Header(props) {
  const [flag, setFlag] = useState(true);
  const [subItem, setSub] = useState(false);
  const [myCart, setcart] = useState([]);
  const [username, setName] = useState("");
  const [active,setActive]=useState(false);
  // const [logo,setLogo]=useState([])

  const [open, setOpen] = useState(false);


  // const loadLogo=async()=>{
  //   const res=await axios.get("https://matardana-api-xrjf.vercel.app/")
  //   const data=res.data
  //   // console.log(data)
  //   setLogo(data)

  // }


  // useEffect(()=>{
  //   loadLogo()

  // },[])

  const firestore = getFirestore();

  const getData = () => {
    const unsub = firestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.data().cart)
        setcart(snapshot.data().cart);
        setName(snapshot.data().name);
        return () => {
          unsub();
        };
      });
  };

  useEffect(() => {
    if (props.auth.uid) getData();
  }, [props.auth.uid, props]);

  const handleSearch = () => {
    setFlag(!flag);
    console.log(flag);
    let searchBar = document.querySelector(".search-bar");
    let header = document.querySelector(".header");
    if (flag == true) {
      searchBar.style.display = "block";
      // header.style.marginBottom="6rem";
    } else {
      searchBar.style.display = "none";
      // header.style.marginBottom="4rem";
    }
  };

  const navigate = useNavigate();

  const handleWishlist = () => {
    navigate("/wishlist");
    setOpen(false);
  };
  const handleOffer = () => {
    navigate("/offer");
    setOpen(false);
  };
  const handleAbout = () => {
    navigate("/about");
    setOpen(false);
  };
  const handleWallet = () => {
    navigate("/wallet");
    setOpen(false);
  };
  const handleSave = () => {
    navigate("/save");
    setOpen(false);
  };
  const handleRequest = () => {
    navigate("/request");
    setOpen(false);
  };
  const handleDelivery = () => {
    navigate("/delivery");
    setOpen(false);
  };

  const handleTerms = () => {
    navigate("/terms");
    setOpen(false);
  };
  const handlePrivacy = () => {
    navigate("/privacy");
    setOpen(false);
  };
  const handleRefund = () => {
    navigate("/refund");
    setOpen(false);
  };
  const handleFAQ = () => {
    navigate("/faq");
    setOpen(false);
  };
  const handleOrderHistory = () => {
    navigate("/orderHistory");
    setOpen(false);
  };
  const handleContact = () => {
    navigate("/contact");
    setOpen(false);
  };
  const handleFeedback = () => {
    navigate("/feedback");
    setOpen(false);
  };

  const handleInfo = () => {
    setSub(!subItem);
    setActive(!active)
  };
  const handleLogout = async () => {
    const res = await props.logout();
    setName("");
    if (props.auth.uid == null) {
      navigate("/login");
    }
    console.log("The user will sign out");
    alert("Logout Succesfully");
    navigate("/");

    setOpen(false);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current)
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
    
    
      <div class="header" sx={{position:"fixed"}}>
        <Box sx={{ flexGrow: 1}}>
          <AppBar position="static" sx={{ background: "#ffffff" }}>
            <Toolbar >
              <IconButton
                size="large"
                edge="start"
                // color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                  color: "green",
                  marginLeft: { md: "4rem", sm: "2rem" },
                }}
                // classname="menu-icon"
                // onClick={handleOpen}
                onClick={() => setOpen(!open)}
              >
                <MenuIcon sx={{ fontSize: { md: "3rem", xs: "1.5rem" } }} />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, paddingTop: "1rem",display:"flex",justifyContent:"center",marginRight:"5%"}}
              >
              
                
         

                    <Link to="/">
                 
                    <img
                      src={logo}
                      alt="Company-logo"
                      classname="company-logo"
                      style={{ height: "4.5rem", cursor: "pointer"}}
                    ></img>
                  </Link>

                

              
                
                
                       
                      
                      

                  
                  
                 
                
              
              </Typography>
              {/* <Button
                color="inherit"
                classname="search-btn"
                onClick={handleSearch}
                sx={{ marginRight: { md: "7rem", sm: "2rem" } }}
              >
                <SearchIcon
                  sx={{
                    color: "green",
                    fontSize: { md: "3rem", xs: "1.5rem" },
                  }}
                ></SearchIcon>
              </Button>
          
            <input
              type="search"
              class="search-bar form-control"
              style={{
                width: "60%",
                marginLeft: "25%",
                marginBottom: "1rem",
                display: flag ? "none" : "block",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              placeholder="Search...."
            ></input> */}
              </Toolbar>

          </AppBar>
        </Box>

        <div
          className={open ? "menu-bar active" : "menu-bar inactive"}
          ref={menuRef}
        >
          {/* style={{display:menu?"block":"none"}} */}
          <div class="user-image">
            <Avatar
              sx={{ height: "3rem", width: "3rem" }}
              alt="user"
              src={user}
            />
            <div class="about-user">
              <h4>{props.auth.uid ? "Online" : "Offline"}</h4>
              <h4>{username ? username : "My Profile"}</h4>
            </div>
          </div>
          <div class="user-list">
            <div class="item active-item" onClick={handleWallet}>
              <h5 style={{ fontSize: "1rem" }}>My Wallet</h5>
              <h5>
                <CurrencyRupeeIcon
                  sx={{ fontSize: "1rem" }}
                ></CurrencyRupeeIcon>{" "}
                0.00
              </h5>
            </div>

            <div class="item" onClick={handleOffer}>
              <h5>My Offer</h5>
              <i
                class="fa fa-gift"
                aria-hidden="true"
                style={{ fontSize: "1rem", color: "white" }}
              ></i>
            </div>

            <div class="item" onClick={handleSave}>
              <h5>Save Later</h5>
              <h5>
                <SellIcon></SellIcon>
              </h5>
            </div>
            <div class="item" onClick={handleWishlist}>
              <h5>Wishlist</h5>
              <h5>
                <FavoriteIcon></FavoriteIcon>
              </h5>
            </div>
            <div class="item" onClick={handleRequest}>
              <h5>Requested Product</h5>
              <h5>
                <FavoriteIcon></FavoriteIcon>
              </h5>
            </div>
            <div class={active? "item active-item":"item"} onClick={handleInfo}>
              <h5>My Info</h5>
              <h5>
                <ExpandMoreIcon></ExpandMoreIcon>
              </h5>
            </div>
            <div
              class="subitem"
              style={{ display: subItem ? "block" : "none" }}
            >
              <div class="item" onClick={handleAbout}>
                <h5>
                   About Us
                </h5>
                <h5>
                  <PersonIcon sx={{ fontSize: "1rem" }}></PersonIcon>
                </h5>
              </div>
              <div class="item" onClick={handleDelivery}>
                <h5>
                  Delivery Info
                </h5>
                <h5>
                  <i class="fas fa-info"></i>
                </h5>
              </div>
              <div class="item" onClick={handleTerms}>
                <h5>
                 Terms & Condition
                </h5>
                <h5>
                  <LocalPhoneIcon sx={{ fontSize: "1rem" }}></LocalPhoneIcon>
                </h5>
              </div>
              <div class="item" onClick={handlePrivacy}>
                <h5>
                  Privacy Policy
                </h5>
                <h5>
                  <InsertDriveFileIcon
                    sx={{ fontSize: "1rem" }}
                  ></InsertDriveFileIcon>
                </h5>
              </div>
              <div class="item" onClick={handleRefund}>
                <h5>
                  Refund Policy
                </h5>
                <h5>
                  <InsertDriveFileIcon
                    sx={{ fontSize: "1rem" }}
                  ></InsertDriveFileIcon>
                </h5>
              </div>
              <div class="item" onClick={handleFAQ}>
                <h5>
                   FAQ
                </h5>
                <h5>
                  <LiveHelpIcon sx={{ fontSize: "1rem" }}></LiveHelpIcon>
                </h5>
              </div>
            </div>

            {props.auth.uid && (
              <div class="item" onClick={handleOrderHistory}>
                <h5>Order History</h5>
                <h5>
                  <AccessTimeIcon sx={{ fontSize: "0.85rem" }}></AccessTimeIcon>
                </h5>
              </div>
            )}

            <div class="item" onClick={handleContact}>
              <h5>Support</h5>
              <h5>
                <LocalPhoneIcon></LocalPhoneIcon>
              </h5>
            </div>
            <div class="item" onClick={handleFeedback}>
              <h5>Feedback</h5>
              <h5>
                <ModeIcon></ModeIcon>
              </h5>
            </div>
            {props.auth.uid ? (
              <div class="item" onClick={handleLogout}>
                <h5>Logout</h5>
                <h5>
                  <LogoutIcon></LogoutIcon>
                </h5>
              </div>
            ) : (
              <div class="item" onClick={() => navigate("/login")}>
                <h5>Login</h5>
                <h5>
                  <LogoutIcon></LogoutIcon>
                </h5>
              </div>
            )}
          </div>

          {/* <div
          className="cancel-icon"
          style={{position:"absolute",bottom:"2rem",left:"5rem" }}
        >
          <CloseIcon
            sx={{ fontSize: "2rem", color: "white" }}
            // onClick={handleClose}
            // onClick={()=>setOpen(false)}
          ></CloseIcon>
        </div> */}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
