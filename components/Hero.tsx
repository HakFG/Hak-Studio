"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const MENU = [
  { label: "Bem-Vindo", href: "#bem-vindo" },
  { label: "Meus Projetos", href: "#projetos" },
  { label: "Games Jam", href: "#games-jam" },
  { label: "Sobre Mim", href: "#sobre-mim" },
  { label: "Contatos", href: "#contatos" },
];

const INTRO =
  "Olá, sou Hak, um desenvolvedor júnior de jogos, tudo isso começou com um pequeno projeto da faculdade que me impulsionou a dar vida às minhas ideias em formatos de jogos, sou apaixonado na ideia de ter uma criação e pessoas se identificarem com elas de alguma forma, então por favor continue me apoiando!";

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */
function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative h-[270px] w-full overflow-hidden rounded-[2rem] border-2 border-white/15 bg-[#231b4d] shadow-[0_24px_60px_-20px_rgba(255,107,94,0.45)] sm:h-[340px] sm:rounded-[2.5rem] lg:h-[414px]"
    >
      <Image
        src="/images/welcome-background.gif"
        alt="Arte animada de Tokyo Ghoul"
        fill
        priority
        unoptimized
        sizes="(min-width: 1400px) 1336px, 100vw"
        className="object-cover"
      />

      {/* Escurece a esquerda para o "Hak" sempre ficar legível */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#15112b]/70 via-[#15112b]/10 to-transparent"
      />
      {/* Scanlines de monitor CRT */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,.45) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* Título */}
      <h1
        aria-label="Hak"
        className="font-press absolute left-[7%] top-1/2 z-10 -translate-y-1/2 text-[3.5rem] leading-none text-[#f4f0ff] sm:text-[6rem] lg:left-[9%] lg:text-[8.5rem]"
        style={{ textShadow: "0.06em 0.06em 0 #ff6b5e, 0.12em 0.12em 0 #231b4d" }}
      >
        {"Hak".split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.4 + i * 0.12 }}
          >
            {c}
          </motion.span>
        ))}
      </h1>

    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Menu lateral estilo menu de RPG                                     */
/* ------------------------------------------------------------------ */
function SideMenu() {
  const [active, setActive] = useState(0);

  return (
    <nav
      aria-label="Atalhos da página"
      className="flex flex-wrap gap-2 lg:flex-col lg:gap-1"
    >
      {MENU.map((m, i) => (
        <a
          key={m.href}
          href={m.href}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={`font-grotesk relative rounded-full border px-4 py-2 text-base font-bold transition-colors lg:rounded-none lg:border-0 lg:bg-transparent lg:py-2 lg:pl-11 lg:text-3xl xl:text-4xl ${
            active === i
              ? "border-transparent bg-[#ffb547] text-[#15112b] lg:text-[#ffb547]"
              : "border-white/15 bg-white/5 text-[#f4f0ff]"
          }`}
        >
          {active === i && (
            <motion.span
              layoutId="menu-cursor"
              aria-hidden
              className="absolute inset-y-0 left-0 hidden items-center text-[#ff6b5e] lg:flex"
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            >
              {/* Setinha em pixel art */}
              <svg width="20" height="26" viewBox="0 0 6 8" shapeRendering="crispEdges" fill="currentColor">
                <path d="M0 0h2v8H0zM2 1h2v6H2zM4 2h2v4H4z" />
              </svg>
            </motion.span>
          )}
          {m.label}
        </a>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Pixel art flutuando                                                 */
/* ------------------------------------------------------------------ */
function Sprite() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto grid w-44 place-items-center sm:w-52">
      {/* Halo atrás do personagem */}
      <div
        aria-hidden
        className="absolute size-40 rounded-full bg-gradient-to-b from-[#3a2d7a] to-[#231b4d] ring-2 ring-white/10 sm:size-48"
      />
      <motion.div
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        {/* Coloque a pixel art em public/images/subaru01.png */}
        <Image
          src="/images/subaru01.png"
          alt="Subaru, o personagem em pixel art do Hak"
          width={180}
          height={290}
          priority
          unoptimized
          className="h-auto w-28 [image-rendering:pixelated] sm:w-32 lg:w-36"
        />
      </motion.div>
      {/* Sombra no chão que acompanha a flutuação */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { scaleX: [1, 0.78, 1], opacity: [0.45, 0.25, 0.45] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 h-3 w-24 rounded-[50%] bg-black"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Texto de apresentação (caixa de diálogo)                            */
/* ------------------------------------------------------------------ */
const paragraph: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022, delayChildren: 0.5 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function Intro() {
  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-3xl border-2 border-white/15 bg-white/[0.04] p-6 pb-10 backdrop-blur-sm sm:p-9 sm:pb-12">
      <h2 className="font-press mb-5 flex items-end gap-3 text-4xl text-[#f4f0ff] sm:mb-6 sm:pl-6 sm:text-5xl lg:text-6xl">
        Salve
        <span aria-hidden className="flex text-[#ff6b5e]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="inline-block origin-bottom"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                show: {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -14, 10, -6, 0],
                  transition: { delay: 0.7 + i * 0.12, duration: 0.9 },
                },
              }}
            >
              !
            </motion.span>
          ))}
        </span>
      </h2>

      <motion.p
        variants={paragraph}
        aria-label={INTRO}
        className="mx-auto max-w-[62ch] text-left text-base font-normal leading-8 tracking-[0.005em] text-[#f4f0ff]/80 sm:text-lg sm:leading-9 lg:text-[1.2rem]"
      >
        {INTRO.split(" ").map((w, i) => (
          <motion.span key={i} variants={word} aria-hidden className="inline-block">
            {w}&nbsp;
          </motion.span>
        ))}
      </motion.p>

      {/* Setinha piscando de "continua" */}
      <svg
        aria-hidden
        className="blink absolute bottom-4 right-6 text-[#ff6b5e]"
        width="16"
        height="16"
        viewBox="0 0 8 8"
        shapeRendering="crispEdges"
        fill="currentColor"
      >
        <path d="M0 0h8v2H0zM1 2h6v2H1zM2 4h4v2H2zM3 6h2v2H3z" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section
      id="bem-vindo"
      className="mx-auto w-full max-w-[1400px] px-4 pb-24 pt-24 sm:px-8 md:pt-28"
    >
      <Banner />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,18rem)_13rem_minmax(0,1fr)] lg:gap-6 xl:gap-10"
      >
        <motion.div variants={item}>
          <SideMenu />
        </motion.div>

        <motion.div variants={item}>
          <Sprite />
        </motion.div>

        <motion.div variants={item}>
          <Intro />
        </motion.div>
      </motion.div>
    </section>
  );
}
