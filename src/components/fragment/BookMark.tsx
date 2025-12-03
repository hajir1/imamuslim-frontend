import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDoa,
  useBookMarkHadist,
  useDarkmode,
} from "../../state/TypeHooks";
import { Link } from "react-router-dom";
import LoveIcon from "../element/Icon/LoveIcon";
import { TypeAsmaulHusnaMap } from "../../model/_Type";

const BookMark = () => {
  /** get current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  const { bookMark: bmAlQurans }: any = useBookMarkAlQuran();
  const { bookMark: bmDoas }: any = useBookMarkDoa();
  const { bookMark: bmHadist }: any = useBookMarkHadist();

  /** get bookmark asmaul husna and delete */
  const bookMarkAsmaulHusnas = useBookMarkAsmaulHusna((s: any) => s.bookMark);
  const delBookMarkAsmaulHusna = useBookMarkAsmaulHusna(
    (s: any) => s.deleteBookMark
  );
  return (
    <div className="w-full md:w-5/6 p-4">
      <h1 className="font-semibold text-2xl">Bookmarks</h1>
      <p className="text-xl md:my-2">Al Quran</p>

      <div className="mt-4">
        {bmAlQurans.length > 0 ? (
          bmAlQurans.map((bmAlQuran: any) => (
            <Link
              to={`/quran/surah/${bmAlQuran?.idSurah}/ayat/${bmAlQuran?.ayat}`}
              className="w-auto mx-2 my-2 inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4 "
              key={bmAlQuran?.id}
            >
              <h1 className="font-semibold">{bmAlQuran?.surah}</h1>
              <p className="text-sm">ayat {bmAlQuran?.ayat}</p>
            </Link>
          ))
        ) : (
          <h1 className="text-sm flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>

      {/* bookMark for asmaul husna */}
      <p className="text-xl md:my-2">Asmaul Husna</p>
      <hr />
      <div className="flex flex-wrap gap-2 justify-start">
        {bookMarkAsmaulHusnas.length > 0 ? (
          bookMarkAsmaulHusnas.map((am: TypeAsmaulHusnaMap) => (
            <div
              className="w-auto inline-block bg-gray-200 text-black rounded-md p-2 relative overflow-hidden md:px-4 group "
              key={am?.id}
            >
              <h1 className="text-center py-2 font-amiri text-xl md:text-2xl">
                {am?.arab}
              </h1>
                <p className="text-sm">{am?.latin}</p>{" "}
                <p className="text-xs">
                  <span className="font-semibold">artinya : </span> {am?.indo}
                </p>
              <div className="bg-blue-100 w-full h-full -bottom-20 invisible absolute flex items-center justify-center group-hover:visible inset-0 group-hover:top-0">
                <h1
                  className="cursor-pointer"
                  onClick={() => delBookMarkAsmaulHusna(am?.id)}
                >
                  delete
                </h1>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-sm">
            klik icon <LoveIcon fill={darkMode ? "black" : "white"} /> untuk
            menambah bookmark
          </h1>
        )}
      </div>

      <p className="text-xl md:my-2">Doa</p>

      <div className="mt-4">
        {bmDoas.length > 0 ? (
          bmDoas.map((bmDoa: any) => (
            <Link
              to={`/dodz/doa/${bmDoa?.id}`}
              className="w-auto mx-2 my-2 inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4"
              key={bmDoa?.id}
            >
              <h1 className="font-semibold capitalize">{bmDoa?.title}</h1>
            </Link>
          ))
        ) : (
          <h1 className="text-sm flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>
      <hr />

      <p className="text-xl md:my-2">Hadist</p>

      <div className="mt-4">
        {bmHadist.length > 0 ? (
          bmHadist.map((bmDoa: any) => (
            <Link
              to={`/hadist/${bmDoa?.name}/${bmDoa?.number}`}
              className="w-auto mx-2 my-2 inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4 "
              key={bmDoa?.id}
            >
              <h1 className="font-semibold capitalize">{bmDoa?.name}</h1>
              <h1 className="text-sm capitalize">hadist ke {bmDoa?.number}</h1>
            </Link>
          ))
        ) : (
          <h1 className="text-sm flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>
    </div>
  );
};

export default BookMark;
