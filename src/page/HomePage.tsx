import BookMark from "../components/fragment/BookMark";
import RoutingPage from "../components/fragment/RoutingPage";
import Berita from "../components/layouts/Berita";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { useGetNews } from "../state/Query";
import { useDarkmode } from "../state/Zustand";

const HomePage = () => {
  const { data: dataNews, isLoading } = useGetNews();
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-black" : ""
      } w-full flex flex-col`}
    >
      <Navbar type="home" />

      <div className={`mt-20 flex justify-center flex-wrap`}>
        <Berita berita={dataNews} isLoading={isLoading} />
        <RoutingPage />
      </div>
      <BookMark />
      <Footer />
    </div>
  );
};

export default HomePage;
