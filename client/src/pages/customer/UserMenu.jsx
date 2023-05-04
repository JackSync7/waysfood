import React from "react";
import CardProduct from "../../components/reusable/CardProduct";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function Home() {
  let { data: getPartner, isLoading } = useQuery("getPartner", async () => {
    const response = await API.get("/partner");
    return response.data.data;
  });

  return (
    <div>
      <div className=" w-3/4 p-5 mx-auto mt-10 flex gap-8 justify-center overflow-auto">
        {!isLoading &&
          getPartner?.map((data, i) => (
            <CardProduct key={i} name={data.fullname} img={data.image} />
          ))}
      </div>
    </div>
  );
}

export default Home;
