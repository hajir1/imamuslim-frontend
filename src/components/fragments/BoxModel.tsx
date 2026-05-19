import Border from "../elements/Border";

// untuk surah dan juz
type TypeBox = {
  data: any;
  handleBottomNavigation: (data: number) => void;
  bottomNavigation: null | number;
  setCurrentData: any;
  audio: any;
  terjemahOption: number | null;
};
/**
 * Component/Function  Box.
 * Used to render or handle logic for Box.
 */
const Box = ({
  data,
  handleBottomNavigation,
  bottomNavigation,
  setCurrentData,
  audio,
  terjemahOption,
}: TypeBox) => {
  return (
    <div
      onClick={() => {
        handleBottomNavigation(data?.number?.inQuran);
        setCurrentData(data);
      }}
      className={`${
        bottomNavigation && "pointer-events-none"
      } w-full border-b border-b-slate-200 p-4 md:mt-4 lg:mt-10 lg:p-3`}
      key={data?.number?.inQuran}
    >
      <div className={`relative`}>
        <Border
          number={data?.number?.inSurah}
          animate={data?.audio?.primary === audio && "animate-ping-custom"}
        />
        <h1 dir="rtl" className="font-amiri text-4xl leading-loose font-normal">
          {data?.text?.arab}
        </h1>
        <div className="w-full">
          <h1
            className={`lg:text-md mt-4 mb-2 text-left text-base font-semibold tracking-wider capitalize lg:mt-2`}
          >
            {data?.text?.transliteration?.en.split(" ").join(" - ")}
          </h1>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold">artinya : </span>
            {data?.translation?.id}
          </p>
          {terjemahOption === data?.number?.inSurah && (
            <>
              <p
                id={`terjemah-${data?.number?.inSurah}`}
                className="text-left text-xs font-normal md:text-sm lg:mt-2"
              >
                <span className="font-semibold">terjemah : </span>
                {data?.tafsir?.id?.long}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
