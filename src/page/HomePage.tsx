import RoutingPage from "../components/fragment/RoutingPage";
import Berita from "../components/layouts/Berita";
import { useGetNews } from "../state/Query";

const HomePage = () => {
  const { data: dataNews, isLoading } = useGetNews();
  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <Berita berita={dataNews} isLoading={isLoading} />
      <RoutingPage />
    </div>
  );
};

export default HomePage;
