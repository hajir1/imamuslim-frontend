import { useNavigate, useParams } from "react-router-dom";
import { useGetJuz } from "../../state/Query";
import { useAudioActive, useDarkmode } from "../../state/TypeHooks";
import { useEffect, useRef, useState } from "react";
import { DataGetJuz, DataGetJuzMap } from "../../model/Interface";
import { SekeletonPartQuranJuzById } from "../../components/element/Sekeleton";
import HomeIcon from "../../components/element/Icon/Homeicon";
import Option from "../../components/fragment/Option";
import Viewicon from "../../components/element/Icon/Viewicon";
import Icon from "../../helper/Icon";
import { LoaderCircle } from "lucide-react";
import Navbar from "../../components/layouts/Navbar";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import Border from "../../components/element/Border";

const JuzByIdPage = () => {
  const { juz: idJuzPage }: any = useParams();
  const { data, isLoading: loadingJuz } = useGetJuz(idJuzPage);
  const { audioActive, setAudioActive } = useAudioActive();
  const darkMode = useDarkmode((state) => state.darkMode);
  const [terjemah, setTerjemah] = useState<
    number | null | React.Dispatch<React.SetStateAction<null | number>>
  >(null);
  const [long, setLong] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const audioRefPlay = useRef<HTMLAudioElement>(null);
  const [currentAudio, setCurrentAudio] = useState<any | null>(null);

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
            {(data as DataGetJuz)?.data?.verses?.length > 0
              ? (data as DataGetJuz)?.data?.verses?.map(
                  (item: DataGetJuzMap) => (
                    <div
                      className={`w-full md:w-5/6 p-4 border-b border-b-slate-200 md:mt-4 lg:mt-10 lg:p-3`}
                      key={item?.number?.inQuran}
                    >
                      <div className="relative">
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
                        <div className="w-full lg:my-5 ">
                          <h1
                            dir="rtl"
                            className="w-full font-medium leading-relaxed lg:leading-normal text-4xl"
                          >
                            {item?.text?.arab}
                          </h1>
                        </div>

                        <div className="w-full lg:mt-10">
                          <h1
                            className={`text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2`}
                          >
                            {item?.text?.transliteration?.en.split(" ").join(" - ")}
                          </h1>
                          <h1 className="text-left text-sm font-normal md:text-base lg:mt-2">
                            <span className="font-semibold">
                              artinya :{" "}
                            </span>{" "}
                            {item?.translation?.id}
                          </h1>
                        </div>
                      </div>
                     
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
        {/* <Option
          handleBookMark={() => {}}
          audio={audio}
          handleAudio={handleAudio}
          handleCopy={handleCopy}
          data={data as DataGetJuz}
          handleTerjemah={handleTerjemah}
          item={item}
          setAudio={setAudio}
          type="juz"
        /> */}
      </div>
    </div>
  );
};

export default JuzByIdPage;
