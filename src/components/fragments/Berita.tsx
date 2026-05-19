
/**
 * Component/Function  Berita.
 * Used to render or handle logic for Berita.
 */
const Berita = ({ berita }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-2 md:justify-evenly">
      {(berita as [])?.slice(0, 5).map((news: any, index: number) => (
        <a
          href={news.link}
          className={`${
            index > 1
              ? "h-[250px] w-full md:w-[30%]"
              : "h-[360px] w-full md:w-[48%]"
          } group relative overflow-hidden rounded-md border-transparent transition`}
          key={news.link}
        >
          <div className="">
            <div
              className="absolute z-10 h-full w-full text-white"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 70%)",
              }}
            >
              <div className="absolute bottom-0 flex w-full flex-col gap-4 p-6">
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
                    className="h-full max-h-5 w-max rounded bg-white object-contain px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src={news.thumbnail}
            alt={news.title}
            className={`w-full object-cover transition group-hover:scale-105 ${
              index > 1 ? "h-[250px]" : "h-[360px]"
            }`}
          />
        </a>
      ))}
    </div>
  );
};

export default Berita;
