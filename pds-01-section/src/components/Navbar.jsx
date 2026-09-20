import React, { useState, useEffect } from "react";

export function Navbar({ nav }) {
  const [activeSection, setActiveSection] = useState("strategy");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage (0 - 100)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section (Strategy, Mechanism, Anatomy, Portfolio)
      const sections = ["strategy", "mechanism", "anatomy", "portfolio"];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F4]/90 backdrop-blur-md border-b border-[#EAEAE5]">
      {/* Top Hairline Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#7F8F63] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Brand Logo - clicks to scroll smoothly to top */}
        <a
          href="#top"
          onClick={scrollToTop}
          className="flex items-center gap-2 group cursor-pointer"
          title="Scroll to top"
        >
          <span className="font-semibold text-[17px] tracking-[0.14em] uppercase text-[#111111] transition-opacity group-hover:opacity-75">
            {nav.brand}
          </span>
        </a>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-7 text-[13px]">
            {nav.links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`py-1 transition-all relative ${
                    isActive
                      ? "font-medium text-[#111111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]"
                      : "text-[#747474] hover:text-[#111111]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 pl-3 border-l border-[#EAEAE5]">
            <a
              href="https://github.com/Bigestdave/PDS"
              target="_blank"
              rel="noreferrer"
              className="text-[#747474] hover:text-[#111111] transition-colors"
              title="PDS Repository"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7F8F63] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7F8F63]"></span>
              </span>
              <span className="font-mono text-[10px] text-[#7F8F63] tracking-wider uppercase font-semibold">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
