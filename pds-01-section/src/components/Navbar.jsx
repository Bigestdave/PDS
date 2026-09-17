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

      // Track active section (Strategy, Mechanism, Anatomy)
      const sections = ["strategy", "mechanism", "anatomy"];
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

        {/* Navigation links (Hero is removed) */}
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-7 text-[13px]">
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

          {/* Live system dot indicator */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#EAEAE5]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7F8F63] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7F8F63]"></span>
            </span>
            <span className="font-mono text-[10px] text-[#7F8F63] tracking-wider uppercase font-semibold hidden sm:inline">
              LIVE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
