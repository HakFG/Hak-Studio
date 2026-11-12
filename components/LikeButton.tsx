"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type LikeResponse = { likes?: number; alreadyLiked?: boolean };

export function LikeButton({ slug }: { slug: string }) {
  const reduce = useReducedMotion();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/like?slug=${encodeURIComponent(slug)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data: LikeResponse | null) => {
        if (typeof data?.likes === "number") setLikes(data.likes);
      })
      .catch(() => undefined);
  }, [slug]);

  async function handleLike() {
    if (liked || loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data: LikeResponse = await response.json();
      if (response.ok && typeof data.likes === "number") {
        setLikes(data.likes);
        setLiked(true);
      }
    } catch {
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <motion.button
      type="button"
      onClick={handleLike}
      disabled={liked || loading}
      whileTap={reduce || liked ? undefined : { scale: 0.95 }}
      className={`group inline-flex min-h-12 items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none disabled:cursor-default ${
        liked
          ? "border-[#ff6b5e] bg-[#ff6b5e]/15 text-[#ff8d83]"
          : "border-white/15 bg-white/5 text-[#f4f0ff] hover:border-[#ff6b5e] hover:text-[#ff8d83]"
      }`}
      aria-label={liked ? "Você já curtiu este post" : "Curtir este post"}
    >
      <Heart size={19} fill={liked ? "currentColor" : "none"} className="transition-transform group-hover:scale-110" aria-hidden />
      {loading ? "Curtindo..." : `${likes} ${likes === 1 ? "curtida" : "curtidas"}`}
    </motion.button>
  );
}
