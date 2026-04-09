"use client";

import ProgressiveBlur from "@/components/ui/progressive-blur";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { Link } from "next-view-transitions";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [performanceMode] = useAtom(performanceModeAtom);
  const pathname = usePathname();

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
        <nav className="relative z-50 w-full max-w-6xl mx-auto px-5 py-3 flex justify-between items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold dark:font-medium text-primary shrink-0"
          >
            lenvx.dev
          </Link>
          <div className="flex items-center gap-1 mr-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggleButton variant="circle-blur" start="top-right" />
        </nav>
      </section>
    </header>
  );
}
