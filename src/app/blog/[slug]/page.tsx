import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircleQuestion } from "lucide-react";
import { getPost, getPosts } from "@/lib/posts";

const SITE_URL = "https://9f0e90d0.run.linkworld.ai";

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
  return {
    title: `${post.title} — JM Journal`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: { "@type": "Person", name: "JM" },
    publisher: { "@type": "Organization", name: "JM" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-paper pt-28 md:pt-36 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link
          href="/blog"
          className="font-label text-xs uppercase tracking-[0.18em] text-ink/45 hover:text-rust transition-colors"
        >
          ← Journal
        </Link>

        <div className="mt-10 mb-12">
          {post.date && (
            <time className="font-label text-xs uppercase tracking-[0.18em] text-ink/40 block mb-4">
              {post.date}
            </time>
          )}
          <h1 className="font-display font-light text-ink text-[clamp(2rem,7vw,4rem)] leading-[1] mb-4">
            {post.title}
          </h1>
          {post.description && (
            <p className="font-label text-ink/55 text-lg leading-relaxed italic">
              {post.description}
            </p>
          )}
        </div>

        <article
          className="post-body font-label text-ink/80 text-base [&_a]:text-rust [&_blockquote]:border-rust"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.faq.length > 0 && (
          <div className="mt-16 pt-8 border-t border-ink/10">
            <span className="mb-6 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.22em] text-rust">
              <MessageCircleQuestion className="h-3 w-3" strokeWidth={1.5} aria-hidden />
              Häufige Fragen
            </span>
            <div className="space-y-6">
              {post.faq.map((f) => (
                <div key={f.question}>
                  <h3 className="font-label text-base font-semibold text-ink mb-1.5">
                    {f.question}
                  </h3>
                  <p className="font-label text-sm leading-relaxed text-ink/65">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-ink/10">
          <Link
            href="/blog"
            className="font-label text-xs uppercase tracking-[0.18em] text-ink/45 hover:text-rust transition-colors"
          >
            ← Alle Beiträge
          </Link>
        </div>
      </div>
    </main>
  );
}
