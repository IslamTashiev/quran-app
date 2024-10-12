"use client";
import SurahList from "@/components/SurahList";
import { useAppStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
  const { setHistory, getEditions } = useAppStore();

  useEffect(() => {
    setHistory();
    getEditions();
  }, []);
  return (
    <div>
      <SurahList />
    </div>
  );
}
