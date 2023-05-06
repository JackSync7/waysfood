import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import CardMenu from "../../components/reusable/CardMenu";

function AddProduct() {
  const [state] = useContext(UserContext);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  let {
    data: getMenu,
    isLoading,
    refetch,
  } = useQuery("getProducts", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleKeyPress = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", Number(form.price));
      formData.set("qty", Number(form.price));
      formData.set("user_id", state.user.id);

      const response = await API.post("/product", formData, config);
      console.log("add Product success", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "add Product success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (err) {
      console.log(form);
      console.log("add Product failed", err);
      Swal.fire({
        icon: "error",
        title: "Ooops.. Something went wrong",
        text: "Add Episode Failed",
      });
    }
  });

  return (
    <div className="py-20">
      <div className="mx-auto mt-10 h-[40vh] w-2/3 shadow-lg">
        <p className="mb-10 text-left ml-32 text-2xl font-semibold text-brownMain">
          Add Product
        </p>
        <div>
          <form
            className="px-20 flex flex-col gap-5"
            onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
            <div className="flex gap-2">
              <input
                type="text"
                className="w-5/6 p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
                placeholder="Product Name"
                name="title"
                onChange={handleChange}
              />
              <input
                type="file"
                className="w-1/6 p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
                name="image"
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              className="w-full p-2 px-2 bg-neutral-50 border-2 rounded-md border-neutral-300"
              name="price"
              placeholder="Price"
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-brownMain w-44 py-1 text-neutral-50 mr-1"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-evenly p-10 flex-wrap overflow-auto h-[80vh] w-full">
        {!isLoading &&
          getMenu?.map((data, index) => (
            <CardMenu
              image={data.image}
              title={data.title}
              price={data.price}
            />
          ))}
      </div>
    </div>
  );
}

export default AddProduct;
