import About from "@/components/About";
import Hero from "@/components/Hero";
import ItActivity from "@/components/ItActivity";
import PublicActivity from "@/components/PublicActivity";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <PublicActivity />
      <ItActivity />

      <footer className="border-t border-[var(--hairline)] px-6 py-8 text-sm text-ink-faint md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Мехтиев Руслан</span>
          <div className="flex gap-5">
            <a
              className="cursor-pointer transition hover:text-mint"
              href="https://t.me/meruslano77"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
            <a
              className="cursor-pointer transition hover:text-mint"
              href="https://github.com/mekhtiev63"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="cursor-pointer transition hover:text-mint"
              href="https://vk.com/meruslano"
              target="_blank"
              rel="noreferrer"
            >
              VK
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
