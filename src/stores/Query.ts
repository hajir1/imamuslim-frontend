import { useQuery } from "@tanstack/react-query";
const API_QURAN = "https://qurankuv2.vercel.app";

/** url doa */
const API_DOA = "https://api.myquran.com/v2/doa";

/** url jadwal sholat */
const API_J_SHOLAT = "https://api.myquran.com/v2/sholat";

/** url hadist — new API: hadis-api-id.vercel.app */
const API_HADIST = "https://hadis-api-id.vercel.app";

/** url asmaul husna */
const API_ASMAUL_HUSNA = "https://api.myquran.com/v2/husna";

import { MetaData, TypeParawisMap, TypeHadist } from "../types/index";

/** fetch for get all surah al-quran */
const useAllSurah = () => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["allSurah"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/surah`);
      if (!response.ok) throw new Error("Gagal memuat daftar surah");
      return response.json();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return responses;
};

/** fetch for get spesific surah al-quran (al baqarah, al kahfi dll) */
const useSurahById = (surah: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["surahById", surah],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/surah/${surah}`);
      if (!response.ok) throw new Error(`Gagal memuat surah ${surah}`);
      return response.json();
    },
    enabled:
      surah !== null && surah !== undefined && surah >= 1 && surah <= 114,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return responses;
};

/** fetch for get spesific juz al-quran (al baqarah, al kahfi dll) */
const useJuzById = (juz: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["juzById", juz],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN}/juz/${juz}`);
      if (!response.ok) throw new Error(`Gagal memuat juz ${juz}`);
      return response.json();
    },
    enabled: juz !== null && juz !== undefined && Number(juz) >= 1 && Number(juz) <= 30,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return responses;
};
/** fetch for get all asmaul husna */
const useAsmaulHusna = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["asmaulHusna"],
    queryFn: async () => {
      const response = await fetch(`${API_ASMAUL_HUSNA}/semua`);
      if (!response.ok) throw new Error("Gagal memuat Asmaul Husna");
      return response.json();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return response;
};

/** fetch api to get  */
const useScDoa = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["scDoa"],
    queryFn: async () => {
      const response = await fetch(`${API_DOA}/sumber`);
      if (!response.ok) throw new Error("Gagal memuat sumber doa");
      return response.json();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return response;
};
const useDoaBySc = (sc: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["doaBySC", sc],
    queryFn: async () => {
      const response = await fetch(`${API_DOA}/sumber/${sc}`);
      if (!response.ok) throw new Error(`Gagal memuat doa sumber ${sc}`);
      return response.json();
    },
    enabled: sc !== "" && sc !== undefined && sc !== null,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return response;
};

/** fetch api for get regency (jadwal sholat) */
const useRegency = (kota: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["regency", kota],
    queryFn: async () => {
      const response = await fetch(`${API_J_SHOLAT}/kota/cari/${kota}`);
      if (!response.ok) throw new Error(`Gagal mencari kota ${kota}`);
      return response.json();
    },
    enabled: kota !== null && kota !== undefined && kota !== "",
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return response;
};

/** fetch api for get prayer (jadwal sholat) */
const usePrayer = (idKota: number, years: number, month: number) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["prayer", idKota.toString(), years.toString(), month.toString()],
    queryFn: async () => {
      const response = await fetch(
        `${API_J_SHOLAT}/jadwal/${idKota}/${years}/${month + 1}`,
      );
      if (!response.ok) throw new Error("Gagal memuat jadwal sholat");
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return response;
};

/**
 * Fetch list of all perawi (narrators).
 * New API: GET /hadith returns a flat array [{name, slug, total}] — no wrapper.
 */
const useParawi = () => {
  const response = useQuery<TypeParawisMap[], Error, TypeParawisMap[], string[]>({
    queryKey: ["parawi"],
    queryFn: async () => {
      const res = await fetch(`${API_HADIST}/hadith`);
      if (!res.ok) throw new Error(`Gagal memuat daftar perawi: ${res.status}`);
      return res.json();
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return response;
};

/**
 * Fetch a specific hadist by perawi slug and number.
 * New API: GET /hadith/{slug}/{number} returns flat object {name, slug, number, arab, id}.
 */
const useHadistById = (slug: string, id: number) => {
  const response = useQuery<TypeHadist, Error, TypeHadist, string[]>({
    queryKey: ["hadistById", slug, String(id)],
    queryFn: async () => {
      const res = await fetch(`${API_HADIST}/hadith/${slug}/${id}`);
      if (!res.ok) throw new Error(`Hadist tidak ditemukan (${res.status})`);
      return res.json();
    },
    enabled: slug !== "" && id >= 1,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return response;
};
export {
  useAllSurah,
  useSurahById,
  useJuzById,
  useAsmaulHusna,
  useScDoa,
  useDoaBySc,
  useRegency,
  usePrayer,
  useParawi,
  useHadistById,
};
