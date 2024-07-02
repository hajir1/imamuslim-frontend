import { createBrowserRouter } from "react-router-dom";
import HomePage from "./page/HomePage";
import AlQuranPage from "./page/alquran/AlQuranPage";
import BookMarkPage from "./page/BookMarkPage";
import AsmaulHusnaPage from "./page/AsmaulHusnaPage";
import DoaDoaPage from "./page/DoaDoaPage";
import JadwalSholatPage from "./page/JadwalSholatPage";
import BeritaPage from "./page/BeritaPage";
import NotFoundPage from "./page/NotFoundPage";
import { HadistPage, HadistBySlugPage } from "./page/HadistPage";
import SurahByIdPage from "./page/alquran/SurahByIdPage";
import JuzByIdPage from "./page/alquran/JuzByIdPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/berita",
    element: <BeritaPage />,
  },
  {
    path: "/quran",
    element: <AlQuranPage />,
  },
  {
    path: "/quran/surah/:surah",
    element: <SurahByIdPage />,
  },
  {
    path: "/quran/juz/:juz",
    element: <JuzByIdPage />,
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
    path: "/hadist",
    element: <HadistPage />,
  },
  {
    path: "/hadist/:slug",
    element: <HadistBySlugPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
