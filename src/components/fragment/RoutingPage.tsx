import { Link } from "react-router-dom";

const RoutingPage = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4  w-full">
      <Link
        className={`w-4/5 grid place-content-center font-semibold text-xl  rounded-lg bg-slate-100 lg:w-[47%] h-52 `}
        to={`/quran`}
      >
        Al Quran
      </Link>
      <Link
        className={`w-4/5 grid place-content-center font-semibold text-xl  rounded-lg bg-slate-100 lg:w-[47%]  h-52 `}
        to={`/asmaulhusna`}
      >
        asmaul husna
      </Link>
      <Link
        className={`w-4/5 grid place-content-center font-semibold text-xl  rounded-lg bg-slate-100 lg:w-[47%] h-52 `}
        to={`/doadoa`}
      >
        doa dan dzikir
      </Link>
      <Link
        className={`w-4/5 grid place-content-center font-semibold text-xl  rounded-lg bg-slate-100 lg:w-[47%] h-52 `}
        to={`/jadwalsholat`}
      >
        jadwal sholat
      </Link>
      <Link
        className={`w-4/5 grid place-content-center font-semibold text-xl  rounded-lg bg-slate-100 lg:w-[47%] h-52 `}
        to={`/berita`}
      >
        berita
      </Link>
    </div>
  );
};

export default RoutingPage;
