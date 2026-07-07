import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Journal — JM",
  description: "Gedanken, Prozesse und Geschichten aus dem Atelier.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-paper pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="font-label text-[11px] uppercase tracking-[0.22em] text-rust block mb-3">
            Journal
          </span>
          <h1 className="font-display font-light text-ink text-[clamp(2.5rem,8vw,5rem)] leading-[0.95]">
            Aus dem Atelier
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="font-label text-ink/50 italic">
            Neue Geschichten folgen — schau bald wieder vorbei.
          </p>
        ) : (
          <ul className="space-y-14">
            {posts.map((p) => (
              <li key={p.slug} className="border-t border-ink/10 pt-10 first:border-0 first:pt-0">
                <Link href={`/blog/${p.slug}`} className="group block">
                  {p.date && (
                    <time className="font-label text-xs uppercase tracking-[0.18em] text-ink/40 block mb-3">
                      {p.date}
                    </time>
                  )}
                  <h2 className="font-display font-light text-ink text-[clamp(1.75rem,4vw,2.75rem)] leading-[1] mb-3 group-hover:text-rust transition-colors duration-300">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="font-label text-ink/60 text-base leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  <span className="mt-4 inline-block font-label text-xs uppercase tracking-[0.18em] text-rust">
                    Lesen →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
