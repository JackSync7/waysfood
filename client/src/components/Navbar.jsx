import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Profile from "../assets/profile.png";
import Login from "../components/Login";
import Register from "../components/Register";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  let navigate = useNavigate();
  const [url, seturl] = useState("/");
  const [state, Dispatch] = useContext(UserContext);

  function logout() {
    Dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  }
  useEffect(() => {
    if (state.isLogin && state.user.role == "partner") {
      seturl("/partner-dashboard");
    }
  }, [state]);

  return (
    <div>
      {/* =================Modal Login======================*/}
      <Login />
      {/* ================End modal=========================*/}
      {/* ================Modal Register====================*/}
      <Register />
      {/* ================End modal=========================*/}
      <div className="w-full m-0  h-14  flex items-center fixed px-14 justify-between  bg-yellowMain">
        <Link to={url}>
          <img className="h-10 my-0" src={Logo} />
        </Link>
        <div>
          {/* =================MultiLogin============== */}
          {state?.isLogin && state?.user.role === "partner" && (
            <div className="flex mt-2 justify-center items-center gap-6">
              <div className="dropdown dropdown-hover dropdown-end">
                <img tabIndex={0} className="w-10 " src={Profile} />
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg p-2 shadow bg-neutral-50 flex flex-col gap-2 text-neutral-900 rounded-md py-5 w-48"
                >
                  <Link to="partner-dashboard">
                    <div className="flex items-center gap-2 px-5">
                      <HiOutlineClipboardList color="black" size={20} />
                      <div>Dashboard</div>
                    </div>
                  </Link>
                  <Link to="profile">
                    <div className="flex items-center gap-2 px-5">
                      <CgProfile color="black" size={20} />
                      <div>Profile Partner</div>
                    </div>
                  </Link>
                  <Link to={"add-product"}>
                    <div className="flex items-center gap-2 px-5">
                      <MdOutlineFastfood color="black" size={20} />
                      <div>Add Product</div>
                    </div>
                  </Link>
                  <div
                    onClick={() => logout()}
                    className="cursor-pointer flex items-center gap-2 px-5 pt-2 border-t-2 border-neutral-300"
                  >
                    <FiLogOut color="red" size={20} />
                    <div>Logout</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {state?.isLogin && state?.user.role === "customer" && (
            <div className="flex mt-2 justify-center items-center gap-6">
              <Link to={`/checkout/${state.user.id}`}>
                <FiShoppingCart color="black" size={25} />
              </Link>

              <div className="dropdown dropdown-hover dropdown-end">
                <img tabIndex={0} className="w-10 " src={Profile} />
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg p-2 shadow bg-neutral-50 flex flex-col gap-2 text-neutral-900 rounded-md py-5 w-48"
                >
                  <Link to="profile">
                    <div className="flex items-center gap-2 px-5">
                      <CgProfile color="black" size={20} />
                      <div>profile </div>
                    </div>
                  </Link>

                  <div
                    onClick={() => logout()}
                    className="cursor-pointer flex items-center gap-2 px-5 pt-2 border-t-2 border-neutral-300"
                  >
                    <FiLogOut color="red" size={20} />
                    <div>Logout</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ==================End MultiLogin============== */}
          {!state?.isLogin && (
            <div className="flex mt-2 justify-center items-center gap-2">
              <label
                htmlFor="my-modal-6"
                type="button"
                className="cursor-pointer hover:scale-110 transition text-white bg-brownMain text-neutral-50 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Register
              </label>
              <label
                htmlFor="my-modal-4"
                type="button"
                className="cursor-pointer hover:scale-110 transition text-white bg-brownMain text-neutral-50 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Login
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
