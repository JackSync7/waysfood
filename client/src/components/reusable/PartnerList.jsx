import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import Swal from "sweetalert2";

function CardMenu(props) {
  let navigate = useNavigate();
  const cekOrder = async () => {
    try {
      const response = await API.get(`/order-buyer/${props.id}`);
      if (response.data.data) {
        Swal.fire({
          title: "Are you sure?",
          text: "Change your order",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            await API.delete(`/delete-order`);
            navigate("/detail-menu/" + props.id);
          }
        });
      }
    } catch (err) {
      if (err.response.data.message == "record not found") {
        navigate("/detail-menu/" + props.id);
      }
      console.error(err);
    }
  };
  const [state] = useContext(UserContext);
  return (
    <div className="">
      <div className="p-0 card card-compact w-72 mt-5 bg-neutral-50 text-neutral-900 shadow-xl">
        <figure>
          <img
            className="w-full object-cover max-h-48"
            src={props.image}
            alt="Shoes"
          />
        </figure>
        <div onClick={() => cekOrder()} role="button">
          <div className="card-body">
            <h2 className="card-title">{props.fullname}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMenu;
