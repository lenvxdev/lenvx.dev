"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";

const SERVER_IP = "leafmc.cc";
const COPY_TIMEOUT_MS = 1200;

async function copyText(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

export function LeafMCBlock() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    try {
      await copyText(SERVER_IP);
      setCopied(true);
      timerRef.current = window.setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, COPY_TIMEOUT_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-5">
      <div>
        <h2 className="text-2xl font-bold mb-2">Join LeafMC</h2>
        <p className="max-w-md text-muted-foreground">
          Built for performance and uniqueness. Join our community and
          experience Minecraft differently on{" "}
          <a
            href="https://leafmc.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            leafmc.cc
          </a>
          .
        </p>
        <Link
          href="/status"
          className="text-xs text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1 mt-2 group"
        >
          Check Detailed System Metrics{" "}
          <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="relative overflow-hidden bg-muted/10 px-6 py-3 rounded-lg border border-border flex flex-col items-center justify-center min-w-48 group cursor-pointer hover:bg-muted/20 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label="Copy LeafMC server IP to clipboard"
      >
        <span
          className={`text-[10px] font-mono uppercase mb-1 transition-all duration-300 ${
            copied ? "opacity-0 -translate-y-1" : "opacity-60 translate-y-0"
          }`}
        >
          Server IP Address
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center rounded-lg bg-background/90 px-4 text-sm font-medium text-primary backdrop-blur-sm transition-all duration-300 ${
            copied
              ? "opacity-100 translate-y-0 scale-100"
              : "pointer-events-none opacity-0 translate-y-2 scale-95"
          }`}
          aria-live="polite"
        >
          Copied to clipboard
        </span>
        <span
          className={`text-xl font-bold font-doto tracking-widest text-primary transition-all duration-300 ${
            copied ? "opacity-0 translate-y-1 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {SERVER_IP}
        </span>
      </button>
    </div>
  );
}
