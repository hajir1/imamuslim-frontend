import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = "https://qurankuv2.vercel.app";
import {
  APIgetAllSurahByAyat,
  APIgetAllAsmaulHusna,
  APIgetAllDoaDoa,
  APIgetAllDzikir,
  APIgetAllDzikirPagi,
  APIgetJuz,
  APIgetJadwalSholat,
  APIgetProvince,
  APIgetPrayer,
  APIgetHadist,
  APIgetHadistBySlug,
  APIgetHadistById,
} from "../services/api_call";
import { MetaData } from "../model/Interface";
import { useParams } from "react-router-dom";

const useGetSurah = () => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getAlQuranSurah"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/surah`);
      return response.json();
    },
  });

  return responses;
};
const useGetSurahById = (surah: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["useGetSurahById", surah],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/surah/${surah}`);
      return response.json();
    },
    enabled: surah !== null && surah !== undefined,
  });

  return responses;
};
const useGetJuz = (juz: any) => {
  const responses = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getAlQuranSurahBySurah", juz],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/juz/${juz}`);
      return response.json();
    },
  });

  return responses;
};
const useGetAlQuranSurahByAyat = () => {
  const { surah, ayat }: any = useParams();

  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAlQuranSurahByAyat"],
    queryFn: () => APIgetAllSurahByAyat(surah, ayat),
  });

  return { data, isError, isLoading };
};
const useGetAsmaulHusna = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAsmaulHusna"],
    queryFn: APIgetAllAsmaulHusna,
  });

  return { data, isError, isLoading };
};
const useGetDoa = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getDoa"],
    queryFn: APIgetAllDoaDoa,
  });

  return { data, isError, isLoading };
};
const useGetDzikir = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getDzikir"],
    queryFn: APIgetAllDzikir,
  });

  return { data, isError, isLoading };
};
const useGetDzikirPagi = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getDzikirPagi"],
    queryFn: APIgetAllDzikirPagi,
  });

  return { data, isError, isLoading };
};
const useGetDzikirSore = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getDzikirSore"],
    queryFn: APIgetAllDzikirPagi,
  });

  return { data, isError, isLoading };
};
const useGetJadwalSholat = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["jadwalSholat"],
    queryFn: APIgetJadwalSholat,
  });

  return { data, isError, isLoading };
};

const useGetProvince = (provinceId: any) => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getProvince", provinceId],
    queryFn: () => APIgetProvince(provinceId),
  });

  return { data, isError, isLoading };
};
const useGetPrayer = (latitude: any, longitude: any) => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["prayer", latitude, longitude],
    queryFn: () => APIgetPrayer(latitude, longitude),
  });

  return { data, isError, isLoading };
};

const rssPaths: string[] = [
  "https://api-berita-indonesia.vercel.app/republika/khazanah/",
  "https://api-berita-indonesia.vercel.app/republika/islam/",
  "https://api-berita-indonesia.vercel.app/sindonews/kalam/",
];
interface Publisher {
  [key: string]: any;
}

interface Post {
  [key: string]: any;
}

interface NewsItem {
  publisher: Publisher;
  [key: string]: any;
}

const useGetNews = () => {
  return useQuery<NewsItem[], Error>({
    queryKey: ["news"],
    queryFn: async () => {
      const publishersPromises: Promise<Publisher>[] = rssPaths.map((rssPath) =>
        fetch(rssPath)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch: ${res.statusText}`);
            }
            return res.json();
          })
          .then((res) => res.data)
      );

      const publishers: Publisher[] = await Promise.all(publishersPromises);

      const refactoredStructure: NewsItem[] = publishers
        .flatMap(({ posts, ...publisher }) => {
          return posts.map((post: Post) => {
            return {
              ...post,
              publisher: publisher,
            };
          });
        })
        .sort(
          (a: any, b: any) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

      return refactoredStructure;
    },
  });
};
const useGetHadist = () => {
  const data = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadist"],
    queryFn: APIgetHadist,
  });

  return data;
};
const useGetHadistBySlug = (slug: any, currentPage?: any) => {
  const data = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistBySlug", slug, currentPage],
    queryFn: () => APIgetHadistBySlug(slug, currentPage),
  });

  return data;
};
const useGetHadistById = (slug: any, id: any) => {
  const data = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistById", slug, id],
    queryFn: () => APIgetHadistById(slug, id),
  });

  return data;
};
export {
  useGetSurah,
  useGetSurahById,
  useGetAlQuranSurahByAyat,
  useGetAsmaulHusna,
  useGetDoa,
  useGetDzikir,
  useGetDzikirPagi,
  useGetDzikirSore,
  useGetJuz,
  useGetJadwalSholat,
  useGetProvince,
  useGetPrayer,
  useGetNews,
  useGetHadist,
  useGetHadistBySlug,
  useGetHadistById,
};
