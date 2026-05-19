import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlQuranPage from "./pages/alquran/AlQuranPage";
import AsmaulHusnaPage from "./pages/AsmaulHusnaPage";
import JadwalSholatPage from "./pages/JadwalSholatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { HadistPage } from "./pages/HadistPage";
import SurahByIdPage from "./pages/alquran/SurahByIdPage";
import JuzByIdPage from "./pages/alquran/JuzByIdPage";
import DoaPage from "./pages/DoaPage";

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
    path: "/doa",
    element: <DoaPage />,
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
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
