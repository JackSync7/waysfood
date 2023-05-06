import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import Swal from "sweetalert2";

function Login() {
  let navigate = useNavigate();
  const [setMessage] = useState(false);
  const [loginRole, setLoginRole] = useState("");
  const [state, dispatch] = useContext(UserContext);
  const [getData, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...getData, [e.target.name]: e.target.value });
  };

  const loginValidation = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/login", getData);
      if (response) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        if (response.data.data.role === "partner") {
          setLoginRole("partner");
          // navigate("/partner-dashboard");
          location.reload();
        }
      } else {
        navigate("/");
      }
      setAuthToken(localStorage.token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome",
        showConfirmButton: false,
        timer: 1500,
      });

      setData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("register failed : ", err);
      Swal.fire({
        icon: "error",
        title: "Incorrect Email or password...",
        text: "Login Failed",
      });
    }
  });

  return (
    <div>
      {/* =================Modal Login=================== */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className=" modal cursor-pointer">
        <label className="bg-neutral-50 modal-box relative" htmlFor="">
          <h3 className="text-4xl text-yellowMain font-bold">Login</h3>
          <div className="py-4">
            <form
              onSubmit={(e) => loginValidation.mutate(e)}
              className=" flex flex-col gap-5 items-center mx-auto mt-10 justify-center "
            >
              <input
                onChange={handleChange}
                value={getData.email}
                name="email"
                type="email"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Email"
                required
              />
              <input
                onChange={handleChange}
                value={getData.password}
                name="password"
                type="password"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Password"
                required
              />

              <button className="bg-brownMain px-5 py-2 mt-4 w-3/4 rounded-md text-neutral-50">
                Login
              </button>
              <p className="text-slate-200 text-sm">
                Dont't have an account ? Click{" "}
                <a
                  //   onClick={() => {
                  //     setLoginModal(false);
                  //     setIsRegis(true);
                  //   }}
                  className="font-bold"
                  href="#"
                >
                  Here
                </a>{" "}
              </p>
            </form>
          </div>
        </label>
      </label>
      {/* ================End modal====================*/}
    </div>
  );
}

export default Login;
