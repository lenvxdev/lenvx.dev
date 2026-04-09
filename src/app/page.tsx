import Container from "@/components/common/container";
import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Link } from "next-view-transitions";
import type { WebPage, WithContext } from "schema-dts";

import HeroImage from "@/assets/img/banner.gif";
import HeroProfile from "@/assets/img/pfp.jpg";
import { Book, Code, HelpCircle, Info, Calendar, Gamepad2, Mail } from "lucide-react";
import { TextScroll } from "@/components/ui/text-scroll";
import { RelationshipCounter } from "@/components/home/relationship-counter";
import { LeafMCBlock } from "@/components/home/leafmc-card";

export const metadata: Metadata = {
  title: "Lenvx | Developer & Producer",
  description: "Lenvx is a developer and producer from Lithuania. Explore projects, skills, and thoughts on web development and music production.",
  alternates: { canonical: "https://lenvx.dev" },
  openGraph: {
    title: "Lenvx | Developer & Producer",
    description: "Lenvx is a developer and producer from Lithuania. Explore projects, skills, and thoughts on web development and music production.",
    url: "https://lenvx.dev",
  },
};

export default function Home() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lenvx",
    alternateName: "Lenvx.dev",
    mainEntityOfPage: "/",
    description: "Personal portfolio of Lenvx.",
    url: "/",
  };

  return (
    <>
      <Container>
        <Hero img={HeroImage} profile={HeroProfile} />
        
        <div className="w-full bg-background rounded-lg border border-border mt-8">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">DEFINITION.md</span>
          </h2>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Who is Lenvx?</h2>
            <p className="mb-4">
              I am a 15-year-old producer and developer based in Lithuania. I focus on building secure, lightweight, modern, and minimal applications using the best technology available.
            </p>
            <p>
              This portfolio showcases my journey in software development and music production.
            </p>
          </div>
        </div>

        <div className="w-full bg-background rounded-lg border border-border mt-8">
          <h2 className="w-full flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Gamepad2 className="size-4" />
              <span className="text-sm font-mono uppercase tracking-tighter">LEAFMC.md</span>
            </div>
          </h2>
          <LeafMCBlock />
        </div>

        <RelationshipCounter />

        <div className="w-full bg-background rounded-lg border border-border mt-8">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Code className="size-4" />
            <span className="text-sm font-mono">SKILLS.md</span>
          </h2>
          <div className="p-5">
            <h3 className="text-xl font-bold mb-4">My Technology Stack</h3>
            <p className="mb-4">Here are the core tools and languages I use to build modern applications:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Vite:</strong> Fast and efficient front-end tooling</li>
              <li><strong>Next.js (App Router):</strong> Production-ready full-stack applications</li>
              <li><strong>Svelte:</strong> Lightweight, compiled reactive user interfaces</li>
              <li><strong>TypeScript:</strong> Strict typing for reliability and maintainability</li>
              <li><strong>HTML &amp; CSS:</strong> Semantic, accessible, and responsive structure</li>
              <li><strong>Tailwind CSS:</strong> Utility-first styling for speed and consistency</li>
              <li><strong>Python:</strong> Backend development, scripting, and automation</li>
              <li><strong>Go:</strong> High-performance backend services and concurrency</li>
              <li><strong>Rust:</strong> Memory-safe, high-performance systems programming</li>
            </ul>
          </div>
        </div>

        <div className="w-full bg-background rounded-lg border border-border mt-8">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <HelpCircle className="size-4" />
            <span className="text-sm font-mono">FAQ.md</span>
          </h2>
          <div className="p-5">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">When did you start coding?</h4>
                <p>I started coding in 2020 with Batch scripts. After that, I moved on to Python and later started working with web development.</p>
              </div>
              <div>
                <h4 className="font-semibold">What do you usually build?</h4>
                <p>I build websites, backend systems, and small tools. I like working on projects that are fast, simple, and efficient.</p>
              </div>
              <div>
                <h4 className="font-semibold">What technologies do you use the most?</h4>
                <p>I mostly use Next.js, TypeScript, Tailwind CSS, and Python. I also experiment with Go and Rust.</p>
              </div>
              <div>
                <h4 className="font-semibold">Do you do both frontend and backend?</h4>
                <p>Yes, I work on both. I build the UI on the frontend and handle logic, APIs, and data on the backend.</p>
              </div>
              <div>
                <h4 className="font-semibold">What kind of projects are you interested in?</h4>
                <p>I like working on secure systems, real-time apps, and lightweight applications that run fast and stay simple.</p>
              </div>
              <div>
                <h4 className="font-semibold">Are you available for freelance work?</h4>
                <p>Yes, I&apos;m open to freelance work and collaborations.</p>
              </div>
              <div>
                <h4 className="font-semibold">What are you currently learning?</h4>
                <p>I&apos;m learning more about backend systems, performance, and lower-level programming with Go and Rust.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/blog" className="text-primary hover:underline font-medium">
                Visit my blog to read more about my projects
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full bg-background rounded-lg border border-border mt-8">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Mail className="size-4" />
            <span className="text-sm font-mono">CONTACT.md</span>
          </h2>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Get in touch</h3>
              <p className="text-sm text-muted-foreground">
                Open to freelance work, collaborations, and interesting projects.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://t.me/lenvx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Telegram
              </a>
              <a
                href="https://github.com/lenvxdev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Info className="size-4" />
            <span className="text-sm font-mono">ABOUT_SITE.md</span>
          </h2>
          <div className="p-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <p>Last updated: 2026-04-06</p>
          </div>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="FAST PAGES. CALM BROWSING. "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
