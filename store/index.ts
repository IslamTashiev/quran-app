// lib/store.ts
import { IAudioSrc, IHistory, ISurah, IVerse } from "@/types";
import { create } from "zustand";

const url = "https://be77-5-59-231-7.ngrok-free.app";

interface AppState {
  editions: ISurah[];
  surah: { metadata: ISurah; ayahs: IVerse[] } | null;
  mainSurah: ISurah | null;
  history: IHistory | null;
  audioSrc: IAudioSrc | null;
  setAudioSrc: (audioSrc: string | null) => void;
  getEditions: () => void;
  setMainSurah: (surah: ISurah | null) => void;
  setHistory: () => void;
  saveHistory: (surah: IHistory) => void;
  getSurah: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  editions: [],
  mainSurah: null,
  history: null,
  surah: null,
  audioSrc: null,
  getEditions: async () => {
    const response = await fetch(url + "/chapters" + "?ngrok-skip-browser-warning=true");
    const data = await response.json();
    set({ editions: data });
  },
  setMainSurah: (surah: ISurah | null) => set({ mainSurah: surah }),
  setHistory: () => {
    const history = localStorage.getItem("history");
    if (history) {
      set({ history: JSON.parse(history) });
    }
  },
  saveHistory: (history: IHistory) => {
    localStorage.setItem("history", JSON.stringify(history));
    set({ history });
  },
  getSurah: async (id: string) => {
    const response = await fetch(url + "/surah/" + id);
    const data = await response.json();
    set({ surah: data });
  },
  setAudioSrc: (path: string | null) =>
    set({ audioSrc: path ? { audioSrc: `${url}/catalog?path=${path}`, url, path: path } : null }),
}));
