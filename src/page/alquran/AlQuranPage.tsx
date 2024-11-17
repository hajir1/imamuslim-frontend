import { useEffect } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useAlQuranOption, useDarkmode } from "../../state/TypeHooks";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";
import MainLayouts from "../../components/layouts/Main";

const AlQuranPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { alQuranOption, setAlquranOption }: any = useAlQuranOption();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts>
      <div className="w-full">
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
    </MainLayouts>
  );
};

export default AlQuranPage;
