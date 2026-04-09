"use client";

import {
  ArrowRight,
  ArrowUp,
  GitGraph,
  Globe,
  Home,
  Info,
  Link2,
  Newspaper,
  Server,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const primaryItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/about", label: "About", icon: Info },
  { href: "/status", label: "Status", icon: Server },
  { href: "/settings", label: "Settings", icon: Settings },
];

const externalItems: NavItem[] = [
  { href: "https://github.com/lenvxdev", label: "GitHub", icon: Globe },
];

export function FAB() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleInteractOutside = (e: Event) => {
    e.preventDefault();
  };

  const handleOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const handleNavigate = () => {
    setOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let frameId = 0;

    const trackScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 10;
        setIsVisible((current) => (current === nextVisible ? current : nextVisible));
      });
    };

    trackScroll();
    window.addEventListener("scroll", trackScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <>
      <button
        className={cn(
          "fixed bottom-20 md:bottom-25 flex items-center justify-center",
          "right-5 md:right-10 z-50 p-3 bg-background hover:bg-secondary rounded-lg",
          "text-foreground hover:text-secondary-foreground cursor-pointer",
          "border border-border transition-all outline-0 focus-visible:ring-2 focus-visible:ring-primary/50",
          isVisible ? "opacity-100" : "opacity-0",
          open
            ? "translate-y-15 -translate-x-15"
            : "translate-y-0 translate-x-0",
        )}
        onClick={handleScrollToTop}
      >
        <ArrowUp className="size-6" />
        <span className="sr-only">Scroll to top</span>
      </button>
      <Popover onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "fixed bottom-5 md:bottom-10 flex items-center justify-center",
              "right-5 z-50 md:right-10 p-3 bg-background hover:bg-secondary rounded-lg",
              "text-foreground hover:text-secondary-foreground cursor-pointer",
              "border border-border transition-colors outline-0 focus-visible:ring-2 focus-visible:ring-primary/50",
            )}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <X
              className={cn(
                "size-6 transition-transform",
                open ? "rotate-0" : "rotate-45",
              )}
            />
            <span className="sr-only">Open FAB menu</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={handleInteractOutside}
          className="max-w-3xs sm:max-w-xs md:max-w-sm w-full p-0 overflow-clip"
          align="end"
          sideOffset={10}
        >
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-bold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <GitGraph className="size-4" />
            </span>
            <span>lenvx.dev (v1.0.0)</span>
          </h3>
          {primaryItems.map((item) => (
            <Link
              key={item.href}
              className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
              href={item.href}
              onClick={handleNavigate}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
              <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-semibold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <Link2 className="size-4" />
            </span>
            <span>Others</span>
          </h3>
          {externalItems.map((item) => (
            <a
              key={item.href}
              className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavigate}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
              <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <ArrowRight className="size-4" />
              </div>
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
