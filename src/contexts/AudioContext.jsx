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
  { id: 10, url: '/assets/background_music10.mp3', name: 'Ocean Waves' },
  { id: 11, url: '/assets/background_music11.mp3', name: 'Ocean Waves' }
];

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create new audio element when song changes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }

      audioRef.current = new Audio(SONGS[currentSongIndex].url);
      audioRef.current.volume = 0.2;
      audioRef.current.loop = false; // Disable loop to allow song progression
      audioRef.current.addEventListener('ended', handleSongEnd);

      // Attempt autoplay with error handling
      const attemptAutoplay = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay blocked by browser:", err);
          setIsPlaying(false);
        }
      };

      attemptAutoplay();

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleSongEnd);
        }
      };
    }
  }, [currentSongIndex]);

  const handleSongEnd = () => {
    playNextSong();
  };

  const playNextSong = () => {
    setCurrentSongIndex(prev => (prev + 1) % SONGS.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex(prev => (prev - 1 + SONGS.length) % SONGS.length);
  };

  const selectSong = (index) => {
    if (index >= 0 && index < SONGS.length) {
      setCurrentSongIndex(index);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
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
