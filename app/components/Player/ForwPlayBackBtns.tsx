import { files } from '@/public/data/medias';
import React from 'react'
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';

interface ForwPlayBackBtnsType{
    currentVideoId:number;
    isPlaying:boolean;
    setCurrentVideoId:(val:number)=>void;
    togglePlay:()=>void
}
export default function ForwPlayBackBtns({
    currentVideoId,
    setCurrentVideoId,
    togglePlay,
    isPlaying
}:ForwPlayBackBtnsType) {
  return (
    <div className="flex justify-center items-center gap-2 mx-4">
    <button
      disabled={currentVideoId == 0}
      onClick={() => setCurrentVideoId(currentVideoId - 1)}
    >
      <FaBackward />
    </button>
    <button className="bg-red-100" onClick={togglePlay}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>

    <button
      disabled={currentVideoId == files.length - 1}
      onClick={() =>{
        setCurrentVideoId(currentVideoId + 1)
        console.log(currentVideoId)
      } }
    >
      <FaForward />
    </button>
  </div>
  )
}
