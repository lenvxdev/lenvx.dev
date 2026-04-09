"use client";

import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { cn } from "@/lib/utils";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitHub } from "@/components/logos/github";
import { Telegram } from "@/components/logos/telegram";
import { Lens } from "@/components/ui/lens";

export interface HeroProps {
  img: StaticImport;
  profile: StaticImport;
}

export function Hero({ img, profile }: HeroProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [performanceMode] = useAtom(performanceModeAtom);

  const image = img as StaticImageData;
  const profileImg = profile as StaticImageData;

  return (
    <div className="relative">
      <div className="relative overflow-clip w-full max-h-72 rounded-lg">
        <Lens hovering={hovering} setHovering={setHovering}>
          <Image
            src={image}
            alt="Hero Image"
            height={1080}
            priority={true}
            {...(image.blurDataURL && { placeholder: "blur", blurDataURL: image.blurDataURL })}
            onLoad={() => setIsImageLoading(false)}
            className={cn(
              isImageLoading && !performanceMode ? "blur" : "remove-blur",
              "transition-all",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",
              "duration-500",
            )}
          />
        </Lens>
      </div>
      <div className="relative z-30 group/pfp rounded-full aspect-square size-28 md:size-36 mx-auto md:mx-0 md:ml-5 -mt-18 border-6 border-background overflow-clip transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        <Image
          src={profileImg}
          alt="Profile Picture"
          height={500}
          {...(profileImg.blurDataURL && { placeholder: "blur", blurDataURL: profileImg.blurDataURL })}
          onLoad={() => setIsProfileLoading(false)}
          className={cn(
            isProfileLoading && !performanceMode ? "blur" : "remove-blur",
            "transition-all",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "duration-500",
          )}
        />
      </div>
      <div className="relative w-full py-3 md:-mt-18 justify-center flex-col md:flex-row md:justify-between flex gap-3 md:gap-5 items-center">
        <div className="w-full md:pl-46">
          <p className="w-fit mx-auto md:mx-0 truncate text-2xl text-foreground font-bold dark:font-semibold">
            Lenvx
          </p>
        </div>
        <div className="w-fit flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/lenvxdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
            >
              <GitHub className="size-6" />
              <span className="sr-only">GitHub Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://t.me/lenvx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Telegram profile"
            >
              <Telegram className="size-6" />
              <span className="sr-only">Telegram Account</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
