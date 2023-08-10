import initialState from "./initialState.json";
import * as actionTypes from "./allActions";

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_ITEM:
      return {
        ...state,
        currItem: action.payload,
      };

      
    case actionTypes.ADD_TO_WISHLIST:
      //   const isPresent=state.wishlist.find((item)=>item.name===action.payload.name?true:false)

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case actionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    case actionTypes.ADD_TO_CART:
      const isInCart = state.cart.find((product) =>
        product.name === action.payload.name ? true : false
      );

      let qtyValue = action.payload.qty.split(" ");
      console.log(qtyValue);

      let value = Number(qtyValue[0]);
      console.log(value);
      let units = qtyValue[1];
      console.log(units);

      return {
        ...state,
        cart: isInCart
          ? state.cart.map((product) =>
              product.name === action.payload.name
                ? { ...product, qtyy: value + value + units }
                : product
            )
          : [...state.cart, { ...action.payload, qtyy: action.payload.qty }],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product.name !== action.payload),
      };


      //signup signin 
    case actionTypes.SIGN_UP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SIGN_UP_SUCC:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.SIGN_IN_REQ:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SIGN_IN_SUCC:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.SIGN_OUT_REQ:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SIGN_OUT_SUCC:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.REMOVE_ERROR:
      return {
        ...state,
        error: "",
      };

    case actionTypes.FORGOT_PASSWORD:
        return{
          ...state
        } 

    default:
      return state;
  }
};
export default Reducer;
