"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Bem-Vindo", id: "bem-vindo" },
  { label: "Projetos", id: "projetos" },
  { label: "Games Jam", id: "games-jam" },
  { label: "Sobre Mim", id: "sobre-mim" },
  { label: "Contatos", id: "contatos" },
];

export default function Navbar() {
  const [active, setActive] = useState("bem-vindo");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // Fundo mais sólido depois que a página rola
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Descobre qual seção está na tela (as que ainda não existem são ignoradas)
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = hover ?? active;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#15112b]/85 backdrop-blur-md" : "bg-[#15112b]/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8 md:h-[72px]">
        {/* Logo */}
        <a
          href="#bem-vindo"
          className="font-press flex items-center gap-1.5 text-xl text-[#f4f0ff] sm:text-2xl"
          aria-label="Hak, voltar ao início"
        >
          Hak
          <span aria-hidden className="blink block h-5 w-2.5 bg-[#ffb547] sm:h-6 sm:w-3" />
        </a>

        {/* Links desktop */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onMouseEnter={() => setHover(l.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(l.id)}
                  onBlur={() => setHover(null)}
                  className={`font-grotesk relative block px-3 py-2 text-[0.95rem] font-semibold tracking-wide transition-colors lg:text-base ${
                    shown === l.id ? "text-white" : "text-white/65"
                  }`}
                >
                  {l.label}
                  {shown === l.id && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-[3px] bg-[#ffb547]"
                      transition={{ type: "spring", stiffness: 500, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botão mobile */}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-white/15 text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Linha inferior + barra de progresso de leitura */}
      <div className="h-[3px] w-full bg-white/15">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-left bg-gradient-to-r from-[#ff6b5e] via-[#ffb547] to-[#62e3c8]"
        />
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Principal (mobile)"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-b border-white/10 bg-[#15112b]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-grotesk block border-l-4 py-3 pl-4 text-lg font-semibold ${
                      active === l.id
                        ? "border-[#ffb547] text-white"
                        : "border-transparent text-white/70"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}