import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Customer() {
  const initState = {
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  };
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({
    ...initState,
  });

  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => setUpdate(false));
  }, [update]);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/customers",
        newCustomer
      )
      .then(()=>setUpdate(true))
      .then(
        setNewCustomer({
          ...initState,
        })
      )
      .then(() => setAlert1(true))
      .then(() =>
        setTimeout(() => {
          setAlert1(false);
        }, 3000)
      );
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteCustomer = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/customers/${id}`)
      .then(() => {
        setUpdate(true);
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 3000);
      });
  };

  const handleUpdateCustomerBtn = (e) => {
    const index = e.target.id;
    setUpdateCustomer({ ...customer[index] });
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/customers/${id}`,
        updateCustomer
      )
      .then(() => setUpdate(true))
      .then(() => {
        setUpdateCustomer({
          ...initState,
        });

        setAlert3(true);
        setTimeout(() => {
          setAlert3(false);
        }, 3000);
      });
  };



  const handleSearch = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/customers/searchByName?name=${search}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilteredCustomer(res.data.content))
      .then(() => setIsSearch(true))
      .then(() => setSearch(""));

    console.log(filteredCustomer);
  };

  const handleCustomerNameChange = (e) => {
    const { value } = e.target;
    setSearch((prev) => value);
    setIsSearch(false);
    console.log(search);
  };

  const handleResetBtn = () => {
    window.location.reload();
  };
  return (
    <div>
      <h1 className="text-center mt-6 text-[2rem] font-medium text-white ">
        Customers
      </h1>
      <div>
        {alert1 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-green-500 text-white text-xl">
            Success!
          </h1>
        )}
      </div>
      <div>
        {alert2 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-red-500 text-white text-xl">
            Deleted!
          </h1>
        )}
      </div>
      <div>
        {alert3 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-blue-500 text-white text-xl">
            Updated!
          </h1>
        )}
      </div>
      <div className="flex text-right justify-center mt-8 gap-2">
        <label htmlFor="" className="flex justify-center items-center">
       
          <input
            type="text"
            placeholder="Customer Name"
            value={search}
            className="py-1 rounded-md pl-2"
            onChange={handleCustomerNameChange}
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-gray-600 rounded-md px-4 "
        >
          Ara
        </button>
      </div>
      <div className="flex text-right justify-end mr-28 mt-2">
        <button
          onClick={handleResetBtn}
          className="bg-gray-300 rounded-md px-2 "
        >
          Show All Customers
        </button>
      </div>

      <div
        className=" 
      backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4"
      >
        <div className="px-4 py-4">
          <div className=" mt-2  backdrop-blur-[6px] bg-black/30 px-8 rounded-md pb-3">
            <h2 className="text-center text-white text-xl mb-2 py-1">
              Add Customer
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="name"
                value={newCustomer.name}
                placeholder="Customer Name"
                onChange={handleNewCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="phone"
                value={newCustomer.phone}
                placeholder="Customer Phone"
                onChange={handleNewCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="email"
                value={newCustomer.email}
                placeholder="Customer Email"
                onChange={handleNewCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="address"
                value={newCustomer.address}
                placeholder="Customer Address"
                onChange={handleNewCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="city"
                value={newCustomer.city}
                placeholder="City"
                onChange={handleNewCustomerInputChange}
              />
              <button
                onClick={handleAddNewCustomer}
                className="flex justify-center items-center w-24 mt-2 p-1 bg-gray-300 gap-2 rounded-lg"
              >
                <div>
                  <IoMdAdd />
                </div>
                <div>Add</div>
              </button>
            </div>
          </div>
          <div className="mt-3 backdrop-blur-[6px] bg-black/30 px-8 rounded-md pb-3">
            <h2 className="text-xl text-white text-center py-1 mb-2">
              Update Customer
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="name"
                value={updateCustomer.name}
                placeholder="Customer Name"
                onChange={handleUpdateCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="phone"
                value={updateCustomer.phone}
                placeholder="Customer Phone"
                onChange={handleUpdateCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="email"
                value={updateCustomer.email}
                placeholder="Customer Email"
                onChange={handleUpdateCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="address"
                value={updateCustomer.address}
                placeholder="Customer Address"
                onChange={handleUpdateCustomerInputChange}
              />{" "}
              <input
                className="rounded-sm px-1 py-1"
                type="text"
                name="city"
                value={updateCustomer.city}
                placeholder="City"
                onChange={handleUpdateCustomerInputChange}
              />
              <button
                onClick={handleUpdateCustomer}
                className="flex justify-center items-center w-24 p-1 bg-green-400 mt-2 gap-2 rounded-lg"
              >
                <div>
                  <MdModeEdit />
                </div>
                <div>Update</div>
              </button>
            </div>
          </div>
        </div>

        <table className="border h-14 font-extrabold text-slate-400  text-xl rounded-lg  py-5 bg-slate-50  w-9/12 mx-auto mt-8 table-fixed overflow-hidden ">
          <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
            <tr className="">
              <th className=" border w-2/12">Name</th>
              <th className="border w-2/12">E-mail</th>
              <th className="border w-2/12">Phone</th>
              <th className="border w-2/12">Address</th>
              <th className="border w-2/12">City</th>
              <th className="border w-2/12">Delete / Update</th>
            </tr>
          </thead>
          {customer && !isSearch && (
            <tbody className="border h-14 font-light text-black  text-xl ">
              {customer?.map((custo, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {custo.name} </td>
                    <td className="border"> {custo.email} </td>
                    <td className="border"> {custo.phone} </td>
                    <td className="border"> {custo.address} </td>
                    <td className="border"> {custo.city} </td>
                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteCustomer}
                        id={custo.id}
                        className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                      >
                        <MdDelete />
                        Delete
                      </div>
                      <div
                        onClick={handleUpdateCustomerBtn}
                        id={index}
                        className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                      >
                        <MdModeEdit />
                        Edit
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {filteredCustomer && isSearch && (
            <tbody className="border h-14 font-light text-black  text-xl ">
              {filteredCustomer?.map((custo, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {custo.name} </td>
                    <td className="border"> {custo.email} </td>
                    <td className="border"> {custo.phone} </td>
                    <td className="border"> {custo.address} </td>
                    <td className="border"> {custo.city} </td>
                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteCustomer}
                        id={custo.id}
                        className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                      >
                        <MdDelete />
                        Delete
                      </div>
                      <div
                        onClick={handleUpdateCustomerBtn}
                        id={index}
                        className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                      >
                        <MdModeEdit />
                        Edit
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Customer;
