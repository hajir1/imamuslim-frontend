import React, { useEffect, useRef, useState } from "react";
import MainLayouts from "../components/layouts/Main";
import { useGetPrayer, useGetProvince, useGetRegency } from "../state/Query";
import { Cities, TypeLocation, TypePrayer } from "../model/Interface";
import { timeZone } from "../helper/moment";

const JadwalSholatPage = () => {
  const { data: dataProvince, isLoading: provinceIsLoading } = useGetProvince();
  const [provinceId, setProvinceId] = useState<
    any | React.Dispatch<React.SetStateAction<any>>
  >("623170da0c9712e86967f91a");
  const { data: dataRegency, isLoading: regencyIsLoading } =
    useGetRegency(provinceId);
  const [regency, setRegency] = useState<any>({
    name: "Kab. Malang",
    latitude: -8.140072222222221,
    longitude: 112.5617916666667,
  });
  const { data: dataPrayer, isLoading: prayerIsLoading } = useGetPrayer(
    regency.latitude,
    regency.longitude
  );
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const timerRef = useRef<HTMLHeadingElement>(null);

  const SekeletonArray = Array.from({ length: 20 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <MainLayouts navbarType="jadwalsholat">
      <h1
        className="text-xl md:text-4xl font-semibold w-full text-center"
        ref={timerRef}
      >
        {timeZone}-{time} 
      </h1>
      <div className="w-full sm:w-3/5 md:w-1/2 flex gap-2 p-2 ">
        {provinceIsLoading ? (
          <div className="w-52 bg-gray-200 h-10 animate-pulse transition-all duration-200"></div>
        ) : (
          <select
            className="w-full flex-1 bg-gray-50 text-slate-900"
            value={provinceId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setProvinceId(e.target.value);
            }}
          >
            <option disabled value={""}>
              Cari Provinsi
            </option>
            {(dataProvince as [])?.map((province: Cities) => (
              <option key={province?.id} value={province?.id}>
                {province?.name}
              </option>
            ))}
          </select>
        )}
        {regencyIsLoading ? (
          <div className="w-52 bg-gray-200 h-10 animate-pulse transition-all duration-200"></div>
        ) : (
          <select
            className="w-full flex-1 bg-gray-50 text-slate-900"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const regencyId = (dataRegency as TypeLocation)?.cities?.find(
                (city: Cities) => {
                  return city?.name === e.target.value;
                }
              );
              setRegency({
                name: regencyId?.name,
                latitude: regencyId?.coordinate?.latitude,
                longitude: regencyId?.coordinate?.longitude,
              });
            }}
            value={regency?.name}
          >
            <option disabled value={""}>
              Cari Kabupaten
            </option>
            {(dataRegency as TypeLocation)?.cities?.map((regency: Cities) => (
              <option key={regency?.id} value={regency?.name}>
                {regency?.name}
              </option>
            ))}
          </select>
        )}
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
                  {(dataPrayer as TypePrayer)?.prayers?.map((prayer: any) => (
                    <tr
                      key={prayer?.id}
                      className={`${
                        new Date(prayer?.date).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                          ? "bg-green-800 text-white"
                          : ""
                      } dark:bg-gray-800 dark:border-gray-700`}
                    >
                      <td className="px-6 py-4">{prayer?.date}</td>
                      <td className="px-6 py-4">{prayer?.time?.imsak}</td>
                      <td className="px-6 py-4">{prayer?.time?.dhuha}</td>
                      <td className="px-6 py-4">{prayer?.time?.dzuhur}</td>
                      <td className="px-6 py-4">{prayer?.time?.ashar}</td>
                      <td className="px-6 py-4">{prayer?.time?.maghrib}</td>
                      <td className="px-6 py-4">{prayer?.time?.isya}</td>
                    </tr>
                  ))}
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
