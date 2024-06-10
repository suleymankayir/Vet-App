import { useEffect, useState } from "react";
import axios from "axios";

const Customer = () => {
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data))
      .then(() => setUpdate(true));
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
      .post(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers", newCustomer)
      .then((res) => console.log(res))
      .then(setUpdate(false))
      .then(
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleDeleteCustomer = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(
        `${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`,
        updateCustomer
      )
      .then(() => setUpdate(false))
      .then(() =>
        setUpdateCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomerBtn = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h3>Update Customer</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <br />
        <button onClick={handleUpdateCustomer}>Update Customer</button>
      </div>
      <div>
        <h3>Add New Customer</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newCustomer.country}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <br />
        <button onClick={handleAddNewCustomer}>Add New Customer</button>
      </div>
      <hr />
      <p>
        {" "}
        {newCustomer.name} - {newCustomer.phone} - {newCustomer.email}{" "}
      </p>
      <hr />
      <ul>
        {Array.isArray(customer) &&
          customer?.map((cus, index) => (
            <li key={index}>
              {cus.name} - {cus.email} - {cus.phone} -{cus.country} -{cus.birthDate} -
              <span onClick={handleDeleteCustomer} id={cus.id}>
                {" "}
                DELETE{" "}
              </span>
              -{" "}
              <span onClick={handleUpdateCustomerBtn} id={index}>
                UPDATE
              </span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Customer;
