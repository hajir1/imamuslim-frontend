/**
 * Component: BookMark
 *
 * BUG FIXES:
 * 1. Al-Quran bookmark link pointed to `/quran/surah/${bm.surah}/ayat/...`
 *    which is not a registered route — leads to 404. Fixed to `/quran/surah/${bm.surah}`.
 * 2. Asmaul Husna delete button used raw text "delete" as UI — replaced with icon.
 * 3. No delete action for Al-Quran, Doa, Hadist bookmarks — added delete for all.
 * 4. Empty-state LoveIcon fill colors were inverted (dark vs light).
 *
 * NEW FEATURES:
 * - Modern card design consistent with redesigned pages.
 * - Per-section item count badge.
 * - Delete button on every bookmark type.
 */
import {
  useBookMarkAlQuran,
  useBookMarkAsmaulHusna,
  useBookMarkDoa,
  useBookMarkHadist,
  useDarkmode,
} from "../../stores/TypeHooks";
import { Link } from "react-router-dom";
import { Trash2, BookOpen, Bookmark } from "lucide-react";
import {
  TypeAsmaulHusnaMap,
  TypeDoaMap,
  TypeHadistMap,
  TypeSurahMap,
} from "../../types/index";

/** Reusable empty-state message */
const EmptyState = ({ darkMode }: { darkMode: boolean }) => (
  <p className={`py-3 text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
    Belum ada bookmark. Tap ikon ❤️ untuk menyimpan.
  </p>
);

const BookMark = () => {
  const darkMode = useDarkmode((state) => state.darkMode);

  /** Al-Quran bookmarks */
  const bookMarkAlQurans = useBookMarkAlQuran((s: any) => s.bookMark);
  const delBookMarkAlQuran = useBookMarkAlQuran((s: any) => s.deleteBookMark);

  /** Asmaul Husna bookmarks */
  const bookMarkAsmaulHusnas = useBookMarkAsmaulHusna((s: any) => s.bookMark);
  const delBookMarkAsmaulHusna = useBookMarkAsmaulHusna((s: any) => s.deleteBookMark);

  /** Doa bookmarks */
  const bookMarkDoas = useBookMarkDoa((s: any) => s.bookMark);
  const delBookMarkDoa = useBookMarkDoa((s: any) => s.deleteBookMark);

  /** Hadist bookmarks */
  const bookMarkHadists = useBookMarkHadist((s: any) => s.bookMark);
  const delBookMarkHadist = useBookMarkHadist((s: any) => s.deleteBookMark);

  const totalBookmarks =
    bookMarkAlQurans.length +
    bookMarkAsmaulHusnas.length +
    bookMarkDoas.length +
    bookMarkHadists.length;

  const sectionClass = `w-full max-w-5xl px-4`;
  const sectionTitleClass = `flex items-center justify-between mb-2 mt-8`;
  const titleTextClass = `flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-slate-600"}`;
  const countBadge = (n: number) =>
    n > 0
      ? `badge ${darkMode ? "bg-emerald-900 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`
      : `badge ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-400"}`;
  const cardBase = `card-bg flex items-center justify-between gap-3 p-3 ${darkMode ? "dark" : ""}`;

  return (
    <div className={sectionClass}>
      {/* Header */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
          <Bookmark size={16} className="text-white" />
        </div>
        <div>
          <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
            Bookmark Saya
          </h2>
          <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            {totalBookmarks} item tersimpan
          </p>
        </div>
      </div>

      {/* ── Al-Quran */}
      <div className={sectionTitleClass}>
        <span className={titleTextClass}>
          <BookOpen size={14} /> Al-Qur'an
        </span>
        <span className={countBadge(bookMarkAlQurans.length)}>
          {bookMarkAlQurans.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {bookMarkAlQurans.length > 0 ? (
          bookMarkAlQurans.map((bm: TypeSurahMap) => (
            <div key={bm?.number?.inQuran} className={cardBase}>
              <Link
                /** BUG FIX: was `/quran/surah/${bm.surah}/ayat/${bm.number.inSurah}` — route doesn't exist */
                to={`/quran/surah/${bm?.surah}`}
                className="min-w-0 flex-1"
              >
                <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                  Surah {bm?.surah}
                </p>
                <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Ayat {bm?.number?.inSurah} · Quran no. {bm?.number?.inQuran}
                </p>
              </Link>
              <button
                onClick={() => delBookMarkAlQuran(bm?.number?.inQuran)}
                aria-label="Hapus bookmark"
                className="rounded-full p-1.5 text-rose-400 transition-colors hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>

      {/* ── Asmaul Husna */}
      <div className={sectionTitleClass}>
        <span className={titleTextClass}>✨ Asmaul Husna</span>
        <span className={countBadge(bookMarkAsmaulHusnas.length)}>
          {bookMarkAsmaulHusnas.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {bookMarkAsmaulHusnas.length > 0 ? (
          bookMarkAsmaulHusnas.map((am: TypeAsmaulHusnaMap) => (
            <div key={am?.id} className={cardBase}>
              <div className="min-w-0 flex-1">
                <p className={`font-amiri text-lg ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}>
                  {am?.arab}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-slate-800"}`}>
                  {am?.latin}
                </p>
                <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {am?.indo}
                </p>
              </div>
              <button
                onClick={() => delBookMarkAsmaulHusna(am?.id)}
                aria-label="Hapus bookmark"
                className="rounded-full p-1.5 text-rose-400 transition-colors hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>

      {/* ── Doa */}
      <div className={sectionTitleClass}>
        <span className={titleTextClass}>🤲 Doa</span>
        <span className={countBadge(bookMarkDoas.length)}>
          {bookMarkDoas.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {bookMarkDoas.length > 0 ? (
          bookMarkDoas.map((bm: TypeDoaMap) => (
            <div key={bm?.judul} className={cardBase}>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold capitalize ${darkMode ? "text-white" : "text-slate-800"}`}>
                  {bm?.judul}
                </p>
                <p className={`mt-0.5 line-clamp-1 text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {bm?.indo}
                </p>
              </div>
              <button
                onClick={() => delBookMarkDoa(bm?.judul)}
                aria-label="Hapus bookmark"
                className="rounded-full p-1.5 text-rose-400 transition-colors hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>

      {/* ── Hadist */}
      <div className={sectionTitleClass}>
        <span className={titleTextClass}>📜 Hadist</span>
        <span className={countBadge(bookMarkHadists.length)}>
          {bookMarkHadists.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 pb-6">
        {bookMarkHadists.length > 0 ? (
          bookMarkHadists.map((bm: TypeHadistMap) => (
            <div key={bm?.id} className={cardBase}>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold capitalize ${darkMode ? "text-white" : "text-slate-800"}`}>
                  {bm?.slug}
                </p>
                <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Hadist ke-{bm?.number}
                </p>
              </div>
              <button
                onClick={() => delBookMarkHadist(bm?.id)}
                aria-label="Hapus bookmark"
                className="rounded-full p-1.5 text-rose-400 transition-colors hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default BookMark;
