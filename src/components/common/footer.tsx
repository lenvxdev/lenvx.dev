

import type { ComponentType, SVGProps } from "react";
import { Link } from "next-view-transitions";
import { GitHub } from "@/components/logos/github";
import { Telegram } from "@/components/logos/telegram";

type UsefulLink = {
  href: string;
  text: string;
  external?: boolean;
};

type SocialLink = {
  href: string;
  text: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Footer() {
  const usefulLinks: UsefulLink[] = [
    { href: "https://github.com/lenvxdev", text: "GitHub", external: true },
    { href: "/blog", text: "Blog" },
    { href: "/about", text: "About" },
  ];

  const socials: SocialLink[] = [
    { href: "https://github.com/lenvxdev", text: "GitHub", icon: GitHub },
    { href: "https://t.me/lenvx", text: "Telegram", icon: Telegram },
  ];

  return (
    <footer className="relative w-full border-t border-border max-w-full mx-auto p-5 py-10 gap-8 flex flex-col items-center">
      <div className="w-full md:grid-cols-2 grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-primary">lenvx</p>
            <p className="text-sm text-muted-foreground">/len-viks/</p>
          </div>
          <p className="w-full lg:w-3/4 xl:w-1/2 text-lg">
            <span className="font-bold">lenvx</span> is a 15-year-old developer and producer based in Lithuania.
            This site is a personal portfolio and blog where I share my projects, thoughts, and
            music production journey.
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex flex-col gap-2">
            <p className="lg:text-xl font-bold md:mb-5 text-primary">
              Questionable Links
            </p>
            <div className="flex flex-col gap-1">
              {usefulLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/75 md:text-2xl lg:text-4xl hover:text-primary transition-colors"
                  >
                    {link.text}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary/75 md:text-2xl lg:text-4xl hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="lg:text-xl font-bold md:mb-5 text-primary">Socials</p>
            <div className="flex flex-col gap-1">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary/75 hover:text-primary transition-colors"
                >
                  <social.icon className="size-4" />
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-primary/75 text-center md:text-start text-sm w-full pb-10">
        &copy; 2026 lenvx. All rights reserved.
      </p>

    </footer>
  );
}
