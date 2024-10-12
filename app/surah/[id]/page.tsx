"use client";
import AyahItem from "@/components/Ayah/AyahItem";
import { useAppStore } from "@/store";
import { ISurah } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const Surah = () => {
  const { setMainSurah, getSurah, surah, setAudioSrc } = useAppStore();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (
      queryParams.id &&
      queryParams.name &&
      queryParams.transliteration &&
      queryParams.translation &&
      queryParams.total_verses &&
      queryParams.type
    ) {
      const localSurah: ISurah = {
        id: Number(queryParams.id),
        name: queryParams.name,
        transliteration: queryParams.transliteration,
        translation: queryParams.translation,
        total_verses: Number(queryParams.total_verses),
        type: queryParams.type,
      };
      setMainSurah(localSurah);
    }

    if (surah) {
      setMainSurah(surah.metadata);
    }

    return () => {
      setMainSurah(null);
      setAudioSrc(null);
    };
  }, [surah]);
  useEffect(() => {
    if (typeof id === "string") {
      getSurah(id);
    }
  }, []);

  return (
    <Suspense>
      {surah?.ayahs.map((ayah) => (
        <AyahItem key={ayah.verse} ayah={ayah} />
      ))}
    </Suspense>
  );
};

export default Surah;
