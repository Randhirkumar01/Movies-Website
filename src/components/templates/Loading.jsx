import React from "react";
import Loader from "/loading-gif.avif";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <img src={Loader} alt="Loading..." className="w-[50%] object-cover" />
    </div>
  );
}
