"use client";
import React from "react";
import { files } from "../../public/data/medias";
import audio from "../../public/audio.jpg";
import Image from "next/image";
import usePlayerStore from "../Zustand/usePlayerStore";
export default function Sidebar() {
  
const {currentVideoId,setCurrentVideoId}=usePlayerStore()
  return (
    <div>
      <p className="font-bold ">All Media</p>
      <div className="flex md:flex-col flex-wrap  gap-2">
        {files.map((vid, i) => (
          <div
          key={i}
            onClick={() => setCurrentVideoId(i)}
            className={`${
             currentVideoId == i && "border-4 border-blue-700"
            } h-30 w-40 hover:outline outline-blue-700 cursor-pointer`}
          >
            {vid.split(".")[5] === "mp4" ? (
              <video src={vid} />
            ) : (
              <Image
                src={audio}
                alt="audio"
                className="h-30 w-40"
                height={100}
                width={100}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
