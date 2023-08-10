import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { connect } from "react-redux";
import { resetPass } from "../redux/action";
import Alert from "@mui/material/Alert";

function ForgotPassword(props) {
  const navigate = useNavigate();
  console.log(props)

  const[email,setEmail]=useState("")
  const[error,setError]=useState("")

  const onSubmit=async()=>{
     if(email == ""){
      setError("Please enter valid Email")
     }
     else{
        await props.resetPass(email)
        navigate("/login")
     }
  }

  const handleSkip = () => {
    navigate("/login");
  };
  return (
    <>
      <div class="login-cont">
        <div class="login-form">
          <Card sx={{ width: "25rem", borderRadius: "2rem", padding: "1rem" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  color: "green",
                  fontSize: "0.95rem",
                  fontFamily: "Lemonada",
                }}
              >
                Hello,<br></br>
                Welcome to Matardana!<br></br>
                <small>Forgot password</small>
              </Typography>
              {error? <Alert severity="error">{error}</Alert>:<></>}
              <Typography gutterBottom variant="h5" component="div">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  required
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  label={
                    <>
                      <EmailIcon></EmailIcon>&nbsp;&nbsp;
                      <span style={{ fontSize: "0.75rem" }}>
                        Enter Your Registered Email
                      </span>
                    </>
                  }
                  variant="outlined"
                  margin="dense"
                />
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                sx={{ borderRadius: "2rem" }}
                variant="contained"
                color="success"
                fullWidth
                onClick={onSubmit}
              >
                Send Link
              </Button>
            </CardActions>
          </Card>
        </div>
        <Card
          sx={{
            width: "15rem",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardActions>
            <Button
              size="small"
              sx={{ fontSize: "0.75rem", color: "gray" }}
              onClick={handleSkip}
            >
              BACK TO LOGIN PAGE
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

const mapDispatchToProps=(dispatch)=>{
  return{
    resetPass:(email)=> dispatch(resetPass(email))
  }
}


export default connect(null, mapDispatchToProps)(ForgotPassword);
