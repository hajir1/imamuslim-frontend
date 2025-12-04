import React, { useEffect, useRef } from "react";
import AudioMatiIcon from "../element/Icon/AudioMatiIcon";
import AudioHidupicon from "../element/Icon/AudioHidupicon";
import Terjemahicon from "../element/Icon/Terjemahicon";
import CopyIcon from "../element/Icon/CopyIcon";
import { OptionProps } from "../../model/_Type";
import {
  useBookMarkAlQuran,
  useDarkmode,
  useTerjemahOption,
} from "../../state/TypeHooks";
import { X } from "lucide-react";
import LoveIcon from "../element/Icon/LoveIcon";

const Option = ({
  currentData,
  audio,
  setAudio,
  handleAudio,
  handleTerjemah,
  handleBookMark,
  data,
  handleCopy,
}: OptionProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();
  const { bookMark: bmAlQuran }: any = useBookMarkAlQuran();
  const optionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scrolling = () => {
      if (
        optionRef.current &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
      ) {
        optionRef.current.style.bottom = `5rem`;
      } else if (optionRef.current) {
        optionRef.current.style.bottom = `0`;
      }
    };
    window.addEventListener("scroll", scrolling);
    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [optionRef]);

  return (
    <div>
      <div
        ref={optionRef}
        className={`${
          darkMode ? "bg-black" : "bg-white "
        } fixed z-50 left-1/2 -translate-x-1/2 w-full h-28 border transition-all duration-300`}
      >
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {audio !== null && audio === currentData?.audio?.primary ? (
              <AudioMatiIcon
                handler={() => setAudio(null)}
                fill={`${darkMode ? "white" : "black"}`}
              />
            ) : (
              <AudioHidupicon
                fill={`${darkMode ? "white" : "black"}`}
                handler={(e: React.MouseEvent<SVGSVGElement>) =>
                  handleAudio(e, currentData?.audio?.primary)
                }
              />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Audio
            </span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {terjemahOption === currentData?.number?.inSurah ? (
              <>
                <X
                  onClick={() => {
                    setTerjemahOption(null);
                  }}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
              </>
            ) : (
              <>
                {" "}
                <Terjemahicon
                  handler={() => handleTerjemah(currentData?.number?.inSurah)}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Terjemah
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center ">
            <div>{currentData?.number?.inSurah}</div>
          </div>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {/* <LoveIcon
              fill={
                bmAlQuran.some(
                  (item: any) => item.id === currentData?.number?.inQuran
                )
                  ? darkMode
                    ? "white"
                    : "black"
                  : darkMode
                  ? "black"
                  : "white"
              }
              handleBookMark={() => {
                handleBookMark(
                  currentData?.number?.inQuran,
                  (data as any).data.name.transliteration.id,
                  (data as any)?.data?.number,
                  currentData?.number?.inSurah,
                  true
                );
              }}
            /> */}

            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              BookMark
            </span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <CopyIcon
              handler={(e: React.MouseEvent<SVGSVGElement>) =>
                handleCopy(
                  e,
                  currentData?.text?.arab,
                  currentData?.text?.transliteration?.en,
                  currentData?.translation?.id
                )
              }
              fill={`${darkMode ? "white" : "black"}`}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Copy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Option;
