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
import registerImg from "../assets/registernow.gif";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { CircularProgress } from "@mui/material";
import { isLoaded } from "react-redux-firebase";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/action";
import { connect } from "react-redux";

function Login(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (props.auth?.uid) {
      navigate("/");
    }
  }, [props]);

  const onSubmit = async () => {
    let obj = { email: email, password: password };
    console.log(obj);
    const res = await props.login(obj);
    if (props.auth.uid != null) {
      navigate("/");
    }
  };

  const handleClick = () => {
    navigate("/register");
  };
  const handleSkip = () => {
    navigate("/");
  };
  return (
    <>
      {props.authMine.loading ? (
        <h4 style={{ marginTop: "10%", height: "52vh", textAlign: "center" }}>
          <CircularProgress />
        </h4>
      ) : (
        <div class="login-cont">
          <div class="login-form">
            <Card
              sx={{
                borderRadius: "2rem",
                padding: "1rem",
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
                  <small>Sign in to Continue</small>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    type="email"
                    spellCheck="false"
                  
                    label={
                      <>
                        <EmailIcon></EmailIcon>&nbsp;&nbsp;
                        <span style={{ fontSize: "0.75rem" }}>Email</span>
                      </>
                    }
                    variant="outlined"
                    margin="dense"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <FormControl
                    sx={{ width: "100%" }}
                    margin="normal"
                    variant="outlined"
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
                          <span style={{ fontSize: "0.75rem" }}>Password</span>
                        </>
                      }
                    />
                  </FormControl>
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/forgotpass">
                  {" "}
                  <Button
                    size="small"
                    sx={{ color: "red", fontSize: "0.75rem" }}
                  >
                    Forgot Password
                  </Button>
                </Link>
              </CardActions>
              {props.authMine?.error ? (
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
              width: "15rem",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardActions>
              <img
                onClick={handleClick}
                src={registerImg}
                alt="register"
                style={{ width: "10rem", cursor: "pointer" }}
              ></img>
            </CardActions>
            <CardActions>
              <Button
                size="small"
                sx={{ fontSize: "0.75rem", color: "gray" }}
                onClick={handleSkip}
              >
                Skip
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
    login: (userData) => {
      dispatch(login(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
