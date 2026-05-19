/**
 * Page: HadistPage
 *
 * BUGS FIXED (all related to new API at hadis-api-id.vercel.app):
 *
 * 1. API list-perawi URL was `/perawi` → now `/hadith`.
 * 2. Old API wrapped responses in `{data:[...]}` / `{data:{...}}`.
 *    New API returns bare arrays/objects. All `?.data.*` accesses removed.
 * 3. `useHadistById` had `enabled: false` — query never ran automatically.
 *    Fixed to `enabled: slug !== "" && id >= 1` in Query.ts.
 * 4. Bookmark check used `item.id === props.id` but `id` is the Indonesian
 *    translation string, not a unique numeric ID. Fixed to compare by
 *    `item.number + item.slug` as composite key.
 * 5. `dataHadist?.info?.perawi?.slug` no longer exists on new API — slug is
 *    stored directly on the response root. Fixed bookmark save accordingly.
 * 6. `currentNumber` from Zustand store was stored as a string (from input
 *    onChange). `useHadistById` expects a number. Added `Number()` coercion.
 * 7. Input type=number with value="" breaks controlled-input — added fallback.
 * 8. Perawi dropdown showed `total` as string (was typed as `string`) — now
 *    `number` and formatted with `toLocaleString()`.
 */
import { useHadistById, useParawi } from "../stores/Query";
import { TypeHadist, TypeHadistMap, TypeParawisMap } from "../types/index";
import { useEffect } from "react";
import MainLayouts from "../components/layouts/Main";
import {
  useBookMarkHadist,
  useCurrentNumberHadist,
  useCurrentParawi,
  useDarkmode,
} from "../stores/TypeHooks";
import { Search, ChevronDown, AlertCircle } from "lucide-react";
import Border from "../components/elements/Border";
import LoveIcon from "../components/elements/Icon/LoveIcon";

