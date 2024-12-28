import Border from "../element/Border";

// untuk surah dan juz
type TypeBox = {
  data: any;
  handleBottomNavigation: (data: number) => void;
  bottomNavigation: null | number;
  setCurrentData: any;
  audio: any;
  terjemahOption: number | null;
};
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
      } w-full p-4 border-b border-b-slate-200 md:mt-4 lg:mt-10 lg:p-3 `}
      key={data?.number?.inQuran}
    >
      <div className={`relative`}>
        <Border
          number={data?.number?.inSurah}
          animate={data?.audio?.primary === audio && "animate-ping-custom"}
          numberClass={data?.audio?.primary === audio && "animate-ping-custom"}
        />
        <h1
          dir="rtl"
          className="w-full my-2 font-sans font-normal md:font-thin leading-relaxed lg:leading-loose text-4xl md:my-6"
        >
          {data?.text?.arab}
        </h1>
        <div className="w-full">
          <h1
            className={` text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2`}
          >
            {data?.text?.transliteration?.en.split(" ").join(" - ")}
          </h1>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold ">artinya : </span>
            {data?.translation?.id}
          </p>
          {terjemahOption === data?.number?.inSurah && (
            <>
              <p
                id={`terjemah-${data?.number?.inSurah}`}
                className="text-left text-xs font-normal md:text-sm lg:mt-2"
              >
                <span className="font-semibold ">terjemah : </span>
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
