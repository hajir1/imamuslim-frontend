import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  TypeAsmaulHusnaMap,
  TypeDoaMap,
  TypeHadistMap,
  TypeParawisMap,
  TypeRegencyMap,
  TypeSurahMap,
} from "../model/_Type";

type TypeAudio = {
  audio: HTMLAudioElement | null;
  updateAudio: (audio: HTMLAudioElement | null) => void;
};
export const useAudio = create<TypeAudio>((set) => ({
  audio: null,
  updateAudio: (audio) => set({ audio }),
}));

type TypeAudioActive = {
  audioActive: null | TypeSurahMap;
  setAudioActive: (data: TypeSurahMap | null) => void;
};
export const useAudioActive = create<TypeAudioActive>((set) => ({
  audioActive: null,
  setAudioActive: (data: TypeSurahMap | null) => set({ audioActive: data }),
}));

/** handle bookmark al-quran */
export const useBookMarkAlQuran = create(
  persist(
    (set, get: any) => ({
      bookMark: [],
      /** add bookmark  */
      /** If the data already exists, add it, and if not, create a new array. */
      addBookMark: (newBookmark: TypeSurahMap) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];
        set({ bookMark: updatedBookmarks });
      },
      /** delete bookmark  by index (id)*/
      deleteBookMark: (id: number) => {
        set((state: any) => ({
          bookMark: state.bookMark.filter(
            (item: TypeSurahMap) => item.number.inQuran !== id
          ),
        }));
      },
    }),
    {
      name: "alquran",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** handle bookmark asmaul husna */
export const useBookMarkAsmaulHusna = create(
  persist(
    (set, get: any) => ({
      bookMark: [],
      /** add bookmark  */
      /** If the data already exists, add it, and if not, create a new array. */
      addBookMark: (newBookmark: TypeAsmaulHusnaMap) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmark = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];

        set({ bookMark: updatedBookmark });
      },
      /** delete bookmark  by index (id)*/
      deleteBookMark: (id: number) => {
        set((state: any) => ({
          bookMark: state.bookMark.filter(
            (item: TypeAsmaulHusnaMap) => item.id !== id
          ),
        }));
      },
    }),
    {
      name: "asmaulhusna",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** handle bookmark asmaul husna */
export const useBookMarkDoa = create(
  persist(
    (set, get: any) => ({
      bookMark: [],
      /** add bookmark  */
      /** If the data already exists, add it, and if not, create a new array. */
      addBookMark: (newBookmark: TypeDoaMap) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];

        set({ bookMark: updatedBookmarks });
      },
      /** delete bookmark by title */
      deleteBookMark: (judul: string) => {
        set((state: any) => ({
          bookMark: state.bookMark.filter((item: TypeDoaMap) => {
            item.judul !== judul;
          }),
        }));
      },
    }),
    {
      name: "doa",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** handle bookmark hadist */
export const useBookMarkHadist = create(
  persist(
    (set, get: any) => ({
      bookMark: [],
      /** add bookmark  */
      /** If the data already exists, add it, and if not, create a new array. */
      addBookMark: (newBookmark: TypeHadistMap) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];

        set({ bookMark: updatedBookmarks });
      },
      /**delete bookmark by id (translate)*/
      deleteBookMark: (id: string) => {
        set((state: any) => ({
          bookMark: state.bookMark.filter((item: TypeHadistMap) => {
            item.id !== id;
          }),
        }));
      },
    }),
    {
      name: "hadist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** caching current theme */
type darkModeElement = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const useDarkmode = create<darkModeElement>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));

/** Surah or Juz */
export const useCurrentQuran = create(
  persist(
    (set) => ({
      currentQuran: "Surah",
      setCurrentQuran: (data: any) => {
        set({ currentQuran: data });
      },
    }),
    { name: "_CurrentQuran" }
  )
);
/** Terjemah or Read */
export const useCurrentSurah = create(
  persist(
    (set) => ({
      currentSurah: "Terjemah",
      setCurrentSurah: (data: any) => {
        set({ currentSurah: data });
      },
    }),
    { name: "_CurrentSurah" }
  )
);
/** Source of Doa */
export const useCurrentSc = create(
  persist(
    (set) => ({
      currentSc: "harian",
      setCurrentSc: (data: any) => {
        set({ currentSc: data });
      },
    }),
    { name: "_CurrentSc" }
  )
);
/** Regencies of J Sholat */
export const useCurrentRegency = create(
  persist(
    (set) => ({
      currentRegency: { id: 1614, lokasi: "KAB. MALANG" },
      setCurrentRegency: (data: TypeRegencyMap) => {
        set({ currentRegency: data });
      },
    }),
    { name: "_CurrentRegency" }
  )
);

/** Get a current parawi (hadist) */
export const useCurrentParawi = create(
  persist(
    (set) => ({
      currentParawi: "",
      setCurrentParawi: (data: TypeParawisMap) => {
        set({ currentParawi: data });
      },
    }),
    { name: "_CurrentParawi" }
  )
);

/** Get a current number of hadist (hadist) */
/** handle search hadist by id */
export const useCurrentNumberHadist = create(
  persist(
    (set) => ({
      currentNumber: 1,
      setCurrentNumber: (data: number) => {
        set({ currentNumber: data });
      },
    }),
    { name: "_CurrentNumberOfHadist" }
  )
);
