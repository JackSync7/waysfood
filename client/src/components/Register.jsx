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
    fullname: "",
    gender: "",
    phone: "",
    location: "",
    role: "",
  });
  const handleChange = (e) => {
    setData({ ...getData, [e.target.name]: e.target.value });
  };

  const registerHandle = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/register", getData);
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
        fullname: "",
        gender: "",
        phone: "",
        location: "",
        role: "",
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
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className=" modal cursor-pointer">
        <label className="bg-neutral-50 modal-box relative" htmlFor="">
          <h3 className="text-4xl text-yellowMain font-bold">Register</h3>
          <div className="py-4">
            <form
              onSubmit={(e) => registerHandle.mutate(e)}
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
              <input
                onChange={handleChange}
                value={getData.fullname}
                name="fullname"
                type="fullname"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Fullname"
                required
              />
              <input
                onChange={handleChange}
                value={getData.phone}
                name="phone"
                type="phone"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Phone"
                required
              />
              <select
                required
                onChange={handleChange}
                value={getData.gender}
                name="gender"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                id="gender"
              >
                <option value="male">Mele</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                required
                onChange={handleChange}
                value={getData.role}
                name="role"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                id="role"
              >
                <option value="partner">Partner</option>
                <option value="customer">Customer</option>
              </select>
              <button className="bg-brownMain px-5 py-2 mt-4 w-3/4 rounded-md text-neutral-50">
                Register
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
