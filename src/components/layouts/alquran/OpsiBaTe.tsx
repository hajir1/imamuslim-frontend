import React, { useEffect, useRef, useState } from "react";
import Border from "../../element/Border";
import { useBookMarkAlQuran, useDarkmode } from "../../../state/Zustand";
import { Sekeleton, SekeletonPartQuranById } from "../../element/Sekeleton";
import {
  DataGetAlQuranSurahById,
  DataSurahByIdMap,
} from "../../../model/Interface";
import { useGetAlQuranSurahBySurah } from "../../../state/Query";

import Viewicon from "../../element/Icon/Viewicon";
import Icon from "../../../helper/Icon";
import Option from "../../fragment/Option";
// import { useParams } from "react-router-dom";

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
  const handleTerjemah = (id: number) => {
    const dataId = (data as DataGetAlQuranSurahById)?.data?.verses?.find(
      (item: any) => item?.number?.inSurah === id
    );
    if (dataId) {
      setTerjemah(dataId?.number?.inSurah);
    }

    setLong(false);
  };
  const handleBookMark = (juz: number, surah: number, ayat: number, love = true) => {
    addBookMark({ juz, surah, ayat ,love});
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
      <h1 className="font-semibold text-2xl text-center ">
        {(data as DataGetAlQuranSurahById)?.data?.preBismillah?.text?.arab}
      </h1>
      <p className="font-normal text-center mt-2 text-slate-900">
        {(data as DataGetAlQuranSurahById)?.data?.preBismillah?.translation?.id}
      </p>
      <div className="w-full mt-4 flex flex-col items-center gap-5">
        {!isLoading &&
        (data as DataGetAlQuranSurahById)?.data?.verses?.length > 0 ? (
          (data as DataGetAlQuranSurahById)?.data?.verses?.map(
            (item: DataSurahByIdMap) => (
              <div
                className={`${
                  darkMode ? "border-b-white border-b-2" : "border-even "
                } w-full  p-1 `}
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
                  <div className="w-full flex items-center justify-beetwen gap-2">
                    <Border
                      border="border-black"
                      number={item?.number?.inSurah}
                    />
                    <h1 className="text-right w-[90%] text-2xl lg:text-4xl">
                      {item?.text?.arab}
                    </h1>
                  </div>
                  <div className="w-full">
                    <h1
                      className={`${
                        darkMode && ""
                      } text-primary text-left mt-2 capitalize font-sans text-xl font-semibold lg:text-2xl lg:my-6`}
                    >
                      {item?.text?.transliteration?.en}
                    </h1>
                    <h1 className="text-left text-base font-sans  md:text-xl">
                      <span className="font-semibold">artinya : </span> {item?.translation?.id}
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
    <div className="p-1">
      {(data as DataGetAlQuranSurahById)?.data?.verses?.length > 0
        ? (data as DataGetAlQuranSurahById)?.data?.verses?.map(
            (item: DataSurahByIdMap) => (
              <div
                className={`${
                  darkMode ? "border-b-2 border-b-white" : "border-even "
                } p-1 flex items-center gap-4 justify-between my-3`}
                key={item?.number?.inQuran}
              >
                <Border border="border-black" number={item?.number?.inSurah} />
                <h1 className="text-right text-3xl w-[90%]">
                  {item?.text?.arab}
                </h1>
              </div>
            )
          )
        : ""}
    </div>
  );
};
