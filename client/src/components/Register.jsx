import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { BiLocationPlus } from "react-icons/bi";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import Swal from "sweetalert2";

function Login() {
  const [openMap, setOpenMap] = useState(false);
  const [longlat, setLonglat] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [getCoord, setCoord] = useState({
    long: "",
    lat: "",
  });
  let navigate = useNavigate();
  const [setMessage] = useState(false);
  const [loginRole, setLoginRole] = useState("");
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    location: "",
    role: "",
    image: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  const handleMapClick = (event) => {
    event.preventDefault();
    const { lngLat } = event;
    setLonglat(lngLat);
    setOpenMap(false);
    // setForm({ location: lngLat });
  };

  const registerHandle = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("email", form.email);
      formData.set("fullname", form.fullname);
      formData.set("password", form.password);
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("location", JSON.stringify(longlat.lng + "," + longlat.lat));
      formData.set("role", form.role);
      formData.set("image", form.image[0], form.image[0].name);
      console.log(formData);
      const response = await API.post("/register", formData, config);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome",
        showConfirmButton: false,
        timer: 1500,
      });

      setForm({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        location: "",
        role: "",
        image: "",
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

  // console.log(JSON.stringify(longlat.lng + "," + longlat.lat));
  return (
    <div>
      {/* =================Modal Register=================== */}

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-neutral-50">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-4xl text-yellowMain font-bold">Register</h3>
          <div className="">
            <form
              onSubmit={(e) => registerHandle.mutate(e)}
              className=" flex flex-col gap-5 items-center mx-auto mt-10 justify-center "
            >
              <div className="flex gap-5 justify-center px-8 ">
                <input
                  onChange={handleChange}
                  value={form.email}
                  name="email"
                  type="text"
                  className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-4/6"
                  required
                  placeholder="Email"
                />
                <input
                  onChange={handleChange}
                  name="image"
                  id="image"
                  type="file"
                  className="text-neutral-700 bg-neutral-200  rounded-md border-2 border-neutral-300 w-1/6"
                  required
                />
                <label
                  for="image"
                  className="text-xs absolute right-20 bg-brownMain py-1 px-4 rounded-md border-2 border-neutral-300 w-1/6"
                >
                  Choose Photo
                </label>
              </div>
              <input
                onChange={handleChange}
                value={form.password}
                name="password"
                type="password"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Password"
                required
              />
              <input
                onChange={handleChange}
                value={form.fullname}
                name="fullname"
                type="fullname"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Fullname"
                required
              />
              <input
                onChange={handleChange}
                value={form.phone}
                name="phone"
                type="phone"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                placeholder="Phone"
                required
              />
              <select
                required
                onChange={handleChange}
                value={form.gender}
                name="gender"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                id="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                required
                onChange={handleChange}
                value={form.role}
                name="role"
                className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-3/4"
                id="role"
              >
                <option value="partner">Partner</option>
                <option value="customer">Customer</option>
              </select>
              <div className="flex  gap-2">
                <input
                  onChange={handleChange}
                  value={
                    longlat !== "" ? longlat.lng + "," + longlat.lat : null
                  }
                  name="location"
                  type="text"
                  className="text-neutral-700 bg-neutral-200 py-1 px-4 rounded-md border-2 border-neutral-300 w-4/6"
                  placeholder="Location"
                  disabled
                  required
                />
                <label
                  onClick={() => {
                    setOpenMap(!openMap);
                  }}
                  className="text-neutral-100 text-xs bg-brownMain py-1 px-4 rounded-md border-2 border-neutral-300 w-2/6"
                >
                  <BiLocationPlus className="absolute mt-2" size={15} />
                  {openMap ? "Close Map" : "Choose Location"}
                </label>
              </div>
              {openMap && (
                <Map
                  initialViewState={{
                    longitude: getCoord.long,
                    latitude: getCoord.lat,
                    zoom: 3.5,
                  }}
                  onViewportChange={(viewport) => setViewport(viewport)}
                  onClick={(e) => handleMapClick(e)}
                  style={{
                    width: "25vw",
                    height: "20vh",
                    margin: "auto",
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoiamFja3M3NyIsImEiOiJja21xOHprcGcybW11MnVzN2M4d3g3MHF1In0.P6kIyvROxfxKvmip0iH27Q"
                >
                  <GeolocateControl />

                  <NavigationControl />
                </Map>
              )}

              <button
                type="submit"
                className="bg-brownMain px-5 py-2 mt-4 w-3/4 rounded-md text-neutral-50"
              >
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
        </div>
      </div>

      {/* ================End modal====================*/}
    </div>
  );
}

export default Login;
