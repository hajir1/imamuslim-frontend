import { Link } from "react-router-dom";
import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDzikir,
  useDarkmode,
} from "../../state/Zustand";
// import SymbolMark from "../element/Icon/SymbolMark";
import BookMarkIcon from "../element/Icon/BookMarkIcon";
import DeleteMarkicon from "../element/Icon/DeleteMarkicon";
import LoveIcon from "../element/Icon/LoveIcon";

const BookMark = () => {
  const { bookMark: alQuran, deleteBookMark: deleteAlQuran }: any =
    useBookMarkAlQuran();
  const { bookMark: asmaulHusna, deleteBookMark: deleteAsmaulHusna }: any =
    useBookMarkAsmaulHusna();
  const { bookMark: dzikir, deleteBookMark: deleteDzikir }: any =
    useBookMarkDzikir();
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
        <h1 className="ml-2 my-2 lg:my-4">Al-Quran</h1>
        <div className="flex justify-evenly gap-2 flex-wrap md:justify-start">
          {" "}
          {alQuran?.length > 0 ? (
            alQuran?.map((item: any) => (
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
                      deleteAlQuran(item?.ayat, item?.surah);
                    }}
                  />
                  <Link
                    className="flex items-center justify-evenly w-full"
                    to={`/quran/surah/${item?.surah}/ayat/${item.ayat}`}
                  >
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {item?.juz}
                    </h1>
                    <p className={`${darkMode ? "text-white" : "text-black"}`}>
                      |
                    </p>
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {item?.surah}
                    </h1>
                    <p className={`${darkMode ? "text-white" : "text-black"}`}>
                      |
                    </p>
                    <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
                      {item?.ayat}
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
        <h1 className="ml-2 lg:my-4">asmaul-Husna</h1>
        <div className="flex justify-evenly gap-2 flex-wrap lg:justify-start">
          {" "}
          {asmaulHusna?.length > 0 ? (
            asmaulHusna?.map((item: any) => (
              <div
                key={Math.floor(Math.random() * 13267)}
                className={`${
                  darkMode ? "border-b-white" : "border-b-black"
                } border-b-[1px] mt-2 w-full rounded-md flex items-center justify-center md:w-[30%] `}
              >
                <div className="flex items-center flex-col justify-around w-full">
                  <div className="w-full flex items-center justify-between">
                    <h1 className=" px-2">{item?.urutan}</h1>
                    <p
                      className={`${
                        darkMode ? "text-white" : "text-gray-700"
                      } text-2xl  mx-2`}
                    >
                      {item?.arab}
                    </p>
                    <DeleteMarkicon
                      fill={`${darkMode ? "black" : "white"}`}
                      handler={() => {
                        deleteAsmaulHusna(item?.urutan);
                      }}
                    />
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-white" : "text-gray-800"
                    } text-center text-sm my-2`}
                  >
                    {item?.arti}
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
      <div className="w-full mt-10 ">
        {" "}
        <h1 className="ml-2 lg:my-4 font-semibold">dzikir</h1>
        <div className="flex justify-evenly gap-2 flex-wrap lg:justify-start">
          {" "}
          {dzikir?.length > 0 ? (
            dzikir?.map((dzikir: any) => (
              <div
                key={Math.floor(Math.random() * 13267)}
                className={`${
                  darkMode ? "border-b-white" : "border-b-black"
                } border-b-[1px] mt-2 w-[90%] rounded-md flex flex-col lg:my-4 lg:w-full`}
              >
                <div className="flex flex-col justify-around w-full ">
                  <div className="flex justify-between w-full">
                    <h1 className="text-center font-semibold uppercase text-sm lg:text-xl">{dzikir?.title}</h1>
                    <DeleteMarkicon
                      fill={`${darkMode ? "black" : "white"}`}
                      handler={() => {
                        deleteDzikir(dzikir?.id);
                      }}
                    />
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-white" : "text-gray-700"
                    } text-3xl  mx-2 text-right mt-4 mb-2 lg:text-4xl`}
                  >
                    {dzikir?.arabic}
                  </p>

                  <p
                    className={`${
                      darkMode ? "text-white" : "text-gray-800"
                    } text-left text-base my-2 lg:text-xl`}
                  >
                    {dzikir?.latin}
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-white" : "text-gray-800"
                    } text-left text-sm my-2 md:text-base`}
                  >
                    <span className="font-semibold">artinya </span>:{" "}
                    {dzikir?.translate}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex text-sm justify-center gap-2 p-2">
              <p className="">klik icon</p> <LoveIcon fill={`white`} />
              <p className="">untuk bookmark dzikir</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookMark;
