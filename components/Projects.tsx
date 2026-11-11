"use client";

import Image from "next/image";
import { Crown, ExternalLink, Gamepad2, Monitor, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    title: "Plague U",
    image: "/images/bannerplagueu.png",
    href: "https://hakfg.itch.io/plague-u",
    engine: "GameMaker",
    contribution: "Game Designer. Colaborei na criação de cenários, modelos de personagem e, principalmente, nas animações base.",
    accent: "#ff6b5e",
  },
  {
    title: "Twilight Angel",
    image: "/images/bannertokyoghoulcentipede.png",
    href: "https://hakfg.itch.io/twilight-angel",
    engine: "Godot",
    contribution: "Criador e Game Designer. Idealização, sprites, cenários, animações e desenvolvimento feitos por mim.",
    accent: "#ffb547",
  },
  {
    title: "Tokyo Ghoul Centipede",
    image: "/images/tokyoghoul.png",
    href: undefined,
    engine: "Godot",
    contribution: "Criador e Game Designer. Projeto autoral com conceitos, sprites, cenários, animações e desenvolvimento próprios.",
    accent: "#62e3c8",
  },
];

function ProjectArt({ title, image, accent }: Pick<(typeof PROJECTS)[number], "title" | "image" | "accent">) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-white/15 bg-[#231b4d]">
      {failed ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,var(--card-accent),transparent_20%),linear-gradient(135deg,#3a2d7a,#231b4d_58%,#15112b)]" style={{ "--card-accent": accent } as React.CSSProperties}>
          <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(90deg,rgba(255,255,255,.14) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.14) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <Gamepad2 size={35} style={{ color: accent }} aria-hidden />
            <span className="font-press mt-4 px-4 text-sm leading-relaxed text-[#f4f0ff]">{title}</span>
          </div>
        </div>
      ) : (
        <Image src={image} alt={`Banner do jogo ${title}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setFailed(true)} />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#15112b]/55 via-transparent to-transparent" />
      <span className="font-press absolute left-4 top-4 rounded-md border border-white/20 bg-[#15112b]/80 px-2 py-1 text-[9px] text-[#f4f0ff] backdrop-blur-sm">Projeto autoral</span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.12, ease: "easeOut" }}
      className="group rounded-3xl border-2 border-white/15 bg-[#231b4d]/75 p-3 shadow-[0_18px_45px_-28px_rgba(0,0,0,.9)] backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_30px_55px_-28px_rgba(255,107,94,.5)] sm:p-4"
    >
      <ProjectArt {...project} />
      <div className="px-2 pb-3 pt-6 sm:px-3 sm:pb-4">
        <h3 className="font-press text-xl leading-snug text-[#f4f0ff] sm:text-2xl">{project.title}</h3>
        <p className="mt-5 min-h-24 text-sm font-semibold leading-relaxed text-[#f4f0ff]/80">{project.contribution}</p>
        <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
          <div className="flex items-center gap-2 text-[#f4f0ff]/75"><Monitor size={16} className="text-[#62e3c8]" aria-hidden /><dt className="font-bold text-[#f4f0ff]">Plataforma:</dt><dd>PC</dd></div>
          <div className="flex items-center gap-2 text-[#f4f0ff]/75"><Wrench size={16} className="text-[#ffb547]" aria-hidden /><dt className="font-bold text-[#f4f0ff]">Engine:</dt><dd>{project.engine}</dd></div>
        </dl>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-bold text-[#f4f0ff] transition-colors hover:border-[#ffb547] hover:bg-[#ffb547] hover:text-[#15112b]">
            Página do projeto <ExternalLink size={15} aria-hidden />
          </a>
        ) : (
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-[#f4f0ff]/50">
            Página do projeto em breve
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projetos" aria-labelledby="projects-title" className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="border-t-[3px] border-[#f4f0ff]/85 pt-8 sm:pt-10">
        <motion.div initial={reduce ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-[#ffb547] text-[#15112b] shadow-[4px_4px_0_#ff6b5e]"><Crown size={26} strokeWidth={2.5} aria-hidden /></span>
          <div>
            <p className="font-press text-[10px] text-[#62e3c8]">SELECT YOUR GAME</p>
            <h2 id="projects-title" className="font-press mt-2 text-3xl leading-tight text-[#f4f0ff] sm:text-4xl">Projetos</h2>
          </div>
        </motion.div>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-[#f4f0ff]/70">Uma coleção de mundos, sistemas e ideias que estou construindo um pixel de cada vez.</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
      </div>
    </section>
  );
}
