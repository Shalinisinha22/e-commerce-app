import { combineReducers } from "redux"; 
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import Reducer from "./Reducer";
// import authReducer from "./reducer/authReducer";



export const rootReducer=combineReducers({
  
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    Reducer:Reducer



})