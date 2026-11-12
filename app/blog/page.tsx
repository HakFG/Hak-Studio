import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { formatPostDate, getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog | Hak" };

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[1120px] px-4 pb-24 pt-28 sm:px-8 sm:pt-36">
      <Link href="/#blog" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-[#f4f0ff]/70 transition-colors hover:text-[#ffb547]"><ArrowLeft size={17} aria-hidden /> Voltar ao portfólio</Link>
      <header className="mt-12 border-t-[3px] border-[#f4f0ff]/85 pt-10">
        <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-xl bg-[#ff6b5e] text-[#15112b] shadow-[4px_4px_0_#ffb547]"><BookOpen size={25} aria-hidden /></span><div><p className="font-press text-[10px] text-[#62e3c8]">DEVLOG ARCHIVES</p><h1 className="font-press mt-2 text-3xl leading-tight text-[#f4f0ff] sm:text-4xl">Blog</h1></div></div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#f4f0ff]/70">Todas as anotações e histórias que fazem parte da construção do meu caminho como desenvolvedor.</p>
      </header>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {posts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border-2 border-white/15 bg-[#231b4d]/75 p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-[#ffb547]/70"><time dateTime={post.date} className="font-press text-[9px] text-[#ffb547]">{formatPostDate(post.date)} · {post.category}</time><h2 className="font-press mt-4 text-xl leading-relaxed text-[#f4f0ff]">{post.title}</h2><p className="mt-4 leading-7 text-[#f4f0ff]/70">{post.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f4f0ff] group-hover:text-[#ffb547]">Ler post <ArrowUpRight size={16} aria-hidden /></span></Link>)}
      </div>
    </main>
  );
}