export const HadistPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);

  /** Fetch list of all perawi — returns TypeParawisMap[] directly */
  const { data: dataParawis, isError: perawiError } = useParawi();

  const currentParawi = useCurrentParawi((s: any) => s.currentParawi);
  const setCurrentParawi = useCurrentParawi((s: any) => s.setCurrentParawi);

  /** BUG FIX #6: coerce to number before passing to useHadistById */
  const currentNumberRaw = useCurrentNumberHadist((s: any) => s.currentNumber);
  const setCurrentNumber = useCurrentNumberHadist((s: any) => s.setCurrentNumber);
  const currentNumber = Number(currentNumberRaw) || 1;

  const {
    data: dataHadist,
    isLoading: isLoadingHadist,
    isError: hadistError,
    refetch,
  } = useHadistById(currentParawi, currentNumber);

  /** Manually re-fetch (e.g. after changing number) */
  const handleSearchHadist = () => {
    if (currentNumber >= 1) refetch();
  };

  const bookMark = useBookMarkHadist((s: any) => s.bookMark);
  const addBookMark = useBookMarkHadist((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkHadist((s: any) => s.deleteBookMark);

  /**
   * BUG FIX #4 & #5: composite bookmark key (slug + number) and correct slug source.
   * New API has no nested `info.perawi.slug` — slug is at response root.
   */
  const onHandleBookMark = (hadist: TypeHadist) => {
    const compositeKey = `${hadist.slug}-${hadist.number}`;
    const exists = bookMark.some(
      (item: TypeHadistMap) => `${item.slug}-${item.number}` === compositeKey,
    );
    if (exists) {
      deleteBookMark(compositeKey);
    } else {
      addBookMark({
        number: hadist.number,
        arab: hadist.arab,
        id: hadist.id,
        slug: hadist.slug,
        name: hadist.name,
      } satisfies TypeHadistMap);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /** BUG FIX #4: use composite key for bookmark check */
  const isBookmarked = bookMark.some(
    (item: TypeHadistMap) =>
      item.slug === (dataHadist as TypeHadist)?.slug &&
      item.number === (dataHadist as TypeHadist)?.number,
  );

  /** Max hadist for selected perawi */
  const selectedPerawi = (dataParawis as TypeParawisMap[] | undefined)?.find(
    (p) => p.slug === currentParawi,
  );
  const maxHadist = selectedPerawi?.total ?? 9999;

  return (
    <MainLayouts>
      <div className="w-full max-w-2xl px-4">

        {/* ── Hero */}
        <div className="page-hero mb-6 p-5 text-center">
          <p className="font-amiri mb-1 text-2xl text-white">الحَدِيث</p>
          <h1 className="text-lg font-bold text-white">Hadist</h1>
          <p className="mt-1 text-xs text-white/75">Kumpulan hadist dari berbagai perawi</p>
        </div>

        {/* ── Error: perawi failed to load */}
        {perawiError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
            <AlertCircle size={16} />
            Gagal memuat daftar perawi. Periksa koneksi internet Anda.
          </div>
        )}

        {/* ── Filters */}
        <div className={`card-bg mb-4 flex flex-col gap-3 p-4 ${darkMode ? "dark" : ""}`}>

          {/* Perawi selector */}
          <div>
            <label className={`mb-1.5 block text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Pilih Perawi
            </label>
            <div className="relative">
              <select
                value={currentParawi}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCurrentParawi(e.target.value)
                }
                className={`input-bg w-full appearance-none px-4 py-2.5 pr-10 text-sm ${darkMode ? "dark" : ""}`}
                id="select-perawi"
              >
                <option value="">Pilih perawi hadist...</option>
                {/**
                  * BUG FIX #2: Old API wrapped in {data:[...]}.
                  * New API returns array directly — cast as TypeParawisMap[].
                  */}
                {(dataParawis as TypeParawisMap[] | undefined)?.map((p: TypeParawisMap) => (
                  <option value={p.slug} key={p.slug}>
                    {p.name} — {p.total.toLocaleString("id-ID")} hadist
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-slate-400"}`}
              />
            </div>
          </div>

          {/* Number search — only shown when a perawi is selected */}
          {currentParawi !== "" && (
            <div>
              <label className={`mb-1.5 block text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Nomor Hadist
                {selectedPerawi && (
                  <span className="ml-2 font-normal normal-case text-emerald-600">
                    (1 – {selectedPerawi.total.toLocaleString("id-ID")})
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search
                    size={15}
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                  />
                  <input
                    type="number"
                    min={1}
                    max={maxHadist}
                    /** BUG FIX #7: ensure value is never empty string for controlled input */
                    value={currentNumberRaw === "" ? "" : currentNumberRaw}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentNumber(e.target.value)
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSearchHadist()}
                    placeholder="Nomor hadist..."
                    className={`input-bg w-full py-2.5 pl-9 pr-4 text-sm ${darkMode ? "dark" : ""}`}
                    id="input-nomor-hadist"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchHadist}
                  className="btn-primary px-5 py-2.5 text-sm"
                  id="btn-cari-hadist"
                >
                  Cari
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Error: hadist not found */}
        {hadistError && !isLoadingHadist && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
            <AlertCircle size={16} />
            Hadist nomor {currentNumber} tidak ditemukan untuk perawi ini.
          </div>
        )}

        {/* ── Hadist content */}
        {currentParawi === "" ? (
          /** No perawi selected yet — friendly prompt */
          <div className={`card-bg p-8 text-center ${darkMode ? "dark" : ""}`}>
            <p className="font-amiri text-3xl text-emerald-600">إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ</p>
            <p className={`mt-3 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Pilih perawi di atas untuk mulai membaca hadist.
            </p>
          </div>
        ) : isLoadingHadist ? (
          <div className={`card-bg space-y-3 p-4 ${darkMode ? "dark" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="skeleton h-12 w-12 rounded-full" />
              <div className="skeleton h-8 w-8 rounded-full" />
            </div>
            <div className="skeleton ml-auto h-10 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
          </div>
        ) : dataHadist ? (
          /**
           * BUG FIX #2: New API returns flat object.
           * No more `?.data.number` — access directly as `dataHadist.number`.
           */
          <div className={`card-bg p-4 fade-in ${darkMode ? "dark" : ""}`}>
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Border number={(dataHadist as TypeHadist).number} />
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                    {(dataHadist as TypeHadist).name}
                  </p>
                  <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Hadist no. {(dataHadist as TypeHadist).number}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onHandleBookMark(dataHadist as TypeHadist)}
                aria-label="Bookmark hadist"
                className="rounded-full p-1.5 transition-colors hover:bg-rose-50"
              >
                <LoveIcon
                  fill={isBookmarked ? "#f43f5e" : "none"}
                  stroke={isBookmarked ? "#f43f5e" : darkMode ? "#94a3b8" : "#cbd5e1"}
                  onClick={() => {}}
                />
              </button>
            </div>

            {/* Arabic text */}
            <p
              dir="rtl"
              className={`font-amiri mt-4 text-right text-2xl leading-loose ${
                darkMode ? "text-emerald-300" : "text-emerald-700"
              }`}
            >
              {(dataHadist as TypeHadist).arab}
            </p>

            {/* Indonesian translation */}
            <div className={`mt-4 rounded-xl p-3 ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Artinya
              </p>
              <p className={`mt-1 text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                {(dataHadist as TypeHadist).id}
              </p>
            </div>

            {/* Navigation: prev / next */}
            <div className="mt-4 flex justify-between gap-2">
              <button
                disabled={currentNumber <= 1}
                onClick={() => {
                  setCurrentNumber(String(currentNumber - 1));
                  setTimeout(() => refetch(), 50);
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  currentNumber <= 1
                    ? "cursor-not-allowed opacity-40"
                    : darkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ← Sebelumnya
              </button>
              <button
                disabled={currentNumber >= maxHadist}
                onClick={() => {
                  setCurrentNumber(String(currentNumber + 1));
                  setTimeout(() => refetch(), 50);
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  currentNumber >= maxHadist
                    ? "cursor-not-allowed opacity-40"
                    : darkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Berikutnya →
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </MainLayouts>
  );
};
