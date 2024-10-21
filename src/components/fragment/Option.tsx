import React, { useEffect, useRef } from "react";
import AudioMatiIcon from "../element/Icon/AudioMatiIcon";
import AudioHidupicon from "../element/Icon/AudioHidupicon";
import Terjemahicon from "../element/Icon/Terjemahicon";
import BookMarkIcon from "../element/Icon/BookMarkIcon";
import CopyIcon from "../element/Icon/CopyIcon";
import { OptionProps } from "../../model/Interface";
import {
  useBottomNavigation,
  useDarkmode,
  useTerjemahOption,
} from "../../state/TypeHooks";
import Border from "../element/Border";
import { X } from "lucide-react";

const Option = ({
  item,
  audio,
  setAudio,
  handleAudio,
  handleTerjemah,
  handleBookMark,
  data,
  handleCopy,
  type,
}: OptionProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const { bottomNavigation, setBottomNavigation } = useBottomNavigation();
  const { terjemahOption, setTerjemahOption } = useTerjemahOption();
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setBottomNavigation(null);
      }
    }

    if (bottomNavigation) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [bottomNavigation]);
  // useEffect(() => {
  //   if (audio) {
  //     setBottomNavigation(null);
  //   }
  // }, [audio]);
  return (
    <div>
      <div
        ref={optionRef}
        className={`${darkMode ?"bg-black border-slate-600":"bg-white border-gray-200 "} fixed z-50 w-full h-28 max-w-lg -translate-x-1/2 border bottom-0 left-1/2 `}
      >
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
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
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Audio
            </span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {terjemahOption === item?.number?.inSurah ? (
              <>
                <X
                  onClick={() => {
                    setTerjemahOption(null), setBottomNavigation(null);
                  }}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
              </>
            ) : (
              <>
                {" "}
                <Terjemahicon
                  handler={() => handleTerjemah(item?.number?.inSurah)}
                  fill={`${darkMode ? "white" : "black"}`}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Terjemah
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center ">
            <div>{item?.number?.inSurah}</div>
          </div>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {type === "notJuz" && (
              <BookMarkIcon
                handler={() =>
                  handleBookMark(
                    item?.meta?.juz,
                    (data as any).data.number,
                    item?.number?.inSurah
                  )
                }
                fill={`${darkMode ? "white" : "black"}`}
              />
            )}
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
                  item?.text?.arab,
                  item?.text?.transliteration?.en,
                  item?.translation?.id
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
