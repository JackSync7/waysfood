import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import AddProduct from "./pages/partner/AddProduct";
import Maps from "./pages/showMap";
import DetailMenu from "./pages/customer/DetailMenu";
import Checkout from "./pages/customer/Checkout";
import {
  PrivateRouteLogin,
  PrivateRouteCustomer,
  PrivateRoutePartner,
} from "./PrivateRoute";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userState, userDispatch] = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (userState.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      userDispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      userDispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? null : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRouteLogin />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route element={<PrivateRoutePartner />}>
                <Route
                  path="/partner-dashboard"
                  element={<PartnerDashboard />}
                />
                <Route path="/add-product" element={<AddProduct />} />
              </Route>
              <Route element={<PrivateRouteCustomer />}>
                <Route path="/detail-menu/:id" element={<DetailMenu />} />
                <Route path="/checkout/:id" element={<Checkout />} />
              </Route>
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
