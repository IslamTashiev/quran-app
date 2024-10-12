"use client";
import React from "react";
import AyahMark from "./AyahMark";
import { useRouter } from "next/navigation";
import { ISurah } from "@/types";

const SurahItem = ({ surah }: { surah: ISurah }) => {
  const router = useRouter();

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      ...surah,
      id: surah.id + "",
      total_verses: surah.total_verses + "",
    }).toString();
    router.push(`/surah/${surah.id}?` + queryParams);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 py-4 border-b border-slate-200 cursor-pointer hover:bg-slate-100"
    >
      <AyahMark number={surah.id} />
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="font-semibold uppercase">{surah.transliteration}</h2>
          <p className="text-[--disabled] text-sm uppercase">
            {surah.type} <span className="text-slate-200">●</span> {surah.total_verses} verses
          </p>
        </div>
        <p className="font-bold text-xl">{surah.name}</p>
      </div>
    </div>
  );
};

export default SurahItem;
