import React, {  useEffect, useRef, useState } from "react";
import {
  useAudioActive,
  useBookMarkAlQuran,
  useBottomNavigation,
  useTerjemahOption,
} from "../../../state/TypeHooks";
import {
  TypeDataSurahByIdMap,
  TypeDataSurahById,
} from "../../../model/Interface";
import { useGetSurahById } from "../../../state/Query";

import Option from "../../fragment/Option";
import Border from "../../element/Border";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export const TerjemahRoute = () => {
  const { surah: idSurahPage } = useParams();
  const { setAudioActive } = useAudioActive();
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const { data, isLoading: loadingSurah } = useGetSurahById(idSurahPage);
  const [scrollToTerjemah, setScrollToTerjemah] = useState<number | null>(null);

  const { bottomNavigation, setBottomNavigation } = useBottomNavigation();
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();

  const [audio, setAudio] = useState<any>(null);

  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  const { addBookMark }: any = useBookMarkAlQuran();
  const [itemData, setItemData] = useState<
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
  }, [idSurahPage]);
  useEffect(() => {
    const dataId = (data as TypeDataSurahById)?.data?.verses.find(
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
    const dataId = (data as TypeDataSurahById)?.data?.verses?.find(
      (item: any) => item?.number?.inSurah === id
    );
    if (dataId) {
      setTerjemahOption(dataId?.number?.inSurah);
      setBottomNavigation(null);
      setScrollToTerjemah(id);
    }
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
    const currentIndex = (data as TypeDataSurahById)?.data?.verses.findIndex(
      (verse: TypeDataSurahByIdMap) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (data as TypeDataSurahById).data.verses.length
    ) {
      setAudio(
        (data as TypeDataSurahById).data.verses[currentIndex + 1].audio?.primary
      );
    } else {
      setAudio(null);
    }
  };
  const handleBottomNavigation = (id: number) => {
    const response = (data as TypeDataSurahById)?.data?.verses?.find(
      (data: TypeDataSurahByIdMap) => data?.number?.inQuran === id
    );
    if (response) {
      setBottomNavigation(response?.number?.inQuran);
    }
  };

  return (
    <div className="w-full relative">
      {loadingSurah ? (
        <div className="w-full min-h-screen grid place-content-center">
          {" "}
          <LoaderCircle className="animate-spin  w-20 h-20" />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-5">
            {(data as TypeDataSurahById)?.data?.verses?.length > 0 &&
              (data as TypeDataSurahById)?.data?.verses?.map(
                (item: TypeDataSurahByIdMap) => (
                  <div
                    onClick={() => {
                      handleBottomNavigation(item?.number?.inQuran);
                      setItemData(item);
                    }}
                    className={`${
                      bottomNavigation && "pointer-events-none"
                    } w-full md:w-5/6 p-4 border-b border-b-slate-200 md:mt-4 lg:mt-10 lg:p-3`}
                    key={item?.number?.inQuran}
                  >
                    <div
                      className={`relative`}
                    >
                      <div className="w-full flex justify-between">
                        <Border
                          number={item?.number?.inSurah}
                          color={"black"}
                          animate={
                            item?.audio?.primary === audio &&
                            "animate-ping-custom"
                          }
                          numberClass={
                            item?.audio?.primary === audio &&
                            "animate-ping-custom"
                          }
                        />
                      </div>
                      <div className="w-full lg:my-5">
                        <h1
                          dir="rtl"
                          className="w-full font-medium leading-relaxed lg:leading-normal text-4xl"
                        >
                          {item?.text?.arab}
                        </h1>
                      </div>
                      <div className="w-full lg:mt-10">
                        <h1
                          className={` text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2`}
                        >
                          {item?.text?.transliteration?.en
                            .split(" ")
                            .join(" - ")}
                        </h1>
                        <h1 className="text-left text-sm font-normal md:text-base lg:mt-2">
                          <span className="font-semibold ">artinya : </span>
                          {item?.translation?.id}
                        </h1>
                        {terjemahOption === item?.number?.inSurah && (
                          <>
                            <h1
                              id={`terjemah-${item?.number?.inSurah}`}
                              className="text-left text-xs font-normal md:text-sm lg:mt-2"
                            >
                              <span className="font-semibold ">
                                terjemah :{" "}
                              </span>
                              {item?.tafsir?.id?.long}
                            </h1>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          {bottomNavigation === itemData?.number?.inQuran && (
            <Option
              type="notJuz"
              item={itemData}
              audio={audio}
              setAudio={setAudio}
              handleAudio={handleAudio}
              handleBookMark={handleBookMark}
              handleCopy={handleCopy}
              handleTerjemah={handleTerjemah}
              data={data as TypeDataSurahById}
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
        </>
      )}
    </div>
  );
};

export const BacaRoute = () => {
  const { surah: idSurahPage } = useParams();
  const { data } = useGetSurahById(idSurahPage);
  return (
    <div className="p-1 w-full mt-24">
      <h1 className="text-3xl py-3 text-center font-medium">
        {(data as TypeDataSurahById)?.data?.preBismillah?.text?.arab}
      </h1>
      {(data as TypeDataSurahById)?.data?.verses?.length > 0
        ? (data as TypeDataSurahById)?.data?.verses?.map(
            (item: TypeDataSurahByIdMap) => (
              <div
                className={`border-even flex flex-col gap-2 p-2 my-2 lg:p-2 lg:tracking-wide`}
                key={item?.number?.inQuran}
              >
                <div className="w-full justify-start">
                  <Border number={item?.number?.inSurah} color="gray" />
                </div>
                <h1
                  dir="rtl"
                  className="w-full font-mono text-slate-900 font-medium text-4xl leading-relaxed"
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
