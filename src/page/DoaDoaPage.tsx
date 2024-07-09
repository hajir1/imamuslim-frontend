import Navbar from "../components/layouts/Navbar";
import { useDarkmode, useOpsiDoaDzikir } from "../state/Zustand";
import { DoaRoute, DzikirRoute } from "../components/layouts/OpsiDoDz";
import { useEffect } from "react";
import { useGetDoa } from "../state/Query";
import Terjemahicon from "../components/element/Icon/Terjemahicon";
import BacaIcon from "../components/element/Icon/BacaIcon";

const DoaDoaPage = () => {
  const { dzikir, setDzikir }: any = useOpsiDoaDzikir();

  const { isLoading } = useGetDoa();
  const darkMode = useDarkmode((state) => state.darkMode);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="doadoa" />
      <div className="w-full mt-20">
        <div className="w-full p-2">
          {isLoading ? (
            <div className="w-full flex justify-evenly mt-4 p-2">
              <div className="w-[45%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-14"></div>
              <div className="w-[45%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-14"></div>
            </div>
          ) : (
            <div className="w-full flex justify-evenly mt-4 p-2">
              <button
                onClick={() => setDzikir(false)}
                className={`${!dzikir && "border-b-2 border-b-black"} ${
                  darkMode ? "text-white border-b-white" : "text-gray-800"
                } font-bold py-2 px-4 rounded inline-flex items-center`}
              >
                <Terjemahicon />
                <span className="mx-2">Doa</span>
              </button>
              <button
                onClick={() => setDzikir(true)}
                className={`${dzikir && "border-b-2 border-b-black"} ${
                  darkMode ? "text-white border-b-white" : "text-gray-800"
                } font-bold py-2 px-4 rounded inline-flex items-center`}
              >
                <BacaIcon width="1.6rem" height="1.6rem" />
                <span className="mx-2">Dzikir</span>
              </button>
            </div>
          )}
          {dzikir ? <DzikirRoute /> : <DoaRoute />}
        </div>
      </div>
    </div>
  );
};

export default DoaDoaPage;
