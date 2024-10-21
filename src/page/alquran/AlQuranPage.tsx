import { useEffect } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useAlQuranOption, useDarkmode } from "../../state/TypeHooks";
import Terjemahicon from "../../components/element/Icon/Terjemahicon";
import BacaIcon from "../../components/element/Icon/BacaIcon";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";

const AlQuranPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { alQuranOption, setAlquranOption }: any = useAlQuranOption();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`${darkMode && "dark-mode"} flex flex-col items-center`}>
      <Navbar type="quran" />
      <div className="w-full mt-16">
        <BreadCrumbV1
          opsi1="Surah"
          type=""
          firstRoute={"al-Quran"}
          opsi2="Juz"
          setOption={setAlquranOption}
          option={alQuranOption}
          response={""}
        />
      </div>
      <div className="w-full flex items-center flex-col">
        <div className="flex justify-center flex-wrap gap-2 p-2 w-full">
          {alQuranOption === "Surah" ? <SurahRoute /> : <JuzRoute />}
        </div>
      </div>
    </div>
  );
};

export default AlQuranPage;
