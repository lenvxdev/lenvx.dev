import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import { Link } from "next-view-transitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | lenvx.dev",
  description: "The page you are looking for does not exist on lenvx.dev. Please return to the homepage to explore my projects.",
};

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto p-5 gap-6 flex flex-col justify-center items-center min-h-[72vh] text-center">
      <h1 className="text-7xl font-bold dark:font-semibold text-primary">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>

      <Button
        variant="outline"
        className="transition-colors flex gap-3 items-center mt-4"
        asChild
      >
        <Link href="/">
          <Undo className="size-5" />
          <span>Return to Homepage</span>
        </Link>
      </Button>
    </div>
  );
}
