"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ExperienceModeContextType {
  active: boolean;
  toggle: () => void;
}

const ExperienceModeContext = createContext<ExperienceModeContextType>({
  active: false,
  toggle: () => {},
});

export const useExperienceMode = () => useContext(ExperienceModeContext);

const TARGET_VOLUME = 0.18;

export function ExperienceModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const fadeTo = useCallback((target: number, audio: HTMLAudioElement) => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.01) {
        audio.volume = target;
        if (target === 0) audio.pause();
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + diff * 0.15));
    }, 40);
  }, []);

  const toggle = useCallback(() => {
    setActive((prev) => {
      const next = !prev;

      if (!audioRef.current) {
        const audio = new Audio("/my-portfolio/audio/ambient.mp3");
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;
      }
      const audio = audioRef.current;

      if (next) {
        // Synthesized ambient loop, generated locally (see README) — this is a
        // real playable asset, not a stub. play() is still wrapped defensively
        // in case the browser blocks it for an unrelated reason.
        audio.play().catch(() => {});
        fadeTo(TARGET_VOLUME, audio);
      } else {
        fadeTo(0, audio);
      }

      return next;
    });
  }, [fadeTo]);

  useEffect(() => {
    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <ExperienceModeContext.Provider value={{ active, toggle }}>
      {children}
    </ExperienceModeContext.Provider>
  );
}
