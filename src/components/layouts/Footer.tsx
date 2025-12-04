import { getDate, getYears, getMonthIdn } from "../../helper/moment";
import { useDarkmode } from "../../state/TypeHooks";

const Footer = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "border-t-white bg-black" : "border-t-black bg-white"
      } 
 w-full h-20 flex items-center justify-center`}
    >
      <h1 className="text-sm md:text-base ">
        &copy; {getDate}-{getMonthIdn}-{getYears}{" "}
        <span className="font-semibold">all right Reserved</span>
      </h1>
    </div>
  );
};

export default Footer;
