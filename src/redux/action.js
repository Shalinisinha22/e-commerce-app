import * as actionType from "./allActions";

export const viewItem = (item) => {
  return {
    type: actionType.VIEW_ITEM,
    payload: item,
  };
};

export const addToWishlist = (item) => {
  return {
    type: actionType.ADD_TO_WISHLIST,
    payload: item,
  };
};

export const removeFromWishlist = (item) => {
  return {
    type: actionType.REMOVE_FROM_WISHLIST,
    payload: item,
  };
};
export const addToCart = (item) => {
  return {
    type: actionType.ADD_TO_CART,
    payload: item,
  };
};
export const removeFromCart = (name) => {
  return {
    type: actionType.REMOVE_FROM_CART,
    payload:name,
  };
};

export const updatedQty=(qty)=>{
    return{
        type:actionType.UPDATE_QTY,
        payload:qty
    }
}

//signup action

//signup
const registerReq = () => {
  return {
    type: actionType.SIGN_UP_REQ,
  };
};
const registerSucc = () => {
  return {
    type: actionType.SIGN_UP_SUCC,
  };
};

const registerFail = (error) => {
  return {
    type: actionType.SIGN_UP_FAIL,
    payload: error.message,
  };
};

const removeError = () => {
  return {
    type: actionType.REMOVE_ERROR,
  };
};

export const register = (userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(registerReq());

    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(async (data) => {
        // send verification mail.
        // const verify = await data.user.sendEmailVerification();
        // alert("Email Verified");

       

        const res = await firestore.collection("users").doc(data.user.uid).set({
          email: userData.email,
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          password: userData.password,
          cart: [],
          wishlist: [],
          saveItem:[]
        });
        const cart=JSON.parse(localStorage.getItem("cart" || "[]"))
        if(cart.length!==0){
          await firestore.collection("users").doc(data.user.uid).update({
            cart: cart,
          });
        }
        const save=JSON.parse(localStorage.getItem("save" || "[]"))
        if(save.length!==0){
          await firestore.collection("users").doc(data.user.uid).update({
            saveItem: save,
          });
        }
        //success
        dispatch(registerSucc());
      })
      .catch((error) => {
        dispatch(registerFail(error));
        setTimeout(() => {
          dispatch(removeError());
        }, 3000);
      });
  };
};

//sign-in

const loginReq = () => {
  return {
    type: actionType.SIGN_IN_REQ,
  };
};
const loginSucc = () => {
  return {
    type: actionType.SIGN_IN_SUCC,
  };
};

const loginFail = (error) => {
  return {
    type: actionType.SIGN_IN_FAIL,
    payload: error.message,
  };
};

export const login = (userData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(loginReq());
    const firebase = getFirebase();
    const firestore=getFirestore()
    try {
      const data = await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);

        const cart=JSON.parse(localStorage.getItem("cart" || "[]"))
        if(cart.length!==0){
          await firestore.collection("users").doc(data.user.uid).update({
            cart: cart,
          });
        }
        const save=JSON.parse(localStorage.getItem("save" || "[]"))
        if(save.length!==0){
          await firestore.collection("users").doc(data.user.uid).update({
            saveItem: save,
          });
        }
      //success
      dispatch(loginSucc());
    //   alert("Login Successfully")
    } catch (error) {
      dispatch(loginFail(error));
      setTimeout(() => {
        dispatch(removeError());
      }, 3000);
    }
  };
};

//logout

const logoutReq = () => {
  return {
    type: actionType.SIGN_OUT_REQ,
  };
};
const logoutSucc = () => {
  return {
    type: actionType.SIGN_OUT_SUCC,
  };
};
const logoutFail = (error) => {
  return {
    type: actionType.SIGN_OUT_FAIL,
    payload: error.message,
  };
};

const resetPassword = () => {
  return {
    type: actionType.FORGOT_PASSWORD,
  };
};

export const logout = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(logoutReq());
    const firebase = getFirebase();
    try {
      const res = await firebase.auth().signOut();
      localStorage.clear();
      dispatch(logoutSucc());
    } catch (error) {
      dispatch(logoutFail(error));
      setTimeout(() => {
        dispatch(removeError());
      }, 5000);
    }
  };
};

export const resetPass = (email) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(resetPassword());
    const firebase = getFirebase();
    try {
      const res = await firebase.auth().sendPasswordResetEmail(email);

      //success
      alert(`Link is send to your email account ${email}`);
    } catch (error) {
      alert(error.message);
    }
  };
};
