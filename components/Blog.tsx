import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { formatPostDate, getSortedPosts } from "@/lib/posts";

const accents = {
  coral: "from-[#ff6b5e]/35 via-[#231b4d] to-[#15112b]",
  sun: "from-[#ffb547]/35 via-[#231b4d] to-[#15112b]",
  mint: "from-[#62e3c8]/35 via-[#231b4d] to-[#15112b]",
};

export default function Blog() {
  const posts = getSortedPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <section id="blog" aria-labelledby="blog-title" className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="border-t-[3px] border-[#f4f0ff]/85 pt-8 sm:pt-10">
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-[#ff6b5e] text-[#15112b] shadow-[4px_4px_0_#ffb547]"><BookOpen size={25} strokeWidth={2.6} aria-hidden /></span>
          <div>
            <p className="font-press text-[10px] text-[#62e3c8]">DEVLOG ARCHIVES</p>
            <h2 id="blog-title" className="font-press mt-2 text-3xl leading-tight text-[#f4f0ff] sm:text-4xl">Blog</h2>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-base font-semibold leading-relaxed text-[#f4f0ff]/70">Os seis devlogs mais recentes sobre desenvolvimento, aprendizados e bastidores dos jogos que estou criando.</p>
          <Link href="/blog" className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-lg border border-white/15 px-4 py-2 text-sm font-bold text-[#f4f0ff] transition-colors hover:border-[#ffb547] hover:bg-[#ffb547] hover:text-[#15112b]">Ver todos os posts <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {latestPosts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex min-h-80 flex-col overflow-hidden rounded-3xl border-2 border-white/15 bg-[#231b4d]/75 p-4 shadow-[0_18px_45px_-28px_rgba(0,0,0,.9)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_30px_55px_-28px_rgba(255,107,94,.5)]">
            <div className={`relative min-h-32 overflow-hidden rounded-2xl bg-gradient-to-br ${accents[post.accent ?? "mint"]} p-5`}>
              <span className="font-press text-[9px] text-[#f4f0ff]/75">{String(index + 1).padStart(2, "0")}</span>
              <span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-[#f4f0ff]/80 shadow-[0_0_16px_#f4f0ff]" />
              <p className="font-press absolute bottom-5 left-5 text-[10px] text-[#f4f0ff]">{post.category}</p>
            </div>
            <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
              <time dateTime={post.date} className="font-press text-[9px] text-[#ffb547]">{formatPostDate(post.date)}</time>
              <h3 className="font-press mt-4 text-lg leading-relaxed text-[#f4f0ff]">{post.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#f4f0ff]/70">{post.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#f4f0ff] transition-colors group-hover:text-[#ffb547]">Ler post <ArrowUpRight size={16} aria-hidden /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
