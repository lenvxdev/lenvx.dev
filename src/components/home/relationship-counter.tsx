"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function RelationshipCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const startDate = new Date("2025-09-08");
    const calculateDays = () => {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    };

    calculateDays();
    // Update every minute (optional, but good if the day changes)
    const timer = setInterval(calculateDays, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative overflow-clip bg-background rounded-lg border border-border mt-8 group h-48 flex flex-col items-center justify-center">
      {/* Background Heart with Dotted Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
        <div 
          className="size-64 bg-red-500" 
          style={{
            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"), 
                        radial-gradient(circle, black 1px, transparent 1px)`,
            maskSize: "100%, 8px 8px",
            maskRepeat: "no-repeat, repeat",
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"), 
                              radial-gradient(circle, black 1px, transparent 1px)`,
            WebkitMaskSize: "100%, 8px 8px",
            WebkitMaskRepeat: "no-repeat, repeat",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in"
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-muted-foreground font-mono text-sm mb-2 flex items-center justify-center gap-2">
          <span>Trinity</span>
          <Heart className="size-3 text-red-500 fill-red-500" />
          <span>lenvx</span>
        </h2>
        
        <div className="flex flex-col items-center">
          <p className="text-6xl md:text-7xl font-bold font-doto tracking-tight">
            {days}
          </p>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1 font-semibold">
            Days Together
          </p>
        </div>
      </div>
      
      <div className="absolute top-3 left-5">
         <h2 className="flex items-center gap-3 text-muted-foreground">
            <Heart className="size-4" />
            <span className="text-sm font-mono">BELOVED.md</span>
          </h2>
      </div>
    </div>
  );
}
