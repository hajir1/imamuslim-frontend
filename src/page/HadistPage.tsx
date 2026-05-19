import { useHadistById, useParawi } from "../state/Query";
import {
  TypeHadist,
  TypeHadistMap,
  TypeParawis,
  TypeParawisMap,
} from "../model/_Type";
import { useEffect } from "react";
import MainLayouts from "../components/layouts/Main";
import {
  useBookMarkHadist,
  useCurrentNumberHadist,
  useCurrentParawi,
  useDarkmode,
} from "../state/TypeHooks";
import { KeyIcon } from "lucide-react";
import Border from "../components/element/Border";
import LoveIcon from "../components/element/Icon/LoveIcon";
export const HadistPage = () => {
  /** state current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get data parawi */
  const { data: dataParawis } = useParawi();

  /** handle cache data parawi change*/
  const currentParawi = useCurrentParawi((s: any) => s.currentParawi);
  const setCurrentParawi = useCurrentParawi((s: any) => s.setCurrentParawi);

  /** handle cache current number change*/
  const currentNumber = useCurrentNumberHadist((s: any) => s.currentNumber);
  const setCurrentNumber = useCurrentNumberHadist(
    (s: any) => s.setCurrentNumber
  );

  /** get hadist */
  const {
    data: dataHadist,
    isLoading: isLoadingHadist,
    refetch,
  } = useHadistById(currentParawi, currentNumber);

  /** handle search hadist */
  const handleSearchHadist = () => {
    if (!isNaN(currentNumber)) {
      refetch();
    }
  };

  /** caching bookmark hadist */
  const bookMark = useBookMarkHadist((s: any) => s.bookMark);
  const addBookMark = useBookMarkHadist((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkHadist((s: any) => s.deleteBookMark);

  /** handle bookMark */
  const onHandleBookMark = (props: TypeHadistMap, slug: string) => {
    const filtering = bookMark.some(
      (item: TypeHadistMap) => item.id === props.id
    );
    if (filtering) {
      deleteBookMark(props.id);
    } else {
      addBookMark({ ...props, slug });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayouts>
      <div className="w-full md:w-5/6 p-2">
        <div className="p-2 flex items-center flex-col gap-4">
          <select
            value={currentParawi}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCurrentParawi(e.target.value);
            }}
            className="block w-full max-w-2xl px-3 py-2.5 bg-neutral-secondary-medium border-0 border-b-gray-500 border-b-2 text-heading text-sm rounded-base focus:ring-0 focus:border-b-gray-500 placeholder:text-body"
            id=""
          >
            <option value="">Cari Hadist</option>
            {(dataParawis as TypeParawis)?.data.map(
              (parawi: TypeParawisMap, index: number) => (
                <option
                  value={parawi.slug}
                  key={index}
                  className="w-full max-w-sm border rounded items-center mt-3 p-4 flex justify-between hover:border-2"
                >
                  {parawi?.name} - {parawi?.total}
                </option>
              )
            )}
          </select>
          {currentParawi !== "" && (
            <div className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <KeyIcon className="text-slate-900 w-4" />
                </div>
                <input
                  type="number"
                  min={1}
                  value={currentNumber ?? 1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCurrentNumber(e.target.value);
                  }}
                  placeholder="Cari Nomor Hadist..."
                  className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:border-gray-500 focus:ring-0 focus:outline-none shadow-xs placeholder:text-body"
                />
                <button
                  type="button"
                  onClick={() => handleSearchHadist()}
                  className="absolute end-1.5 bottom-1.5 bg-gray-700 text-white bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
                >
                  Cari Nomor
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoadingHadist || !(dataHadist as TypeHadist)?.data ? (
          // handle skeleton by default
          <div className="w-full space-y-2 p-2">
            <div className="flex justify-between items-center ">
              {" "}
              <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-8 h-8 rounded-md"></div>
            </div>
            <div className="animate-pulse w-full flex flex-wrap justify-end space-y-2 rounded-md">
              <div className="bg-gray-300 animate-pulse w-1/2 h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
            </div>
            <div className="animate-pulse w-full flex flex-wrap justify-start space-y-2 rounded-md">
              <div className="bg-gray-300 animate-pulse w-20 h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
              <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md"></div>
            </div>
          </div>
        ) : (
          <div className={`w-full relative p-2 md:p-4`}>
            <div className="flex justify-between items-center">
              <Border number={(dataHadist as TypeHadist)?.data.number} />
              <LoveIcon
                fill={
                  bookMark.some(
                    (item: TypeHadistMap) =>
                      item.id === (dataHadist as TypeHadist)?.data.id
                  )
                    ? darkMode
                      ? "white"
                      : "black"
                    : darkMode
                    ? "black"
                    : "white"
                }
                // save slug and id
                onClick={() => {
                  onHandleBookMark(
                    (dataHadist as TypeHadist).data,
                    (dataHadist as TypeHadist)?.info?.perawi?.slug
                  );
                }}
              />
            </div>
            <h1 dir="rtl" className="font-amiri leading-loose text-4xl">
              {(dataHadist as TypeHadist)?.data?.arab}
            </h1>
            <div className="w-full">
              <span className="font-semibold">artinya : </span>
              <p className="text-sm md:text-base">
                {(dataHadist as TypeHadist)?.data?.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayouts>
  );
};
