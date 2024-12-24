import BookMark from "../components/fragment/BookMark";
import RoutingPage from "../components/fragment/RoutingPage";
import Berita from "../components/layouts/Berita";
import MainLayouts from "../components/layouts/Main";
import { useGetNews } from "../state/Query";

const HomePage = () => {
  const { data: dataNews, isLoading } = useGetNews();

  return (
    <MainLayouts navbarType={"home"}>
     
      <Berita berita={dataNews} isLoading={isLoading} />
        <RoutingPage />
      <BookMark />
    </MainLayouts>
  );
};

export default HomePage;
