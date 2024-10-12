import React from "react";
import AyahMarkIcon from "@/assets/icons/ayah-mark.svg";

const AyahMark = ({ number }: { number: number }) => {
  return (
    <div className="relative flex">
      <AyahMarkIcon />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{number}</span>
    </div>
  );
};

export default AyahMark;
