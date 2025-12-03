import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Bookmark,
  TypeAsmaulHusnaMap,
  TypeDataSurahByIdMap,
  TypeParawisMap,
  TypeRegencyMap,
} from "../model/_Type";

type TypeAudio = {
  audio: HTMLAudioElement | null;
  updateAudio: (audio: HTMLAudioElement | null) => void;
};
export const useAudio = create<TypeAudio>((set) => ({
  audio: null,
  updateAudio: (audio) => set({ audio }),
}));

type TypeBottomNavigation = {
  bottomNavigation: null | number;
  setBottomNavigation: (bottomNavigation: number | null) => void;
};
export const useBottomNavigation = create<TypeBottomNavigation>((set) => ({
  bottomNavigation: null,
  setBottomNavigation: (bottomNavigation: null | number) =>
    set({ bottomNavigation }),
}));
type TypeAudioActive = {
  audioActive: null | TypeDataSurahByIdMap;
  setAudioActive: (data: TypeDataSurahByIdMap | null) => void;
};
export const useAudioActive = create<TypeAudioActive>((set) => ({
  audioActive: null,
  setAudioActive: (data: TypeDataSurahByIdMap | null) =>
    set({ audioActive: data }),
}));
type TypeTerjemahkOption = {
  terjemahOption: null | number;
  setTerjemahOption: (data: number | null) => void;
};
export const useTerjemahOption = create<TypeTerjemahkOption>((set) => ({
  terjemahOption: null,
  setTerjemahOption: (data: number | null) => set({ terjemahOption: data }),
}));

export const useBookMarkAlQuran = create(
  persist(
    (set, get) => ({
      bookMark: [],
      addBookMark: (newBookmark: Bookmark) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];
        set({ bookMark: updatedBookmarks });
      },
      deleteBookMark: (id: number) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? oldBookmarks.filter((item) => !(item?.id === id))
          : [];
        set({ bookMark: updatedBookmarks });
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
      /** delete bookmark  */
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
export const useBookMarkDoa = create(
  persist(
    (set, get) => ({
      bookMark: [],
      addBookMark: (newBookmark: Bookmark) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];

        set({ bookMark: updatedBookmarks });
      },
      deleteBookMark: (id: string) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? oldBookmarks.filter((item) => !(item?.id === id))
          : [];
        set({ bookMark: updatedBookmarks });
      },
    }),
    {
      name: "doa",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useBookMarkHadist = create(
  persist(
    (set, get) => ({
      bookMark: [],
      addBookMark: (newBookmark: Bookmark) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? [...oldBookmarks, newBookmark]
          : [newBookmark];

        set({ bookMark: updatedBookmarks });
      },
      deleteBookMark: (id: any) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? oldBookmarks.filter((item) => !(item?.id === id))
          : [];
        set({ bookMark: updatedBookmarks });
      },
    }),
    {
      name: "hadist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type darkModeElement = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const useDarkmode = create<darkModeElement>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));

export const usePagination = create(
  persist(
    (set, get) => ({
      page: 1,
      nextPage: (totalPage: number) => {
        const page = get().page;
        if (page < totalPage) {
          set((state: any) => ({ page: state.page + 1 }));
        }
      },
      prevPage: () => {
        const page = get().page;
        if (page > 1) {
          set((state: any) => ({ page: state.page - 1 }));
        }
      },
      setPage: (page: number) => set({ page }),
    }),
    { name: "page" }
  )
);

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

// export const useDoDzOption = create(
//   persist(
//     (set) => ({
//       doDzOption: "Doa",
//       setDoDzOption: (data: any) => {
//         set({ doDzOption: data });
//       },
//     }),
//     { name: "doDzOption" }
//   )
// );
