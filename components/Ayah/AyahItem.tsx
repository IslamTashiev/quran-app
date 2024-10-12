import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import SaveIcon from "@/assets/icons/save.svg";
import { IHistory, IVerse } from "@/types";
import { useAppStore } from "@/store";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

const AyahItem = ({ ayah }: { ayah: IVerse }) => {
  const { setAudioSrc, audioSrc, saveHistory, surah } = useAppStore();
  const [elemntIsVisible, setElementIsVisible] = useState(false);
  const element = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const verse = searchParams.get("verse");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setElementIsVisible(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, []);
  useEffect(() => {
    if (elemntIsVisible && surah) {
      const history: IHistory = {
        ...surah.metadata,
        last_verse: ayah.verse,
      };
      saveHistory(history);
    }
  }, [elemntIsVisible]);
  useEffect(() => {
    if (verse) {
      const element = document.getElementById(`ayah-${verse}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [verse]);

  return (
    <div
      id={`ayah-${ayah.verse}`}
      ref={element}
      className={classNames("py-4 border-b border-slate-200", {
        "bg-slate-300/50 mx-[-24px] px-[24px]": audioSrc?.path === ayah.path || (verse && +verse === ayah.verse),
      })}
    >
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl">
        <span className="px-2 h-6 rounded-full bg-[--foreground] text-white">{ayah.verse}</span>
        <div className="flex items-center gap-4">
          <span onClick={() => setAudioSrc(ayah.path)}>
            {audioSrc?.path === ayah.path ? <PauseIcon /> : <PlayIcon />}
          </span>
          <span>
            <SaveIcon />
          </span>
        </div>
      </div>
      <div className="p-1">
        <p className="font-bold text-xl text-end my-4">َ{ayah.arabic_text}</p>
        <p>{ayah.text}</p>
      </div>
    </div>
  );
};

export default AyahItem;
