import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Bookmark } from "../model/Interface";

type AudioElement = {
  audio: HTMLAudioElement | null;
  updateAudio: (audio: HTMLAudioElement | null) => void;
};

export const useAudio = create<AudioElement>((set) => ({
  audio: null,
  updateAudio: (audio) => set({ audio }),
}));

export const useBookMark = create(
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
      deleteBookMark: (ayat: number, surah: number) => {
        const oldBookmarks = get().bookMark;
        const updatedBookmarks = Array.isArray(oldBookmarks)
          ? oldBookmarks.filter(
              (item) => !(item?.ayat === ayat && item?.surah === surah)
            )
          : [];
        set({ bookMark: updatedBookmarks });
      },
    }),
    {
      name: "bookMark",
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
type pageElement = {
  page: any;
  nextPage: (page: any) => void;
  setPage: (page: any) => void;
  prevPage: (page: any) => void;
};

export const usePagination = create<pageElement>((set, get) => ({
  page: 1,
  nextPage: (totalPage: number) => {
    const page = get().page;
    if (page < totalPage) {
      set((state) => ({ page: state.page + 1 }));
    }
  },
  prevPage: () => {
    const page = get().page;
    if (page > 1) {
      set((state) => ({ page: state.page - 1 }));
    }
  },
  setPage: (page) => set({ page }),
}));
