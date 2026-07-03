import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — JM Journal`, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-linen pt-28 md:pt-36 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link
          href="/blog"
          className="text-xs font-body uppercase tracking-[0.18em] text-ink/45 hover:text-sienna transition-colors"
        >
          ← Journal
        </Link>

        <div className="mt-10 mb-12">
          {post.date && (
            <time className="text-xs font-body uppercase tracking-[0.18em] text-ink/40 block mb-4">
              {post.date}
            </time>
          )}
          <h1 className="font-heading font-bold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] mb-4">
            {post.title}
          </h1>
          {post.description && (
            <p className="font-body text-ink/55 text-lg leading-relaxed italic">
              {post.description}
            </p>
          )}
        </div>

        <article
          className="post-body font-body text-ink/80 text-base"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-16 pt-8 border-t border-ink/10">
          <Link
            href="/blog"
            className="text-xs font-body uppercase tracking-[0.18em] text-ink/45 hover:text-sienna transition-colors"
          >
            ← Alle Beiträge
          </Link>
        </div>
      </div>
    </main>
  );
}
