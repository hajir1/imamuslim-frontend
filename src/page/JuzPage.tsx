import JuzById from "../components/layouts/JuzById";
import { useDarkmode } from "../state/Zustand";

const JuzPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      }`}
    >
      <JuzById />
    </div>
  );
};

export default JuzPage;
