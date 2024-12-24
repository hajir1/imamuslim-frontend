import { Link } from "react-router-dom";
import { useDarkmode } from "../../state/TypeHooks";
import DarkModeixon from "../element/Icon/DarkModeixon";
import LightModeIcon from "../element/Icon/LightModeIcon";
import { useEffect, useRef } from "react";

type NavbarProps = {
  type: string;
};
const Navbar = ({ type }: NavbarProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const setDarkMode = useDarkmode((state) => state.setDarkMode);

  const handleCheckboxChange = () => {
    setDarkMode(!darkMode);
  };
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrolling = () => {
      if (navbarRef.current && window.scrollY > 50) {
        navbarRef.current.style.background = `white`;
      } else if (navbarRef.current) {
        navbarRef.current.style.background = `transparent`;
      }
    };
    window.addEventListener("scroll", scrolling);
    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [navbarRef]);
  return (
    <>
      <div
        ref={navbarRef}
        className={` w-full justify-around h-14 transition-all duration-150 fixed z-20 flex items-center`}
      >
        <div className="flex  items-center w-[48%] gap-2 md:justify-start ml-4 md:ml-10">
          {type === "quran" && (
            <img
              src="/iconQuran.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "asmaulhusna" && (
            <img
              src="/iconasma.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "doadoa" && (
            <img src="/icondoa.png" className="w-10 object-cover h-10" alt="" />
          )}
          {type === "jadwalsholat" && (
            <img
              src="/iconSholat.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "berita" && (
            <img
              src="/iconBerita.png"
              className="w-10 object-cover h-10"
              alt=""
            />
          )}
          {type === "hadist" && (
            <img src="./hadits.png" className="w-10 object-cover h-10" alt="" />
          )}

          {type === "quran" && (
            <Link to={"/quran"} className="text-2xl">
              al-Quran
            </Link>
          )}
          {type === "asmaulhusna" && <p className="">asmaul husna</p>}
          {type === "doadoa" && <p className="">doa dan dzikir</p>}
          {type === "jadwalsholat" && <p className="">jadwal sholat</p>}
          {type === "berita" && <p className="">berita</p>}
          {type === "home" && (
            <Link to={"/"} className=" text-2xl">
              Im'a muslim
            </Link>
          )}
          {type === "hadist" && <p className=" text-2xl">hadist</p>}
        </div>
        <div className="w-[48%]  h-full flex items-center justify-end md:mr-10">
          <label
            className={`${
              darkMode && "bg-[#d3d9df]"
            } h-10 themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center  rounded-md p-1`}
          >
            <input
              type="checkbox"
              className="sr-only"
              onChange={handleCheckboxChange}
            />
            <span
              className={`h-8 flex items-center space-x-[6px] py-2 px-3 text-sm font-medium `}
            >
              <LightModeIcon
                // classIcon={`fill-curent`}
                classIcon={darkMode ? "white" : "black"}
              />
            </span>
            <span
              className={`h-8 flex items-center space-x-[6px] py-2 px-3 text-sm font-medium `}
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
