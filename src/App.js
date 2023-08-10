import "./App.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import Category from "./Components/Category";
import PoojaSpecial from "./Components/PoojaSpecial";
import SecondBanner from "./Components/SecondBanner";
import TodayOffer from "./Components/TodayOffer";
import MostSelling from "./Components/MostSelling";
import Navbar from "./Components/Navbar";
import Brands from "./Components/Brands";
import Call from "./Components/Call";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgotPassword from "./Components/ForgotPassword";
import Shop from "./Components/Shop";
import BrandShop from "./Components/BrandShop";
import Overview from "./Components/Overview";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import PrivateRoute from "./Components/PrivateRoute";
import Offer from "./Components/Offer";
import About from "./Components/About";
import Wallet from "./Components/Wallet";
import SaveProduct from "./Components/SaveProduct";
import Requested from "./Components/Requested";
import Delivery from "./Components/Delivery";
import Terms from "./Components/Terms";
import Privacy from "./Components/Privacy";
import Refund from "./Components/Refund";
import FAQ from "./Components/FAQ";
import OrderHistory from "./Components/OrderHistory";
import Contact from "./Components/Contact";
import Feedback from "./Components/Feedback";
import Order from "./Components/Order";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Navbar></Navbar>
                <Banner /> <Category></Category>
                <PoojaSpecial></PoojaSpecial>
                <TodayOffer></TodayOffer>
                <SecondBanner></SecondBanner>
                <MostSelling></MostSelling>
                <Brands></Brands>
                <Call></Call>
              </>
            }
          />

          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route
            exact
            path="/forgotpass"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            exact
            path="/shop/:id"
            element={
              <>
                <Header></Header>
                <Shop></Shop>
                <Navbar></Navbar>
              </>
            }
          ></Route>
          <Route
            exact
            path="/brand/:id"
            element={
              <>
                <Header></Header>
                <BrandShop></BrandShop>
                <Navbar></Navbar>
              </>
            }
          ></Route>
          <Route
            exact
            path="/overview"
            element={
              <>
                <Header></Header>
                <Overview></Overview>
                <Navbar></Navbar>
              </>
            }
          ></Route>
          <Route
            exact
            path="/wishlist"
            element={
              <PrivateRoute>
                <Header></Header> <Navbar></Navbar> <Wishlist></Wishlist>
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Cart></Cart>
              </>
            }
          ></Route>
          <Route
            exact
            path="/save"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <SaveProduct></SaveProduct>
              </>
            }
          ></Route>
          <Route
            exact
            path="/offer"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Offer></Offer>
              </>
            }
          ></Route>
          <Route
            exact
            path="/about"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <About></About>
              </>
            }
          ></Route>
          <Route
            exact
            path="/wallet"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Wallet></Wallet>
              </>
            }
          ></Route>
          <Route
            exact
            path="/request"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Requested></Requested>
              </>
            }
          ></Route>
          <Route
            exact
            path="/delivery"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Delivery></Delivery>
              </>
            }
          ></Route>
          <Route
            exact
            path="/terms"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Terms></Terms>
              </>
            }
          ></Route>
          <Route
            exact
            path="/privacy"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Privacy></Privacy>
              </>
            }
          ></Route>
          <Route
            exact
            path="/refund"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Refund></Refund>
              </>
            }
          ></Route>
          <Route
            exact
            path="/faq"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <FAQ></FAQ>
              </>
            }
          ></Route>
          <Route
            exact
            path="/orderHistory"
            element={
              <PrivateRoute>
                <Header></Header>
                <Navbar></Navbar>
                <OrderHistory></OrderHistory>
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/contact"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Contact></Contact>
              </>
            }
          ></Route>
          <Route
            exact
            path="/feedback"
            element={
              <>
                <Header></Header>
                <Navbar></Navbar>
                <Feedback></Feedback>
              </>
            }
          ></Route>

       <Route
            exact
            path="/orderPage"
            element={
              <PrivateRoute>
                <Header></Header>
                {/* <Navbar></Navbar> */}
                <Order></Order>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
