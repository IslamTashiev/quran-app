import React from "react";
import SurahItem from "./SurahItem";
import { useAppStore } from "@/store";

const SurahList = () => {
  const { editions } = useAppStore();

  return (
    <div>
      {editions.map((edition) => (
        <SurahItem key={edition.id} surah={edition} />
      ))}
    </div>
  );
};

export default SurahList;
