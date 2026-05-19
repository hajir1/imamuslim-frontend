import React, { useEffect, useState, useRef } from "react";
import MainLayouts from "../components/layouts/Main";
import { usePrayer, useRegency } from "../stores/Query";
import { getDate, getDayIdn, getMonth, getYears } from "../utils/moment";
import {
  TypePrayer,
  TypePrayerMap,
  TypeRegency,
  TypeRegencyMap,
} from "../types/index";
import { Search, Clock, MapPin } from "lucide-react";
import { useCurrentRegency } from "../stores/TypeHooks";
import skeletonArray from "../utils/skeleton";
import { useDarkmode } from "../stores/TypeHooks";

/**
 * Page: JadwalSholatPage
 * Prayer schedule page with location search and monthly table view.
 */
const JadwalSholatPage = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  const { currentRegency, setCurrentRegency }: any = useCurrentRegency();

  /** Live clock */
  const [time, setTime] = useState(new Date().toLocaleTimeString("id-ID"));
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: dataRegencies } = useRegency(currentRegency.lokasi);

  /** Search focus state — controls dropdown visibility */
  const searchRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  /** Geolocation state */
  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung geolokasi.");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          let city = data.address.city || data.address.county || data.address.state_district || "";
          city = city.replace(/Kabupaten |Kota /gi, "").trim();
          
          const searchRes = await fetch(`https://api.myquran.com/v2/sholat/kota/cari/${city}`);
          const searchData = await searchRes.json();
          
          if (searchData.status && searchData.data.length > 0) {
            setCurrentRegency({ id: searchData.data[0].id, lokasi: searchData.data[0].lokasi });
          } else {
            alert(`Lokasi ditemukan (${city}), tetapi tidak ada di database jadwal sholat.`);
          }
        } catch (error) {
          console.error(error);
          alert("Gagal mendapatkan lokasi spesifik.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Akses lokasi ditolak atau gagal didapatkan.");
        setIsLocating(false);
      }
    );
  };

  const { data: dataPrayer, isLoading: prayerIsLoading } = usePrayer(
    currentRegency.id,
    getYears,
    getMonth,
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const prayerColumns = ["Imsak", "Subuh", "Dhuha", "Dzuhur", "Ashar", "Maghrib", "Isya"];

  return (
    <MainLayouts>
      <div className="w-full max-w-3xl px-4">

        {/* ── Hero: Clock & Date */}
        <div className="page-hero mb-6 flex flex-col items-center p-6 text-center">
          <div className="mb-1 flex items-center gap-2">
            <Clock size={18} className="text-white/80" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/70">
              Waktu Sekarang
            </span>
          </div>
          <p className="font-mono text-4xl font-bold text-white">{time}</p>
          <p className="mt-1 text-sm text-white/80">
            {getDayIdn}, {getDate} — {getYears}
          </p>
          <p className={`mt-1 rounded-full px-3 py-0.5 text-xs font-semibold text-white ${darkMode ? "bg-white/10" : "bg-white/20"}`}>
            📍 {currentRegency.lokasi}
          </p>
        </div>

        {/* ── Search Location */}
        <div className={`card-bg mb-4 p-4 ${darkMode ? "dark" : ""}`}>
          <div className="mb-2 flex items-center justify-between">
            <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Cari Kota / Kabupaten
            </label>
            <button
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                darkMode
                  ? "bg-slate-700 text-emerald-400 hover:bg-slate-600"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              }`}
            >
              <MapPin size={12} />
              {isLocating ? "Mencari..." : "Gunakan Lokasi"}
            </button>
          </div>
          <div className="relative">
            <Search size={15} className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
            <input
              ref={searchRef}
              type="search"
              value={currentRegency.lokasi}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentRegency({ ...currentRegency, lokasi: e.target.value })
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`input-bg w-full py-2.5 pl-9 pr-4 text-sm ${darkMode ? "dark" : ""}`}
              placeholder="Ketik nama kota..."
              id="search-kota"
            />
          </div>

          {/* ── Autocomplete Dropdown */}
          {(dataRegencies as TypeRegency)?.data?.length && isFocused && (
            <div
              className={`mt-2 max-h-48 overflow-y-auto rounded-xl border ${
                darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
              } shadow-lg`}
            >
              {(dataRegencies as TypeRegency)?.data?.map((r: TypeRegencyMap) => (
                <button
                  onMouseDown={() => {
                    setCurrentRegency({ id: r.id, lokasi: r.lokasi });
                    setIsFocused(false);
                  }}
                  key={r.id}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                    darkMode
                      ? "text-slate-200 hover:bg-slate-700"
                      : "text-slate-700 hover:bg-emerald-50"
                  }`}
                >
                  <span className="text-emerald-500">📍</span>
                  {r.lokasi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Prayer Table */}
        <div className={`card-bg overflow-hidden p-0 ${darkMode ? "dark" : ""}`}>
          {prayerIsLoading ? (
            <div className="flex flex-col gap-2 p-4">
              {skeletonArray(15).map((s: number) => (
                <div key={s} className="skeleton h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="prayer-table w-full text-left">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    {prayerColumns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(dataPrayer as TypePrayer)?.data?.jadwal?.map(
                    (prayer: TypePrayerMap) => {
                      const isToday =
                        new Date(prayer?.date).toLocaleDateString() ===
                        new Date().toLocaleDateString();
                      return (
                        <tr
                          key={prayer?.date}
                          className={isToday ? "today-row" : ""}
                        >
                          <td className="font-medium">
                            {isToday ? (
                              <span className="flex items-center gap-1">
                                {prayer?.date}
                                <span className="badge badge-green">Hari ini</span>
                              </span>
                            ) : (
                              prayer?.date
                            )}
                          </td>
                          <td>{prayer?.imsak}</td>
                          <td>{prayer?.subuh}</td>
                          <td>{prayer?.dhuha}</td>
                          <td>{prayer?.dzuhur}</td>
                          <td>{prayer?.ashar}</td>
                          <td>{prayer?.maghrib}</td>
                          <td>{prayer?.isya}</td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </MainLayouts>
  );
};

export default JadwalSholatPage;
