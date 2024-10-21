import { DataNews } from "../../model/Interface";

import { SekeletonV1 } from "../element/Sekeleton";
const Berita = ({ berita, isLoading }: any) => {
  return (
    <div className="w-[96%] flex justify-center md:justify-evenly flex-wrap gap-2 ">
      {isLoading ? (
        <SekeletonV1/>
      ) : (
        (berita as [])?.slice(0, 5).map((news: DataNews, index: number) => (
          <a
            href={news.link}
            className={`${
              index > 1
                ? "w-full md:w-[30%] h-[250px] "
                : "md:w-[48%] h-[360px] w-full"
            } rounded-md group relative transition border-transparent overflow-hidden `}
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
                  <h2
                    className={`font-bold ${
                      index > 1 ? "text-lg leading-snug" : "text-2xl"
                    }`}
                  >
                    <div>{news.title}</div>
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
              className={`w-full object-cover group-hover:scale-105 transition ${
                index > 1 ? "h-[250px]" : "h-[360px]"
              }`}
            />
          </a>
        ))
      )}
    </div>
  );
};

export default Berita;
