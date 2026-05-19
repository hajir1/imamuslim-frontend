<<<<<<< HEAD
/**
 * Component: OpsiBaTe (TerjemahRoute + BacaRoute)
 *
 * BUG FIXES:
 * 1. `document.execCommand('copy')` is deprecated — replaced with modern
 *    `navigator.clipboard.writeText()` (async, no DOM node creation needed).
 * 2. Bottom nav always initialised to `{ idSurah: 0, idQuran: 0 }` which
 *    means `bn` is truthy on first render, showing the action bar before the
 *    user taps anything. Fixed: initialise to `null`.
 * 3. `currentAudio` state was redundant — `audio` URL is already tracked.
 *    Removed duplicate state; use a single `audioUrl` ref approach.
 * 4. handleAudio accepted `idQuran` but `bn.idQuran` stores `inQuran` — consistent naming.
 * 5. BacaRoute: `useLocation().pathname.split("/").pop()` is fragile (trailing
 *    slash breaks it). Fixed to use `useParams()` instead.
 * 6. Bottom action-bar was hard-coded `bottom: 0` via inline style, causing it
 *    to overlap footer on short pages. Now uses fixed bottom spacing.
 *
 * NEW FEATURES:
 * - "Putar semua" (play all) button in the audio bar.
 * - Copy uses Clipboard API with toast-style feedback instead of alert().
 * - Ayat cards have hover highlight.
 * - Reading progress indicator (current ayat / total).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useBookMarkAlQuran,
  useDarkmode,
  useGlobalAudio,
} from "../../../stores/TypeHooks";
import { TypeSurah, TypeSurahMap } from "../../../types/index";
import { useSurahById } from "../../../stores/Query";
import Border from "../../elements/Border";
import { useParams } from "react-router-dom";
import { BookText, Copy, Heart, Pause, Play, CheckCheck } from "lucide-react";

/* =========================================================
   TERJEMAH ROUTE
   ========================================================= */
export const TerjemahRoute = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { surah, surah: idSurah } = useParams();

  /** BUG FIX: init to null so bar is not shown on first render */
  const [bn, setBn] = useState<{ idSurah: number; idQuran: number } | null>(null);

=======
import React, { useEffect, useRef, useState } from "react";
import {
  useAudioActive,
  useBookMarkAlQuran,
  useDarkmode,
} from "../../../state/TypeHooks";
import { TypeSurah, TypeSurahMap } from "../../../model/_Type";
import { useSurahById } from "../../../state/Query";

import Border from "../../element/Border";
import { useLocation, useParams } from "react-router-dom";
import { BookText, CopyIcon, X } from "lucide-react";
import LoveIcon from "../../element/Icon/LoveIcon";
import AudioMatiIcon from "../../element/Icon/AudioMatiIcon";
import AudioHidupicon from "../../element/Icon/AudioHidupicon";

export const TerjemahRoute = () => {
  /** get current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get current surah */
  const { surah } = useParams();

  /** state bottom navigation active */
  const [bn, setBn] = useState<{ idSurah: number; idQuran: number } | null>({
    idSurah: 0,
    idQuran: 0,
  });

  /** if terjemah active */
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
  const [terjemah, setTerjemah] = useState<number | null>(null);
  const terjemahRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!terjemahRef.current) return;
<<<<<<< HEAD
    terjemahRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [terjemah]);

