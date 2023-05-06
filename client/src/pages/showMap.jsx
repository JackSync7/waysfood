import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import { BiLocationPlus } from "react-icons/bi";
import mapboxgl from "mapbox-gl";
import ReactMapGL from "react-map-gl";

function ShowMaps() {
  let [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <ReactMapGL
      mapboxAccessToken={
        "pk.eyJ1IjoiamFja3M3NyIsImEiOiJjbGhjMWo1eWsweDkwM2xudWQyODZrYno4In0.XfsMlkAGwkggOSIOGpMKYA"
      }
      {...viewport}
      onViewportChange={(newView) => setViewport(newView)}
    ></ReactMapGL>
  );
}

export default ShowMaps;
