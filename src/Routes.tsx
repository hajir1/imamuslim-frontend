import { createBrowserRouter } from "react-router-dom";
import HomePage from "./page/HomePage";
import AlQuranPage from "./page/AlQuranPage";
import SurahQuranPage from "./page/SurahQuranPage";
import BookMarkPage from "./page/BookMarkPage";
import AsmaulHusnaPage from "./page/AsmaulHusnaPage";
import DoaDoaPage from "./page/DoaDoaPage";
import JadwalSholatPage from "./page/JadwalSholatPage";
import JuzPage from "./page/JuzPage";
import DokumentasiPage from "./page/DokumentasiPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/quran",
    element: <AlQuranPage />,
  },
  {
    path: "/quran/surah/:surah",
    element: <SurahQuranPage />,
  },
  {
    path: "/quran/juz/:juz",
    element: <JuzPage />,
  },
  {
    path: "/quran/surah/:surah/ayat/:ayat",
    element: <BookMarkPage />,
  },
  {
    path: "/asmaulhusna",
    element: <AsmaulHusnaPage />,
  },
  {
    path: "/doadoa",
    element: <DoaDoaPage />,
  },
  {
    path: "/jadwalsholat",
    element: <JadwalSholatPage />,
  },
  {
    path: "/dokumentasi",
    element: <DokumentasiPage />,
  },
]);

export default Routes;
