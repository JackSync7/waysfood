import "./App.css";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
