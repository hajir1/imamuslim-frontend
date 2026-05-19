import { useQuery } from "@tanstack/react-query";
const API_QURAN = "https://qurankuv2.vercel.app";

/** url doa */
const API_DOA = "https://api.myquran.com/v2/doa";

/** url jadwal sholat */
const API_J_SHOLAT = "https://api.myquran.com/v2/sholat";

/** url hadist */
const API_HADIST = "https://api.myquran.com/v2/hadits";

/** url asmaul husna */
const API_ASMAUL_HUSNA = "https://api.myquran.com/v2/husna";

import { MetaData } from "../model/_Type";
import { useParams } from "react-router-dom";

/** fetch for get all surah al-quran */
const useAllSurah = () => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["allSurah"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/surah`);
      return response.json();
    },
  });

  return responses;
};

/** fetch for get spesific surah al-quran (al baqarah, al kahfi dll) */
const useSurahById = (surah: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["surahById", surah],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/surah/${surah}`);
      return response.json();
    },
    /** enabling fetch api where conditions are met */
    enabled:
      surah !== null && surah !== undefined && surah >= 1 && surah <= 114,
  });

  return responses;
};

/** fetch for get spesific juz al-quran (al baqarah, al kahfi dll) */
const useJuzById = (juz: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["juzById", juz],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/juz/${juz}`);
      return response.json();
    },
    enabled: juz !== null && juz !== undefined && juz >= 1 && juz <= 114,
  });

  return responses;
};
const useGetBookmarkAlquran = () => {
  const { surah, ayat }: any = useParams();

  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["useGetBookmarkAlquran"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/surah/${surah}/${ayat}`);
      return response.json();
    },
  });

  return response;
};
/** fetch for get all asmaul husna */
const useAsmaulHusna = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["asmaulHusna"],
    queryFn: async () => {
      const response = await fetch(`${API_ASMAUL_HUSNA}/semua`);
      return response.json();
    },
  });

  return response;
};

/** fetch api to get  */
const useScDoa = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["scDoa"],
    queryFn: async () => {
      const response = await fetch(`${API_DOA}/sumber`);
      return response.json();
    },
  });

  return response;
};
const useDoaBySc = (sc: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["doaBySC", sc],
    queryFn: async () => {
      const response = await fetch(`${API_DOA}/sumber/${sc}`);
      return response.json();
    },
    enabled: sc !== "" || sc !== undefined || sc !== null,
  });

  return response;
};

/** fetch api for get regency (jadwal sholat) */
const useRegency = (kota: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["regency", kota],
    queryFn: async () => {
      const response = await fetch(`${API_J_SHOLAT}/kota/cari/${kota}`);
      return response.json();
    },
    enabled: kota !== null && kota !== undefined,
  });

  return response;
};

/** fetch api for get prayer (jadwal sholat) */
const usePrayer = (idKota: number, years: number, month: number) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["prayer", idKota.toString(), years.toString(), month.toString()],
    queryFn: async () => {
      const response = await fetch(
        `${API_J_SHOLAT}/jadwal/${idKota}/${years}/${month + 1}`
      );
      return response.json();
    },
  });

  return response;
};

/** fetch parawi (hadist) */
const useParawi = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["parawi"],
    queryFn: async () => {
      const response = await fetch(`${API_HADIST}/perawi`);
      return response.json();
    },
  });

  return response;
};
const useHadistById = (slug: string, id: number) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["hadistById", slug, id.toString()],
    queryFn: async () => {
      const response = await fetch(`${API_HADIST}/${slug}/${id}`);
      return response.json();
    },
    enabled: false,
  });

  return response;
};
// const useGetHadistByNumber = (slug: any, id: any) => {
//   const response = useQuery<MetaData, Error, unknown, string[]>({
//     queryKey: ["getHadistById", slug, id],
//     queryFn: async () => {
//       const response = await fetch(`${API_QURAN_HADIST}/hadith/${slug}/${id}`);
//       return response.json();
//     },
//     enabled: id !== null && id !== undefined && id !== false && id !== 0,
//   });

//   return response;
// };
export {
  useAllSurah,
  useSurahById,
  useJuzById,
  useGetBookmarkAlquran,
  useAsmaulHusna,
  useScDoa,
  useDoaBySc,
  useRegency,
  usePrayer,
  useParawi,
  useHadistById,
};
