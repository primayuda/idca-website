import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import { useNavOverHero } from "@/lib/useNavOverHero";

const links = [
  { href: "#about", id: "Tentang Kami", en: "About Us" },
  { href: "#news", id: "News", en: "News" },
  { href: "#members", id: "Member", en: "Members" },
  { href: "#destinations", id: "Destinasi", en: "Destinations" },
];

export default function MobileNav() {
  const overHero = useNavOverHero();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={`rounded-full ${
            overHero ? "text-foam hover:bg-foam/10" : "text-heading hover:bg-accent"
          }`}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-heading">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 font-display text-lg font-semibold text-heading hover:bg-accent"
            >
              <span lang="id">{l.id}</span>
              <span lang="en">{l.en}</span>
            </a>
          ))}
        </nav>
        <div className="mt-8 flex items-center gap-3">
          <ThemeToggle />
          <LangToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
