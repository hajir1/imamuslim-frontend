import { Link, useLocation, useParams } from "react-router-dom";
import {
  useCurrentQuran,
  useCurrentSurah,
  useDarkmode,
} from "../../state/TypeHooks";
import DarkModeixon from "../element/Icon/DarkModeixon";
import LightModeIcon from "../element/Icon/LightModeIcon";
import { BreadCrumb } from "../fragment/Breadcrumb";

const Navbar = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const setDarkMode = useDarkmode((state) => state.setDarkMode);
  const handleCheckboxChange = () => {
    setDarkMode(!darkMode);
  };

  /** get current path */
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const path = segments[0];
  const subPath = segments[1];

  /** path spesific */
  const { surah: idSurah, juz: idJuz } = useParams();

  /** handle breadcrumb dynamic */
  const currentQuran = useCurrentQuran((s: any) => s.currentQuran);
  const setCurrentQuran = useCurrentQuran((s: any) => s.setCurrentQuran);
  const currentSurah = useCurrentSurah((s: any) => s.currentSurah);
  const setCurrentSurah = useCurrentSurah((s: any) => s.setCurrentSurah);

  return (
    <>
      <div className={`bg-white text-black w-full flex flex-col fixed z-20 `}>
        <div className="w-full justify-around flex items-center p-2">
          <div className="flex  items-center flex-grow gap-2 md:justify-start pl-4 md:ml-10">
            {!path && (
              <Link to={"/"} className={` text-2xl`}>
                Im'a muslim
              </Link>
            )}
            {path === "quran" && (
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
            {path === "asmaulhusna" && (
              <>
                <img
                  src="/iconasma.png"
                  className="w-10 object-cover h-10"
                  alt=""
                />
                <Link to={"/"} className="">
                  Asmaul Husna
                </Link>
              </>
            )}
            {path === "doa" && (
              <>
                <img
                  src="/icondoa.png"
                  className="w-10 object-cover h-10"
                  alt=""
                />
                <Link to={"/"} className="">
                  Doa-doa
                </Link>
              </>
            )}
            {path === "jadwalsholat" && (
              <>
                <img
                  src="/iconSholat.png"
                  className="w-10 object-cover h-10"
                  alt=""
                />
                <Link to={"/"} className="">
                  Jadwal Sholat
                </Link>
              </>
            )}

            {path === "hadist" && (
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
        {path === "quran" && subPath !== "surah" && subPath !== "juz" && (
          <div className="w-full pl-4 md:ml-10">
            <BreadCrumb
              firstRoute={"al-Quran"}
              firstRouteLink="/"
              routeStatus1="Surah"
              routeStatus2="Juz"
              option={currentQuran}
              setOption={setCurrentQuran}
            />
          </div>
        )}
        {subPath === "surah" && (
          <div className="w-full pl-4 md:ml-10">
            <BreadCrumb
              firstRoute={`Surah ke ${idSurah}`}
              firstRouteLink="/quran"
              routeStatus1="Terjemah"
              routeStatus2="Baca"
              option={currentSurah}
              setOption={setCurrentSurah}
            />
          </div>
        )}
        {subPath === "juz" && (
          <div className="w-full pl-4 md:ml-10">
            <BreadCrumb
              firstRoute={`Juz ke ${idJuz}`}
              firstRouteLink="/quran"
              // routeStatus1="Terjemah"
              // routeStatus2="Baca"
              // option={currentSurah}
              // setOption={setCurrentSurah}
            />
          </div>
        )}
        <hr />
      </div>
    </>
  );
};

export default Navbar;
