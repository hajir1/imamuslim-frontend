import React from "react";

export interface MetaData {
  code: number;
  status: string;
  data: [];
}
export interface IconProps {
  handler?: (event?: any) => void;
  classIcon?: string;
  fill?: string;
  id?: string | undefined;
}
export type AlQuranSurahDatamap = {
  number: number;
  name: {
    translation: { id: string; en: string };
    transliteration: { id: string; en: string };
    long: string;
  };
  numberOfVerses: number;
  revelation: { id: number };
  tafsir: { id: string };
};
export interface Bookmark {
  juz: number;
  surah: number;
  ayat: number;
}
export type DataSurahByIdMap = {
  number: { inQuran: number; inSurah: number };
  text: { arab: string; transliteration: { en: string } };
  translation: { id: string };
  audio: { primary: HTMLAudioElement };
  meta: {
    juz: number;
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
};
export interface DataGetAlQuranSurahById {
  data: {
    preBismillah: {
      text: { arab: string };
      translation: { id: string };
    };
    numberOfVerses: number;
    name: {
      short: string;
      long: string;
      transliteration: { en: string; id: string };
      translation: { en: string; id: string };
    };
    tafsir: {
      id: string;
    };
    revelation: { id: string; arab: string; en: string };
    number: number;
    verses: DataSurahByIdMap[];
  };
}

export type DataGetJuzMap = {
  audio: {
    primary: HTMLAudioElement;
    secondary: [];
  };

  meta: {
    hizbQuarter: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
  };
  number: {
    inQuran: number;
    inSurah: number;
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    en: string;
    id: string;
  };
};
export interface DataGetJuz {
  data: {
    juz: number;
    juzEndInfo: string;
    juzEndSurahNumber: number;
    juzStartInfo: string;
    juzStartSurahNumber: number;
    totalVerses: number;
    verses: DataGetJuzMap[];
  };
}
export interface DataGetAlQuranSurahByAyat {
  data: {
    preBismillah: {
      text: { arab: string };
      translation: { id: string };
    };
    numberOfVerses: number;
    name: {
      short: string;
      long: string;
      transliteration: { en: string; id: string };
      translation: { en: string; id: string };
    };
    tafsir: {
      id: string;
    };
    revelation: { id: string; arab: string; en: string };
    number: number;
    verses: {
      number: { inQuran: number; inSurah: number };
      text: { arab: string; transliteration: { en: string } };
      translation: { id: string };
      audio: { primary: string };
    };
  };
}
export interface DataAsmaulHusna {
  arab: string;
  arti: string;
  latin: string;
  meaning: string;
  urutan: string;
}
[];
export interface DataDoa {
  arabic: string;
  fawaid: string;
  id: string;
  latin: string;
  notes: string;
  title: string;
  translation: string;
  source: string;
}

export interface DataDzikir {
  arabic: string;
  fawaid: string;
  latin: string;
  notes: string;
  source: string;
  title: string;
  translation: string;
}
export interface DataProvinceMapType {
  coordinate: { latitude: number; longitude: number };
  id: string;
  name: string;
  slug: string;
  provinceId: string;
}
export interface DataProvinceKabMapType {
  id: string;
  name: string;
  slug: string;
  cities: DataProvinceMapType[];
}

export interface DataPrayer extends DataProvinceKabMapType {
  province: {
    id: string;
    name: string;
    slug: string;
  };
  prayers: [
    {
      time: {
        imsak: string;
        subuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashar: string;
        maghrib: string;
        isya: string;
      };
      id: string;
      date: any;
      cityId: string;
    }[]
  ];
}

export interface DataNews {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  publisher: {
    name: string;
    image: any;
  };
}
export interface HadistType {
  name: string;
  slug: string;
  total: string;
}
export interface OptionProps {
  item: any;
  audio: any;
  setAudio: React.Dispatch<React.SetStateAction<any>>;
  handleAudio: (a: any, b: any) => void;
  handleTerjemah: (a: number) => void;
  handleBookMark: (a: number, b: number, c: number) => void;
  data: any;
  handleCopy: (e: any, a: string, b: string, c: string) => void;
  type: string;
}
export interface hadistSlug {
  number: number;
  arab: string;
  id: string;
}
export interface HadistSlugType {
  name: string;
  slug: string;
  total: number;
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: [];
  };
  items: hadistSlug[];
}
