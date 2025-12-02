import { createBrowserRouter } from "react-router-dom";
import HomePage from "./page/HomePage";
import AlQuranPage from "./page/alquran/AlQuranPage";
import AsmaulHusnaPage from "./page/AsmaulHusnaPage";
import JadwalSholatPage from "./page/JadwalSholatPage";
import NotFoundPage from "./page/NotFoundPage";
import {  HadistBySlugPage, ParawiPage } from "./page/HadistPage";
import SurahByIdPage from "./page/alquran/SurahByIdPage";
import JuzByIdPage from "./page/alquran/JuzByIdPage";
import DoDzPage from "./page/DoDzPage";
import BmAlquranPage from "./page/bookMark/BmAlquranPage";
import BmDoaPage from "./page/bookMark/BmDoaPage";
import BmHadistPage from "./page/bookMark/BmHadistPage";

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
    element: <SurahByIdPage />,
  },
  {
    path: "/quran/juz/:juz",
    element: <JuzByIdPage />,
  },
  {
    path: "/asmaulhusna",
    element: <AsmaulHusnaPage />,
  },
  {
    path: "/doadzikir",
    element: <DoDzPage />,
  },
  {
    path: "/jadwalsholat",
    element: <JadwalSholatPage />,
  },

  {
    path: "/hadist",
    element: <ParawiPage />,
  },
  {
    path: "/hadist/:slug",
    element: <HadistBySlugPage />,
  },
  {
    path: "/quran/surah/:surah/ayat/:ayat",
    element: <BmAlquranPage />,
  },
  {
    path: "/dodz/doa/:id",
    element: <BmDoaPage />,
  },
  { path: "/hadist/:slug/:id", element: <BmHadistPage /> },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
