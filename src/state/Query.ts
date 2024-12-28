import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = "https://qurankuv2.vercel.app";
const API_BASE_URL_2 = "https://quranku-alpha.vercel.app";
const API_BASE_URL_PRAYER = "https://waktu-sholat.vercel.app";
const API_BASE_URL_HADIST = "https://hadis-api-id.vercel.app";
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
const useGetBookmarkAlquran = () => {
  const { surah, ayat }: any = useParams();

  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["useGetBookmarkAlquran"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/surah/${surah}/${ayat}`);
      return response.json();
    },
  });

  return response;
};
const useGetAsmaulHusna = () => {
  const response = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getAsmaulHusna"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_2}/dzikir/asmaulHusna`);
      return response.json();
    },
  });

  return response;
};
const useGetDoa = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getDoa"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_2}/doa`);
      return response.json();
    },
  });

  return response;
};
const useGetDoaById = (id: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getDoaById"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_2}/doa/${id}`);
      return response.json();
    },
  });

  return response;
};
const useGetDzikir = () => {
  const response = useQuery<
    MetaData,
    Error,
    unknown,
    string[]
  >({
    queryKey: ["getDzikir"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_2}/dzikir`);
      return response.json();
    },
  });

  return response;
};

const useGetProvince = () => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["province"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_PRAYER}/province`);
      return response.json();
    },
  });

  return response;
};

const useGetRegency = (provinceId: string) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["regency", provinceId],
    enabled: provinceId !== null || undefined,
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL_PRAYER}/province/${provinceId}`
      );
      return response.json();
    },
  });

  return response;
};
const useGetPrayer = (latitude: any, longitude: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["prayer", latitude, longitude],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL_PRAYER}/prayer?latitude=${latitude}&longitude=${longitude}`
      );
      return response.json();
    },
  });

  return response;
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
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadist"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL_HADIST}/hadith`);
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
        `${API_BASE_URL_HADIST}/hadith/${slug}?page=${currentPage}`
      );
      return response.json();
    },
  });

  return response
};
const useGetHadistByNumber = (slug: any, id: any) => {
  const response = useQuery<MetaData, Error, unknown, string[]>({
    queryKey: ["getHadistById", slug, id],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL_HADIST}/hadith/${slug}/${id}`
      );
      return response.json();
    },
  });

  return response;
};
export {
  useGetSurah,
  useGetSurahById,
  useGetBookmarkAlquran,
  useGetAsmaulHusna,
  useGetDoa,
  useGetDoaById,
  useGetDzikir,
  useGetJuz,
  useGetProvince,
  useGetRegency,
  useGetPrayer,
  useGetNews,
  useGetHadist,
  useGetHadistByMufassir,
  useGetHadistByNumber,
};
