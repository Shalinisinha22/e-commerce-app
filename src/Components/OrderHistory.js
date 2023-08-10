import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "redux-firestore";
import { connect } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import { v4 as uuidv4 } from "uuid";

function OrderHistory({ auth }) {
  const [orderItem, setOrderItem] = useState([]);
  const [amt, setAmt] = useState(0);
  const firestore = getFirestore();


  const getDataFromDb = async () => {
    const unsub = firestore
      .collection("users")
      .doc(auth.uid)
      .onSnapshot((snapshot) => {
        setOrderItem(snapshot.data().orderHistory);
        setAmt(snapshot.data().totalAmt);
        // setOrderId(snapshot.data().orderId)
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    if (auth.uid) {
      getDataFromDb();
    }
  }, [auth.uid]);

  return (
    <div
      className="order-history"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "2rem",
        overflow:"auto",
        marginBottom:"4rem"
      }}
    >
      <h3>Order History</h3>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order NO.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Product
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Payment Mode
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItem.length == 0 ? (
              <p>No Order Found</p>
            ) : (
              <>
                {orderItem.map((product) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {uuidv4()}
                    </TableCell>
                    <TableCell align="right">
                      {product.name}
                      <img
                        src={product.img}
                        style={{ width: "2rem", height: "2rem" }}
                      ></img>{" "}
                    </TableCell>
                    <TableCell align="right">
                      Delivered on 21'st August, 2023
                    </TableCell>
                    <TableCell align="right">
                      <PaymentsIcon color="success"></PaymentsIcon> Cash on
                      Delivery
                    </TableCell>
                    <TableCell align="right">
                      <CurrencyRupeeIcon></CurrencyRupeeIcon>
                      {product.itemPrice ? product.itemPrice : product.newprice}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(OrderHistory);
