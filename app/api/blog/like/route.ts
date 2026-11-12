import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { getSortedPosts } from "@/lib/posts";

function isValidSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9-]+$/.test(value);
}

function getRedis() {
  return Redis.fromEnv();
}

function postExists(slug: string) {
  return getSortedPosts().some((post) => post.slug === slug);
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!isValidSlug(slug) || !postExists(slug)) return NextResponse.json({ ok: false }, { status: 404 });

  try {
    const likes = (await getRedis().get<number>(`blog:likes:${slug}`)) ?? 0;
    return NextResponse.json({ likes });
  } catch {
    return NextResponse.json({ likes: 0 });
  }
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (!isValidSlug(slug) || !postExists(slug)) return NextResponse.json({ ok: false }, { status: 404 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const userAgent = request.headers.get("user-agent") ?? "";
    const visitorId = createHash("sha256")
      .update(`${ip}:${userAgent}:${process.env.HASH_SALT ?? ""}`)
      .digest("hex")
      .slice(0, 24);
    const redis = getRedis();
    const added = await redis.sadd(`blog:visitors:${slug}`, visitorId);
    const likes = added === 1
      ? await redis.incr(`blog:likes:${slug}`)
      : (await redis.get<number>(`blog:likes:${slug}`)) ?? 0;

    return NextResponse.json({ likes, alreadyLiked: added !== 1 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
