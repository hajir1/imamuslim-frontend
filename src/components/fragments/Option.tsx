import React, { useEffect, useRef } from "react";
import AudioMatiIcon from "../elements/Icon/AudioMatiIcon";
import AudioHidupicon from "../elements/Icon/AudioHidupicon";
import Terjemahicon from "../elements/Icon/TerjemahbtnIcon";
import CopyIcon from "../elements/Icon/CopyIcon";
import { OptionProps } from "../../types/index";
import {
  useDarkmode,
  useTerjemahOption,
} from "../../stores/TypeHooks";
import { X } from "lucide-react";


/**
 * Component/Function  Option.
 * Used to render or handle logic for Option.
 */
const Option = ({
  currentData,
  audio,
  setAudio,
  handleAudio,
  handleTerjemah,
  handleCopy,
}: OptionProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();
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
          darkMode ? "bg-black" : "bg-white"
        } fixed left-1/2 z-50 h-28 w-full -translate-x-1/2 border transition-all duration-300`}
      >
        <div className="mx-auto grid h-full max-w-lg grid-cols-5">
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {audio !== null && audio === currentData?.audio?.primary ? (
              <AudioMatiIcon
                onClick={() => setAudio(null)}
                fill={`${darkMode ? "white" : "black"}`}
              />
            ) : (
              <AudioHidupicon
                fill={`${darkMode ? "white" : "black"}`}
                onClick={(e: React.MouseEvent<SVGSVGElement>) =>
                  handleAudio(e, currentData?.audio?.primary)
                }
              />
            )}
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              Audio
            </span>
          </button>

          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {terjemahOption === currentData?.number?.inSurah ? (
              <>
                <X
                  onClick={() => {
                    setTerjemahOption(null);
                  }}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"></span>
              </>
            ) : (
              <>
                {" "}
                <Terjemahicon
                  onClick={() => handleTerjemah(currentData?.number?.inSurah)}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
                  Terjemah
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center">
            <div>{currentData?.number?.inSurah}</div>
          </div>

          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
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

            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              BookMark
            </span>
          </button>

          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <CopyIcon
              onClick={(e: React.MouseEvent<SVGSVGElement>) =>
                handleCopy(
                  e,
                  currentData?.text?.arab,
                  currentData?.text?.transliteration?.en,
                  currentData?.translation?.id,
                )
              }
              fill={`${darkMode ? "white" : "black"}`}
            />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              Copy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Option;
