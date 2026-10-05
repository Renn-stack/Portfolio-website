"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = [
          buttonRef.current,
          ...menuRef.current.querySelectorAll<HTMLElement>("a"),
        ].filter(Boolean) as HTMLElement[];
        const i = focusables.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? i - 1 : i + 1;
        if (next < 0 || next >= focusables.length) {
          e.preventDefault();
          focusables[(next + focusables.length) % focusables.length].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        scrolled && !open
          ? "border-b border-line bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="px-gutter flex h-14 items-center justify-between md:h-16">
        <a
          href="#top"
          className={`meta transition-colors duration-500 ${scrolled ? "text-fg" : "text-fg/80"} hover:text-fg`}
        >
          Renata Ponce
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`meta group relative flex items-center gap-2 transition-colors duration-500 ${
                    isActive ? "text-fg" : scrolled ? "text-soft" : "text-muted"
                  } hover:text-fg`}
                >
                  <span
                    aria-hidden
                    className={`h-1 w-1 rounded-full transition-all duration-500 ${
                      isActive ? "bg-signal opacity-100" : "bg-fg opacity-0 group-hover:opacity-40"
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="meta relative z-[60] flex items-center gap-3 text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-2.5 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-fg transition-transform duration-500 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-fg transition-transform duration-500 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-ink px-gutter pb-10 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-5xl font-medium tracking-[-0.04em] text-fg"
                  >
                    <span className="meta text-signal">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="meta text-dim">Renata Ponce / Inventor</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
