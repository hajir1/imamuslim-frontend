import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDoa,
  useBookMarkHadist,
} from "../../state/TypeHooks";
import { Link } from "react-router-dom";
import LoveIcon from "../element/Icon/LoveIcon";

const BookMark = () => {
  const { bookMark: bmAlQurans }: any = useBookMarkAlQuran();
  const { bookMark: bmDoas }: any = useBookMarkDoa();
  const { bookMark: bmHadist }: any = useBookMarkHadist();
  const { bookMark: bmAsmaulHusnas, deleteBookMark: delBmAsmaulHusna }: any =
    useBookMarkAsmaulHusna();
  return (
    <div className="w-full md:w-11/12 p-4">
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
              <h1 className="font-semibold font-sans">{bmAlQuran?.surah}</h1>
              <p className="text-sm font-sans">ayat {bmAlQuran?.ayat}</p>
            </Link>
          ))
        ) : (
          <h1 className="text-sm font-sans flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>
      <hr />

      <p className="text-xl md:my-2">Asmaul Husna</p>

      <div className="mt-4">
        {bmAsmaulHusnas.length > 0 ? (
          bmAsmaulHusnas.map((bmAsmaulHusna: any) => (
            <div
              className="w-auto mx-2 my-2 inline-block text-center bg-gray-200 text-black rounded-md p-2 relative overflow-hidden md:px-4 group"
              key={bmAsmaulHusna?.urutan}
            >
              <h1 className="font-semibold font-sans text-base ">
                {bmAsmaulHusna?.arab}
              </h1>
              <p className="text-sm font-sans">{bmAsmaulHusna?.latin}</p>
              <p className="text-xs font-sans">{bmAsmaulHusna?.arti}</p>
              <div className="bg-blue-100 w-full -bottom-20 invisible absolute h-20 flex items-center justify-center  transition-all duration-200 group-hover:visible inset-0 group-hover:top-0">
                <h1
                  className="cursor-pointer"
                  onClick={() => delBmAsmaulHusna(bmAsmaulHusna?.urutan)}
                >
                  delete
                </h1>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-sm font-sans flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>
      <hr />
      <p className="text-xl md:my-2">Doa</p>

      <div className="mt-4">
        {bmDoas.length > 0 ? (
          bmDoas.map((bmDoa: any) => (
            <Link
              to={`/dodz/doa/${bmDoa?.id}`}
              className="w-auto mx-2 my-2 inline-block text-center bg-gray-200 text-black rounded-md p-2 md:px-4"
              key={bmDoa?.id}
            >
              <h1 className="font-semibold font-sans capitalize">
                {bmDoa?.title}
              </h1>
            </Link>
          ))
        ) : (
          <h1 className="text-sm font-sans flex gap-2 mt-2">
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
              <h1 className="font-semibold font-sans capitalize">
                {bmDoa?.name}
              </h1>
              <h1 className="text-sm font-sans capitalize">
                hadist ke {bmDoa?.number}
              </h1>
            </Link>
          ))
        ) : (
          <h1 className="text-sm font-sans flex gap-2 mt-2">
            klik icon <LoveIcon /> untuk menambah bookmark
          </h1>
        )}
      </div>
    </div>
  );
};

export default BookMark;
