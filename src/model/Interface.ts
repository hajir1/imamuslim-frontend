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


export type TypeDataSurahByIdMap = {
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
export interface TypeDataSurahById {
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
    verses: TypeDataSurahByIdMap[];
  };
}

export type TypeDataJuzMap = {
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
export interface TypeDataJuz {
  data: {
    juz: number;
    juzEndInfo: string;
    juzEndSurahNumber: number;
    juzStartInfo: string;
    juzStartSurahNumber: number;
    totalVerses: number;
    verses: TypeDataJuzMap[];
  };
}
export interface TypeBookmarkQuran {
  data: {
    number: { inQuran: number; inSurah: number };
    text: { arab: string; transliteration: { en: string } };
    translation: { en: string; id: string };
    audio: { primary: any };
    tafsir: {
      id: {
        short: string;
        long: string;
      };
    };
    surah: {
      preBismillah: any;
      number: number;
      numberOfVerses: number;
      name: {
        short: string;
        long: string;
        transliteration: { en: string; id: string };
        translation: { en: string; id: string };
      };
      revelation: { id: string; arab: string; en: string };
      tafsir: {
        id: string;
      };
    };
  };
}
export interface TypeAsmaulHusna {
  arab: string;
  arti: string;
  latin: string;
  meaning: string;
  urutan: string;
}
[];
export interface TypeDataDoa {
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

export interface Cities {
  coordinate: { latitude: number; longitude: number };
  id: string;
  name: string;
  slug: string;
  provinceId: string;
}

export interface TypeLocation {
  id: string;
  name: string;
  slug: string;
  cities: Cities[];
}

export interface TypePrayer {
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
  currentData: any;
  audio: any;
  setAudio: React.Dispatch<React.SetStateAction<any>>;
  handleAudio: (a: any, b: any) => void;
  handleTerjemah: (a: number) => void;
  handleBookMark: (
    id: number,
    surah: string,
    idSurah: number,
    ayat: number,
    bookMark: boolean
  ) => void;
  data: any;
  handleCopy: (e: any, a: string, b: string, c: string) => void;
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
  items: [
    hadistSlug
  ];
}
interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface HadithPage {
  pagination: Pagination;
  data: any;
}
