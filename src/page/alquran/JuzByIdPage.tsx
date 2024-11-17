import { useNavigate, useParams } from "react-router-dom";
import { useGetJuz } from "../../state/Query";
import {
  useAudioActive,
  useBottomNavigation,
  useDarkmode,
  useTerjemahOption,
} from "../../state/TypeHooks";
import { useEffect, useRef, useState } from "react";
import { TypeDataJuz, TypeDataJuzMap } from "../../model/Interface";

import { LoaderCircle } from "lucide-react";
import Navbar from "../../components/layouts/Navbar";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import BoxTypeV1 from "../../components/fragment/BoxModel";
import Option from "../../components/fragment/Option";

const JuzByIdPage = () => {
  const { juz: idJuzPage }: any = useParams();
  const { data, isLoading: loadingJuz } = useGetJuz(idJuzPage);
  const { audioActive, setAudioActive } = useAudioActive();
  const darkMode = useDarkmode((state) => state.darkMode);
  const [scrollToTerjemah, setScrollToTerjemah] = useState<number | null>(null);
  const [itemData, setItemData] = useState<
    TypeDataJuzMap | any | React.Dispatch<React.SetStateAction<TypeDataJuzMap>>
  >();
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);
  const { bottomNavigation, setBottomNavigation } = useBottomNavigation();
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();
  const [audio, setAudio] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (audioRefPlay.current && currentAudio) {
      audioRefPlay.current.src = currentAudio;
      audioRefPlay.current.play();
    }
  }, [currentAudio]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [idJuzPage]);
  const handleTerjemah = (verses: number) => {
    const dataId = (data as TypeDataJuz)?.data?.verses?.find(
      (item: TypeDataJuzMap) => item?.number?.inQuran === verses
    );
    if (dataId) {
      setTerjemahOption(dataId?.number?.inQuran);
      setScrollToTerjemah(verses);
    }
  };
  useEffect(() => {
    const dataId = (data as TypeDataJuz)?.data?.verses.find(
      (verse: TypeDataJuzMap) => verse.audio?.primary === audio
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
    const currentIndex = (data as TypeDataJuz)?.data?.verses.findIndex(
      (verse: any) => verse.audio?.primary === audio
    );
    if (
      currentIndex !== -1 &&
      currentIndex + 1 < (data as TypeDataJuz).data.verses.length
    ) {
      setAudio(
        (data as TypeDataJuz).data.verses[currentIndex + 1].audio?.primary
      );
    } else {
      setAudio(null);
    }
  };
  const handleBottomNavigation = (id: number) => {
    const response = (data as TypeDataJuz)?.data?.verses?.find(
      (data: TypeDataJuzMap) => data?.number?.inQuran === id
    );
    if (response) {
      setBottomNavigation(response?.number?.inQuran);
    }
  };

  return (
    <div className={`${darkMode && "dark-mode"} `}>
      <div className="w-full flex justify-center">
        {loadingJuz ? (
          <div className="w-full min-h-screen grid place-content-center">
            {" "}
            <LoaderCircle className="animate-spin  w-20 h-20" />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <Navbar type="quran" />
            <div className="w-full h-24 mt-16 lg:px-5 lg:flex flex-col items-center">
              <BreadCrumbV1
                firstRoute="al-Quran"
                type="juzById"
                secondRoute="Juz"
                thirdRoute={`juz ${idJuzPage}`}
                response={data}
              />
              <div className="flex w-full justify-between gap-2 px-4 ">
                <button
                  className="font-semibold text-sm "
                  onClick={() => {
                    if (parseInt(idJuzPage) > 1) {
                      navigate(`/quran/juz/${parseInt(idJuzPage) - 1}`);
                    }
                  }}
                >
                  &laquo;&nbsp;&nbsp;Juz Sebelumnya
                </button>

                <div
                  className={`${
                    audioActive === null && "invisible"
                  } flex relative`}
                >
                  <LoaderCircle className="animate-spin w-7 h-7" />
                  <span className="inline-block text-xs absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                    {audioActive?.number?.inSurah}
                  </span>
                </div>
                {/* <ArrowDownFromLine className={`${!itemData && "hidden"}`} /> */}
                <button
                  className="font-semibold text-sm "
                  onClick={() => {
                    if (parseInt(idJuzPage) < 30) {
                      navigate(`/quran/juz/${parseInt(idJuzPage) + 1}`);
                    }
                  }}
                >
                  Juz Berikutnya&nbsp;&nbsp;&raquo;
                </button>
              </div>
            </div>
            {(data as TypeDataJuz)?.data?.verses?.length > 0
              ? (data as TypeDataJuz)?.data?.verses?.map(
                  (data: TypeDataJuzMap) => (
                    <BoxTypeV1
                      audio={audio}
                      bottomNavigation={bottomNavigation}
                      data={data}
                      handleBottomNavigation={handleBottomNavigation}
                      setItemData={setItemData}
                      terjemahOption={terjemahOption}
                    />
                  )
                )
              : ""}
          </div>
        )}
        {audio && (
          <audio
            className="hidden"
            controls
            autoPlay
            onEnded={handleAudioEnded}
            src={audio}
            ref={audioRefPlay}
          ></audio>
        )}
        {bottomNavigation === itemData?.number?.inQuran && (
          <Option
            handleBookMark={() => {}}
            audio={audio}
            handleAudio={handleAudio}
            handleCopy={handleCopy}
            data={data as TypeDataJuz}
            handleTerjemah={handleTerjemah}
            item={itemData}
            setAudio={setAudio}
            type="juz"
          />
        )}
      </div>
    </div>
  );
};

export default JuzByIdPage;
