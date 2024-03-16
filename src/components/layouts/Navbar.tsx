// import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useDarkmode } from "../../state/Zustand";
import DarkModeixon from "../element/Icon/DarkModeixon";
import LightModeIcon from "../element/Icon/LightModeIcon";

type NavbarProps = {
  type: string;
};
const Navbar = ({ type }: NavbarProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const setDarkMode = useDarkmode((state) => state.setDarkMode);

  const handleCheckboxChange = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div
        className={`${
          darkMode && "border-b-2 border-b-white"
        } bg-black w-full justify-around h-14 fixed z-20 flex items-center`}
      >
        <Link
          to={`/`}
          className="flex  items-center w[48%] gap-2 justify-evenly"
        >
          {type === "quran" && (
            <img
              src="./iconQuran.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "asmaulhusna" && (
            <img
              src="./iconasma.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "doadoa" && (
            <img
              src="./icondoa.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "jadwalsholat" && (
            <img
              src="./iconSholat.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}

          {type === "quran" && <p className="text-white">al-Quran</p>}
          {type === "asmaulhusna" && <p className="text-white">asmaul husna</p>}
          {type === "doadoa" && <p className="text-white">doa dan dzikir</p>}
          {type === "jadwalsholat" && <p className="text-white">jadwal sholat</p>}
        </Link>
        <div className="w-[48%] h-full  flex items-center justify-end md:w-2/3 ">
          <label className="h-10 themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md p-1">
            <input
              type="checkbox"
              className="sr-only"
              onChange={handleCheckboxChange}
            />
            <span
              className={`h-8 flex items-center space-x-[6px] py-2 px-3 text-sm font-medium ${
                !darkMode
                  ? "text-secondary bg-slate-100"
                  : "bg-white text-black"
              }`}
            >
              <LightModeIcon
                classIcon={`fill-curent`}
                fill={`${darkMode ? "white" : "white"}`}
              />
            </span>
            <span
              className={`h-8 flex items-center space-x-[6px] py-2 px-3 text-sm font-medium ${
                darkMode ? "text-secondary bg-slate-100" : "bg-white"
              }`}
            >
              <DarkModeixon classIcon={`fill-curent`} />
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
