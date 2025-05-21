import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

const SONGS = [
  { id: 1, url: '/assets/background_music1.mp3', name: 'Chill Vibes' },
  { id: 2, url: '/assets/background_music2.mp3', name: 'Epic Adventure' },
  { id: 3, url: '/assets/background_music3.mp3', name: 'Retro Synthwave' },
  { id: 4, url: '/assets/background_music4.mp3', name: 'Acoustic Morning' },
  { id: 5, url: '/assets/background_music5.mp3', name: 'Space Exploration' },
  { id: 6, url: '/assets/background_music6.mp3', name: 'Jazz Lounge' },
  { id: 7, url: '/assets/background_music7.mp3', name: 'Forest Ambience' },
  { id: 8, url: '/assets/background_music8.mp3', name: 'Cyberpunk City' },
  { id: 9, url: '/assets/background_music9.mp3', name: 'Piano Reflections' },
  { id: 10, url: '/assets/background_music10.mp3', name: 'Ocean Waves' }
];

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Default: true (autoplay)
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(SONGS[currentSongIndex].url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;

      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Autoplay blocked:", error);
          setIsPlaying(false);
        }
      };

      playAudio();

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', playNextSong);
        }
      };
    }
  }, [currentSongIndex]);

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % SONGS.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => 
      (prevIndex - 1 + SONGS.length) % SONGS.length
    );
  };

  const selectSong = (index) => {
    if (index >= 0 && index < SONGS.length) {
      setCurrentSongIndex(index);
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => 
          console.error("Playback error:", error)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      toggleAudio,
      currentSong: SONGS[currentSongIndex],
      songs: SONGS,
      playNextSong,
      playPreviousSong,
      selectSong,
      currentSongIndex,
      totalSongs: SONGS.length
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
