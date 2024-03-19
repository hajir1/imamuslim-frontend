import React, { useEffect, useState } from "react";
import {
  useGetJadwalSholat,
  useGetPrayer,
  useGetProvince,
} from "../../state/Query";
import { timeZone } from "../../helper/moment";
import { useDarkmode } from "../../state/Zustand";

const JadwalSholat = () => {
  const { data: dataProvince } = useGetJadwalSholat();
  const [time, setTime] = useState<Date>(new Date());
  const [valueProvinceId, setValueProvinceId] = useState<string>(
    "623170da0c9712e86967f915"
  );
  const [valueKabId, setValueKabId] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  }>({ name: "", latitude: -6.170088888888889, longitude: 106.83105 });
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataKabupaten } = useGetProvince(valueProvinceId);
  const { data: dataPrayer } = useGetPrayer(
    valueKabId.latitude,
    valueKabId.longitude
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="w-full">
      <div className="w-full p-2">
        <h1 className="text-center text-3xl font-semibold">Waktu Sholat</h1>
        <p className="font-semibold mt-4 lg:mt-1">{timeZone}</p>
        <p className="mt-1 text-xl">{`${hours} : ${minutes} : ${seconds}`}</p>
      </div>
      <div className="w-full flex justify-center flex-col-reverse flex-wrap ">
        <p className="my-4 text-center text-2xl ">
          {" "}
          {(dataPrayer as any)?.name} - {(dataPrayer as any)?.province?.name}{" "}
        </p>
        <div className="flex justify-evenly gap-2">
          {(dataProvince as [])?.length > 0 ? (
            <select
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setValueProvinceId(e.target.value);
              }}
              value={valueProvinceId}
              className={`${
                darkMode ? "text-black" : ""
              } w-40 border border-black rounded-sm p-2 bg-white outline-none md:w-80 text-center`}
            >
              {(dataProvince as []).map((item: any) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}
          {(dataKabupaten as any)?.cities?.length > 0 ? (
            <select
              name=""
              id=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedCity = (dataKabupaten as any)?.cities?.find(
                  (city: any) => city.name === e.target.value
                );
                setValueKabId({
                  name: selectedCity?.name,
                  latitude: selectedCity?.coordinate?.latitude,
                  longitude: selectedCity?.coordinate?.longitude,
                });
              }}
              value={valueKabId.name}
              className={`${
                darkMode ? "text-black" : ""
              } w-40 border border-black rounded-sm p-2 bg-white outline-none md:w-80 text-center`}
            >
              {(dataKabupaten as any)?.cities?.map((item: any) => (
                <option key={item?.id} value={item?.name}>
                  {item?.name}
                </option>
              ))}
            </select>
          ) : (
            <select className="w-40 border border-black rounded-sm p-2 bg-white"></select>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface ">
                <thead className="border-b border-neutral-200 font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      tanggal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Imsak
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Terbit
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Dhuha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Dzuhur
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ashar
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Maghrib
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Isya
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(dataPrayer as any)?.prayers?.map((item: any) => (
                    <tr
                      key={item?.id}
                      className={` ${
                        new Date(item?.date).toLocaleDateString() ===
                          new Date().toLocaleDateString() &&
                        "bg-slate-800 text-white"
                      } border-b border-neutral-200 `}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item?.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.imsak}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.terbit}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.dhuha}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.dzuhur}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.ashar}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.maghrib}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.time?.isya}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalSholat;
