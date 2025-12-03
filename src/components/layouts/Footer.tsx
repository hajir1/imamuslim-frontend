import {
  getDate,
  getYears,
  getMonthIdn,
} from "../../helper/moment";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-16 bg-slate-100 mt-10 flex items-center justify-center">
      <h1 className="text-sm font-sans text-slate-800 ">
        &copy;{getYears}{" "} {getDate}-{getMonthIdn}{" "} 
        <span className="font-bold">all right Reserved</span>
      </h1>
    </div>
  );
};

export default Footer;
