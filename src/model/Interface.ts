export interface AlQuranSurahData {
  code: number;
  status: string;
  data: [];
}
export interface IconProps {
  handler?: (event?: any) => void;
  classIcon?: string;
  fill?: string;
}

export interface Bookmark {
  juz: number;
  surah: number;
  ayat: number;
}
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
    verses: {
      number: { inQuran: number; inSurah: number };
      text: { arab: string; transliteration: { en: string } };
      translation: { id: string };
      audio: { primary: string };
    }[];
  };
}
export interface DataGetJuz {
  data: {
    juz: number;
    juzEndInfo: string;
    juzEndSurahNumber: number;
    juzStartInfo: string;
    juzStartSurahNumber: number;
    totalVerses: number;
    verses: {
      audio: {
        primary: string;
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
    }[];
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
