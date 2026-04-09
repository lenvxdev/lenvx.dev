"use client";

import ProgressiveBlur from "@/components/ui/progressive-blur";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { Link } from "next-view-transitions";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";

export function Navbar() {
  const [performanceMode] = useAtom(performanceModeAtom);

  return (
    <header
      className={`sticky top-0 z-999 w-full border-b backdrop-blur-xl ${
        performanceMode
          ? "bg-background/95 border-border"
          : "bg-background/75 border-border/60"
      }`}
    >
      <section className="relative w-full">
        {!performanceMode && (
          <>
            <div className="lg:hidden absolute z-20 top-0 inset-x-0 h-16 bg-linear-to-b from-background/80 to-transparent" />
            <ProgressiveBlur className="z-10" height="170%" position="top" />
          </>
        )}
        <nav className="relative z-50 w-full max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold dark:font-medium text-primary"
          >
            lenvx.dev
          </Link>
          <ThemeToggleButton variant="circle-blur" start="top-right" />
        </nav>
      </section>
    </header>
  );
}
