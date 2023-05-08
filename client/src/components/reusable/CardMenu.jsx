import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useMutation } from "react-query";

function CardMenu(props) {
  const [state] = useContext(UserContext);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const addOrder = useMutation(async (data) => {
    try {
      const order = {
        qty: data.qtyProd,
        buyer_id: state.user.id,
        seller_id: Number(id),
        product_id: data.idProd,
      };
      //   console.log("ini order", order);
      const response = await API.post("/order", order);
      if (response) {
        console.log(response);
        alert("sukses");
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="">
      <div className="p-0 card card-compact w-72 mt-10 bg-neutral-50 text-neutral-900 shadow-xl">
        <figure>
          <img
            className="w-full object-cover h-48 min"
            src={props.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p className="text-left text-redOld font-semibold">
            Rp.{props.price},-
          </p>
          {state.user.role !== "partner" && (
            <div className="card-actions justify-end">
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    setQty(qty - 1);
                    if (qty <= 1) setQty(1);
                  }}
                  className=" px-3 rounded-md text-neutral-50 text-xl bg-brownMain"
                >
                  -
                </button>
                <p className="font-semi-bold text-lg">{qty}</p>
                <button
                  onClick={() => {
                    setQty(qty + 1);
                  }}
                  className=" px-3 rounded-md text-neutral-50 text-xl bg-brownMain"
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  addOrder.mutate({ idProd: props.id, qtyProd: qty })
                }
                className="w-full bg-yellowMain font-bold text-lg text-neutral-50 py-2 rounded-md"
              >
                Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardMenu;
