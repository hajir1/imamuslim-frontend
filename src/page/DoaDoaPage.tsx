import Navbar from "../components/layouts/Navbar";
import { useDarkmode } from "../state/Zustand";
import RouteDoaDzikir from "../components/layouts/DoaDzikir";

const DoaDoaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="doadoa" />
      <div className="w-full mt-20">
        <RouteDoaDzikir />
      </div>
    </div>
  );
};

export default DoaDoaPage;
