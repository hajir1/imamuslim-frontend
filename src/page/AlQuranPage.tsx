import { useState } from "react";
import BookMark from "../components/fragment/BookMark";
import Navbar from "../components/layouts/Navbar";
import { useDarkmode } from "../state/Zustand";
import Terjemahicon from "../components/element/Icon/Terjemahicon";
import BacaIcon from "../components/element/Icon/BacaIcon";
import { JuzRoute, SurahRoute } from "../components/layouts/RouteSurah";

const AlQuranPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const [juz, setJuz] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  return (
    <div
      className={`${
        darkMode && "bg-black text-white"
      } flex flex-col items-center`}
    >
      <Navbar type="quran" />
      <div className="mt-20 w-full flex items-center flex-col">
        <BookMark />
        <div className="flex justify-center flex-wrap gap-2 p-2 w-full">
          <div className="w-full flex justify-evenly mt-4 p-2">
            <button
              onClick={() => setJuz(false)}
              className={`${!juz && "border-b-2 border-b-black"} ${
                darkMode ? "text-white border-b-white" : "text-gray-800"
              } font-bold py-2 px-4 rounded inline-flex items-center`}
            >
              <Terjemahicon />
              <span className="mx-2">Surah</span>
            </button>
            <button
              onClick={() => setJuz(true)}
              className={`${juz && "border-b-2 border-b-black"} ${
                darkMode ? "text-white border-b-white" : "text-gray-800"
              } font-bold py-2 px-4 rounded inline-flex items-center`}
            >
              <BacaIcon width="1.6rem" height="1.6rem" />
              <span className="mx-2">Juz</span>
            </button>
          </div>
          {!juz ? <SurahRoute /> : <JuzRoute />}
        </div>
      </div>
    </div>
  );
};

export default AlQuranPage;
