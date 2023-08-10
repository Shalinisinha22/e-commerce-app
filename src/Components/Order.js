import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Divider from "@mui/material/Divider";
import "./Order.css";
import { getFirestore } from "redux-firestore";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from '@mui/icons-material/Payments';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";


function Order({ auth }) {
  const [orderId, setOrderId] = useState(uuidv4());
  const [item, setItem] = useState([]);
  const [amt,setAmt]=useState(0)
  const firestore = getFirestore();
  const navigate =useNavigate()

  const getDataFromDb = async () => {
    const unsub = firestore
      .collection("users")
      .doc(auth.uid)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data().order);
        setItem(snapshot.data().order);
        setAmt(snapshot.data().totalAmt)
        // setName(snapshot.data().name);
      });
    return () => {
      unsub();
    };
  };

  
  useEffect(() => {
    if(auth.uid){
      getDataFromDb();
    }
    
  }, [auth.uid, item]);
 const handleClick=()=>{
       navigate("/")
 }

 const myfirestore = useFirestore();

 const getOrderId=async()=>{
  let user = await myfirestore.collection("users").doc(auth.uid).get();
  user = user.data();
  await firestore.collection("users").doc(auth.uid).update({
       orderId:orderId
  });
 }
 useEffect(()=>{

 getOrderId()

 },[auth.uid])


 const handleOrderHistory=async()=>{
  
  let user = await firestore.collection("users").doc(auth.uid).get();
  user = user.data();
  let obj=[]
  if(user.orderHistory){
     obj=[...user.orderHistory , ...user.order]
  }
  else{
    obj=[...user.order]
  }
  
   await firestore.collection("users").doc(auth.uid).update({
    orderHistory: obj,
   
  });


}

useEffect(()=>{
  handleOrderHistory()
},[])

  return (
    <div class="containers" style={{display:"flex",flexDirection:"column"}}>
      <h3>Thanks for ordering</h3>
      <p>
        <span style={{ color: "green" }}>Order successful</span>
        <br></br>
        We appreciate your order, we’re currently processing it. So hang tight
        and we’ll send you confirmation very soon!
      </p>
      <hr></hr>

      <div class="order-containers">
        <h3>Tracking number</h3>
        <p>{orderId}</p>
        <Divider sx={{color:"gray"}}></Divider>

        {item.length != 0 ? (
          <>
            {item.map((product) => (
              <>
                <div key={product.name} class="order-product">
                  <img src={product.img} alt={product.name}></img>
                  <div
                    style={{
                      fontWeight: "700",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    {product.name}<br></br>
                    <small>{product.qtyy}</small>
                  </div>
             
                  <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    <CurrencyRupeeIcon
                      sx={{ fontWeight: "bold", fontSize: "0.85rem" }}
                    ></CurrencyRupeeIcon>
                    <span>{product.itemPrice? `${product.itemPrice}.00`:product.newprice}</span>{" "}
                  </div>
                </div>
                <Divider sx={{color:"gray"}}></Divider>
              </>
            ))}
          </>
        ) : (
          <CircularProgress></CircularProgress>
        )}
          </div>
          {/* <hr></hr> */}
        <div class="payment-info">
          
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            <h5>Subtotal</h5>
            </div>
            <div>  <CurrencyRupeeIcon
              sx={{ fontWeight: "bold", fontSize: "2rem" }}
            > </CurrencyRupeeIcon><span style={{fontWeight:"bold",fontSize:"1.2rem"}}>{amt}.00</span>
           </div>   
        </div>

     <Divider sx={{color:"gray"}}></Divider>
    
         <div class="payment-info">
          
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
            <h5>Total</h5>
            </div>
            <div>  <CurrencyRupeeIcon
              sx={{ fontWeight: "bold", fontSize: "2rem" }}
            > </CurrencyRupeeIcon><span style={{fontWeight:"bold",fontSize:"1.2rem"}}>{amt}.00</span>
           </div>   
        </div>  


        <div classname="adress"></div>

        <div className="payment-mode">
          <h6 style={{color:"gray"}}>Payment Mode</h6>
          <small style={{color:"gray"}}><PaymentsIcon color="success"></PaymentsIcon> &nbsp; Cash On Delivery</small>
        </div>


       <div class="home-btn">
        <Button onClick={handleClick}>Continue Shopping &nbsp; <EastIcon></EastIcon></Button>
        </div> 
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Order);
