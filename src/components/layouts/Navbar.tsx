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
        <div className="flex  items-center flex-grow gap-2 md:justify-start ml-4 md:ml-10">
          {type === "home" && (
            <Link to={"/"} className={` text-2xl`}>
              Im'a muslim
            </Link>
          )}
          {type === "quran" && (
            <>
              <img
                src="/iconQuran.png"
                className="w-10 object-cover h-10"
                alt=""
              />
              <Link to={"/"} className={` text-2xl`}>
                Al-Quran
              </Link>
            </>
          )}
          {type === "asmaulHusna" && (
            <>
              <img
                src="/iconasma.png"
                className="w-10 object-cover h-10"
                alt=""
              />
              <Link to={"/asmaulhusna"} className="">
                Asmaul Husna
              </Link>
            </>
          )}
          {type === "dodz" && (
            <>
              <img
                src="/icondoa.png"
                className="w-10 object-cover h-10"
                alt=""
              />
              <Link to={"/dodz"} className="">
                Doa Dan Dzikir
              </Link>
            </>
          )}
          {type === "jadwalsholat" && (
            <>
              <img
                src="/iconSholat.png"
                className="w-10 object-cover h-10"
                alt=""
              />
              <Link to={"/jadwalsholat"} className="">
                Jadwal Sholat
              </Link>
            </>
          )}

          {type === "hadist" && (
            <>
              <img
                src="/hadits.png"
                className="w-10 object-cover h-10"
                alt=""
              />
              <Link to={"/"} className={` text-2xl`}>
                Hadist
              </Link>
            </>
          )}
        </div>
        <div className="h-full flex items-center justify-end">
          <label
            className={`${
              darkMode && "bg-[#d3d9df]"
            } h-10 themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center  rounded-md p-1 mr-4`}
          >
            <input
              type="checkbox"
              className="sr-only"
              onChange={handleCheckboxChange}
            />
            <span
              className={`h-8 flex items-center space-x-[6px] py-2 px-3 text-sm font-medium `}
            >
              <LightModeIcon classIcon={`fill-curent`} />
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
