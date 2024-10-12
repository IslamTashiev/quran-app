export interface ISurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

export interface IVerse {
  chapter: number;
  verse: number;
  text: string;
  arabic_text: string;
  path: string;
}

export interface IAudioSrc {
  audioSrc: string;
  path: string;
  url: string;
}

export interface IHistory extends ISurah {
  last_verse: number;
}
