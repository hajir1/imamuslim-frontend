import { useParams } from "react-router-dom";
import { useGetJuz } from "../../state/Query";
import { useDarkmode } from "../../state/Zustand";
import { useEffect, useRef, useState } from "react";
import { DataGetJuz, DataGetJuzMap } from "../../model/Interface";
import { SekeletonPartQuranJuzById } from "../../components/element/Sekeleton";
import HomeIcon from "../../components/element/Icon/Homeicon";
import Option from "../../components/fragment/Option";
import Border from "../../components/element/Border";
import Viewicon from "../../components/element/Icon/Viewicon";
import Icon from "../../helper/Icon";

const JuzByIdPage = () => {
  const { data, isLoading } = useGetJuz();
  const { juz } = useParams();
  const darkMode = useDarkmode((state) => state.darkMode);
  const [terjemah, setTerjemah] = useState<
    number | null | React.Dispatch<React.SetStateAction<null | number>>
  >(null);
  const [long, setLong] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  // const skeletonArray: any = Array.from({ length: 5 }, (_, index) => index);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);

  const [audio, setAudio] = useState<any>(null);
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [juz]);
  const handleTerjemah = (verses: number) => {
    const dataId = (data as DataGetJuz)?.data?.verses?.find(
      (item: DataGetJuzMap) => item?.number?.inQuran === verses
    );
    if (dataId) {
      setTerjemah(dataId?.number?.inQuran);
    }
    setLong(false);
  };

  const handleCopy = (
    e: React.MouseEvent<SVGSVGElement>,
    arab: string,
    en: string,
    arti: string
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
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="w-full flex justify-center">
        {isLoading ? (
          <SekeletonPartQuranJuzById />
        ) : (
          <div className="w-full p-2 lg:w-[95%]">
            <div
              className={`${
                darkMode ? "border-b-white" : "border-b-black"
              } flex justify-evenly items-center mt-3 mb-10 border-b-2 lg:mt-10 `}
            >
              <span className="text-sm font-normal text-left lg:text-2xl">
                {(data as DataGetJuz)?.data?.juzStartInfo}{" "}
              </span>{" "}
              <h1 className="font-semibold text-center text-3xl">
                Juz {(data as DataGetJuz)?.data?.juz}{" "}
              </h1>
              <span className="text-sm font-normal text-left lg:text-2xl">
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
            {(data as DataGetJuz)?.data?.verses?.length > 0
              ? (data as DataGetJuz)?.data?.verses?.map(
                  (item: DataGetJuzMap) => (
                    <div
                      className={`${
                        darkMode ? "border-b-white border-b-2" : "border-even "
                      } w-full  p-1 `}
                      key={item?.number?.inQuran}
                    >
                      <Option
                        handleBookMark={() => {}}
                        audio={audio}
                        handleAudio={handleAudio}
                        handleCopy={handleCopy}
                        data={data as DataGetJuz}
                        handleTerjemah={handleTerjemah}
                        item={item}
                        setAudio={setAudio}
                        type="juz"
                      />
                      <div className="relative">
                        <div className="w-full flex items-center justify-beetwen gap-2">
                          <Border
                            border="border-black"
                            number={item?.number?.inSurah}
                          />
                          <h1 className="text-right text-2xl w-[90%] sm:text-2xl lg:text-4xl">
                            {item?.text?.arab}
                          </h1>
                        </div>
                        <div className="w-full">
                          <h1
                            className={`${
                              darkMode && ""
                            } text-primary text-left text-xl font-sans mt-2 font-semibold lg:text-2xl lg:my-6`}
                          >
                            {item?.text?.transliteration?.en}
                          </h1>
                          <h1 className="text-left text-base font-sans md:text-base">
                           <span className="font-semibold">artinya : </span>  {item?.translation?.id}
                          </h1>
                        </div>
                      </div>
                      {terjemah === item?.number?.inQuran && (
                        <div className="relative w-full">
                          <div className="flex justify-center w-full">
                            {terjemah ? (
                              <div className="flex justify-center">
                                <Viewicon
                                  handler={() => setTerjemah(null)}
                                  fill={`${darkMode ? "white" : "black"}`}
                                />
                              </div>
                            ) : (
                              <Icon
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
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
                              } inline-block cursor-pointer  `}
                            >
                              view More
                            </p>
                          </div>
                          {long ? (
                            <p className="text-center text-sm md:text-base">
                              {item?.tafsir?.id?.long}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                  )
                )
              : ""}
          </div>
        )}
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
    </div>
  );
};

export default JuzByIdPage;