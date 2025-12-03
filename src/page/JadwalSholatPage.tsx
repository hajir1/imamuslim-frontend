import React, { useEffect, useRef, useState } from "react";
import MainLayouts from "../components/layouts/Main";
import { usePrayer, useRegency } from "../state/Query";
import { getDate, getDayIdn, getMonth, getYears } from "../helper/moment";
import {
  TypePrayer,
  TypePrayerMap,
  TypeRegency,
  TypeRegencyMap,
} from "../model/_Type";
import { KeyIcon } from "lucide-react";
import { useCurrentRegency } from "../state/TypeHooks";

const JadwalSholatPage = () => {
  /** declare first regency or city */
  const { currentRegency, setCurrentRegency }: any = useCurrentRegency();

  useEffect(() => {
    console.log(currentRegency);
  }, [currentRegency]);
  /** declare current time */
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  /* get all regency in indonesia  */
  const { data: dataRegencies } = useRegency(currentRegency.lokasi);

  /** get search , handle if a district is clicked*/
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: dataPrayer, isLoading: prayerIsLoading } = usePrayer(
    currentRegency.id,
    getYears,
    getMonth
  );
  const SekeletonArray = Array.from({ length: 20 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  /** handle timer */
  const timerRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <MainLayouts>
      <h1
        className=" font-primary text-xl md:text-2xl text-center"
        ref={timerRef}
      >
        {getYears}-{getMonth}-{getDate}&nbsp;&nbsp;{getDayIdn}&nbsp;&nbsp; {time}
      </h1>
      <div className="w-full flex gap-2 p-2 ">
        <div className="w-full">
          <div>
            <label
              htmlFor="search"
              className="block mb-2.5 text-sm font-medium text-heading sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <KeyIcon className="text-gray-900 w-4" />
              </div>
              <input
                ref={searchRef}
                type="search"
                value={currentRegency.lokasi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentRegency({
                    ...currentRegency,
                    lokasi: e.target.value,
                  })
                }
                className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:border-gray-500 focus:ring-0 focus:outline-none shadow-xs placeholder:text-body"
                placeholder="Search"
              />
            </div>
          </div>
          {(dataRegencies as TypeRegency)?.data?.length &&
            searchRef.current &&
            (searchRef.current as HTMLInputElement).matches(":focus") && (
              <div className="max-h-48 p-2 overflow-y-auto mt-2 border border-gray-300 rounded-md">
                {(dataRegencies as TypeRegency)?.data?.map(
                  (r: TypeRegencyMap) => (
                    <button
                      onMouseDown={() => {
                        setCurrentRegency({ id: r.id, lokasi: r.lokasi });
                      }}
                      key={r.id}
                      className="block"
                    >
                      {r.lokasi}
                    </button>
                  )
                )}
              </div>
            )}
        </div>
      </div>
      <div className="w-full md:w-5/6 p-2">
        {prayerIsLoading ? (
          <div className="flex flex-col items-center gap-1 p-2">
            {SekeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full bg-gray-200 h-10 rounded transition-all duration-200 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative overflow-x-auto">
              <table className={`w-full  text-sm text-left rtl:text-right `}>
                <thead className="text-xs  uppercase ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Imsak
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subuh
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dhuha
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dzuhur
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ashar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Maghrib
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Isya
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(dataPrayer as TypePrayer)?.data?.jadwal?.map(
                    (prayer: TypePrayerMap, index: number) => (
                      <tr
                        key={index}
                        className={`${
                          new Date(prayer?.date).toLocaleDateString() ===
                          new Date().toLocaleDateString()
                            ? "bg-green-800 text-white"
                            : ""
                        } dark:bg-gray-800 dark:border-gray-700`}
                      >
                        <td className="px-6 py-4">{prayer?.date}</td>
                        <td className="px-6 py-4">{prayer?.imsak}</td>
                        <td className="px-6 py-4">{prayer?.subuh}</td>
                        <td className="px-6 py-4">{prayer?.dhuha}</td>
                        <td className="px-6 py-4">{prayer?.dzuhur}</td>
                        <td className="px-6 py-4">{prayer?.ashar}</td>
                        <td className="px-6 py-4">{prayer?.maghrib}</td>
                        <td className="px-6 py-4">{prayer?.isya}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </MainLayouts>
  );
};

export default JadwalSholatPage;
