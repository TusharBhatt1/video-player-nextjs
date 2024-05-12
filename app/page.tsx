import React from "react";
import VideoPlayer from "./components/Player/Player";
import Sidebar from "./components/Sidebar";
export default function page() {
  return (
    <div data-testid="main-div" className="flex flex-col">

      <div className="flex items-center p-7 justify-center md:flex-row flex-col-reverse ">
        <Sidebar />
        <VideoPlayer />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center py-7">
      <p className="text-italic">Built with NextJS, Typescript , Zustand with Jest for testing.</p>
      <h1 className="font-bold">by Tushar Bhatt</h1>
      </div>
    </div>
  );
}
