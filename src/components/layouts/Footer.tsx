import { timeZone } from "../../helper/moment";

const Footer = () => {
  return (
    <div className="w-full h-16 bg-slate-100 mt-10 flex items-center justify-center">
      <h1 className="text-base">
        @{timeZone} <span className="font-semibold">all right reserved</span>
      </h1>
    </div>
  );
};

export default Footer;
