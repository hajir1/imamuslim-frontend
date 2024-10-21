import JadwalSholat from "../components/layouts/JadwalSholat";
import Navbar from "../components/layouts/Navbar";
import { useDarkmode } from "../state/TypeHooks";

const JadwalSholatPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="jadwalsholat" />
      <div className="w-full mt-20">
        <JadwalSholat />
      </div>
    </div>
  );
};

export default JadwalSholatPage;
