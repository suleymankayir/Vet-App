import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Report() {
  const initState = {
    title: "",
    diagnosis: "",
    price: 0,
    appointmentId: "",
  };
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newReport, setNewReport] = useState({
    ...initState,
  });
  const [updateReport, setUpdateReport] = useState({
    ...initState,
  });

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/reports")
      .then((res) => setReport(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAppointmentSelectChange = (e) => {
    const value = e.target.value;
    const newappo = appointment.find((d) => d.id === +value);
    setNewReport((prev) => ({
      ...prev,
      appointmentId: newappo.id,
    }));
    console.log(newReport);
  };
  const handleNewReport = () => {
    axios
      .post(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/reports", newReport)
      .then(setUpdate(false))
      .then(
        setNewReport({
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

  // delete işlemleri
  const handleDeleteReport = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/reports/${id}`)
      .then(() => {
        setUpdate(false);
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 3000);
      });
  };

  // update işelmleri
  const handleUpdateBtn = (e) => {
    const index = e.target.id;
    setUpdateReport({ ...report[index] });
  };
  const handleUpdateReportInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateAppointmentSelectChange = (e) => {
    const value = e.target.value;
    const newappo = appointment.find((d) => d.id === +value);
    setUpdateReport((prev) => ({
      ...prev,
      appointmentId: newappo.id,
    }));
    console.log(newReport);
  };

  const handleUpdateReport = () => {
    const { id } = updateReport;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/reports/${id}`,
        updateReport
      )
      .then(() => setUpdate(false))
      .then(() => {
        setUpdateReport({
          ...initState,
        });

        setAlert3(true);
        setTimeout(() => {
          setAlert3(false);
        }, 3000);
      });
  };

  return (
    <div>
      <h1 className="text-white text-center text-2xl mt-2">Rapor Yönetimi</h1>
      <div>
        {alert1 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-20 left-6 bg-green-500 text-white text-xl z-10">
            Başarıyla Eklendi
          </h1>
        )}
      </div>
      <div>
        {alert2 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-20 left-6 bg-red-500 text-white text-xl">
            Silme Başarılı!
          </h1>
        )}
      </div>
      <div>
        {alert3 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-20 left-6 bg-blue-500 text-white text-xl">
            Başarıyla Güncellendi
          </h1>
        )}
      </div>
      <div className="  backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4">
        <div className="ml-2 mb-2">
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Rapor Ekle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Rapor Başlığı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="title"
                  value={newReport.title}
                  placeholder="Rapor Başlığı"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Teşhis</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="diagnosis"
                  value={newReport.diagnosis}
                  placeholder="Teşhis"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Ücret</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="price"
                  value={newReport.price}
                  placeholder="Ücreti"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Randevu</h2>
                <select
                  name="appointmentId"
                  className="rounded-sm px-8 py-1"
                  onChange={handleNewAppointmentSelectChange}
                  value={newReport?.appointmentId || ""}
                >
                  <option value="">Randevu Seç</option>
                  {appointment.map((app, index) => (
                    <option value={app.id} key={app.id} id={index}>
                      ID : {app.id}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
                onClick={handleNewReport}
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
              Rapor Güncelle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Rapor Başlığı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="title"
                  value={updateReport.title}
                  placeholder="Rapor Başlığı"
                  onChange={handleUpdateReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Teşhis</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="diagnosis"
                  value={updateReport.diagnosis}
                  placeholder="Teşhis"
                  onChange={handleUpdateReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Ücret</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="price"
                  value={updateReport.price}
                  placeholder="Ücreti"
                  onChange={handleUpdateReportInputChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Randevu</h2>
                <select
                  name="appointmentId"
                  className="rounded-sm px-8 py-1"
                  onChange={handleUpdateAppointmentSelectChange}
                  value={updateReport?.appointmentId || ""}
                >
                  <option value="">Randevu Seç</option>
                  {appointment.map((app, index) => (
                    <option value={app.id} key={app.id} id={index}>
                      ID : {app.id}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex justify-center items-center w-24 p-1 bg-blue-200 gap-2 rounded-lg"
                onClick={handleUpdateReport}
              >
                <div>
                  <IoMdAdd />
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
                <th className=" border w-2/12">Rapor Başlık</th>
                <th className=" border w-2/12">Hayvan Adı</th>
                <th className=" border w-2/12">Teşhis</th>
                <th className="border w-2/12">Doktor Adı</th>
                <th className="border w-2/12">Müşteri</th>
                <th className="border w-2/12">Ücret</th>
                <th className="border w-3/12">Sil / Düzenle</th>
              </tr>
            </thead>
            <tbody className="border h-14 font-light text-black  text-xl ">
              {report?.map((rep, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {rep.title} </td>
                    <td className="border"> {rep.appointment.animalName} </td>
                    <td className="border"> {rep.diagnosis} </td>
                    <td className="border">{rep.appointment.doctorName}</td>
                    <td className="border"> {rep.appointment.customerName} </td>
                    <td className="border"> {rep.price} </td>
                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteReport}
                        id={rep.id}
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
