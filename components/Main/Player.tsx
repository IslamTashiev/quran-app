"use client";
import React, { useEffect, useRef, useState } from "react";
import RepeatIcon from "@/assets/icons/repeat.svg";
import SkipBackIcon from "@/assets/icons/back-skip.svg";
import PlayIcon from "@/assets/icons/player.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import SkipForwardIcon from "@/assets/icons/forward-skip.svg";
import ContinueIcon from "@/assets/icons/continue.svg";
import classNames from "classnames";
import { useAppStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
// import {use} from "next/navigation";

const Player = () => {
  const { audioSrc, surah, setAudioSrc } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isContinued, setIsContinued] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    if (!audioRef.current) return;
    audioRef.current.loop = !isLoop;
    setIsLoop(!isLoop);
  };

  const handleContinue = () => {
    if (!audioRef.current) return;
    setIsContinued(!isContinued);
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Автовоспроизведение не удалось:", error);
        });
    }
    console.log(audioSrc);
  }, [audioSrc]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      if (isContinued && surah && audioSrc) {
        const nextVerseIndex = surah.ayahs.findIndex((ayah) => ayah.path === audioSrc.path) + 1;
        const nextVerse = surah.ayahs[nextVerseIndex];

        if (nextVerse) {
          setAudioSrc(nextVerse.path);
          const currentParams = new URLSearchParams(searchParams.toString());
          currentParams.set("verse", nextVerse.verse.toString());
          router.replace(`?${currentParams.toString()}`, { scroll: false });
          return;
        }
      }
      setIsPlaying(false);
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef, isContinued, surah, audioSrc]);

  return (
    <div
      className={classNames(
        "absolute flex justify-between items-center bg-white/45 px-4 py-2 rounded-xl left-6 right-6 bottom-6 transition-all duration-300",
        { "opacity-0": !audioSrc, "opacity-100": audioSrc }
      )}
    >
      {audioSrc && <audio ref={audioRef} src={audioSrc.audioSrc}></audio>}

      <div onClick={toggleLoop} className={classNames("p-1 rounded-lg", { "bg-white/45": isLoop })}>
        <RepeatIcon />
      </div>

      <div className="flex gap-3 items-center">
        <SkipBackIcon />
        <div onClick={togglePlayPause}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</div>
        <SkipForwardIcon />
      </div>

      <div onClick={handleContinue} className={classNames("p-1 rounded-lg", { "bg-white/45": isContinued })}>
        <ContinueIcon />
      </div>
    </div>
  );
};

export default Player;
