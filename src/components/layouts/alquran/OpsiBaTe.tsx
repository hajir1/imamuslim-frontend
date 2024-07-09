import React, { useEffect, useRef, useState } from "react";
import Border from "../../element/Border";
import { useBookMarkAlQuran, useDarkmode } from "../../../state/Zustand";
import { SekeletonPartQuranById } from "../../element/Sekeleton";
import {
  DataGetAlQuranSurahById,
  DataSurahByIdMap,
} from "../../../model/Interface";
import { useGetAlQuranSurahBySurah } from "../../../state/Query";

import Viewicon from "../../element/Icon/Viewicon";
import Icon from "../../../helper/Icon";
import Option from "../../fragment/Option";

export const TerjemahRoute = () => {
  const { data, isLoading } = useGetAlQuranSurahBySurah();
  const [terjemah, setTerjemah] = useState<
    number | null | React.Dispatch<React.SetStateAction<null | any>>
  >(null);
  const [audio, setAudio] = useState<any>(null);
  const [long, setLong] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  const { addBookMark }: any = useBookMarkAlQuran();

  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  const darkMode = useDarkmode((state) => state.darkMode);
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleTerjemah = (id: number) => {
    const dataId = (data as DataGetAlQuranSurahById)?.data?.verses?.find(
      (item: any) => item?.number?.inSurah === id
    );
    if (dataId) {
      setTerjemah(dataId?.number?.inSurah);
    }

    setLong(false);
  };
  const handleBookMark = (
    juz: number,
    surah: number,
    ayat: number,
    love = true
  ) => {
    addBookMark({ juz, surah, ayat, love });
    alert(`sukses menambahkan ke bookMark`);
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
    const currentIndex = (
      data as DataGetAlQuranSurahById
    )?.data?.verses.findIndex(
      (verse: DataSurahByIdMap) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (data as DataGetAlQuranSurahById).data.verses.length
    ) {
      setAudio(
        (data as DataGetAlQuranSurahById).data.verses[currentIndex + 1].audio
          ?.primary
      );
    } else {
      setAudio(null);
    }
  };

  return (
    <div className="w-full mt-4 relative ">
      <h1 className="text-3xl text-center font-sans">
        {(data as DataGetAlQuranSurahById)?.data?.preBismillah?.text?.arab}
      </h1>
      <p className="font-normal text-center mt-2 text-slate-900 font-sans ">
        {(data as DataGetAlQuranSurahById)?.data?.preBismillah?.translation?.id}
      </p>
      <div className="w-full mt-4 flex flex-col items-center gap-5">
        {!isLoading &&
        (data as DataGetAlQuranSurahById)?.data?.verses?.length > 0 ? (
          (data as DataGetAlQuranSurahById)?.data?.verses?.map(
            (item: DataSurahByIdMap) => (
              <div
                className={`${
                  darkMode
                    ? "border-b-white "
                    : "border-b-gray-500 lg:border-b-gray-200"
                } w-full border-b-[1px] p-1 lg:p-3`}
                key={item?.number?.inQuran}
              >
                <Option
                  type="notJuz"
                  item={item}
                  audio={audio}
                  setAudio={setAudio}
                  handleAudio={handleAudio}
                  handleBookMark={handleBookMark}
                  handleCopy={handleCopy}
                  handleTerjemah={handleTerjemah}
                  data={data as DataGetAlQuranSurahById}
                />
                <div className="relative">
                  <div className="w-full justify-start">
                    <h1 className="font-bold font-sans">
                      {item?.number?.inSurah}
                    </h1>
                  </div>
                  <div className="w-full ">
                    <h1
                      dir="rtl"
                      className="w-full font-sans lg:tracking-wide leading-relaxed lg:leading-loose text-3xl"
                    >
                      {item?.text?.arab}
                    </h1>
                  </div>
                  <div className="w-full lg:mt-10">
                    <h1
                      className={`${
                        darkMode && ""
                      } text-primary lg:text-black text-left mt-2 font-sans text-lg lg:text-xl lg:mt-2`}
                    >
                      {item?.text?.transliteration?.en}
                    </h1>
                    <h1 className="text-left text-base font-sans  md:text-base">
                      <span className="font-sans font-bold">artinya : </span>{" "}
                      {item?.translation?.id}
                    </h1>
                  </div>
                </div>
                {terjemah === item?.number?.inSurah && (
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
        ) : (
          <div className="flex justify-center flex-wrap gap-2 w-full">
            {skeletonArray?.map((item: any) => (
              <SekeletonPartQuranById custom="h-72 lg-w-full" key={item} />
            ))}
          </div>
        )}
      </div>
      {audio && (
        <audio
          className="w-full fixed bottom-0 left-1/2 -translate-x-1/2"
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

export const BacaRoute = () => {
  const { data } = useGetAlQuranSurahBySurah();
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="p-1 w-full">
      {(data as DataGetAlQuranSurahById)?.data?.verses?.length > 0
        ? (data as DataGetAlQuranSurahById)?.data?.verses?.map(
            (item: DataSurahByIdMap) => (
              <div
                className={`${
                  darkMode
                    ? "border-b-2 border-b-white"
                    : "border-b-gray-500 lg:border-b-gray-200"
                } p-1 flex flex-col gap-2 border-b-[1px] my-4 lg:p-2 lg:tracking-wide`}
                key={item?.number?.inQuran}
              >
                <h1 className="font-sans font-bold">{item?.number?.inSurah}</h1>
                <h1 dir="rtl" className="w-full font-sans tracking-wide text-3xl leading-relaxed">
                  {item?.text?.arab}
                </h1>
              </div>
            )
          )
        : ""}
    </div>
  );
};
