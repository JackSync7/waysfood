import React from "react";
import Jumbotron from "../components/Jumbotron";
import MenuUser from "../pages/customer/UserMenu";

function Home() {
  return (
    <div className="h-[100vh]">
      <Jumbotron />
      <MenuUser />
    </div>
  );
}

export default Home;
