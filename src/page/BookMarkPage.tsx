import { useEffect, useRef, useState } from "react";
import { useGetAlQuranSurahByAyat } from "../state/Query";
import { DataGetAlQuranSurahByAyat } from "../model/Interface";
import Border from "../components/element/Border";
import { useBookMarkAlQuran, useDarkmode } from "../state/Zustand";
import AudioMatiIcon from "../components/element/Icon/AudioMatiIcon";
import AudioHidupicon from "../components/element/Icon/AudioHidupicon";
import Terjemahicon from "../components/element/Icon/Terjemahicon";
import CopyIcon from "../components/element/Icon/CopyIcon";
import Viewicon from "../components/element/Icon/Viewicon";
import BookMarkMinicon from "../components/element/Icon/BookMarkMinicon";
import Icon from "../helper/Icon";
import Navbar from "../components/layouts/Navbar";

const BookMarkPage = () => {
  const { data } = useGetAlQuranSurahByAyat();
  const [bookMark, setBookMark] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const darkMode = useDarkmode((state) => state.darkMode);
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  const { deleteBookMark }: any = useBookMarkAlQuran();
  const [long, setLong] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const [terjemah, setTerjemah] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  useEffect(() => {
    setBookMark((data as DataGetAlQuranSurahByAyat)?.data);
  }, [data]);
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  const handleTerjemah = () => {
    setTerjemah(!terjemah);

    if (window.innerWidth < 700) {
      window.scrollTo({
        top: window.innerHeight - 250,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight - 300,
        behavior: "smooth",
      });
    }
    setLong(false);
  };

  const handleCopy = (
    e: React.MouseEvent<SVGSVGElement>,
    arab: any,
    en: any,
    arti: any
  ) => {
    e.preventDefault();
    const copyText = `${arab}\n ${en} \n artinya : ${arti}`;
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
  const handleAudio = (
    e: React.MouseEvent<SVGSVGElement>,
    audio: HTMLAudioElement
  ) => {
    e.preventDefault();
    setAudio(audio);
    setCurrentAudio(audio);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-black" : "bg-white text-black"
      } w-full flex flex-col`}
    >
      <Navbar type="quran" />
      <div className="relative  w-full mt-20 p-2 ">
        <div className="flex gap-4 justify-center my-4  ">
          {audio !== null && audio === bookMark?.audio?.primary ? (
            <AudioMatiIcon
              handler={() => setAudio(null)}
              fill={`${darkMode ? "white" : "black"}`}
            />
          ) : (
            <AudioHidupicon
              fill={`${darkMode ? "white" : "black"}`}
              handler={(e: React.MouseEvent<SVGSVGElement>) =>
                handleAudio(e, bookMark?.audio?.primary)
              }
            />
          )}
          <Terjemahicon
            handler={() => handleTerjemah()}
            fill={`${darkMode ? "white" : "black"}`}
          />
          <BookMarkMinicon
            handler={() => {
              deleteBookMark(
                bookMark?.number?.inSurah,
                bookMark?.surah?.number
              );
              window.location.href = `/quran`;
            }}
            fill={`${darkMode ? "white" : "black"}`}
          />
          <CopyIcon
            fill={`${darkMode ? "white" : "black"}`}
            handler={(e: React.MouseEvent<SVGSVGElement>) =>
              handleCopy(
                e,
                bookMark?.text?.arab,
                bookMark?.text?.transliteration?.en,
                bookMark?.translation?.id
              )
            }
          />
        </div>
        <div className="w-full flex items-center justify-beetwen gap-2">
          <Border
            numberClass={`${darkMode ? "text-white" : "text-black"}`}
            border="border-black"
            number={bookMark?.number?.inSurah}
          />
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-right text-3xl leading-relaxed font-sans w-full`}
          >
            {bookMark?.text?.arab}
          </h1>
        </div>
        <div className="w-full">
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-left mt-2 text-xl font-sans text-secondary font-semibold lg:text-xl lg:my-6`}
          >
            {bookMark?.text?.transliteration?.en}
          </h1>
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } font-sans text-left`}
          >
            <span className="font-semibold">artinya : </span>
            {bookMark?.translation?.id}
          </h1>
        </div>
        {terjemah && (
          <div className="relative w-full">
            <div className="flex justify-center w-full">
              {terjemah ? (
                <div className="flex justify-center">
                  <Viewicon
                    handler={() => setTerjemah(!terjemah)}
                    fill={`${darkMode ? "white" : "black"}`}
                  />
                </div>
              ) : (
                <Icon width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill=""
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m19 15l-7-6l-7 6"
                  ></path>{" "}
                </Icon>
              )}
            </div>
            <p className="text-center text-sm md:text-base ">
              {bookMark?.tafsir?.id?.short}
            </p>
            <div
              onClick={() => setLong(!long)}
              className="flex items-center w-full justify-center my-4 "
            >
              <Viewicon
                fill={`${darkMode ? "white" : "black"}`}
                classIcon={`${!long && "animate-bounce"}`}
              />
              <p
                className={`${
                  darkMode ? "text-white" : "text-black"
                } inline-block cursor-pointer  `}
              >
                view More
              </p>
            </div>
            {long ? (
              <p className="text-center text-sm md:text-base">
                {bookMark?.tafsir?.id?.long}
              </p>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {audio !== null && (
        <audio
          className="w-full fixed bottom-0 left-1/2 -translate-x-1/2"
          controls
          autoPlay
          onEnded={() => setAudio(null)}
          src={`${audio}`}
          ref={audioRefPlay}
        ></audio>
      )}
    </div>
  );
};

export default BookMarkPage;
