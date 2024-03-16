import { Link } from "react-router-dom";

const RoutingPage = () => {
  return (
    <div className="w-4/5 text-black z-20 lg:w-1/3 ">
      <div className="flex flex-wrap justify-center items-center flex-col ">
        <Link
          className="w-4/5 text-center font-semibold text-xl border border-black rounded-lg bg-white my-2 p-2 "
          to={`/quran`}
        >
          Al Quran
        </Link>
        <Link
          className="w-4/5 text-center font-semibold text-xl border border-black rounded-lg bg-white my-2 p-2 "
          to={`/asmaulhusna`}
        >
          asmaul husna
        </Link>
        <Link
          className="w-4/5 text-center font-semibold text-xl border border-black rounded-lg bg-white my-2 p-2 "
          to={`/doadoa`}
        >
          doa dan dzikir
        </Link>
        <Link
          className="w-4/5 text-center font-semibold text-xl border border-black rounded-lg bg-white my-2 p-2 "
          to={`/jadwalsholat`}
        >
          jadwal sholat
        </Link>
      </div>
    </div>
  );
};

export default RoutingPage;
