import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import { BiLocationPlus } from "react-icons/bi";
import Map, { GeolocateControl } from "react-map-gl";

function EditProfile() {
  const [openMap, setOpenMap] = useState(false);
  const [getCoord, setCoord] = useState({
    long: "",
    lat: "",
  });
  const [state] = useContext(UserContext);
  const [form, setForm] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  });
  function getCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoord({
        long: position.coords.latitude,
        lat: position.coords.latitude,
      });
    });
  }
  console.log("ini coordinat : ", getCoord);
  let {
    data: getMenu,
    isLoading,
    refetch,
  } = useQuery("getProducts", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", Number(form.price));
      formData.set("qty", Number(form.price));
      formData.set("user_id", state.user.id);

      const response = await API.post("/product", formData, config);
      console.log("add Product success", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "add Product success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (err) {
      console.log(form);
      console.log("add Product failed", err);
      Swal.fire({
        icon: "error",
        title: "Ooops.. Something went wrong",
        text: "Add Episode Failed",
      });
    }
  });

  return (
    <div className="py-20 h-[200vh]">
      {openMap && (
        <Map
          initialViewState={{
            longitude: getCoord.long,
            latitude: getCoord.lat,
            zoom: 3.5,
          }}
          style={{ width: "60vw", height: "60vh", margin: "auto" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoiamFja3M3NyIsImEiOiJja21xOHprcGcybW11MnVzN2M4d3g3MHF1In0.P6kIyvROxfxKvmip0iH27Q"
        >
          <GeolocateControl />
        </Map>
      )}
      <div className="mx-auto mt-10 h-[60vh] w-2/3 shadow-lg">
        <p className="mb-10 text-left ml-32 text-2xl font-semibold text-brownMain">
          Edit Profile
        </p>
        <div>
          <form
            className="px-20 flex flex-col gap-5"
            onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
            <div className="flex gap-2">
              <input
                type="text"
                className="w-5/6 p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
                placeholder="Fullname"
                name="fullname"
                onChange={handleChange}
              />
              <input
                type="file"
                className="w-1/6 p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
                name="image"
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              className="w-full p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="w-full p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              required
            />
            <div className="flex">
              <label
                onClick={() => {
                  getCoordinates();
                  setOpenMap(!openMap);
                }}
                className="w-full p-2 px-2 text-neutral-50 text-lg bg-brownMain border-2 rounded-md border-neutral-300"
              >
                <BiLocationPlus
                  size={25}
                  color="white"
                  className="absolute ml-80     "
                />{" "}
                {openMap ? "Close Map" : "Select On Map"}
              </label>
            </div>
            <div className="flex justify-end">
              <button className="bg-brownMain w-44 py-2 rounded-md text-neutral-50 mr-1">
                Save
              </button>
            </div>
          </form>
          <button onClick={() => getCoordinates()} className=" bg-redOld p-4">
            get coord
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
