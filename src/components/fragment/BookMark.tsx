import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDoa,
  useBookMarkHadist,
  useDarkmode,
} from "../../state/TypeHooks";
import { Link } from "react-router-dom";
import LoveIcon from "../element/Icon/LoveIcon";
import {
  TypeAsmaulHusnaMap,
  TypeDoaMap,
  TypeHadistMap,
  TypeSurahMap,
} from "../../model/_Type";

const BookMark = () => {
  /** get current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get bookmark asmaul husna and delete */
  const bookMarkAlQurans = useBookMarkAlQuran((s: any) => s.bookMark);

  /** get bookmark asmaul husna and delete */
  const bookMarkAsmaulHusnas = useBookMarkAsmaulHusna((s: any) => s.bookMark);
  const delBookMarkAsmaulHusna = useBookMarkAsmaulHusna(
    (s: any) => s.deleteBookMark
  );
  /** get bookmark doa */
  const bookMarkDoas = useBookMarkDoa((s: any) => s.bookMark);

  /** get bookmark hadist */
  const bookMarkHadists = useBookMarkHadist((s: any) => s.bookMark);
  return (
    <div className="w-full md:w-5/6 p-4">
      <h1 className="font-semibold text-2xl">Bookmarks</h1>

      {/* bookMark for al-quran */}
      <p className="text-xl mt-8 md:mt-10">Al-Qur'an</p>
      <hr />
      <div className="flex flex-wrap gap-2 justify-start mt-2">
        {bookMarkAlQurans.length > 0 ? (
          bookMarkAlQurans.map((bm: TypeSurahMap) => (
            <Link
              to={`/quran/surah/${bm?.surah}/ayat/${bm.number.inSurah}`}
              className="w-auto inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4 "
              key={bm?.number.inQuran}
            >
              <h1 className="font-semibold">Surah {bm?.surah}</h1>
              <p className="text-sm">ayat {bm?.number?.inSurah}</p>
            </Link>
          ))
        ) : (
          <h1 className="text-sm flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>

      {/* bookMark for asmaul husna */}
      <p className="text-xl mt-8 md:mt-10">Asmaul Husna</p>
      <hr />
      <div className="flex flex-wrap gap-2 justify-start mt-2">
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
          <h1 className="text-sm flex gap-2">
            klik icon <LoveIcon fill={darkMode ? "black" : "white"} /> untuk
            menambah bookmark
          </h1>
        )}
      </div>

      {/* bookMark for doa-doa */}
      <p className="text-xl mt-8 md:mt-10">Doa</p>
      <hr />
      <div className="flex flex-wrap gap-2 justify-start mt-2">
        {bookMarkDoas.length > 0 ? (
          bookMarkDoas.map((bm: TypeDoaMap) => (
            <div
              className="w-auto inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4"
              key={bm?.judul}
            >
              <h1 className="font-semibold capitalize">{bm?.judul}</h1>
            </div>
          ))
        ) : (
          <h1 className="text-sm flex gap-2">
            klik icon <LoveIcon fill={darkMode ? "black" : "white"} /> untuk
            menambah bookmark
          </h1>
        )}
      </div>

      {/* bookMark for hadist */}
      <p className="text-xl mt-8 md:mt-10">Hadist</p>
      <hr />
      <div className="flex flex-wrap gap-2 justify-start mt-2">
        {bookMarkHadists.length > 0 ? (
          bookMarkHadists.map((bm: TypeHadistMap) => (
            <div
              // to={`/hadist/${bm?.name}/${bm?.number}`}
              className="w-auto inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4 "
              key={bm?.id}
            >
              <h1 className="font-semibold capitalize">{bm?.slug}</h1>
              <h1 className="text-sm capitalize">hadist ke {bm?.number}</h1>
            </div>
          ))
        ) : (
          <h1 className="text-sm flex gap-2">
            klik icon <LoveIcon fill={darkMode ? "black" : "white"} /> untuk
            menambah bookmark
          </h1>
        )}
      </div>
    </div>
  );
};

export default BookMark;
