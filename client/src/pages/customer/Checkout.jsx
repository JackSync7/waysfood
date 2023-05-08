import React, { useContext, useEffect, useState } from "react";
import Image from "../../assets/sate-ayam.jpg";
import { BiLocationPlus } from "react-icons/bi";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { distance } from "@turf/turf";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";

function Checkout() {
  const [state] = useContext(UserContext);
  const [openMap, setOpenMap] = useState(false);
  const [longlat, setLonglat] = useState([]);
  const [ongkir, setOngkir] = useState(8000);
  const [distanceResult, setDistanceResult] = useState("");
  const [dataOrder, setDataOrder] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  let {
    data: getMenu,
    isLoading,
    refetch,
  } = useQuery("getCheckoutProduct", async () => {
    const response = await API.get(`/order-user`);

    return response.data.data;
  });

  const getProductOrder = async () => {
    try {
      const response = await API.get("/order-user");
      setDataOrder(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProductOrder();
  }, []);

  const subTotal = dataOrder
    ?.map((data) => data.product.price * data.qty)
    .reduce((a, b) => a + b, 0);

  const total = subTotal + ongkir;

  const [source, setSource] = useState([
    "15.636450557178279",
    "-5.666411526469844",
  ]);
  const [destination, setDestination] = useState(["-122.4064", "67.785844"]);

  const distanceInMiles = distance(source, destination, { units: "miles" });

  //   console.log(
  //     "seller : ",
  //     source,
  //     "dest : ",
  //     destination,
  //     "||",
  //     distanceInMiles
  //   );

  useEffect(() => {
    setSource([
      dataOrder[0]?.seller.location.split(",")[1].slice(0, -1),
      dataOrder[0]?.seller.location.split(",")[0].slice(1),
    ]);
    setDestination([JSON.stringify(longlat.lat), JSON.stringify(longlat.lng)]);
    setDistanceResult(distance(source, destination, { units: "miles" }));
    if (distanceInMiles <= 10) {
      setOngkir(12000);
    } else if (distanceInMiles <= 30) {
      setOngkir(30000);
    } else if (distanceInMiles > 30) {
      setOngkir(2000000);
    }
    refetch();
  }, [longlat]);

  const getTransaction = useMutation(async () => {
    try {
      const order = {
        seller_id: dataOrder[0]?.seller.id,
        totalPrice: total,
      };
      const response = await API.post("/transaction", order);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "Transaction Success",
          title: "",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (response) {
        console.log(response);
        alert("sukses");
      }
    } catch (err) {
      console.log(err);
    }
  });

  const [getCoord, setCoord] = useState({
    long: "",
    lat: "",
  });
  const handleMapClick = (event) => {
    event.preventDefault();
    const { lngLat } = event;
    setLonglat(lngLat);
    setOpenMap(false);
    // setForm({ location: lngLat });
  };
  return (
    <div className="w-3/4 mx-auto h-[100vw] py-20 px-10 ">
      <p className="text-2xl font-semibold text-brownMain text-left">
        {dataOrder[1]?.seller.fullname}
      </p>
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
            width: "70vw",
            height: "60vh",
            margin: "auto",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoiamFja3M3NyIsImEiOiJja21xOHprcGcybW11MnVzN2M4d3g3MHF1In0.P6kIyvROxfxKvmip0iH27Q"
        >
          <GeolocateControl />

          <NavigationControl />
        </Map>
      )}

      <div className="flex flex-col justify-start mt-5">
        <p className="text-left">Delivery Location</p>
        <div className="flex gap-3">
          <input
            placeholder="Delivery To"
            className="bg-neutral-50 w-3/4 border-2 px-5 border-neutral-300 rounded-lg"
            value={longlat !== "" ? longlat.lng + "," + longlat.lat : null}
            disabled
          />
          <label
            onClick={() => {
              setOpenMap(!openMap);
            }}
            className="w-1/4 p-2 px-2 text-neutral-50 text-lg bg-brownMain border-2 rounded-md border-neutral-500"
          >
            <BiLocationPlus
              size={25}
              color="white"
              className="absolute ml-52     "
            />{" "}
            {/* {openMap ? "Close Map" : "Select On Map"} */}
            Select on Map
          </label>
        </div>
      </div>
      <div className="flex gap-5">
        <div className=" w-3/4 mt-5">
          <p className="text-left text-brownMain text-lg">Review your order</p>
          {/* =============== this item =============== */}

          {!isLoading &&
            dataOrder.map((data, index) => (
              <div className="mt-4 border-t-2 border-brownMain py-4">
                <div className="flex">
                  <img className="w-36" src={data.product.image} alt="" />
                  <div className="p-5 ">
                    <p className="text-neutral-900 text-left">
                      {data?.product.title}
                    </p>
                    <div className="flex justify-between  w-[85vh]">
                      <div className="flex gap-2 mt-2">
                        <p>x{data?.qty}</p>
                      </div>
                      <div className="text-redOld mr-5">
                        {data?.product.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* <div className="mt-4 border-t-2 border-brownMain py-4">
            <div className="flex">
              <img className="w-36" src={Image} alt="" />
              <div className="p-5 ">
                <p className="text-neutral-900 text-left">Ayam Geprek</p>
                <div className="flex justify-between  w-[85vh]">
                  <div className="flex gap-2 mt-2">
                    <button className="px-2 bg-brownMain">-</button>
                    <p>1</p>
                    <button className="px-2 bg-brownMain">+</button>
                  </div>
                  <div className="text-redOld mr-5">Rp.15000</div>
                </div>
              </div>
            </div>
          </div> */}
          {/* ===================end item======================= */}
        </div>
        <div className="text-left  w-1/4  mt-16 border-t-2 border-neutral-900">
          <div className="p-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-neutral-900">Subtotal</p>
                <p className="text-neutral-900">Qty</p>
                <p className="text-neutral-900">Distance</p>
                <p className="text-neutral-900">Ongkir</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-right text-redOld">Rp.{subTotal}</p>
                <p className="text-right text-neutral-900">
                  x{dataOrder.length}
                </p>
                <p className="text-right text-redOld">
                  {JSON.stringify(distanceResult).slice(0, 6)}Km
                </p>
                <p className="text-right text-redOld">Rp.{ongkir}</p>
              </div>
            </div>
          </div>
          {/* ============== Total order ================*/}
          <div className="  w-full p-5 mt-2 border-t-2 border-neutral-900">
            <p className="text-left text-neutral-900">Total</p>
            <p className="text-left text-lg font-semibold text-redOld">
              Rp.{total}
            </p>
            <button
              onClick={() => getTransaction.mutate()}
              className="mt-10 text-neutral-50 rounded-md bg-brownMain py-2 px-8"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
