"use client";

import { motion, useReducedMotion } from "framer-motion";

type Social = { label: string; href?: string; icon: React.ReactNode; color: string };

const SOCIALS: Social[] = [
  { label: "X", href: "https://x.com/hak_1227", color: "#f4f0ff", icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current"><path d="M18.9 2.5H22l-6.8 7.8 8 10.6h-6.2l-4.9-6.4-5.6 6.4H3.4l6.3-7.2-7.7-10.2h6.4l4.4 5.8 5.1-5.8Zm-1.1 16.5h1.7L7.5 4.2H5.7L17.8 19Z" /></svg> },
  { label: "Instagram", href: "https://www.instagram.com/hakfg_1227?rpxt=aTdteWJyZXc4amli", color: "#ff6b5e", icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg> },
  { label: "GitHub", color: "#9f92c9", icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.3-.3-4.8-1.1-4.8-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.8 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fernando-portela-a2546530a/", color: "#62e3c8", icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current"><path d="M4.7 3.5A1.7 1.7 0 1 1 4.7 7a1.7 1.7 0 0 1 0-3.5ZM3.2 8.5h3v12h-3v-12Zm4.9 0H11v1.6h.1c.4-.8 1.5-2 3.2-2 3.4 0 4 2.2 4 5.2v7.2h-3v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.5h-3v-12Z" /></svg> },
  { label: "YouTube", href: "https://www.youtube.com/@CallHak", color: "#ff6b5e", icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg> },
];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contatos" aria-labelledby="contact-title" className="border-t-2 border-white/15 bg-[#0d0a1d]/85 px-4 py-20 sm:px-8 sm:py-24">
      <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-press text-[10px] text-[#62e3c8]">OPEN CHANNEL</p>
        <h2 id="contact-title" className="font-press mt-4 text-3xl text-[#f4f0ff] sm:text-4xl">Me Contate!</h2>
        <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#f4f0ff]/75">Vamos conversar sobre projetos, oportunidades ou qualquer ideia que mereça ganhar vida em um jogo.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {SOCIALS.map((social, index) => social.href ? <motion.a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Acessar ${social.label} de Hak`} initial={reduce ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reduce ? 0 : 0.08 * index }} whileHover={reduce ? undefined : { y: -5, scale: 1.08 }} whileTap={reduce ? undefined : { scale: 0.94 }} className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/5 transition-colors hover:border-white/35" style={{ color: social.color }}>{social.icon}</motion.a> : <span key={social.label} title="GitHub em breve" aria-label="GitHub em breve" className="grid size-14 cursor-not-allowed place-items-center rounded-2xl border border-white/10 bg-white/[0.03] opacity-50" style={{ color: social.color }}>{social.icon}</span>)}
        </div>
        <p className="font-press mt-10 text-[9px] text-[#ffb547]">RESPONDO ASSIM QUE POSSÍVEL_</p>
      </motion.div>
    </section>
  );
}
