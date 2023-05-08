import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import CardMenu from "../../components/reusable/CardMenu";

function DetailMenu() {
  const [getDataPartner, setDataPartner] = useState([]);
  const [dataorder, setDataOrder] = useState([]);
  const { id } = useParams();

  let {
    data: getMenu,
    isLoading,
    refetch,
  } = useQuery("getProducts", async () => {
    const response = await API.get(`/product-partner/${id}`);
    return response.data.data;
  });

  const cekOrder = async () => {
    try {
      console.log(id);
      const response = await API.get(`/order-buyer/${id}`);
      setDataOrder(response.data.data);
      if (response.data.data.length > 0) {
        alert("Order");
      }
    } catch (err) {
      if (err.response.data.message != "record not found") {
        alert("Errr");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    cekOrder();
  }, []);

  const getPartner = async () => {
    const response = await API.get(`/user/${id}`);
    setDataPartner(response.data.data);
  };
  useEffect(() => {
    getPartner();
  }, []);

  return (
    <div className="py-20 h-[100vh] w-full ">
      <p className="text-brownMain text-4xl font-semibold">
        {!isLoading && getDataPartner.fullname}
      </p>
      <div className="mx-auto">
        <div className="flex justify-evenly p-10 flex-wrap overflow-auto h-[80vh] px-10 ">
          {!isLoading &&
            getMenu?.map((data, index) => (
              <div>
                <CardMenu
                  key={index}
                  id={data.id}
                  image={data.image}
                  title={data.title}
                  price={data.price}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DetailMenu;
