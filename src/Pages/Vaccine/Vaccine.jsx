import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Vaccine() {
  const initState = {
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: {},
  };
  const [vaccine, setVaccine] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [report, setReport] = useState([]);
  const [update, setUpdate] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    ...initState,
  });

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/vaccinations")
      .then((res) => setVaccine(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/reports")
      .then((res) => setReport(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewVaccineInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleNewAnimalSelectChange = (e) => {
    const value = e.target.value;
    const newani = animal.find((d) => d.id === +value);
    setNewVaccine((prev) => ({
      ...prev,
      animalWithoutCustomer: newani,
    }));
    console.log(newVaccine);
  };
  const handleNewVaccine = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/vaccinations",
        newVaccine
      )
      .then(setUpdate(false))
      .then(
        setNewVaccine({
          ...initState,
        })
      )
      .then(() => setAlert1(true))
      .then(() =>
        setTimeout(() => {
          setAlert1(false);
        }, 3000)
      );
    console.log(newVaccine);
  };

  // delete işlemleri

  const handleDeleteVaccine = (e) => {
    const id = e.target.id;
    axios
      .delete(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/vaccinations/${id}`
      )
      .then(() => {
        setUpdate(false);
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 3000);
      });
  };

  // filtreleme işlemleri
  const [animalId, setAnimalId] = useState("");
  const [filterAnimalID, setFilterAnimalID] = useState([]);
  const [isAnimalIDSearch, setIsAnimalIDSearch] = useState(false);

  const handleAnimalIdChange = (e) => {
    const { value } = e.target;
    setAnimalId(value);
    console.log(value);
  };

  const handleAnimalIdBtn = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/vaccinations/searchByAnimal?id=${animalId}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilterAnimalID(res.data.content))
      .then(() => setAnimalId(""))
      .then(() => setIsAnimalIDSearch(true));

    console.log(filterAnimalID);
  };

  const [vacStartDate, setVacStartDate] = useState("");
  const [vacFinishDate, setVacFinishDate] = useState("");
  const [filterDate, setFilterDate] = useState([]);
  const [isDate, setIsDate] = useState(false);

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setVacStartDate(value);
    console.log(value);
  };
  const handleFinishDateChange = (e) => {
    const { value } = e.target;
    setVacFinishDate(value);
  };

  const handleDateBtn = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/vaccinations/searchByVaccinationRange?startDate=${vacStartDate}&endDate=${vacFinishDate}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilterDate(res.data.content))
      .then(() => setVacStartDate(""))
      .then(() => setVacFinishDate(""))
      .then(() => setIsDate(true));
  };

  const handleResetBtn = () => {
    window.location.reload();
  };
  return (
    <div>
      <h1 className="text-white text-center text-2xl mt-2">Aşı Yönetimi</h1>
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
      <div className="flex text-right justify-end mr-24 mt-2 gap-1">
        <label htmlFor="" className="flex justify-center items-center gap-2">
          <h2 className="text-white text-xl">Hayvan ID</h2>
          <select
            value={animalId}
            className="w-12"
            onChange={handleAnimalIdChange}
          >
            <option disabled>Hayvan ID</option>
            {animal.map((ani, index) => (
              <option value={ani.id} key={ani.id}>
                {ani.id}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={handleAnimalIdBtn}
          className="bg-yellow-400 rounded-md px-2 "
        >
          Ara
        </button>
      </div>
      <div className="flex text-right justify-end mr-24 mt-2 gap-1">
        <label htmlFor="" className="flex justify-center items-center gap-2">
          <h2 className="text-white text-xl">Aşı Tarih Aralığı</h2>
          <input
            type="date"
            value={vacStartDate}
            className="py-1 rounded-md pl-2"
            onChange={handleStartDateChange}
          />
        </label>
        <label htmlFor="" className="flex justify-center items-center gap-2">
          <input
            type="date"
            value={vacFinishDate}
            className="py-1 rounded-md pl-2"
            onChange={handleFinishDateChange}
          />
        </label>
        <button
          onClick={handleDateBtn}
          className="bg-yellow-400 rounded-md px-2 "
        >
          Ara
        </button>
      </div>
      <div className="flex text-right justify-end mr-24 mt-2 gap-1">
        <button
          onClick={handleResetBtn}
          className="bg-lime-300 rounded-md px-2 "
        >
          Tüm Aşıları Göster
        </button>
      </div>

      <div className="  backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4">
        <div className="ml-2 mb-2">
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Aşı Ekle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Aşı Adı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="name"
                  value={newVaccine.name}
                  placeholder="Aşı Adı"
                  onChange={handleNewVaccineInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Aşı Kodu</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="code"
                  value={newVaccine.code}
                  placeholder="Aşı Kodu"
                  onChange={handleNewVaccineInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Koruma Başlangıç Tarihi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="date"
                  name="protectionStartDate"
                  value={newVaccine.protectionStartDate}
                  placeholder="Koruma"
                  onChange={handleNewVaccineInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Koruma Bitiş Tarihi</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="date"
                  name="protectionFinishDate"
                  value={newVaccine.protectionFinishDate}
                  placeholder="koruma bitiş"
                  onChange={handleNewVaccineInputChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Hayvan</h2>
                <select
                  name="animalWithoutCustomer"
                  className="rounded-sm px-8 py-1"
                  onChange={handleNewAnimalSelectChange}
                  value={newVaccine?.animalWithoutCustomer.id || ""}
                >
                  <option value="" disabled>
                    Hayvan Seç
                  </option>
                  {animal.map((ani, index) => (
                    <option value={ani.id} key={ani.id} id={index}>
                      {ani.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
                onClick={handleNewVaccine}
              >
                <div>
                  <IoMdAdd />
                </div>
                <div>Ekle</div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
            <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
              <tr className="">
                <th className=" border w-2/12">Aşı Adı</th>
                <th className=" border w-2/12">Aşı Kodu</th>
                <th className=" border w-2/12">Koruma Başlangıç Tarihi</th>
                <th className=" border w-2/12">Koruma Bitiş Tarihi</th>
                <th className=" border w-2/12">Hayvan Adı</th>

                <th className="border w-2/12">Sil </th>
              </tr>
            </thead>
            {vaccine && !isAnimalIDSearch && !isDate && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {vaccine?.map((vac, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {vac.name} </td>
                      <td className="border"> {vac.code} </td>
                      <td className="border"> {vac.protectionStartDate} </td>
                      <td className="border"> {vac.protectionFinishDate} </td>
                      <td className="border"> {vac?.animal?.name} </td>

                      <td
                        className=" border flex justify-center items-center gap-2 py-3
               "
                      >
                        <div
                          onClick={handleDeleteVaccine}
                          id={vac.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {filterAnimalID && isAnimalIDSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filterAnimalID?.map((vac, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {vac.name} </td>
                      <td className="border"> {vac.code} </td>
                      <td className="border"> {vac.protectionStartDate} </td>
                      <td className="border"> {vac.protectionFinishDate} </td>
                      <td className="border"> {vac?.animal?.name} </td>

                      <td
                        className=" border flex justify-center items-center gap-2 py-3
              "
                      >
                        <div
                          onClick={handleDeleteVaccine}
                          id={vac.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {filterDate && isDate && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filterDate?.map((vac, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {vac.name} </td>
                      <td className="border"> {vac.code} </td>
                      <td className="border"> {vac.protectionStartDate} </td>
                      <td className="border"> {vac.protectionFinishDate} </td>
                      <td className="border"> {vac?.animal?.name} </td>

                      <td
                        className=" border flex justify-center items-center gap-2 py-3
              "
                      >
                        <div
                          onClick={handleDeleteVaccine}
                          id={vac.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
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

export default Vaccine;
