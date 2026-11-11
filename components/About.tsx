"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { useState } from "react";

const SOFTWARES = [
  { label: "Godot", image: "/images/godot.png", color: "#62e3c8" },
  { label: "GameMaker", image: "/images/gamemaker.png", color: "#ffb547" },
  { label: "Unity", image: "/images/unity.png", color: "#ff6b5e" },
];

const SKILLS = [
  "Pixel Art",
  "Animações",
  "Programação",
  "Game Design",
  "Level Design",
  "Prototipagem",
  "Narrativa para jogos",
  "Design de personagens",
  "Criação de cenários",
  "Resolução de problemas",
];

function AssetImage({ src, alt, color, label }: { src: string; alt: string; color: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span aria-hidden className="font-press grid size-9 place-items-center rounded-lg text-[10px]" style={{ backgroundColor: color, color: "#15112b" }}>{label.slice(0, 1)}</span>;
  }

  return <Image src={src} alt={alt} width={36} height={36} className="size-9 object-contain" onError={() => setFailed(true)} />;
}

export default function About() {
  const reduce = useReducedMotion();
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section id="sobre-mim" aria-labelledby="about-title" className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="border-t-[3px] border-[#f4f0ff]/85 pt-8 sm:pt-10">
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex justify-center">
          <div className="flex items-center gap-4">
            <motion.span animate={reduce ? undefined : { rotate: [0, 9, -7, 0], scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="text-[#ffb547]"><Sparkles size={42} strokeWidth={1.8} aria-hidden /></motion.span>
            <div><p className="font-press text-[10px] text-[#62e3c8]">PLAYER PROFILE</p><h2 id="about-title" className="font-press mt-2 text-3xl leading-tight text-[#f4f0ff] sm:text-4xl">Sobre Mim</h2></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(13rem,0.52fr)_minmax(0,1.48fr)] lg:gap-14">
        <motion.div initial={reduce ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="relative mx-auto w-full max-w-xs">
          <div aria-hidden className="absolute -inset-4 rounded-full border border-dashed border-[#62e3c8]/40 motion-safe:animate-[spin_20s_linear_infinite]" />
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-[#62e3c8] bg-[#231b4d] shadow-[0_0_0_8px_rgba(255,255,255,.06),0_0_55px_rgba(98,227,200,.2)]">
            {avatarFailed ? <span aria-hidden className="font-press grid h-full place-items-center text-6xl text-[#62e3c8]">K</span> : <Image src="/images/kayden.png" alt="Kayden, avatar de Hak" fill sizes="(min-width: 1024px) 28vw, 280px" className="object-contain" onError={() => setAvatarFailed(true)} />}
          </div>
          <span aria-hidden className="absolute -right-4 top-8 grid size-12 place-items-center rounded-xl bg-[#ff6b5e] text-[#15112b] shadow-[4px_4px_0_#ffb547]"><Sparkles size={22} /></span>
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="rounded-3xl border-2 border-white/15 bg-[#231b4d]/80 p-6 shadow-[0_24px_60px_-36px_rgba(0,0,0,.9)] backdrop-blur-sm sm:p-9 lg:p-10">
          <div className="mx-auto max-w-[68ch] space-y-5 text-left text-base font-normal leading-8 tracking-[0.005em] text-[#f4f0ff]/80 sm:text-lg sm:leading-9">
            <p>Olá, uso o codinome Hak como desenvolvedor. Atualmente atuo como Game Designer e Programador Full Stack.</p>
            <p>Estudo e aprendo na área de jogos há mais de um ano. A Godot é minha ferramenta principal, e também tenho experiência com GameMaker e Unity.</p>
            <p>Quero explorar ideias da forma mais viva possível. Criar jogos foi o caminho que encontrei para compartilhar mundos e construir uma comunidade aos poucos.</p>
            <p>Hoje sou estudante e freelancer. Se você gostou de algum projeto ou quer criar algo junto, minhas portas estão abertas.</p>
          </div>

          <div className="mt-9 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-press text-lg text-[#ffb547]">Softwares</h3>
              <ul className="mt-5 space-y-3" role="list">
                {SOFTWARES.map((software) => <li key={software.label} className="flex items-center gap-3 text-base font-bold text-[#f4f0ff]"><AssetImage src={software.image} alt={`Logo ${software.label}`} color={software.color} label={software.label} />{software.label}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-press text-lg text-[#ffb547]">Habilidades</h3>
              <ul className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 text-sm font-bold text-[#f4f0ff] sm:grid-cols-2" role="list">
                {SKILLS.map((skill) => <li key={skill} className="flex items-center gap-2"><span aria-hidden className="size-1.5 shrink-0 rounded-full bg-[#62e3c8]" />{skill}</li>)}
              </ul>
            </div>
          </div>

          <a href="#contatos" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#ffb547] px-5 py-3 text-sm font-extrabold text-[#15112b] shadow-[4px_4px_0_#ff6b5e] transition-transform hover:-translate-y-1 focus-visible:outline-none"><Download size={17} aria-hidden /> Baixe meu portfólio</a>
        </motion.div>
      </div>
    </section>
  );
}
