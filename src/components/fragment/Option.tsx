import React from "react";
import AudioMatiIcon from "../element/Icon/AudioMatiIcon";
import AudioHidupicon from "../element/Icon/AudioHidupicon";
import Terjemahicon from "../element/Icon/Terjemahicon";
import BookMarkIcon from "../element/Icon/BookMarkIcon";
import CopyIcon from "../element/Icon/CopyIcon";
import { OptionProps } from "../../model/Interface";
import { useDarkmode } from "../../state/Zustand";

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
  return (
    <div className="w-full flex gap-4 justify-center my-4 ">
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
      <Terjemahicon
        handler={() => handleTerjemah(item?.number?.inSurah)}
        fill={`${darkMode ? "white" : "black"}`}
      />
      {type === "notJuz" && (
        <BookMarkIcon
          handler={() =>
            handleBookMark(
              item?.meta?.juz,
              (data as any).data.number,
              item?.number?.inSurah,
              
            )
          }
          fill={`${darkMode ? "white" : "black"}`}
        />
      )}

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
    </div>
  );
};

export default Option;
