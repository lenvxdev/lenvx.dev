import { Metadata } from "next";
import Container from "@/components/common/container";
import { ImageComponent } from "@/components/common/image";
import BlogBanner from "@/assets/img/blogbanner.gif";
import { TextScroll } from "@/components/ui/text-scroll";
import { ServerStatus } from "@/components/status/server-status";
import { MinecraftServer } from "@/components/status/minecraft";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Server Status",
  description: "Live server metrics and Minecraft server status for lenvx.dev services.",
  alternates: { canonical: "https://lenvx.dev/status" },
  openGraph: {
    title: "Server Status",
    description: "Live server metrics and Minecraft server status for lenvx.dev services.",
    url: "https://lenvx.dev/status",
  },
};

export default function Status() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Server Status",
    alternateName: "lenvx.dev | Server Status",
    mainEntityOfPage: "/status",
    description: "Check the current status of lenvx.dev services.",
    url: "/status",
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
          name: "Server Status",
          item: "/status",
        },
      ],
    },
  };

  return (
    <>
      <Container>
        <div className="relative rounded-lg overflow-clip">
          <ImageComponent
            img={BlogBanner}
            alt="Server Status Banner"
            className="w-full max-h-96 rounded-lg z-10"
            innerClassName="w-full md:-translate-y-8"
            height={720}
            priority={true}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            MY SERVER STATUS INFO
          </p>
        </div>
        <ServerStatus />
        <div className="w-full bg-background rounded-lg border border-border mt-5">
           <MinecraftServer />
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="SERVERS DOING THEIR BEST.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
