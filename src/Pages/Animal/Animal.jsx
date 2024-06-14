import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Animal() {
  const initState = {
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: {},
  };
  const [customer, setCustomer] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    ...initState,
  });
  const [updateAnimal, setUpdateAnimal] = useState({
    ...initState,
  });

  const [filteredAnimal, setFilteredAnimal] = useState([]);
  const [isAnimalNameSearch, setIsAnimalNameSearch] = useState(false);
  const [animalSearch, setAnimalSearch] = useState("");

  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [isCustomerNameSearch, setIsCustomerNameSearch] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAnimaInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewAnimal = () => {
    axios
      .post(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/animals", newAnimal)
      .then(setUpdate(false))
      .then(
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {},
        })
      )
      .then(() => setAlert1(true))
      .then(() =>
        setTimeout(() => {
          setAlert1(false);
        }, 3000)
      );
    console.log(newAnimal);
  };
  const handleNewAnimalSelectChange = (e) => {
    const id = e.target.value;
    const newcustomer = customer.find((d) => d.id === +id);
    setNewAnimal((prev) => ({
      ...prev,
      customer: newcustomer,
    }));
  };
  const handleDeleteAnimal = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/animals/${id}`)
      .then(() => {
        setUpdate(false);
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 3000);
      });
  };

  //  Update

  const handleUpdateAnimalBtn = (e) => {
    const index = e.target.id;
    setUpdateAnimal({ ...animal[index] });
  };
  const handleUpdateAnimaInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateAnimal = () => {
    const { id } = updateAnimal;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/animals/${id}`,
        updateAnimal
      )
      .then(() => setUpdate(false))
      .then(() => {
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {},
        });
        setAlert3(true);
        setTimeout(() => {
          setAlert3(false);
        }, 3000);
      });
  };
  const handleUpdateAnimalSelectChange = (e) => {
    const id = e.target.value;
    const newcustomer = customer.find((d) => d.id === +id);
    setUpdateAnimal((prev) => ({
      ...prev,
      customer: newcustomer,
    }));
  };

  // hayvan adına göre arama

  const handleAnimalNameSearch = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/animals/searchByName?name=${animalSearch}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilteredAnimal(res.data.content))
      .then(() => setIsAnimalNameSearch(true))
      .then(() => setAnimalSearch(""));
    console.log(filteredAnimal);
  };

  const handleAnimalNameChange = (e) => {
    const { value } = e.target;
    setAnimalSearch((prev) => value);
    setIsAnimalNameSearch(false);
    console.log(animalSearch);
  };
  // Müşteri adına göre arama

  const handleCustomerNameSearch = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/animals/searchByCustomer?customerName=${customerSearch}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilteredCustomer(res.data.content))
      .then(() => setIsCustomerNameSearch(true))
      .then(() => setCustomerSearch(""));
    console.log(filteredCustomer);
  };

  const handleCustomerNameChange = (e) => {
    const { value } = e.target;
    setCustomerSearch((prev) => value);
    setIsCustomerNameSearch(false);
    console.log(customerSearch);
  };

  // resetleme butonu
  const handleResetBtn = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-center text-white mt-2 text-2xl">Hayvan Yönetimi</h1>
      <div>
        {alert1 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-green-500 text-white text-xl">
            Başarıyla Eklendi
          </h1>
        )}
      </div>
      <div>
        {alert2 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-red-500 text-white text-xl">
            Silme Başarılı!
          </h1>
        )}
      </div>
      <div>
        {alert3 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-28 left-6 bg-blue-500 text-white text-xl">
            Başarıyla Güncellendi
          </h1>
        )}
      </div>
      <div>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <input
            type="text"
            placeholder="Hayvan Adı"
            className="py-1 rounded-md pl-2"
            value={animalSearch}
            onChange={handleAnimalNameChange}
          />
          <button
            onClick={handleAnimalNameSearch}
            className="bg-yellow-400 rounded-md px-2 "
          >
            Ara
          </button>
        </div>
      </div>
      <div>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <input
            type="text"
            placeholder="Müşteri Adı"
            value={customerSearch}
            className="py-1 rounded-md pl-2"
            onChange={handleCustomerNameChange}
          />
          <button
            onClick={handleCustomerNameSearch}
            className="bg-yellow-400 rounded-md px-2 "
          >
            Ara
          </button>
        </div>
      </div>
      <div className="flex text-right justify-end mr-24 mt-2 gap-1">
        <button
          onClick={handleResetBtn}
          className="bg-yellow-400 rounded-md px-2 "
        >
          Tüm Hayvanlar
        </button>
      </div>

      <div className="  backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4">
        <div className="ml-2 mb-2">
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Hayvan Ekle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Hayvan Adı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="name"
                  value={newAnimal.name}
                  placeholder="Hayvan Adı"
                  onChange={handleNewAnimaInputChange}
                />{" "}
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Türü</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="species"
                  value={newAnimal.species}
                  placeholder="Tür"
                  onChange={handleNewAnimaInputChange}
                />{" "}
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Cinsi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="breed"
                  value={newAnimal.breed}
                  placeholder="Cins"
                  onChange={handleNewAnimaInputChange}
                />{" "}
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Cinsiyeti</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="gender"
                  value={newAnimal.gender}
                  placeholder="Cinsiyet"
                  onChange={handleNewAnimaInputChange}
                />{" "}
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Renk</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="colour"
                  value={newAnimal.colour}
                  placeholder="Renk"
                  onChange={handleNewAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Doğum Tarihi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="date"
                  name="dateOfBirth"
                  value={newAnimal.dateOfBirth}
                  placeholder="Doğum Tarihi"
                  onChange={handleNewAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Müşteri</h2>
                <select
                  name="customer"
                  id="customerId"
                  value={newAnimal?.customer?.id || ""}
                  onChange={handleNewAnimalSelectChange}
                >
                  <option value="">Müşteri Seç</option>
                  {customer?.map((cust, index) => (
                    <option value={cust.id} key={cust.id} id={index}>
                      {cust.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleAddNewAnimal}
                className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
              >
                <div>
                  <IoMdAdd />
                </div>
                <div>Ekle</div>
              </button>
            </div>
          </div>
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Hayvan Güncelle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Hayvan Adı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="name"
                  value={updateAnimal.name}
                  placeholder="Hayvan Adı"
                  onChange={handleUpdateAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Türü</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="species"
                  value={updateAnimal.species}
                  placeholder="Tür"
                  onChange={handleUpdateAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Cinsi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="breed"
                  value={updateAnimal.breed}
                  placeholder="Cins"
                  onChange={handleUpdateAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Cinsiyeti</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="gender"
                  value={updateAnimal.gender}
                  placeholder="Cinsiyet"
                  onChange={handleUpdateAnimaInputChange}
                />{" "}
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Renk</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="colour"
                  value={updateAnimal.colour}
                  placeholder="Renk"
                  onChange={handleUpdateAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Hayvan Doğum Tarihi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="date"
                  name="dateOfBirth"
                  value={updateAnimal.dateOfBirth}
                  placeholder="Doğum Tarihi"
                  onChange={handleUpdateAnimaInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Müşteri</h2>
                <select
                  name="customer"
                  id="customerId"
                  value={updateAnimal?.customer?.id || ""}
                  onChange={handleUpdateAnimalSelectChange}
                >
                  <option value="">Müşteri Seç</option>
                  {customer?.map((cust, index) => (
                    <option value={cust.id} key={cust.id} id={index}>
                      {cust.name}
                    </option>
                  ))}
                </select>
              </label>{" "}
              <button
                onClick={handleUpdateAnimal}
                className="flex justify-center items-center w-24 p-1 bg-blue-400 gap-2 rounded-lg"
              >
                <div>
                  <MdModeEdit />
                </div>
                <div>Güncelle</div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
            <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
              <tr className="">
                <th className=" border w-2/12">Hayvan Adı</th>
                <th className=" border w-2/12">Hayvan Sahibi</th>
                <th className="border w-2/12">Tür</th>
                <th className="border w-2/12">Cins</th>
                <th className="border w-2/12">Cinsiyet</th>
                <th className="border w-2/12">Renk</th>
                <th className="border w-2/12">Doğum Tarihi</th>
                <th className="border w-3/12">Sil / Düzenle</th>
              </tr>
            </thead>

            {animal && !isAnimalNameSearch && !isCustomerNameSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {animal?.map((ani, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {ani.name} </td>
                      <td className="border"> {ani?.customer?.name} </td>
                      <td className="border"> {ani.species} </td>
                      <td className="border"> {ani.breed} </td>
                      <td className="border"> {ani.gender} </td>
                      <td className="border"> {ani.colour} </td>
                      <td className="border"> {ani.dateOfBirth} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                   "
                      >
                        <div
                          onClick={handleDeleteAnimal}
                          id={ani.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateAnimalBtn}
                          id={index}
                          className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                        >
                          <MdModeEdit />
                          Düzenle
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {filteredAnimal && isAnimalNameSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filteredAnimal?.map((ani, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {ani.name} </td>
                      <td className="border"> {ani?.customer?.name} </td>
                      <td className="border"> {ani.species} </td>
                      <td className="border"> {ani.breed} </td>
                      <td className="border"> {ani.gender} </td>
                      <td className="border"> {ani.colour} </td>
                      <td className="border"> {ani.dateOfBirth} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                  "
                      >
                        <div
                          onClick={handleDeleteAnimal}
                          id={ani.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateAnimalBtn}
                          id={index}
                          className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                        >
                          <MdModeEdit />
                          Düzenle
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {filteredCustomer && isCustomerNameSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filteredCustomer?.map((ani, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {ani.name} </td>
                      <td className="border"> {ani?.customer?.name} </td>
                      <td className="border"> {ani.species} </td>
                      <td className="border"> {ani.breed} </td>
                      <td className="border"> {ani.gender} </td>
                      <td className="border"> {ani.colour} </td>
                      <td className="border"> {ani.dateOfBirth} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                  "
                      >
                        <div
                          onClick={handleDeleteAnimal}
                          id={ani.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateAnimalBtn}
                          id={index}
                          className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                        >
                          <MdModeEdit />
                          Düzenle
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
    </div>
  );
}

export default Animal;
