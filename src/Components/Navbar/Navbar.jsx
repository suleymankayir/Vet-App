import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";

function Navbar() {
  return (
    <div className="flex flex-row font-semibold text-white bg-neutral-600 py-3 items-center justify-around mt-2 w-11/12 mx-auto rounded-md ">
      <div className="ml-12 ">
        <Link to="/">
          <div className="flex items-center justify-center gap-2">
            <MdOutlinePets className="text-[3rem]" />
            <div className="text-[2rem]">PET SHOP</div>
          </div>
        </Link>
      </div>
      <div className="mr-12 md:ml-56 font-extralight text-xl flex items-center justify-center gap-3">
        <Link to="/appointment">Appointment</Link>
        <Link to="/customer">Customer</Link>
        <Link to="/report">Report</Link>
        <Link to="/vaccine">Vaccine</Link>
        <Link to="/doctor">Doctor</Link>
        <Link to="/animal">Animal</Link>
        
      </div>{" "}
    </div>
  );
}

export default Navbar;
