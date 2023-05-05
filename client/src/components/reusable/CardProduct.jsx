import React from "react";
import foto from "../../assets/Logo.png";

function CardProduct(props) {
  return (
    <div>
      <div className="w-fit px-4 text-lg h-16 gap-2 bg-white shadow-lg font-serif font-semibold flex justify-center items-center">
        <img className="w-12" src={foto} alt="loading image" />
        {props.name}
      </div>
    </div>
  );
}

export default CardProduct;
