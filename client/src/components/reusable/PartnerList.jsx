import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

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
        <Link>
          <div className="card-body">
            <h2 className="card-title">{props.fullname}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardMenu;
