"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

type PointerCallback = (nx: number, ny: number, px: number, py: number) => void;

interface StagePointerContextType {
  registerStage: (el: HTMLElement | null) => void;
  subscribe: (cb: PointerCallback) => () => void;
}

const StagePointerContext = createContext<StagePointerContextType | null>(null);

export function StagePointerProvider({ children }: { children: React.ReactNode }) {
  const stageElRef = useRef<HTMLElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const callbacksRef = useRef<Set<PointerCallback>>(new Set());
  const rafRef = useRef(0);
  const lastEventRef = useRef<{ x: number; y: number } | null>(null);

  const registerStage = useCallback((el: HTMLElement | null) => {
    stageElRef.current = el;
    if (el) rectRef.current = el.getBoundingClientRect();
  }, []);

  const subscribe = useCallback((cb: PointerCallback) => {
    callbacksRef.current.add(cb);
    return () => {
      callbacksRef.current.delete(cb);
    };
  }, []);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Touch devices and reduced-motion preference: skip cursor tracking entirely.
    if (isCoarsePointer || prefersReducedMotion) return;

    const updateRect = () => {
      if (stageElRef.current) rectRef.current = stageElRef.current.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });

    const tick = () => {
      rafRef.current = 0;
      const ev = lastEventRef.current;
      const rect = rectRef.current;
      if (!ev || !rect || rect.width === 0) return;
      const px = ev.x - rect.left;
      const py = ev.y - rect.top;
      const nx = (px / rect.width) * 2 - 1;
      const ny = (py / rect.height) * 2 - 1;
      callbacksRef.current.forEach((cb) => cb(nx, ny, px, py));
    };

    const handleMove = (e: PointerEvent) => {
      lastEventRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const target = stageElRef.current;
    target?.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      target?.removeEventListener("pointermove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <StagePointerContext.Provider value={{ registerStage, subscribe }}>
      {children}
    </StagePointerContext.Provider>
  );
}

/** Subscribe a callback to normalized (-1..1) and pixel cursor coordinates within the stage. */
export function useStagePointer(callback: PointerCallback) {
  const ctx = useContext(StagePointerContext);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe((nx, ny, px, py) => callbackRef.current(nx, ny, px, py));
  }, [ctx]);
}

export function useRegisterStage() {
  const ctx = useContext(StagePointerContext);
  return ctx?.registerStage ?? (() => {});
}
