"use client";
import React, { useState } from "react";
import { files } from "../../public/data/medias";
import audio from "../../public/audio.jpg";
import Image from "next/image";
import usePlayerStore from "../Zustand/usePlayerStore";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentVideoId, setCurrentVideoId } = usePlayerStore();
  return (
    <>
      {!showSidebar && (
        <div
        data-testid="menubutton"
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-50 flex items-center cursor-pointer right-10 top-6"
        >
          <CiMenuFries size={32} />
        </div>
      )}

      <div
      data-testid="sidebar"
        className={`top-0 right-0 w-[25vw]  bg-black   p-10 pl-20 text-white fixed h-full z-50  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-2">
          <p className="font-bold hidden md:block ">All Media</p>
          <button onClick={() => setShowSidebar(false)}>
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>

        <div className="flex md:flex-col flex-wrap  gap-2">
          {files.map((vid, i) => (
            <div
              key={i}
              onClick={() => setCurrentVideoId(i)}
              className={`${
                currentVideoId == i && "border-4 border-blue-700"
              } h-30 w-40 hover:outline outline-blue-700 cursor-pointer`}
            >
              {vid.type === "video" ? (
                <video src={vid.url} autoPlay muted className="h-20 w-full" />
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
    </>
  );

}
