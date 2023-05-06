import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

function CardMenu(props) {
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
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p className="text-left">Rp.{props.price}</p>
          {state.user.role !== "partner" && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardMenu;
