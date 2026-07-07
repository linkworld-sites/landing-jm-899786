import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return {
    title: `${page.title || slug} — JM`,
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-paper pt-28 md:pt-36 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="font-label text-xs uppercase tracking-[0.18em] text-ink/45 hover:text-rust transition-colors"
        >
          ← JM
        </Link>
        <article
          className="post-body font-label text-ink/80 text-base mt-12 [&_a]:text-rust [&_blockquote]:border-rust"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </main>
  );
}
