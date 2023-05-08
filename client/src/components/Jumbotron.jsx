import React from "react";
import JumbotronImges from "../assets/JumbotronImg.png";
import UserMenu from "../pages/customer/UserMenu";

function Jumbotron() {
  return (
    <div>
      <div>
        <div className="w-full h-1/3 bg-yellowMain">
          <img
            className="mx-auto w-4/6 p-6 "
            src={JumbotronImges}
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
