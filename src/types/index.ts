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

export type TypeSurahMap = {
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
  surah?: number;
};
export interface TypeSurah {
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
    verses: TypeSurahMap[];
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
export interface TypeAsmaulHusnaMap {
  id: number;
  arab: string;
  indo: string;
  latin: string;
}
export interface TypeAsmaulHusna {
  status: boolean;
  request: {
    path: string;
  };
  info: {
    min: number;
    max: number;
  };
  data: TypeAsmaulHusnaMap[];
}


/** type for sc(sumber) doa */
export interface TypeSc {
  status: boolean;
  request: {
    path: string;
  };
  data: string[];
}

/** type for doa map*/
export interface TypeDoaMap {
  arab: string;
  artinya: string;
  judul: string;
  sumber: string;
}

/** type for doa*/
export interface TypeDoa {
  status: boolean;
  request: {
    path: string;
  };
  data: TypeDoaMap[];
}
export interface TypeRegencyMap {
  id: number;
  lokasi: string;
}
export interface TypeRegency {
  data: TypeRegencyMap[];
}

export interface TypePrayerMap {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
}

export interface TypePrayer {
  status: boolean;
  request: { path: string };
  data: {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: TypePrayerMap[];
  };
}

/**
 * Type for a single perawi (narrator) entry.
 * API: GET /hadith → returns flat array [{name, slug, total}]
 */
export interface TypeParawisMap {
  name: string;
  slug: string;
  total: number;
}

/**
 * Type for the perawi list (new API returns a plain array, not a wrapped object).
 * Stored as TypeParawisMap[] directly.
 */
export type TypeParawis = TypeParawisMap[];

/**
 * A single hadist item as stored in bookmarks.
 * Extends the API response with an optional `slug` for bookmark navigation.
 */
export interface TypeHadistMap {
  /** Hadist number within the perawi's collection */
  number: number;
  /** Arabic text of the hadist */
  arab: string;
  /** Indonesian translation */
  id: string;
  /** Perawi slug (e.g. "bukhari"), added locally for bookmark navigation */
  slug?: string;
  /** Perawi name (e.g. "Bukhari") */
  name?: string;
}

/**
 * Full API response for GET /hadith/{slug}/{number}.
 * Note: new API returns a flat object, NOT a { data: ... } wrapper.
 */
export interface TypeHadist {
  name: string;
  slug: string;
  number: number;
  arab: string;
  id: string;
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
    bookMark: boolean,
  ) => void;
  data: any;
  handleCopy: (e: any, a: string, b: string, c: string) => void;
}
