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
  const [terjemah, setTerjemah] = useState<number | null>(null);
  const terjemahRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!terjemahRef.current) return;

    terjemahRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [terjemah]);

  /** cache bookmark alquran */
  const bookMark = useBookMarkAlQuran((s: any) => s.bookMark);
  const addBookMark = useBookMarkAlQuran((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkAlQuran((s: any) => s.deleteBookMark);

  /** get id quran using */
  const { surah: idSurah } = useParams();
  const { setAudioActive } = useAudioActive();
  const audioRefPlay = useRef<HTMLAudioElement>(null);

  /** get surah */
  const { data: dataSurah } = useSurahById(idSurah);

  /** default */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      )}
    </div>
  );
};

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
    </div>
  );
};
