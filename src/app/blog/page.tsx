import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Journal — JM",
  description: "Gedanken, Prozesse und Geschichten aus dem Atelier.",
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-noir pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid block mb-3">
            Journal
          </span>
          <h1 className="font-display uppercase text-paper text-[clamp(2.5rem,8vw,5rem)] leading-[0.85]">
            Aus dem Atelier
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="font-label text-paper/50 italic">
            Neue Geschichten folgen — schau bald wieder vorbei.
          </p>
        ) : (
          <ul className="space-y-14">
            {posts.map((p) => (
              <li key={p.slug} className="border-t border-paper/10 pt-10 first:border-0 first:pt-0">
                <Link href={`/blog/${p.slug}`} className="group block">
                  {p.date && (
                    <time className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40 block mb-3">
                      {p.date}
                    </time>
                  )}
                  <h2 className="font-display uppercase text-paper text-[clamp(1.75rem,4vw,2.75rem)] leading-[0.9] mb-3 group-hover:text-acid transition-colors duration-300">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="font-label text-paper/60 text-base leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-acid">
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
