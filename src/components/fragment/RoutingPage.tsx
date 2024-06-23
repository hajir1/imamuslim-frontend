import { Link } from "react-router-dom";
import IconBerita from "../element/Icon/IconBerita";

const RoutingPage = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4  w-full">
      <Link
        className={`w-4/5 flex flex-col items-center justify-center font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%] h-52 `}
        to={`/berita`}
      >
        <IconBerita />
        <h1 className="font-semibold text-2xl">berita</h1>
        <p className="text-sm text-center font-normal">
          menampilan berita islam nasional
        </p>
      </Link>
      <Link
        className={`w-4/5 flex justify-center items-center flex-col font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%] h-52 `}
        to={`/quran`}
      >
        <img src="./iconQuran.png" className="w-20 h-20" alt="" />
        <h1 className="font-semibold text-2xl">Al'Quran</h1>
        <p className="text-sm text-center font-normal">
          al-quran dengan murottal , tafsir terjemah
        </p>
      </Link>
      <Link
        className={`w-4/5 flex flex-col items-center justify-center font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%]  h-52 `}
        to={`/asmaulhusna`}
      >
        <img src="./iconasma.png" className="w-20 h-20" alt="" />
        <h1 className="font-semibold text-2xl">Asmaul-Husna</h1>
        <p className="text-sm text-center font-normal">
          99 asmaul husna berserta arti
        </p>
      </Link>
      <Link
        className={`w-4/5 flex flex-col items-center justify-center  font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%] h-52 `}
        to={`/doadoa`}
      >
        <img src="./icondoa.png" className="w-20 h-20" alt="" />
        <h1 className="font-semibold text-2xl">doa dan dzikir</h1>
        <p className="text-sm text-center font-normal">
          doa dan dzikir yang sering digunakan setiap hari
        </p>
      </Link>
      <Link
        className={`w-4/5 flex flex-col items-center justify-center font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%] h-52 `}
        to={`/jadwalsholat`}
      >
        <img src="./iconSholat.png" className="w-20 h-20" alt="" />
        <h1 className="font-semibold text-2xl">jadwal sholat</h1>
        <p className="text-sm text-center font-normal">
          menampilkan jadwal sholat seluruh Indonesia
        </p>
      </Link>
      <Link
        className={`w-4/5 flex flex-col items-center justify-center font-semibold text-xl  rounded-lg bg-slate-200 lg:w-[24%] h-52 `}
        to={`/hadist`}
      >
        <img src="./hadits.png" className="w-40 h-20" alt="" />
        <h1 className="font-semibold text-2xl">hadist</h1>
        <p className="text-sm text-center font-normal">
          hadist dan terjemah dari beberapa mufassir
        </p>
      </Link>
    </div>
  );
};

export default RoutingPage;
