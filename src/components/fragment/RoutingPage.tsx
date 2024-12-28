import { Link } from "react-router-dom";

const RoutingPage = () => {
  const cards = [
    {
      id: 1,
      title: "Al'Quran",
      quote: "al-quran dengan murottal , tafsir terjemah",
      direction: "/quran",
      sourceImage: "/iconQuran.png",
      color: "green-200",
    },
    {
      id: 2,
      title: "Asmaul-Husna",
      quote: "99 asmaul husna berserta arti",
      direction: "/asmaulhusna",
      sourceImage: "/iconasma.png",
      color: "blue-200",
    },
    {
      id: 3,
      title: "Doa dan Dzikir",
      quote: "doa dan dzikir yang sering digunakan",
      direction: "/dodz",
      sourceImage: "/icondoa.png",
      color: "red-200",
    },
    {
      id: 4,
      title: "Jadwal Sholat",
      quote: " menampilkan jadwal sholat seluruh Indonesia",
      direction: "/jadwalsholat",
      sourceImage: "/iconSholat.png",
      color: "fuchsia-200",
    },
    {
      id: 5,
      title: "Hadist",
      quote: "hadist dan terjemah dari beberapa mufassir",
      direction: "/hadist",
      sourceImage: "/hadits.png",
      color: "violet-200",
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 w-full p-4 md:p-8">
      {cards.map((card: any) => (
        <Link
          key={card?.id}
          className={`w-full flex flex-col items-center justify-center font-semibold text-xl  rounded-lg bg-gray-200 max-w-sm h-52 relative overflow-hidden group`}
          to={`${card?.direction}`}
        >
          <img src={`${card?.sourceImage}`} className="w-24 h-auto" alt="" />
          <h1 className="font-semibold font-sans text-2xl text-slate-800">
            {card?.title}
          </h1>
          <p className="text-sm text-center font-sans font-normal text-slate-800">
            {card?.quote}
          </p>
          <div
            className={`flex items-center justify-center inset-0 absolute invisible -bottom-0 group-hover:top-0 group-hover:bg-green-200 group-hover:visible`}
          >
            <h1 className="cursor-pointer text-2xl text-black">
              <span className="w-full mx-2">Baca</span>
              {card?.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RoutingPage;
