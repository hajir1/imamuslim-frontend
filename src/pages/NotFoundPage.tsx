/**
 * Page: NotFoundPage
 *
 * NEW FEATURE: Proper branded 404 page with navigation back to home.
 */
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useDarkmode } from "../stores/TypeHooks";

const NotFoundPage = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center px-4 text-center ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="page-hero mb-6 px-10 py-8">
        <p className="font-amiri text-5xl text-white">٤٠٤</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Halaman Tidak Ditemukan</h1>
        <p className="mt-1 text-sm text-white/75">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
      </div>
      <Link
        to="/"
        className="btn-primary flex items-center gap-2 px-6 py-3 text-sm"
      >
        <Home size={16} />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
