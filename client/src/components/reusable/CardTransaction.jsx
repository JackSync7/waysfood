import React from "react";
import foto from "../../assets/Logo.png";

function CardTransaction(props) {
  return (
    <div className="">
      <div className="w-fit p-6 text-lg h-28 gap-2 bg-white shadow-lg font-serif font-semibold flex justify-center items-center">
        <div className="mr-32 mx-auto">
          <p className="text-neutral-800 text-sm text-left">Geprek Bensu</p>
          <p className="text-neutral-700 font-sans text-xs text-left">
            12 March 2022
          </p>
          <p className="text-redOld font-sans text-sm font-medium mt-2 text-left">
            Total : Rp.62.0000
          </p>
        </div>
        <div>
          <img className="w-20" src={foto} alt="loading image" />
          <p className="bg-greenLow px-4 font-sans text-greenHigh text-sm">
            SUCCESS
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardTransaction;
