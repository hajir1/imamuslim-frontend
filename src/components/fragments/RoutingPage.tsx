import { Link } from "react-router-dom";
import { useDarkmode } from "../../stores/TypeHooks";

/**
 * Component: RoutingPage
 * Home page card grid — modern card design with gradient icons.
 */
const RoutingPage = () => {
  const darkMode = useDarkmode((s) => s.darkMode);

  const cards = [
    {
      id: 1,
      title: "Al-Quran",
      quote: "Murottal, tafsir & terjemah",
      direction: "/quran",
      sourceImage: "/iconQuran.png",
      gradient: "from-emerald-400 to-teal-500",
      bg: darkMode ? "bg-emerald-900/30" : "bg-emerald-50",
      text: darkMode ? "text-emerald-300" : "text-emerald-700",
    },
    {
      id: 2,
      title: "Asmaul Husna",
      quote: "99 nama Allah beserta arti",
      direction: "/asmaulhusna",
      sourceImage: "/iconasma.png",
      gradient: "from-blue-400 to-indigo-500",
      bg: darkMode ? "bg-blue-900/30" : "bg-blue-50",
      text: darkMode ? "text-blue-300" : "text-blue-700",
    },
    {
      id: 3,
      title: "Doa-Doa",
      quote: "Koleksi doa sehari-hari",
      direction: "/doa",
      sourceImage: "/icondoa.png",
      gradient: "from-rose-400 to-pink-500",
      bg: darkMode ? "bg-rose-900/30" : "bg-rose-50",
      text: darkMode ? "text-rose-300" : "text-rose-700",
    },
    {
      id: 4,
      title: "Jadwal Sholat",
      quote: "Seluruh wilayah Indonesia",
      direction: "/jadwalsholat",
      sourceImage: "/iconSholat.png",
      gradient: "from-violet-400 to-purple-500",
      bg: darkMode ? "bg-violet-900/30" : "bg-violet-50",
      text: darkMode ? "text-violet-300" : "text-violet-700",
    },
    {
      id: 5,
      title: "Hadist",
      quote: "Kumpulan hadist & terjemah",
      direction: "/hadist",
      sourceImage: "/hadits.png",
      gradient: "from-amber-400 to-orange-500",
      bg: darkMode ? "bg-amber-900/30" : "bg-amber-50",
      text: darkMode ? "text-amber-300" : "text-amber-700",
    },
  ];

  return (
    <div className="w-full max-w-5xl">
      {/* ── Hero greeting */}
      <div className="page-hero mx-4 mb-6 p-6 text-center md:p-10">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-emerald-100 opacity-80">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <h1 className="font-amiri mb-2 text-3xl font-bold text-white md:text-4xl">
          Selamat Datang
        </h1>
        <p className="text-sm text-white/80">
          Temukan Al-Quran, doa, hadist, dan jadwal sholat di satu tempat.
        </p>
      </div>

      {/* ── Card grid */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.id}
            to={card.direction}
            className={`card-bg group flex items-center gap-4 p-5 ${darkMode ? "dark" : ""}`}
          >
            {/* Icon container */}
            <div
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-md transition-transform duration-300 group-hover:scale-110`}
            >
              <img
                src={card.sourceImage}
                className="h-8 w-8 object-contain"
                alt={card.title}
              />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h2 className={`text-base font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                {card.title}
              </h2>
              <p className={`mt-0.5 truncate text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {card.quote}
              </p>
            </div>

            {/* Arrow */}
            <div className={`ml-auto flex-shrink-0 rounded-full p-1 transition-all duration-200 group-hover:translate-x-1 ${card.bg}`}>
              <svg
                className={`h-4 w-4 ${card.text}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutingPage;
