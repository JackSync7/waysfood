import React from "react";
import JumbotronImg from "../assets/JumbotronImg.png";
import UserMenu from "../pages/customer/UserMenu";

function Jumbotron() {
  return (
    <div>
      <div>
        <div className="w-full h-1/3 bg-yellowMain">
          <img
            className="mx-auto w-4/6 p-6 "
            src={JumbotronImg}
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
