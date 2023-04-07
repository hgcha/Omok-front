import { createContext } from "react";

export const PlayContext = createContext({
    isPlaying: false,
    setIsPlaying: () => {}
});