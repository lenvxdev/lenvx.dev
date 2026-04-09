import Container from "@/components/common/container";
import { cn } from "@/lib/utils";
import { ImageComponent } from "@/components/common/image";
import { TextScroll } from "@/components/ui/text-scroll";
import { Book, Music, ThumbsUp } from "lucide-react";
import { Metadata } from "next";
import AboutBanner from "@/assets/img/aboutbanner.png";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about lenvx — a developer and music producer from Lithuania focused on fast, minimal, and secure web applications.",
  alternates: { canonical: "https://lenvx.dev/about" },
  openGraph: {
    title: "About",
    description: "Learn more about lenvx — a developer and music producer from Lithuania focused on fast, minimal, and secure web applications.",
    url: "https://lenvx.dev/about",
  },
};

export default function About() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About",
    alternateName: "lenvx.dev | About",
    mainEntityOfPage: "/about",
    description: "Learn more about lenvx, a 15-year-old developer and producer.",
    url: "/about",
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
          name: "About",
          item: "/about",
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

  const infoWidgets = [
    {
      title: "Age",
      value: "15",
      unit: "years old",
    },
    {
      title: "Timezone",
      value: "+2",
      unit: "GMT/UTC",
    },
    {
      title: "Focus",
      value: "Web",
      unit: "Dev",
    },
    {
      title: "Stack",
      value: "TS",
      unit: "Next.js",
    },
    {
      title: "Role",
      value: "Dev",
      unit: "& Producer",
    },
    {
      title: "Favorite",
      value: "Svelte",
      unit: "framework",
    },
    {
      title: "Languages",
      value: "5+",
      unit: "known",
    },
    {
      title: "Favorite Game",
      value: "Rust",
      unit: "game",
    },
  ];

  return (
    <>
      <Container>
        <div className="relative rounded-lg overflow-clip">
          <ImageComponent
            img={AboutBanner}
            alt="About Banner"
            className="w-full relative max-h-96 z-10 rounded-lg"
            height={720}
            priority={true}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            ABOUT ME AND STUFFS
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">ABOUT.md</span>
          </h2>
          <p className="px-5 py-3">
            I am lenvx, a 15-year-old developer and music producer. I build fast, minimal, and secure web apps.
            My work spans full-stack development with Next.js and TypeScript, and music production in my free time.
            I care a lot about good design, clean code, and tools that just work.
            I started coding because I wanted to build my own things, and now it is one of my biggest passions.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Music className="size-4" />
            <span className="text-sm font-mono">MUSIC.md</span>
          </h2>
          <p className="px-5 py-3">
            Alongside coding, I produce music as a hobby. I work in a variety of styles and enjoy experimenting
            with sound design, mixing, and arrangement. Music and code share the same creative process for me,
            both require patience, iteration, and attention to detail.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <ThumbsUp className="size-4" />
            <span className="text-sm font-mono">USEFUL_CARDS.md</span>
          </h2>
          <div className="w-full p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
            {infoWidgets.map((item, i) => (
              <div
                key={i}
                className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col"
              >
                <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                  <h3 className="text-sm text-center line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                  <p className={cn(
                    "font-doto font-bold text-center break-all",
                    item.value.length > 5 ? "text-3xl" : "text-5xl"
                  )}>
                    {item.value}
                  </p>
                  <p className="text-foreground/60 font-mono text-center text-sm">
                    {item.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="BUILDING CLEAN THINGS THAT MOVE FAST.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
