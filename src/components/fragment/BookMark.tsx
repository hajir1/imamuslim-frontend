import { Link } from "react-router-dom";
import { useBookMark, useDarkmode } from "../../state/Zustand";
import SymbolMark from "../element/Icon/SymbolMark";
import BookMarkIcon from "../element/Icon/BookMarkIcon";
import DeleteMarkicon from "../element/Icon/DeleteMarkicon";

const BookMark = () => {
  const { bookMark, deleteBookMark }: any = useBookMark();
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="p-2 w-full lg:flex lg:justify-center">
      <div
        className={`${
          darkMode ? "bg-primary" : "bg-primary"
        } rounded-lg  w-full p-2 lg:w-4/5`}
      >
        <div className="flex h-10 items-center w-full justify-evenly gap-2 p-2 border-b-2 border-b-white lg:justify-center">
          <SymbolMark />
          <p className="font-bold text-white tracking-wider">BookMark</p>
        </div>
        <div className="mt-1 w-full overflow-y-auto gap-2 h-16 p-1 flex items-center justify-evenly flex-wrap">
          {bookMark?.length > 0 ? (
            bookMark?.map((item: any) => (
              <div
                key={Math.floor(Math.random() * 13267)}
                className="bg-white  w-[45%] h-12 rounded-md flex items-center justify-center lg:w-[18%] "
              >
                {/*  */}
                <div className="flex items-center justify-center gap-2 w-4/5">
                  <DeleteMarkicon
                    fill={`${darkMode ? "black" : "white"}`}
                    handler={() => {
                      deleteBookMark(item?.ayat, item?.surah);
                      console.log(item?.ayat, item?.surah);
                    }}
                  />
                  <Link
                    className="flex items-center justify-evenly w-full"
                    to={`/quran/surah/${item?.surah}/ayat/${item.ayat}`}
                  >
                    <h1 className="text-black">{item?.juz}</h1>
                    <p className="text-black">|</p>
                    <h1 className="text-black">{item?.surah}</h1>
                    <p className="text-black">|</p>
                    <h1 className="text-black">{item?.ayat}</h1>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex text-sm justify-center gap-4">
              <p className="text-white">klik icon</p>{" "}
              <BookMarkIcon fill={`${darkMode ? "white" : "white"}`} />
              <p className="text-white">untuk bookMark</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookMark;
