import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";

import { isLoaded } from "react-redux-firebase";

import "./Register.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/action";

function Register(props) {
  console.log(props.authMine);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (props.auth?.uid) {
      navigate("/");
    }
  }, [props]);

  const onSubmit = async () => {
    
    if (!number.match(phoneno)) {
      setError("Please enter valid number")
      setTimeout(() => {
        setError("")
      },3000);
        
    }
   else{
    const res = await props.register({
      email: email,
      password: password,
      phoneNumber: number,
      name: name,
    });

    if (props.auth.uid != null) {
      navigate("/");
    }

   }       
   
  };

  return (
    <>
      {!isLoaded(props.auth) ? (
        <></>
      ) : props.authMine.loading ? (
        <h4 style={{ marginTop: "10%", height: "52vh", textAlign: "center" }}>
          <CircularProgress></CircularProgress>
        </h4>
      ) : (
        <div class="register-cont">
          <div class="register-form">
            <Card
              sx={{
                width: { md: "30rem", xs: "25rem" },
                borderRadius: "2rem",
                padding: "0.2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
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
                  <small>Sign up to Continue</small>
                </Typography>
                    {error? <Alert severity="error">{error}</Alert>:<></>}
            
                <Typography gutterBottom variant="h5" component="div">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    required
                    spellCheck="false"
                    label={
                      <>
                        <PersonIcon></PersonIcon>&nbsp;&nbsp;
                        <span style={{}}>Username</span>
                      </>
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    type="email"
                    required
                    spellCheck="false"
                    label={
                      <>
                        <EmailIcon></EmailIcon>&nbsp;&nbsp;
                        <span style={{}}>Email</span>
                      </>
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    type="number"
                    required
                    label={
                      <>
                        <LocalPhoneIcon></LocalPhoneIcon>&nbsp;&nbsp;
                        <span style={{}}>Mobile number</span>
                      </>
                    }
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />

                  <FormControl
                    sx={{ width: "100%" }}
                    margin="normal"
                    variant="outlined"
                    required
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      {<LockIcon></LockIcon>} Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={
                        <>
                          <LockIcon></LockIcon> &nbsp;&nbsp;
                          <span style={{}}>Password</span>
                        </>
                      }
                    />
                  </FormControl>

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={
                      <>
                        <LockIcon></LockIcon>
                        &nbsp;&nbsp;
                        <span style={{}}>Referral Code (optional)</span>
                      </>
                    }
                    value={refCode}
                    onChange={(e) => setCode(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                </Typography>
              </CardContent>
              {props.authMine.error ? (
                <div className="input-group full">
                  <span className="error-message">{props.authMine.error}</span>
                </div>
              ) : (
                <></>
              )}

              <CardActions>
                <Button
                  size="small"
                  sx={{ borderRadius: "2rem" }}
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </div>

          <Card
            sx={{
              width: "18rem",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <CardActions>
              <span>Already have an Account</span>
              <Button
                size="small"
                sx={{ fontSize: "0.75rem", color: "red", paddingTop: "0.3rem" }}
                onClick={handleClick}
              >
                CLICK HERE
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authMine: state.Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (userData) => {
      dispatch(register(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
