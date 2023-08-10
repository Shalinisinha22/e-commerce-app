import React from 'react';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Wallet() {
  return (

    <>
    <div class="wallet-container" style={{height:"10rem",margin:"2.5rem 2rem",display:"flex",justifyContent:"center",flexDirection:"column",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",alignItems:"center",borderRadius:"2rem"}}>
        <h5 style={{color:"#4cd137",fontFamily:"Lemonade",fontWeight:"bold"}}>Your Wallet Value</h5>
        <div style={{height:"3rem",width:"5rem",background:"#f1f2f6",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}><CurrencyRupeeIcon></CurrencyRupeeIcon><h4>0.00</h4></div>
    </div>


    <h5 style={{fontFamily:"Lemonade",fontWeight:"bold"}}>Your Transaction History</h5>
    <TableContainer component={Paper} sx={{marginBottom:"8rem"}}>
      <Table   aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{fontWeight:"bold"}}>SNO.</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Date</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">OrderID</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Credit Amount</TableCell>
            <TableCell sx={{fontWeight:"bold"}} align="right">Debit Amount</TableCell>
          </TableRow>
        </TableHead>
        </Table>
      </TableContainer>

    </>

  )
}

export default Wallet