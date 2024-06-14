import React from "react";
import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex flex-row font-semibold text-[#ffffff] bg-cyan-600 py-3 items-center justify-around mt-2 w-11/12 mx-auto rounded-md backdrop-blur-[6px] bg-white/15 ">
      <div className="ml-12 ">
        <Link to="/">
          <div className="flex items-center justify-center gap-2">
            <FaCat className="text-[3rem]" />
            <div className="text-[2rem]">VET</div>
          </div>
        </Link>
      </div>
      <div className="mr-12 md:ml-56 font-light text-xl flex items-center justify-center gap-3">
        <Link to="/appointment">Randevu</Link>
        <Link to="/report">Rapor</Link>
        <Link to="/vaccine">Aşı</Link>
        <Link to="/doctor">Doktor</Link>
        <Link to="/animal">Hayvan</Link>
        <Link to="/customer">Müşteri</Link>
      </div>{" "}
    </div>
  );
}

export default Navbar;
