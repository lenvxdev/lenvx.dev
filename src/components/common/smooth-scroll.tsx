"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useAtom } from "jotai";
import performanceModeAtom from "@/lib/atoms/performance-mode";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [performanceMode] = useAtom(performanceModeAtom);

  useEffect(() => {
    // Disable smooth scroll if performance mode is on
    if (performanceMode) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let frameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [performanceMode]);

  return <>{children}</>;
}
