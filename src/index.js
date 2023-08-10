import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from './redux/store';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { rootReducer } from './redux/rootReducer.js';
// D:\React tutorial\resume-builder-project\src\redux\reducers\rootReducer.js
import { Provider } from 'react-redux';
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import {ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';



const root = ReactDOM.createRoot(document.getElementById('root'));

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6GWoRYDGcELGne7DEe2gmHrbi_ucyzdI",
  authDomain: "ecommerce-83eaf.firebaseapp.com",
  projectId: "ecommerce-83eaf",
  storageBucket: "ecommerce-83eaf.appspot.com",
  messagingSenderId: "1024503539306",
  appId: "1:1024503539306:web:f5908bb8847c57811e4c13"
};
firebase.initializeApp(firebaseConfig)
firebase.firestore()
const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase)))
root.render(
 <>
  <Provider store={reduxStore}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
 </>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

