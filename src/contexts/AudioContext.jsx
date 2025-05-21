import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

    const AudioContext = createContext();

    const BACKGROUND_MUSIC_URL = '/assets/background_music.mp3'; // Ensure this file exists in public/assets/

    export const AudioProvider = ({ children }) => {
      const [isPlaying, setIsPlaying] = useState(false);
      const audioRef = useRef(null);

      useEffect(() => {
        if (typeof window !== 'undefined') {
          audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
          audioRef.current.loop = true;
          audioRef.current.volume = 0.2; // Adjust volume as needed (0.0 to 1.0)
        }
      }, []);

      const toggleAudio = () => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play().catch(error => console.error("Error playing audio:", error));
          }
          setIsPlaying(!isPlaying);
        }
      };
      
      useEffect(() => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.play().catch(error => console.error("Error playing audio:", error));
          } else {
            audioRef.current.pause();
          }
        }
      }, [isPlaying]);


      return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
          {children}
        </AudioContext.Provider>
      );
    };

    export const useAudio = () => useContext(AudioContext);