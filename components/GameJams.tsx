"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, Trophy } from "lucide-react";

export default function GameJams() {
  const reduce = useReducedMotion();

  return (
    <section id="games-jam" aria-labelledby="jams-title" className="relative mx-auto min-h-[70vh] w-full max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="border-t-[3px] border-[#f4f0ff]/85 pt-8 sm:pt-10">
        <motion.div initial={reduce ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-[#62e3c8] text-[#15112b] shadow-[4px_4px_0_#3a2d7a]"><Trophy size={26} strokeWidth={2.5} aria-hidden /></span>
          <div>
            <p className="font-press text-[10px] text-[#ffb547]">TIME ATTACK MODE</p>
            <h2 id="jams-title" className="font-press mt-2 text-3xl leading-tight text-[#f4f0ff] sm:text-4xl">Games Jam</h2>
          </div>
        </motion.div>
      </div>

      <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease: "easeOut" }} className="mx-auto mt-16 flex max-w-3xl flex-col items-center rounded-3xl border-2 border-dashed border-white/20 bg-[#231b4d]/60 px-6 py-14 text-center backdrop-blur-sm sm:mt-20 sm:px-12 sm:py-20">
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, -3, 3, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} className="grid size-20 place-items-center rounded-2xl border-2 border-[#ffb547]/60 bg-[#15112b] text-[#ffb547] shadow-[6px_6px_0_#ff6b5e]"><Gamepad2 size={35} aria-hidden /></motion.div>
        <h3 className="font-press mt-10 text-xl leading-relaxed text-[#f4f0ff] sm:text-2xl">Ainda sem nenhuma participação de jam.</h3>
        <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#f4f0ff]/70">Quando a primeira aventura de tempo limitado começar, ela vai aparecer aqui.</p>
        <span className="font-press mt-8 text-[10px] text-[#62e3c8]">STATUS: PREPARANDO O INVENTÁRIO_</span>
      </motion.div>
    </section>
  );
}