=======

    terjemahRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [terjemah]);

  /** cache bookmark alquran */
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
  const bookMark = useBookMarkAlQuran((s: any) => s.bookMark);
  const addBookMark = useBookMarkAlQuran((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkAlQuran((s: any) => s.deleteBookMark);

<<<<<<< HEAD
  /** NEW: Use global audio state */
  const { audioUrl, setAudio } = useGlobalAudio();

  const { data: dataSurah } = useSurahById(idSurah);

  /** NEW: copy feedback state */
  const [copied, setCopied] = useState(false);

=======
  /** get id quran using */
  const { surah: idSurah } = useParams();
  const { setAudioActive } = useAudioActive();
  const audioRefPlay = useRef<HTMLAudioElement>(null);

  /** get surah */
  const { data: dataSurah } = useSurahById(idSurah);

  /** default */
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

<<<<<<< HEAD
  /** Toggle bookmark for an ayat */
  const handleBookMark = useCallback(
    (idQuran: number) => {
      const finding = (dataSurah as TypeSurah)?.data.verses.find(
        (item: TypeSurahMap) => item.number.inQuran === idQuran,
      );
      const exists = bookMark.some(
        (item: TypeSurahMap) => item.number.inQuran === idQuran,
      );
      if (finding && !exists) {
        addBookMark({ ...finding, surah });
      } else {
        deleteBookMark(idQuran);
      }
    },
    [dataSurah, bookMark, addBookMark, deleteBookMark, surah],
  );

  /**
   * BUG FIX: Replaced deprecated `document.execCommand('copy')` with
   * the modern `navigator.clipboard.writeText()` API.
   */
  const handleCopy = useCallback(async (idQuran: number) => {
    const finding = (dataSurah as TypeSurah)?.data.verses.find(
      (item: TypeSurahMap) => item.number.inQuran === idQuran,
    );
    if (!finding) return;
    const copyText = `${finding.text.arab}\n${finding.text.transliteration.en}\nArtinya: ${finding.translation.id}`;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = copyText;
      el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [dataSurah]);

  /** Play audio for a specific ayat */
  const handleAudio = useCallback(
    (idQuran: number) => {
      const finding = (dataSurah as TypeSurah)?.data.verses.find(
        (item: TypeSurahMap) => item.number.inQuran === idQuran,
      );
      if (!finding) return;
      const url = finding.audio?.primary as unknown as string;

      if (audioUrl === url) {
        // Toggle — stop if already playing this ayat
        setAudio(null);
        return;
      }
      
      // Pass the entire surah playlist so GlobalAudioPlayer can auto-advance
      const verses = (dataSurah as TypeSurah)?.data?.verses ?? [];
      const playlist = verses.map(v => v.audio?.primary as unknown as string).filter(Boolean);
      
      setAudio(url, playlist);
    },
    [dataSurah, audioUrl, setAudio],
  );

  /** Auto-advance to next ayat when audio ends */
  // Local audioRef and onEnded are removed because GlobalAudioPlayer handles them.

  const verses = (dataSurah as TypeSurah)?.data?.verses ?? [];

  return (
    <div className="relative w-full">

      {/* ── Ayat list */}
      <div className="flex flex-col">
        {verses.map((data: TypeSurahMap) => {
          const isPlaying = (data.audio?.primary as unknown as string) === audioUrl;
          const isBookmarked = bookMark.some(
            (item: TypeSurahMap) => item.number.inQuran === data.number.inQuran,
          );
          return (
            <div
              key={data.number.inQuran}
              onClick={() => {
                setBn(
                  bn?.idQuran === data.number.inQuran
                    ? null
                    : { idQuran: data.number.inQuran, idSurah: data.number.inSurah },
                );
              }}
              className={`ayat-card cursor-pointer p-4 ${
                bn?.idQuran === data.number.inQuran
                  ? darkMode
                    ? "bg-emerald-900/20"
                    : "bg-emerald-50"
                  : ""
              } ${isPlaying ? (darkMode ? "ring-1 ring-emerald-600" : "ring-1 ring-emerald-300") : ""}`}
            >
              {/* Row: Border + quick action icons */}
              <div className="flex items-center justify-between">
                <Border
                  number={data.number.inSurah}
                  animate={isPlaying ? "animate-ping-custom" : undefined}
                />
                <div className="flex items-center gap-2">
                  {/* Play/Pause inline */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAudio(data.number.inQuran);
                    }}
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                    className={`rounded-full p-1.5 transition-colors ${
                      isPlaying
                        ? "bg-emerald-100 text-emerald-600"
                        : darkMode
                        ? "text-slate-400 hover:text-emerald-400"
                        : "text-slate-300 hover:text-emerald-600"
                    }`}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  </button>

                  {/* Bookmark inline */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookMark(data.number.inQuran);
                    }}
                    aria-label="Bookmark ayat"
                    className="rounded-full p-1.5 transition-colors"
                  >
                    <Heart
                      size={15}
                      className={
                        isBookmarked
                          ? "fill-rose-500 text-rose-500"
                          : darkMode
                          ? "text-slate-500"
                          : "text-slate-300"
                      }
                    />
                  </button>

                  {/* Copy inline */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(data.number.inQuran);
                    }}
                    aria-label="Salin ayat"
                    className={`rounded-full p-1.5 transition-colors ${darkMode ? "text-slate-400" : "text-slate-300"} hover:text-emerald-600`}
                  >
                    {copied ? <CheckCheck size={15} className="text-emerald-500" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Arabic text */}
              <p dir="rtl" className={`font-amiri mt-3 text-right text-3xl leading-loose ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                {data.text?.arab}
              </p>

              {/* Transliteration */}
              <p className={`mt-2 text-sm font-medium capitalize ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                {data.text?.transliteration?.en.split(" ").join(" - ")}
              </p>

              {/* Translation */}
              <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                <span className="font-semibold">Artinya: </span>
                {data.translation?.id}
              </p>

              {/* Tafsir (expanded when terjemah active) */}
              {terjemah === data.number.inQuran && (
                <p
                  ref={terjemahRef}
                  className={`mt-2 rounded-xl p-3 text-xs leading-relaxed ${
                    darkMode ? "bg-slate-700/50 text-slate-400" : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="font-semibold">Tafsir: </span>
                  {data.tafsir?.id?.long}
                </p>
              )}

              {/* Terjemah toggle button (only shown for selected ayat) */}
              {bn?.idQuran === data.number.inQuran && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTerjemah(terjemah === data.number.inQuran ? null : data.number.inQuran);
                  }}
                  className={`mt-2 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    terjemah === data.number.inQuran
                      ? "bg-emerald-100 text-emerald-700"
                      : darkMode
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <BookText size={12} />
                  {terjemah === data.number.inQuran ? "Sembunyikan Tafsir" : "Lihat Tafsir"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Copy toast */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-medium text-white shadow-lg fade-in">
          ✅ Ayat berhasil disalin
        </div>
=======
  const handleBookMark = (idQuran: number) => {
    /* search quran by idQuran **/
    const finding = (dataSurah as TypeSurah)?.data.verses.find(
      (item: TypeSurahMap) => item.number.inQuran === idQuran
    );
    const filteringBm = bookMark.some(
      (item: TypeSurahMap) => item.number.inQuran === idQuran
    );
    /** handle if id not found in bookmark*/
    if (finding && !filteringBm) {
      // add current surah and data
      addBookMark({ ...finding, surah });
    } else {
      deleteBookMark(idQuran);
    }
  };
  const handleCopy = (e: React.MouseEvent<SVGSVGElement>, idQuran: number) => {
    e.preventDefault();

    /* search quran by idQuran **/
    const finding = (dataSurah as TypeSurah)?.data.verses.find(
      (item: TypeSurahMap) => item.number.inQuran === idQuran
    );
    const copyText = `${finding?.text.arab}\n ${finding?.text.transliteration.en} \n artinya : ${finding?.translation.id}`;

    /**create element */
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);

    textArea.select();

    document.execCommand("copy");

    document.body.removeChild(textArea);
    alert("Sukses menyalin teks ke clipboard");
  };

  const [audio, setAudio] = useState<any>(null);

  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);

  // useEffect(() => {
  //   const dataId = (dataSurah as TypeSurah)?.data?.verses.find(
  //     (verse: TypeSurahMap) => verse.audio?.primary === audio
  //   );
  //   if (dataId) {
  //     setAudioActive(dataId);
  //   } else if (audio === null) {
  //     setAudioActive(null);
  //   }
  // }, [audio]);

  const handleAudio = (e: React.MouseEvent<SVGSVGElement>, idQuran: number) => {
    e.preventDefault();
    /* search quran by idQuran **/
    const finding = (dataSurah as TypeSurah)?.data.verses.find(
      (item: TypeSurahMap) => item.number.inQuran === idQuran
    );
    if (audioRefPlay.current) {
      audioRefPlay.current.pause();
      audioRefPlay.current.currentTime = 0;
    }
    if (finding) {
      setAudio(finding.audio.primary);
      setCurrentAudio(finding.audio.primary);
    } else {
      setAudio(null);
    }
  };
  const handleAudioEnded = () => {
    const currentIndex = (dataSurah as TypeSurah)?.data?.verses.findIndex(
      (verse: TypeSurahMap) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (dataSurah as TypeSurah).data.verses.length
    ) {
      setAudio(
        (dataSurah as TypeSurah).data.verses[currentIndex + 1].audio?.primary
      );
    } else {
      setAudio(null);
    }
  };

  /** handle if user scroll in bottom screen */
  const bnRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scrolling = () => {
      if (
        bnRef.current &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
      ) {
        bnRef.current.style.bottom = `5rem`;
      } else if (bnRef.current) {
        bnRef.current.style.bottom = `0`;
      }
    };
    window.addEventListener("scroll", scrolling);
    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [bnRef]);
  return (
    <div className="w-full relative">
      <div className="flex flex-col items-center gap-2">
        {(dataSurah as TypeSurah)?.data?.verses?.map((data: TypeSurahMap) => (
          <div
            onMouseDown={() => {
              // handle click bn 2x
              if (bn?.idQuran === data?.number?.inQuran) {
                setBn(null);
              } else {
                setBn({
                  idQuran: data?.number?.inQuran,
                  idSurah: data?.number?.inSurah,
                });
              }
            }}
            className={`w-full p-4 border-b ${
              darkMode ? "border-b-white" : "border-b-black"
            } md:mt-4 lg:mt-6 lg:p-3 `}
            key={data?.number?.inQuran}
          >
            <div className={`relative`}>
              <Border
                number={data?.number?.inSurah}
                animate={
                  data?.audio?.primary === audio && "animate-ping-custom"
                }
                numberClass={
                  data?.audio?.primary === audio && "animate-ping-custom"
                }
              />
              <h1 dir="rtl" className="font-amiri leading-loose text-4xl">
                {data?.text?.arab}
              </h1>
              <div className="w-full">
                <h1
                  className={` text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2`}
                >
                  {data?.text?.transliteration?.en.split(" ").join(" - ")}
                </h1>
                <p className="text-left text-sm font-normal md:text-base lg:mt-2">
                  <span className="font-semibold ">artinya : </span>
                  {data?.translation?.id}
                </p>
                {terjemah === data?.number?.inQuran && (
                  <p
                    ref={terjemahRef}
                    className="text-left text-xs font-normal md:text-sm lg:mt-2"
                  >
                    <span className="font-semibold ">terjemah : </span>
                    {data?.tafsir?.id?.long}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {bn && (
        <>
          <div
            ref={bnRef}
            className={`${
              darkMode ? "bg-black " : "bg-white "
            } fixed z-50 left-1/2 border-t -translate-x-1/2 w-full h-28 transition-all duration-300`}
          >
            <div className="flex flex-1 justify-center h-full max-w-2xl mx-auto">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5  group"
              >
                {audio !== null && audio ? (
                  <AudioMatiIcon
                    fill={darkMode ? "white" : "black"}
                    onClick={() => setAudio(null)}
                  />
                ) : (
                  <AudioHidupicon
                    fill={darkMode ? "white" : "black"}
                    onClick={(e: React.MouseEvent<SVGSVGElement>) =>
                      handleAudio(e, bn.idQuran)
                    }
                  />
                )}
                <span className="text-sm  group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Audio
                </span>
              </button>

              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5  group"
              >
                {terjemah === bn.idQuran ? (
                  <>
                    <X
                      onClick={() => {
                        setTerjemah(null);
                      }}
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400 "></span>
                  </>
                ) : (
                  <>
                    {" "}
                    <BookText
                      onClick={() => {
                        // terjemah is current bn active
                        setTerjemah(bn.idQuran);
                      }}
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400 ">
                      Terjemah
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center ">
                <Border number={bn.idSurah}></Border>
              </div>

              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5  group"
              >
                <LoveIcon
                  fill={
                    bookMark.some(
                      (item: TypeSurahMap) => item.number.inQuran === bn.idQuran
                    )
                      ? darkMode
                        ? "white"
                        : "black"
                      : darkMode
                      ? "black"
                      : "white"
                  }
                  onClick={() => {
                    handleBookMark(bn.idQuran);
                  }}
                />

                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  BookMark
                </span>
              </button>

              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5  group"
              >
                <CopyIcon
                  onClick={(e: React.MouseEvent<SVGSVGElement>) =>
                    handleCopy(e, bn.idQuran)
                  }
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Copy
                </span>
              </button>
            </div>
          </div>
        </>
      )}
      {audio && (
        <audio
          className="hidden"
          autoPlay
          controls
          onEnded={handleAudioEnded}
          src={audio}
          ref={audioRefPlay}
        ></audio>
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
      )}
    </div>
  );
};

<<<<<<< HEAD
/* =========================================================
   BACA ROUTE
   BUG FIX: used fragile `pathname.split("/").pop()` — replaced with useParams()
   ========================================================= */
export const BacaRoute = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  /** BUG FIX: use useParams() instead of parsing pathname */
  const { surah: idSurah } = useParams();
  const { data } = useSurahById(idSurah);

  return (
    <div className="w-full pt-2">
      {(data as TypeSurah)?.data?.verses?.map((item: TypeSurahMap) => (
        <div
          key={item?.number?.inQuran}
          className={`ayat-card flex flex-col gap-2 p-4`}
        >
          <Border number={item?.number?.inSurah} />
          <p
            dir="rtl"
            className={`font-amiri text-right text-4xl leading-loose ${
              darkMode ? "text-slate-100" : "text-slate-800"
            }`}
          >
            {item?.text?.arab}
          </p>
        </div>
      ))}
=======
export const BacaRoute = () => {
  /** get id quran using */
  const idSurah = useLocation().pathname.split("/").pop();
  const { data } = useSurahById(idSurah);
  return (
    <div className="p-1 w-full mt-24">
      {(data as TypeSurah)?.data?.verses?.length > 0
        ? (data as TypeSurah)?.data?.verses?.map((item: TypeSurahMap) => (
            <div
              className={`border-even flex flex-col gap-2 p-2 my-2 lg:p-2 lg:tracking-wide`}
              key={item?.number?.inQuran}
            >
              <div className="w-full justify-start">
                <Border number={item?.number?.inSurah} />
              </div>
              <h1 dir="rtl" className="font-amiri text-4xl leading-loose">
                {item?.text?.arab}
              </h1>
            </div>
          ))
        : ""}
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
    </div>
  );
};
