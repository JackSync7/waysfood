import React, { useContext, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import MenuUser from "../pages/customer/UserMenu";
import PartnerList from "../components/reusable/PartnerList";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

function Home() {
  const [state] = useContext(UserContext);

  let {
    data: getMenu,
    isLoading,
    refetch,
  } = useQuery("getProducts", async () => {
    const response = await API.get("/partner");
    return response.data.data;
  });
  console.log(getMenu);
  return (
    <div className="h-[200vh] w-full py-10 ">
      <Jumbotron />
      <p className="text-2xl text-brownMain font-semibold text-left ml-36 mt-10">
        Popular Restaurant
      </p>
      <MenuUser />
      <p className="text-2xl text-brownMain font-semibold text-left ml-36 mt-10">
        Recomended
      </p>
      <div className="flex gap-5 justify-center mt-10">
        {!isLoading &&
          getMenu
            .slice(0, 4)
            .map((data, index) => (
              <PartnerList
                key={index}
                id={data.id}
                image={data.image}
                fullname={data.fullname}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
