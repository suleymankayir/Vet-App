import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [update, setUpdate] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: {},
    animal: {},
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAppointmentDateChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewDoctorSelectChange = (e) => {
    const id = e.target.value;
    const newdoctor = doctor.find((d) => d.id === +id);
    setNewAppointment((prev) => ({
      ...prev,
      doctor: newdoctor,
    }));
    console.log(newAppointment);
  };
  const handleNewAnimalSelectChange = (e) => {
    const value = e.target.value;
    const newanimal = animal.find((d) => d.id === +value);
    setNewAppointment((prev) => ({
      ...prev,
      animal: newanimal,
    }));
    console.log(newAppointment);
  };
  const handleNewAppointment = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/appointments",
        newAppointment
      )
      .then(setUpdate(false))
      .then(
        setNewAppointment({
          appointmentDate: "",
          doctor: {},
          animal: {},
        })
      );
    console.log(newAppointment);
  };

  // update işlemleri

  const handleUpdateBtn = (e) => {
    const index = e.target.id;
    setUpdateAppointment({ ...appointment[index] });
  };

  const handleUpdateDateChange = (e) => {
    const { name, value } = e.target;
    setUpdateAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateDoctorSelectChange = (e) => {
    const value = e.target.value;
    const newdoctor = doctor.find((d) => d.id === +value);
    setUpdateAppointment((prev) => ({
      ...prev,
      doctor: newdoctor.id,
    }));
  };
  const handleUpdateAnimalSelectChange = (e) => {
    const value = e.target.value;
    const newanimal = animal.find((d) => d.id === +value);
    setUpdateAppointment((prev) => ({
      ...prev,
      animal: newanimal.id,
    }));
  };

  const handleUpdateAppointment = () => {
    const { id } = updateAppointment;
    console.log(updateAppointment);
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/appointments/${id}`,
        updateAppointment
      )
      .then(() => setUpdate(false))
      .then(
        setUpdateAppointment({
          appointmentDate: "",
          doctor: "",
          animal: "",
        })
      );
  };

  // delete işlemleri

  const handleDeleteAppointment = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/appointments/${id}`
      )
      .then(() => setUpdate(false));
  };

  // doktora id-date göre randevu arama
  const [filteredDoctorId, setFilteredDoctorId] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isDoctorSearch, setIsDoctorSearch] = useState(false);

  const handleDoctorIDChange = (e) => {
    const { value } = e.target;
    setDoctorId(value);
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setStartDate(value);
  };
  const handleFinishDateChange = (e) => {
    const { value } = e.target;
    setFinishDate(value);
  };

  const handleDoctorSearchBtn = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/appointments/searchByDoctorAndDateRange?id=${doctorId}&startDate=${startDate}&endDate=${finishDate}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilteredDoctorId(res.data.content))
      .then(() => setIsDoctorSearch(true))
      .then(() => setDoctorId(""))
      .then(() => setStartDate(""))
      .then(() => setFinishDate(""));
  };

  // hayvan id-date göre randevu arama
  const [filteredAnimalId, setFilteredAnimalId] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [animalStartDate, setAnimalStartDate] = useState("");
  const [animalFinishDate, setAnimalFinishDate] = useState("");
  const [isAnimalSearch, setIsAnimalSearch] = useState(false);
  useState("");

  const handleAnimalIDChange = (e) => {
    const { value } = e.target;
    setAnimalId(value);
  };
  const handleStartDateAnimalChange = (e) => {
    const { value } = e.target;
    setAnimalStartDate(value);
  };
  const handleFinishDateAnimalChange = (e) => {
    const { value } = e.target;
    setAnimalFinishDate(value);
  };
  const handleAnimalSearchBtn = () => {
    axios
      .get(
        import.meta.env.VITE_VET_API_BASEURL +
          `/api/v1/appointments/searchByAnimalAndDateRange?id=${animalId}&startDate=${animalStartDate}&endDate=${animalFinishDate}&pageNumber=0&pageSize=10`
      )
      .then((res) => setFilteredAnimalId(res.data.content))
      .then(() => setIsAnimalSearch(true))
      .then(() => setAnimalId(""))
      .then(() => setAnimalStartDate(""))
      .then(() => setAnimalFinishDate(""));

    console.log(filteredAnimalId);
  };
  // resetleme btn
  const handleResetBtn = () => {
    window.location.reload();
  };
  return (
    <div>
      <h1 className="text-center text-white mt-2 text-2xl">Randevu Yönetimi</h1>

      <div>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <h2 className="text-white mr-1">Doktor-Tarih</h2>
          <select name="" value={doctorId} onChange={handleDoctorIDChange}>
            <option value="" disabled>
              Doktor ID
            </option>
            {doctor.map((doc, index) => (
              <option key={doc.id} value={doc.id}>
                {doc.id}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            value={finishDate}
            onChange={handleFinishDateChange}
          />
          <button
            onClick={handleDoctorSearchBtn}
            className="bg-yellow-400 rounded-md px-2 "
          >
            Ara
          </button>
        </div>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <h2 className="text-white mr-1">Hayvan-Tarih</h2>

          <select name="" value={animalId} onChange={handleAnimalIDChange}>
            <option value="" disabled>
              Hayvan ID
            </option>
            {animal.map((ani, index) => (
              <option key={ani.id} value={ani.id}>
                {ani.id}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={animalStartDate}
            onChange={handleStartDateAnimalChange}
          />
          <input
            type="date"
            value={animalFinishDate}
            onChange={handleFinishDateAnimalChange}
          />
          <button
            onClick={handleAnimalSearchBtn}
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
            Tüm Randevuları Göster
          </button>
        </div>
      </div>

      <div className="  backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4">
        <div className="ml-2 mb-2">
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Randevu Ekle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Tarih</h2>
                <input
                  className="rounded-sm px-1 py-1 w-12/12"
                  type="datetime-local"
                  name="appointmentDate"
                  value={newAppointment.appointmentDate}
                  placeholder="date"
                  onChange={handleNewAppointmentDateChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Doktor </h2>
                <select
                  name="doctor"
                  className="rounded-sm px-8 py-1"
                  onChange={handleNewDoctorSelectChange}
                  value={newAppointment?.doctor?.id || ""}
                >
                  <option value="" disabled>
                    Doktor Seç
                  </option>
                  {doctor.map((doc, index) => (
                    <option value={doc.id} key={doc.id} id={index}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" w-12/12">
                <h2 className="text-white">Hayvan </h2>
                <select
                  name="animal"
                  className="rounded-sm px-8 py-1"
                  value={newAppointment?.animal?.id || ""}
                  onChange={handleNewAnimalSelectChange}
                >
                  <option value="">Hayvan Seç</option>
                  {animal.map((ani, index) => (
                    <option value={ani.id} key={ani.id} id={index}>
                      {ani.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
                onClick={handleNewAppointment}
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
              Randevu Güncelle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Tarih</h2>
                <input
                  className="rounded-sm px-1 py-1 w-12/12"
                  type="datetime-local"
                  name="appointmentDate"
                  placeholder="Tarih"
                  value={updateAppointment.appointmentDate}
                  onChange={handleUpdateDateChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Doktor </h2>
                <select
                  name="doctor"
                  className="rounded-sm px-8 py-1
                "
                  value={updateAppointment.doctor.id || ""}
                  onChange={handleUpdateDoctorSelectChange}
                >
                  <option disabled value="">
                    Doktor Seç
                  </option>
                  {doctor.map((doc, index) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" w-12/12">
                <h2 className="text-white">Hayvan </h2>
                <select
                  value={updateAppointment.animal.id || ""}
                  name="doctor"
                  className="rounded-sm px-8 py-1"
                  onChange={handleUpdateAnimalSelectChange}
                >
                  <option value="">Hayvan Seç</option>
                  {animal.map((ani, index) => (
                    <option value={ani.id} key={ani.id}>
                      {ani.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleUpdateAppointment}
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
                <th className=" border w-1/12">ID</th>
                <th className=" border w-2/12">Doktor</th>
                <th className=" border w-[8rem]">Randevu Tarih</th>
                <th className="border w-2/12">Hayvan</th>
                <th className="border w-2/12">Müşteri</th>
                <th className="border w-2/12">Müşteri Telefon</th>
                <th className="border w-2/12">Doktor Telefon</th>
                <th className="border w-3/12">Sil / Düzenle</th>
              </tr>
            </thead>
            {appointment && !isDoctorSearch && !isAnimalSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {appointment?.map((appo, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {appo.id} </td>
                      <td className="border"> {appo?.doctor?.name} </td>
                      <td className="border"> {appo.appointmentDate} </td>
                      <td className="border"> {appo?.animal?.name} </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.name}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.phone}{" "}
                      </td>
                      <td className="border"> {appo.doctor.phone} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                  "
                      >
                        <div
                          onClick={handleDeleteAppointment}
                          id={appo.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateBtn}
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
            {filteredDoctorId && isDoctorSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filteredDoctorId?.map((appo, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {appo.id} </td>
                      <td className="border"> {appo?.doctor?.name} </td>
                      <td className="border"> {appo.appointmentDate} </td>
                      <td className="border"> {appo?.animal?.name} </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.name}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.phone}{" "}
                      </td>
                      <td className="border"> {appo.doctor.phone} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                  "
                      >
                        <div
                          onClick={handleDeleteAppointment}
                          id={appo.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateBtn}
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
            {filteredAnimalId && isAnimalSearch && (
              <tbody className="border h-14 font-light text-black  text-xl ">
                {filteredAnimalId?.map((appo, index) => {
                  return (
                    <tr key={index} className="text-xl bg-white h-10">
                      <td className="border"> {appo.id} </td>
                      <td className="border"> {appo?.doctor?.name} </td>
                      <td className="border"> {appo.appointmentDate} </td>
                      <td className="border"> {appo?.animal?.name} </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.name}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {appo.animal?.customer?.phone}{" "}
                      </td>
                      <td className="border"> {appo.doctor.phone} </td>
                      <td
                        className=" border flex justify-center items-center gap-2 py-3
                  "
                      >
                        <div
                          onClick={handleDeleteAppointment}
                          id={appo.id}
                          className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                        >
                          <MdDelete />
                          Sil
                        </div>
                        <div
                          onClick={handleUpdateBtn}
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

export default Appointment;
