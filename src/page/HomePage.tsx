import BookMark from "../components/fragment/BookMark";
import RoutingPage from "../components/fragment/RoutingPage";
import Berita from "../components/fragment/Berita";
import MainLayouts from "../components/layouts/Main";
import { useGetNews } from "../state/Query";

const HomePage = () => {
  const { data: dataNews, isLoading: loadingNews } = useGetNews();
  const skeletonArray = Array.from({ length: 5 }, (_, index) => index);
  return (
    <MainLayouts navbarType={"home"}>
      {loadingNews ? (
        <div className="w-full p-2 flex justify-center md:justify-evenly flex-wrap gap-2">
          {skeletonArray.map((skeleton: any) => (
            <div
            key={skeleton}
              className={`${
                skeleton > 1
                  ? "w-full md:w-[30%] h-[250px] "
                  : "md:w-[48%] h-[360px] w-full"
              } rounded-md group bg-gray-200 relative transition-all duration-200 border-transparent overflow-hidden animate-pulse`}
            >
              <div className="absolute bottom-0 flex flex-col w-full z-10 gap-4 p-6">
                <div className="w-11/12 rounded-md bg-gray-400 h-8 animate-pulse "></div>
                <div className="w-1/3 rounded-md bg-gray-400 h-6 animate-pulse "></div>
                <div className="w-1/3 rounded-md bg-gray-400 h-6 animate-pulse "></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Berita berita={dataNews} />
          <RoutingPage />
          <BookMark />
        </>
      )}
    </MainLayouts>
  );
};

export default HomePage;
