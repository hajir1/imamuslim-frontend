import { createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import HomePage from "./pages/HomePage";
import AlQuranPage from "./pages/alquran/AlQuranPage";
import AsmaulHusnaPage from "./pages/AsmaulHusnaPage";
import JadwalSholatPage from "./pages/JadwalSholatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { HadistPage } from "./pages/HadistPage";
import SurahByIdPage from "./pages/alquran/SurahByIdPage";
import JuzByIdPage from "./pages/alquran/JuzByIdPage";
import DoaPage from "./pages/DoaPage";
=======
import HomePage from "./page/HomePage";
import AlQuranPage from "./page/alquran/AlQuranPage";
import AsmaulHusnaPage from "./page/AsmaulHusnaPage";
import JadwalSholatPage from "./page/JadwalSholatPage";
import NotFoundPage from "./page/NotFoundPage";
import { HadistPage } from "./page/HadistPage";
import SurahByIdPage from "./page/alquran/SurahByIdPage";
import JuzByIdPage from "./page/alquran/JuzByIdPage";
// import BmAlquranPage from "./page/bookMark/BmAlquranPage";
// import BmDoaPage from "./page/bookMark/BmDoaPage";
import DoaPage from "./page/DoaPage";
// import BmHadistPage from "./page/bookMark/BmHadistPage";
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1

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
<<<<<<< HEAD
=======
  // {
  //   path: "/quran/surah/:surah/ayat/:ayat",
  //   element: <BmAlquranPage />,
  // },
  // {
  //   path: "/dodz/doa/:id",
  //   element: <BmDoaPage />,
  // },
  // { path: "/hadist/:slug/:id", element: <BmHadistPage /> },
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
