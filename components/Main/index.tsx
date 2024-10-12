"use client";
import React, { useEffect } from "react";
import BookIcon from "@/assets/icons/book.svg";
import LastReadIcon from "@/assets/icons/last-read.svg";
import BisIcon from "@/assets/icons/bis.svg";
import classNames from "classnames";
import { useAppStore } from "@/store";
import Player from "./Player";
import { useRouter } from "next/navigation";

const Main = () => {
  const { mainSurah: surahInfo, history, audioSrc } = useAppStore();
  const router = useRouter();
  const info = surahInfo || history;

  const handleLastRead = () => {
    if (history) {
      const queryParams = new URLSearchParams({
        ...history,
        id: history.id + "",
        total_verses: history.total_verses + "",
        verse: history.last_verse + "",
        last_verse: history.last_verse + "",
      }).toString();
      router.push(`/surah/${history.id}?` + queryParams);
    }
  };

  return (
    <div
      className={classNames(
        "main-container text-white flex  justify-between transition-all duration-300 relative mb-10",
        {
          "min-h-56": surahInfo,
          "min-h-48": !surahInfo,
          "min-h-72": audioSrc,
        }
      )}
    >
      <div className="flex flex-col justify-between w-full">
        <div
          onClick={handleLastRead}
          className={classNames("flex gap-2 items-center transition-opacity duration-300", {
            "opacity-0 invisible": surahInfo,
          })}
        >
          <LastReadIcon />
          <p>Last Read</p>
        </div>

        <div
          className={classNames("absolute transition-all duration-300 ", {
            "top-6 left-1/2 -translate-x-1/2 text-center": surahInfo,
            "top-1/2 translate-y-1/2 left-6": !surahInfo,
          })}
        >
          <h1 className="font-bold text-2xl">{info?.transliteration}</h1>
          <p className="text-xs">{surahInfo ? info?.translation : "Ayah NO. " + history?.last_verse}</p>
        </div>

        <div
          className={classNames(
            "flex flex-col items-center w-full absolute top-16 left-1/2 -translate-x-1/2 transition-all duration-300",
            { "opacity-1": surahInfo, "opacity-0": !surahInfo }
          )}
        >
          <div
            className={classNames("h-px bg-white opacity-35 mx-auto my-4 transition-all duration-300", {
              "w-2/3": surahInfo,
              "w-0": !surahInfo,
            })}
          />
          <p className="mb-8 uppercase">
            {info?.type} <span className="text-xs">●</span> {info?.total_verses} verses
          </p>
          <BisIcon />
        </div>
      </div>
      <Player />
      <div
        className={classNames("absolute transition-all duration-300", {
          "left-1/2 -translate-x-1/2 translate-y-1/4 scale-150 opacity-10": surahInfo,
          "left-[30%] translate-x-1/4 translate-y-1/3": !surahInfo,
        })}
      >
        <BookIcon width="206" height="126" viewBox="0 0 206 126" />
      </div>
    </div>
  );
};

export default Main;
