import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Doctor() {
  const initState = {
    workDate: "",
    doctorId: "",
  };

  const doctorInitState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  };
  const [doctor, setDoctor] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateDoctor, setUpdateDoctor] = useState({
    ...doctorInitState,
  });
  const [newDoctor, setNewDoctor] = useState({
    ...doctorInitState,
  });

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/available-dates")
      .then((res) => setAvailableDate(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewDoctor = () => {
    axios
      .post(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/doctors", newDoctor)
      .then(setUpdate(false))
      .then(
        setNewDoctor({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      )
      .then(() => setAlert1(true))
      .then(() =>
        setTimeout(() => {
          setAlert1(false);
        }, 3000)
      );
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/doctors/${id}`,
        updateDoctor
      )
      .then(() => setUpdate(false))
      .then(() => {
        setUpdateDoctor({
          ...doctorInitState,
        });
        setAlert3(true);
        setTimeout(() => {
          setAlert3(false);
        }, 3000);
      });
  };

  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteDoctor = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/doctors/${id}`)
      .then(() => {
        setUpdate(false);
        setAlert2(true);
        setTimeout(() => {
          setAlert2(false);
        }, 3000);
      });
  };

  const handleUpdateDoctorBtn = (e) => {
    const index = e.target.id;
    setUpdateDoctor({ ...doctor[index] });
  };

  const [availableDate, setAvailableDate] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    ...initState,
  });

  const [alertDate1, setAlertDate1] = useState(false);
  const [alertDate2, setAlertDate2] = useState(false);

  const handleNewAvailableDateInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailableDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    const newdoctor = doctor.find((d) => d.id === +id);
    setNewAvailableDate((prev) => ({
      ...prev,
      doctorId: newdoctor.id,
    }));
    console.log(newdoctor.id);
  };

  const handleNewAvailableDate = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/available-dates",
        newAvailableDate
      )
      .then(() => setUpdate(false))
      .then(() => setNewAvailableDate({ ...initState }))
      .then(() => setAlertDate1(true))
      .then(() =>
        setTimeout(() => {
          setAlertDate1(false);
        }, 3000)
      );
  };

  const handleDeleteAvailableDate = (e) => {
    const id = e.target.id;
    axios
      .delete(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/available-dates/${id}`
      )
      .then(() => {
        setUpdate(false);
        setAlertDate2(true);
        setTimeout(() => {
          setAlertDate2(false);
        }, 3000);
      });
  };

  return (
    <div>
      <h1 className="text-white text-2xl text-center mt-4">Doctors</h1>
      <div>
        {alert1 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-24 left-6 bg-green-500 text-white text-xl">
            Success!
          </h1>
        )}
      </div>
      <div>
        {alert2 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-24 left-6 bg-red-500 text-white text-xl">
            Deleted!
          </h1>
        )}
      </div>
      <div>
        {alert3 && (
          <h1 className="w-56 text-center rounded-md py-3 absolute top-24 left-6 bg-blue-500 text-white text-xl">
            Updated!
          </h1>
        )}
      </div>
      <div>
        <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
          <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
            <tr className="">
              <th className=" border w-12">ID</th>
              <th className=" border w-2/12">Name</th>
              <th className="border w-2/12">Email</th>
              <th className="border w-2/12">Phone</th>
              <th className="border w-2/12">Address</th>
              <th className="border w-2/12">City</th>
              <th className="border w-2/12">Delete / Edit</th>
            </tr>
          </thead>
          <tbody className="border h-14 font-light text-black  text-xl ">
            {doctor?.map((doc, index) => {
              return (
                <tr key={index} className="text-xl bg-white h-10">
                  <td className="border"> {doc.id} </td>
                  <td className="border"> {doc.name} </td>
                  <td className="border"> {doc.email} </td>
                  <td className="border"> {doc.phone} </td>
                  <td className="border"> {doc.address} </td>
                  <td className="border"> {doc.city} </td>
                  <td
                    className=" border flex justify-center items-center gap-2 py-3
                   "
                  >
                    <div
                      onClick={handleDeleteDoctor}
                      id={doc.id}
                      className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                    >
                      <MdDelete />
                      Delete
                    </div>
                    <div
                      onClick={handleUpdateDoctorBtn}
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
        </table>
      </div>
      <div className="flex justify-evenly mt-4 py-3 w-10/12 mx-auto backdrop-blur-[6px] bg-black/30 rounded-md ">
        <div className=" mt-2 py-2 px-2 rounded-lg  ">
          <h2 className="text-center mb-1 text-white text-xl">Add Doctor</h2>
          <div className=" flex flex-col gap-2 w-44 items-center">
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="name"
              value={newDoctor.name}
              placeholder="Doctor Name"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="phone"
              value={newDoctor.phone}
              placeholder="Phone"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="email"
              value={newDoctor.email}
              placeholder="Email"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="address"
              value={newDoctor.address}
              placeholder="Address"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="city"
             
              value={newDoctor.city}
              placeholder="City"
              onChange={handleNewDoctorInputChange}
            />
            <button
              onClick={handleAddNewDoctor}
              className="flex justify-center items-center w-24 mt-2 p-1 bg-gray-300 gap-2 rounded-lg"
            >
              <div>
                <IoMdAdd />
              </div>
              <div>Add</div>
            </button>
          </div>
        </div>
        <div className="rounded-lg mt-2   py-2 px-2   ">
          <h2 className="text-center mb-1 text-white text-xl">
            Update Doctor
          </h2>
          <div className="flex flex-col gap-2 w-44 items-center">
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="name"
              value={updateDoctor.name}
             
              placeholder="Doctor Name"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="phone"
              value={updateDoctor.phone}
              placeholder="Phone"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="email"
              value={updateDoctor.email}
              placeholder="Email"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="address"
              value={updateDoctor.address}
              placeholder="Address"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-lg px-2 py-1"
              type="text"
              name="city"
              
              value={updateDoctor.city}
              placeholder="City"
              onChange={handleUpdateDoctorInputChange}
            />
            <button
              onClick={handleUpdateDoctor}
              className="flex justify-center items-center w-24 mt-2 p-1 bg-green-400 gap-2 rounded-lg"
            >
              <div>
                <MdModeEdit />
              </div>
              <div>Edit</div>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-white text-center text-2xl mt-8">
          Available Date Management
        </h1>
        <div>
          {alertDate1 && (
            <h1 className="w-56 text-center rounded-md py-3 absolute bottom-10 left-6 bg-green-500 text-white text-xl">
              Success!
            </h1>
          )}
        </div>
        <div>
          {alertDate2 && (
            <h1 className="w-56 text-center rounded-md py-3 absolute bottom-10 left-6 bg-red-500 text-white text-xl">
              Deleted!
            </h1>
          )}
        </div>
        <div>
          <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
            <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
              <tr className="">
                <th className=" border w-2/12">Name</th>
                <th className="border w-2/12">Date</th>
                <th className="border w-2/12">Email</th>
                <th className="border w-2/12">Phone</th>
                <th className="border w-2/12">Delete</th>
              </tr>
            </thead>
            <tbody className="border h-14 font-light text-black  text-xl ">
              {availableDate?.map((available, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {available.doctor.name} </td>
                    <td className="border"> {available.workDay} </td>
                    <td className="border"> {available.doctor.email} </td>
                    <td className="border"> {available.doctor.phone} </td>
                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteAvailableDate}
                        id={available.id}
                        className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                      >
                        <MdDelete />
                        Delete
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="backdrop-blur-[6px] flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-8 ">
          <div className="flex gap-8 backdrop-blur-[6px]  bg-black/30 rounded-md items-center px-4 py-5">
            <h1 className="text-white text-xl">Date</h1>
            <div className="">
              <input
                className="rounded-lg px-2 py-1 mr-5"
                type="date"
                name="workDate"
                value={newAvailableDate.workDate}
                placeholder="Date"
                onChange={handleNewAvailableDateInputChange}
              />{" "}
              <select 
                name="doctorId"
                id="doctorSelect"
                className="py-1 mr-5 rounded-lg px-2"
                value={newAvailableDate.doctorId || ""}
                onChange={handleDoctorSelectChange}
              >
                <option value="" disabled>
                  Add Doctor
                </option>
                {doctor?.map((doc) => (
                  <option value={doc.id} key={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <button
                className=" bg-gray-300 rounded-md px-2 py-[6px] ml-1 font-bold"
                onClick={handleNewAvailableDate}
              >
                Add Date
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
