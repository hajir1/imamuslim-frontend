import { Link } from "react-router-dom";
import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDoa,
  useBookMarkDzikir,
  useBookMarkHadist,
  useDarkmode,
} from "../../state/Zustand";
// import SymbolMark from "../element/Icon/SymbolMark";
import BookMarkIcon from "../element/Icon/BookMarkIcon";
import DeleteMarkicon from "../element/Icon/DeleteMarkicon";
import LoveIcon from "../element/Icon/LoveIcon";
import DoDzBookMark from "./DoDzBookMark";

const BookMark = () => {
  const { bookMark: alQurans, deleteBookMark: deleteAlQuran }: any =
    useBookMarkAlQuran();
  const { bookMark: asmaulHusnas, deleteBookMark: deleteAsmaulHusna }: any =
    useBookMarkAsmaulHusna();
  const { bookMark: doas, deleteBookMark: deleteDoa }: any = useBookMarkDoa();
  const { bookMark: dzikirs, deleteBookMark: deleteDzikir }: any =
    useBookMarkDzikir();
  const { bookMark: hadists, deleteBookMark: deleteHadist }: any =
    useBookMarkHadist();
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } p-2 w-full lg:w-4/5 md:ml-10`}
    >
      <h1 className="text-xl ml-2 font-semibold md:my-10">Bookmark</h1>
      <div className="w-full">
        {" "}
        <h1 className="ml-2 my-2 lg:my-4 font-semibold">Al-Quran</h1>
        <div className="flex justify-evenly gap-2 flex-wrap md:justify-start">
          {" "}
          {alQurans?.length > 0 ? (
            alQurans?.map((quran: any) => (
              <div
                key={Math.floor(Math.random() * 13267)}
                className={`${
                  darkMode ? "border-b-white" : "border-b-black"
                } border-b-[1px] w-[45%] h-12 rounded-md flex items-center justify-center md:w-[23%]  lg:w-[18%] `}
              >
                {/*  */}
                <div className="flex items-center  justify-center gap-2 w-4/5 ">
                  <DeleteMarkicon
                    fill={`${darkMode ? "black" : "white"}`}
                    handler={() => {
                      deleteAlQuran(quran?.ayat, quran?.surah);
                    }}
                  />
                  <Link
                    className="flex items-center justify-evenly w-full"
                    to={`/quran/surah/${quran?.surah}/ayat/${quran.ayat}`}
                  >
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {quran?.juz}
                    </h1>
                    <p className={`${darkMode ? "text-white" : "text-black"}`}>
                      |
                    </p>
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {quran?.surah}
                    </h1>
                    <p className={`${darkMode ? "text-white" : "text-black"}`}>
                      |
                    </p>
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {quran?.ayat}
                    </h1>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex text-sm justify-center gap-2 p-2">
              <p className="">klik icon</p>{" "}
              <BookMarkIcon fill={`${darkMode ? "white" : "black"}`} />
              <p className="">untuk bookmark AlQuran</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full mt-10 ">
        {" "}
        <h1 className="ml-2 lg:my-4 font-semibold">asmaul-Husna</h1>
        <div className="flex justify-evenly gap-2 flex-wrap lg:justify-start">
          {" "}
          {asmaulHusnas?.length > 0 ? (
            asmaulHusnas?.map((asmaulhusna: any) => (
              <div
                key={Math.floor(Math.random() * 13267)}
                className={`${
                  darkMode ? "border-b-white" : "border-b-black"
                } border-b-[1px] mt-2 w-full rounded-md flex items-center justify-center md:w-[30%] `}
              >
                <div className="flex items-center flex-col justify-around w-full">
                  <div className="w-full flex items-center justify-between">
                    <h1 className=" px-2">{asmaulhusna?.urutan}</h1>
                    <p
                      className={`${
                        darkMode ? "text-white" : "text-gray-700"
                      } text-3xl font-arabic  mx-2`}
                    >
                      {asmaulhusna?.arab}
                    </p>
                    <DeleteMarkicon
                      fill={`${darkMode ? "black" : "white"}`}
                      handler={() => {
                        deleteAsmaulHusna(asmaulhusna?.urutan);
                      }}
                    />
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-white" : "text-gray-800"
                    } text-center text-base font-sans my-2`}
                  >
                    {asmaulhusna?.arti}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex text-sm justify-center gap-2 p-2">
              <p className="">klik icon</p> <LoveIcon fill={`white`} />
              <p className="">untuk bookmark AsmaulHusna</p>
            </div>
          )}
        </div>
      </div>
      <h1 className="ml-2 mt-10 lg:my-4 font-semibold">doa dan dzikir</h1>
      <DoDzBookMark datas={doas} handleDelete={deleteDoa} type="" pesan="doa" />
      <DoDzBookMark
        datas={dzikirs}
        type=""
        handleDelete={deleteDzikir}
        pesan="dzikir"
      />
      <h1 className="ml-2 mt-10 lg:my-4 font-semibold">hadist</h1>
      <DoDzBookMark
        type="hadist"
        datas={hadists}
        handleDelete={deleteHadist}
        pesan="hadist"
      />
    </div>
  );
};

export default BookMark;
