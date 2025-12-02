import { useQuery } from "@tanstack/react-query";
const API_QURAN = "https://qurankuv2.vercel.app";
const API_QURAN_2 = "https://quranku-alpha.vercel.app";
const API_J_SHOLAT = "https://api.myquran.com/v2/sholat";
const API_HADIST = "https://api.myquran.com/v2/hadits"
const API_QURAN_HADIST = "https://hadis-api-id.vercel.app";
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
      const response = await fetch(`${API_QURAN_2}/dzikir/asmaulHusna`);
      return response.json();
    },
  });

  return response;
};
const useGetDoa = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getDoa"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN_2}/doa`);
      return response.json();
    },
  });

  return response;
};
const useGetDoaById = (id: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getDoaById"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN_2}/doa/${id}`);
      return response.json();
    },
  });

  return response;
};
const useGetDzikir = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getDzikir"],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN_2}/dzikir`);
      return response.json();
    },
  });

  return response;
};

/** fetch api for get regency (jadwal sholat) */
const useRegency = (kota: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getRegency", kota],
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

// interface Publisher {
//   [key: string]: any;
// }

// interface Post {
//   [key: string]: any;
// }

// interface NewsItem {
//   publisher: Publisher;
//   [key: string]: any;
// }

/* api undefined */
// const useGetNews = () => {
//   return useQuery<NewsItem[], Error>({
//     queryKey: ["news"],
//     queryFn: async () => {
//       const publishersPromises: Promise<Publisher>[] = rssPaths.map((rssPath) =>
//         fetch(rssPath)
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error(`Failed to fetch: ${res.statusText}`);
//             }
//             return res.json();
//           })
//           .then((res) => res.data)
//       );

//       const publishers: Publisher[] = await Promise.all(publishersPromises);

//       const refactoredStructure: NewsItem[] = publishers
//         .flatMap(({ posts, ...publisher }) => {
//           return posts.map((post: Post) => {
//             return {
//               ...post,
//               publisher: publisher,
//             };
//           });
//         })
//         .sort(
//           (a: any, b: any) =>
//             new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
//         );

//       return refactoredStructure;
//     },
//   });
// };

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
const useGetHadistByMufassir = (slug: any, currentPage?: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistBySlug", slug, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${API_QURAN_HADIST}/hadith/${slug}?page=${currentPage}`
      );
      return response.json();
    },
  });

  return response;
};
const useGetHadistByNumber = (slug: any, id: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistById", slug, id],
    queryFn: async () => {
      const response = await fetch(`${API_QURAN_HADIST}/hadith/${slug}/${id}`);
      return response.json();
    },
  });

  return response;
};
export {
  useAllSurah,
  useSurahById,
  useJuzById,
  useGetBookmarkAlquran,
  useAsmaulHusna,
  useGetDoa,
  useGetDoaById,
  useGetDzikir,
  useRegency,
  usePrayer,
  useParawi,
  useGetHadistByMufassir,
  useGetHadistByNumber,
};
