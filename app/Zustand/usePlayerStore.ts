import { create } from "zustand";

interface StoreType{
    currentVideoId:number
    setCurrentVideoId:(value:number)=>void
}
const usePlayerStore=create<StoreType>((set)=>({
    currentVideoId:0,
    setCurrentVideoId:(val)=>set({currentVideoId:val})
}))
export default usePlayerStore