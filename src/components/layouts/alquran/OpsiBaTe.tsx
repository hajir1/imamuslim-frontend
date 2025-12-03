import React, { useEffect, useRef, useState } from "react";
import {
  useAudioActive,
  useBookMarkAlQuran,
  useBottomNavigation,
  useTerjemahOption,
} from "../../../state/TypeHooks";
import { TypeDataSurahByIdMap, TypeDataSurahById } from "../../../model/_Type";
import { useSurahById } from "../../../state/Query";

import Option from "../../fragment/Option";
import Border from "../../element/Border";
import { useLocation, useParams } from "react-router-dom";
import Box from "../../fragment/BoxModel";

export const TerjemahRoute = () => {
  /** get id quran using */
  const { surah: idSurah } = useParams();
  const { setAudioActive } = useAudioActive();
  const audioRefPlay = useRef<HTMLAudioElement>(null);

  /** get surah */
  const { data: dataSurah } = useSurahById(idSurah);

  const [scrollToTerjemah, setScrollToTerjemah] = useState<number | null>(null);

  const { bottomNavigation, setBottomNavigation } = useBottomNavigation();
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();

  const [audio, setAudio] = useState<any>(null);

  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  const { addBookMark }: any = useBookMarkAlQuran();
  const [currentData, setCurrentData] = useState<
    | TypeDataSurahByIdMap
    | any
    | React.Dispatch<React.SetStateAction<TypeDataSurahByIdMap>>
  >();
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTerjemahOption(null);
  }, [idSurah]);
  useEffect(() => {
    const dataId = (dataSurah as TypeDataSurahById)?.data?.verses.find(
      (verse: TypeDataSurahByIdMap) => verse.audio?.primary === audio
    );
    if (dataId) {
      setAudioActive(dataId);
    } else if (audio === null) {
      setAudioActive(null);
    }
  }, [audio]);
  useEffect(() => {
    if (scrollToTerjemah !== null) {
      const scrolling = document.getElementById(`terjemah-${scrollToTerjemah}`);
      if (scrolling) {
        scrolling.scrollIntoView({ behavior: "smooth" });
      }
      // Reset setelah scroll selesai
      setScrollToTerjemah(null);
    }
  }, [scrollToTerjemah]);

  const handleTerjemah = (id: number) => {
    const dataId = (dataSurah as TypeDataSurahById)?.data?.verses?.find(
      (item: any) => item?.number?.inSurah === id
    );
    if (dataId) {
      setTerjemahOption(dataId?.number?.inSurah);
      setBottomNavigation(null);
      setScrollToTerjemah(id);
    }
  };

  const handleBookMark = (
    id: number,
    surah: string,
    idSurah: number,
    ayat: number,
    bookMark: boolean
  ) => {
    addBookMark({ id, surah, idSurah, ayat, bookMark });
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
    audio: string | null
  ) => {
    e.preventDefault();
    if (audioRefPlay.current) {
      audioRefPlay.current.pause();
      audioRefPlay.current.currentTime = 0;
    }
    if (audio) {
      setAudio(audio);
      setCurrentAudio(audio);
    } else {
      setAudio(null);
    }
  };
  const handleAudioEnded = () => {
    const currentIndex = (
      dataSurah as TypeDataSurahById
    )?.data?.verses.findIndex(
      (verse: TypeDataSurahByIdMap) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (dataSurah as TypeDataSurahById).data.verses.length
    ) {
      setAudio(
        (dataSurah as TypeDataSurahById).data.verses[currentIndex + 1].audio
          ?.primary
      );
    } else {
      setAudio(null);
    }
  };
  const handleBottomNavigation = (id: number) => {
    const response = (dataSurah as TypeDataSurahById)?.data?.verses?.find(
      (data: TypeDataSurahByIdMap) => data?.number?.inQuran === id
    );
    if (response) {
      setBottomNavigation(response?.number?.inQuran);
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col items-center gap-5 ">
        {(dataSurah as TypeDataSurahById)?.data?.verses?.length > 0 &&
          (dataSurah as TypeDataSurahById)?.data?.verses?.map(
            (data: TypeDataSurahByIdMap) => (
              // boxModel
              <Box
                key={data?.number?.inQuran}
                audio={audio}
                bottomNavigation={bottomNavigation}
                data={data}
                handleBottomNavigation={handleBottomNavigation}
                setCurrentData={setCurrentData}
                terjemahOption={terjemahOption}
              />
            )
          )}
      </div>
      {bottomNavigation === currentData?.number?.inQuran && (
        <Option
          currentData={currentData}
          audio={audio}
          setAudio={setAudio}
          handleAudio={handleAudio}
          handleBookMark={handleBookMark}
          handleCopy={handleCopy}
          handleTerjemah={handleTerjemah}
          data={dataSurah as TypeDataSurahById}
        />
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
      {(data as TypeDataSurahById)?.data?.verses?.length > 0
        ? (data as TypeDataSurahById)?.data?.verses?.map(
            (item: TypeDataSurahByIdMap) => (
              <div
                className={`border-even flex flex-col gap-2 p-2 my-2 lg:p-2 lg:tracking-wide`}
                key={item?.number?.inQuran}
              >
                <div className="w-full justify-start">
                  <Border number={item?.number?.inSurah} />
                </div>
                <h1
                  dir="rtl"
                  className="font-amiri text-4xl leading-loose"
                >
                  {item?.text?.arab}
                </h1>
              </div>
            )
          )
        : ""}
    </div>
  );
};
