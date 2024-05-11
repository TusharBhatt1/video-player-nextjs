import React from "react";
import VideoPlayer from "./components/Player/Player";
import Sidebar from "./components/Sidebar";
export default function page() {
  return (
    <div>

      <div className="flex items-center p-7 justify-center md:flex-row flex-col-reverse ">
        <Sidebar />
        <VideoPlayer />
      </div>
    </div>
  );
}
