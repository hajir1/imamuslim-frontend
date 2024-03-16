import { useGetJuz } from "../../state/Query";
import { DataGetJuz } from "../../model/Interface";
import Border from "../element/Border";
import { useDarkmode } from "../../state/Zustand";
import AudioMatiIcon from "../element/Icon/AudioMatiIcon";
import AudioHidupicon from "../element/Icon/AudioHidupicon";
import { useEffect, useRef, useState } from "react";
import Terjemahicon from "../element/Icon/Terjemahicon";
import CopyIcon from "../element/Icon/CopyIcon";
import Viewicon from "../element/Icon/Viewicon";
import HomeIcon from "../element/Icon/Homeicon";
import Sekeleton from "../element/Sekeleton";
import { useParams } from "react-router-dom";

const JuzById = () => {
  const { data } = useGetJuz();
  const { juz } = useParams();
  const darkMode = useDarkmode((state) => state.darkMode);
  const [terjemah, setTerjemah] = useState<
    any | React.Dispatch<React.SetStateAction<null | any>>
  >(null);
  const [long, setLong] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const skeletonArray: any = Array.from({ length: 5 }, (_, index) => index);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);

  const [audio, setAudio] = useState<any>(null);
  const handleTerjemah = (verses: number) => {
    if (verses === 1) {
      return;
    }
    const dataId = (data as DataGetJuz)?.data?.verses?.find(
      (item: any) => item?.number?.inQuran === verses
    );
    console.log(verses);
    if (dataId) {
      setTerjemah(dataId?.number?.inQuran);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
  const handleAudioEnded = () => {
    const currentIndex = (data as DataGetJuz)?.data?.verses.findIndex(
      (verse: any) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (data as DataGetJuz).data.verses.length
    ) {
      setAudio(
        (data as DataGetJuz).data.verses[currentIndex + 1].audio?.primary
      );
    } else {
      setAudio(null);
    }
  };
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [juz]);
  return (
    <div className="w-full">
      <div className="w-full p-2 ">
        <div className={`${darkMode?"border-b-white":"border-b-black"} flex justify-evenly items-center mt-3 mb-10 border-b-2 `}>
          <span className="text-sm font-normal text-left">
            {(data as DataGetJuz)?.data?.juzStartInfo}{" "}
          </span>{" "}
          <h1 className="font-semibold text-center text-3xl">
            Juz {(data as DataGetJuz)?.data?.juz}{" "}
          </h1>
          <span className="text-sm font-normal text-left">
            {(data as DataGetJuz)?.data?.juzEndInfo}
          </span>{" "}
        </div>
        <div
          className={`${
            (data as DataGetJuz)?.data?.juz === undefined && "hidden"
          } w-full flex items-center`}
        >
          <HomeIcon
            fill={`${darkMode ? "white" : "black"}`}
            handler={() => (window.location.href = `/quran`)}
          />
          <p className="mx-2">{`/ Juz ke ${
            (data as DataGetJuz)?.data?.juz
          }`}</p>
        </div>
        {(data as DataGetJuz)?.data?.verses?.length > 0 ? (
          (data as DataGetJuz)?.data?.verses?.map((item: any) => (
            <div
              className={`${
                darkMode ? "border-b-white border-b-2" : "border-even "
              } w-full  p-1 `}
              key={item?.number?.inQuran}
            >
              <div className="w-full flex gap-4 justify-center my-4 ">
                {audio !== null && audio === item?.audio?.primary ? (
                  <AudioMatiIcon
                    handler={() => setAudio(null)}
                    fill={`${darkMode ? "white" : "black"}`}
                  />
                ) : (
                  <AudioHidupicon
                    fill={`${darkMode ? "white" : "black"}`}
                    handler={(e: React.MouseEvent<SVGSVGElement>) =>
                      handleAudio(e, item?.audio?.primary)
                    }
                  />
                )}
                <Terjemahicon
                  handler={() => handleTerjemah(item?.number?.inQuran)}
                  fill={`${darkMode ? "white" : "black"}`}
                />
           

                <CopyIcon
                  handler={(e: React.MouseEvent<SVGSVGElement>) =>
                    handleCopy(
                      e,
                      item?.text?.arab,
                      item?.text?.transliteration?.en,
                      item?.translation?.id
                    )
                  }
                  fill={`${darkMode ? "white" : "black"}`}
                />
              </div>
              <div className="relative">
                <div className="w-full flex items-center justify-beetwen gap-2">
                  <Border
                    border="border-black"
                    number={item?.number?.inSurah}
                  />
                  <h1 className="text-right text-xl w-[90%] sm:text-2xl lg:text-3xl">
                    {item?.text?.arab}
                  </h1>
                </div>
                <div className="w-full">
                  <h1
                    className={`${
                      darkMode && ""
                    } text-primary text-left mt-2 font-semibold lg:text-xl lg:my-6`}
                  >
                    {item?.text?.transliteration?.en}
                  </h1>
                  <h1 className="text-left text-sm">{item?.translation?.id}</h1>
                </div>
              </div>
              {terjemah === item?.number?.inQuran && (
                <div className="absolute bg-primary w-[95%] top-0 p-4 left-1/2 -translate-x-1/2 rounded-md shadow-lg z-30">
                  <p
                    className="text-white font-semibold cursor-pointer"
                    onClick={() => setTerjemah(!terjemah)}
                  >
                    X
                  </p>
                  <h1 className="text-center text-3xl my-2 text-white">
                    {item?.text?.arab}
                  </h1>
                  <p className="text-center text-white">
                    {item?.tafsir?.id?.short}
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
                      } inline-block `}
                    >
                      view More
                    </p>
                  </div>
                  {long ? (
                    <p className="text-center text-white">
                      {item?.tafsir?.id?.long}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-wrap gap-2 w-full">
            {skeletonArray?.map((item: any) => (
              <Sekeleton custom="h-72 lg-w-full" key={item} />
            ))}
          </div>
        )}
      </div>
      {audio && (
        <audio
          className="w-full fixed bottom-0 left-1/2 -translate-x-1/2 z-20"
          controls
          autoPlay
          onEnded={handleAudioEnded}
          src={audio}
          ref={audioRefPlay}
        ></audio>
      )}
    </div>
  );
};

export default JuzById;
