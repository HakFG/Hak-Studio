import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { LikeButton } from "@/components/LikeButton";
import { formatPostDate, getPost, getSortedPosts } from "@/lib/posts";

export const instant = false;

type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSortedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post ? { title: `${post.title} | Hak`, description: post.excerpt } : { title: "Post não encontrado | Hak" };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[900px] px-4 pb-24 pt-28 sm:px-8 sm:pt-36">
      <Link href="/#blog" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-[#f4f0ff]/70 transition-colors hover:text-[#ffb547]"><ArrowLeft size={17} aria-hidden /> Voltar aos posts</Link>
      <article className="mt-12 overflow-hidden rounded-[2rem] border-2 border-white/15 bg-[#231b4d]/70 shadow-[0_32px_80px_-42px_rgba(0,0,0,1)]">
        <header className="relative overflow-hidden border-b border-white/15 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,107,94,.28),transparent_28%),radial-gradient(circle_at_84%_100%,rgba(98,227,200,.18),transparent_30%)]" />
          <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(244,240,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(244,240,255,.12) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#ff6b5e] text-[#15112b] shadow-[5px_5px_0_#ffb547]"><BookOpen size={28} aria-hidden /></div>
            <p className="font-press mt-8 text-[10px] text-[#62e3c8]">{post.category}</p>
            <div className="mt-4 flex items-center justify-center gap-3 text-[#f4f0ff]/70"><time dateTime={post.date} className="font-press text-[9px] text-[#ffb547]">{formatPostDate(post.date)}</time><span aria-hidden className="size-1 rounded-full bg-[#f4f0ff]/50" /><span className="inline-flex items-center gap-1.5 font-press text-[9px]"><Clock3 size={12} aria-hidden /> {post.readingTime} min de leitura</span></div>
            <h1 className="font-press mx-auto mt-7 max-w-3xl text-2xl leading-[1.7] text-[#f4f0ff] sm:text-3xl">{post.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#f4f0ff]/75">{post.excerpt}</p>
          </div>
        </header>
        <div className="article-content mx-auto max-w-3xl px-6 py-12 sm:px-12 sm:py-16" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <footer className="flex justify-center border-t border-white/15 bg-black/10 px-6 py-9"><LikeButton slug={post.slug} /></footer>
      </article>
    </main>
  );
}
