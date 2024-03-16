import AsmaulHusna from "../components/layouts/AsmaulHusna";
import Navbar from "../components/layouts/Navbar";
import { useDarkmode } from "../state/Zustand";

const AsmaulHusnaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="asmaulhusna" />
      <div className="w-full mt-20">
        <AsmaulHusna />
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
