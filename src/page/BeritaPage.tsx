import Navbar from "../components/layouts/Navbar";
import Berita from "../components/layouts/Berita";
import { useDarkmode } from "../state/Zustand";
import { useGetNews } from "../state/Query";
import { DataNews } from "../model/Interface";
import { useEffect } from "react";

const BeritaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataNews, isLoading } = useGetNews();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col items-center`}
    >
      <Navbar type="berita" />
      <div className="w-full mt-20 flex justify-center">
        <Berita berita={dataNews} isLoading={isLoading} />
      </div>
      <div className={`w-[96%] flex justify-center md:justify-evenly flex-wrap gap-2 mt-2`}>
        {(dataNews as [])?.slice(5, 120)
          ?.map((news: DataNews, index: number) => (
            <div
              className={`${
                darkMode && ""
              } w-full md:w-[30%] h-[250px] rounded-md group relative transition border-transparent overflow-hidden `}
              key={index}
            >
              <div className="">
                {" "}
                <div
                  className="h-full w-full absolute text-white z-10"
                  style={{
                    background:
                      "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 70%)",
                  }}
                >
                  <div className="absolute bottom-0 flex flex-col w-full gap-4 p-6">
                    <h2 className={`font-bold text-lg leading-snug`}>
                      <a href={news.link}>{news.title}</a>
                    </h2>
                    <div className="flex flex-col gap-2">
                      <time className="text-sm" dateTime={news.pubDate}>
                        {new Date(news.pubDate).toLocaleString("id", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </time>
                      <img
                        alt={news.publisher.name}
                        src={news.publisher.image}
                        className="max-h-5 rounded h-full w-max px-2 py-1 object-contain bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={news.thumbnail}
                alt={news.title}
                className={`w-full object-cover group-hover:scale-105 transition h-[360px]`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BeritaPage;
