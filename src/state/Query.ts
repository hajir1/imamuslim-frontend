import { useQuery } from "@tanstack/react-query";
import {
  APIgetAllSurah,
  APIgetAllSurahBySurah,
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
} from "../services/api_call";
import { MetaData } from "../model/Interface";
import { useParams } from "react-router-dom";

const useGetAlQuranSurah = () => {
  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAlQuranSurah"],
    queryFn: () => APIgetAllSurah(),
  });

  return { data, isError, isLoading };
};
const useGetAlQuranSurahBySurah = () => {
  const { surah }: any = useParams();

  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAlQuranSurahBySurah"],
    queryFn: () => APIgetAllSurahBySurah(surah),
  });

  return { data, isError, isLoading };
};
const useGetJuz = () => {
  const { juz }: any = useParams();

  const { data, isError, isLoading } = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAlQuranSurahBySurah"],
    queryFn: () => APIgetJuz(juz),
  });

  return { data, isError, isLoading };
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
const useGetHadistBySlug = (slug: any, currentPage?: number) => {
  const data = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistBySlug"],
    queryFn: () => APIgetHadistBySlug(slug, currentPage),
  });

  return data;
};
export {
  useGetAlQuranSurah,
  useGetAlQuranSurahBySurah,
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
};
