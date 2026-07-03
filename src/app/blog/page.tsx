import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Journal — JM",
  description: "Gedanken, Prozesse und Geschichten aus dem Atelier.",
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-linen pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-3">
            Journal
          </span>
          <h1 className="font-heading font-bold text-ink text-[clamp(2.5rem,6vw,4rem)] leading-[0.95]">
            Aus dem Atelier
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="font-body text-ink/50 italic">
            Neue Geschichten folgen — schau bald wieder vorbei.
          </p>
        ) : (
          <ul className="space-y-14">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  {p.date && (
                    <time className="text-xs font-body uppercase tracking-[0.18em] text-ink/40 block mb-3">
                      {p.date}
                    </time>
                  )}
                  <h2 className="font-heading font-bold text-ink text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] mb-3 group-hover:text-sienna transition-colors duration-300">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="font-body text-ink/60 text-base leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-xs font-body uppercase tracking-[0.18em] text-sienna">
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
