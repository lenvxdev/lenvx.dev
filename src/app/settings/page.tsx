import Container from "@/components/common/container";
import { ImageComponent } from "@/components/common/image";
import { TextScroll } from "@/components/ui/text-scroll";
import { Settings } from "lucide-react";
import { Metadata } from "next";
import CuteImage from "@/assets/img/banner.gif";
import type { WebPage, WithContext } from "schema-dts";
import { PerformanceModeToggle } from "@/components/settings/performance-mode-toggle";
import { MarqueeToggle } from "@/components/settings/marquee-toggle";
import { DarkModeAnimationToggle } from "@/components/settings/fade-dark-mode-toggle";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure the site to your liking.",
  openGraph: {
    title: "Settings",
    description: "Configure the site to your liking.",
  },
};

export default function SettingsPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Settings",
    alternateName: "lenvx.dev | Settings",
    mainEntityOfPage: "/settings",
    description: "Configure the site to your liking.",
    url: "/settings",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Settings",
          item: "/settings",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Blog",
          item: "/blog",
        },
      ],
    },
  };

  return (
    <>
      <Container>
        <div className="relative rounded-lg overflow-clip">
          <ImageComponent
            img={CuteImage}
            alt="Settings Banner"
            className="w-full relative max-h-96 z-10 rounded-lg"
            innerClassName="md:-translate-y-8"
            height={720}
            priority={true}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            SETTINGS
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Settings className="size-4" />
            <span className="text-sm font-mono">CONFIGURE_SITE.md</span>
          </h2>
          <div className="w-full divide-y divide-border/50">
            <PerformanceModeToggle />
            <DarkModeAnimationToggle />
            <MarqueeToggle />
          </div>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="TUNE IT UNTIL IT FEELS RIGHT.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
