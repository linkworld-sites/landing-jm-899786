import { fetchProducts } from "@/lib/checkout";
import ShopClient from "@/components/ShopClient";
import { ShopTracker } from "@/components/ShopTracker";

export const metadata = {
  title: "Shop — JM Unikate",
  description: "Handbemalte Jeansjacken-Unikate. Jedes Stück ein Original aus dem Wiener Atelier.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-paper pt-28 md:pt-36 pb-24">
      <ShopTracker />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <span className="font-label text-[11px] uppercase tracking-[0.22em] text-rust block mb-3">
            Shop
          </span>
          <h1 className="font-display font-light text-ink text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] mb-6">
            Einzelstücke
          </h1>
          <p className="font-label text-ink/60 text-base leading-relaxed">
            Jede Jacke wird einmal gemalt. Kein Stück wie das andere.
            Gefertigt und bemalt im Atelier, Wien.
          </p>
        </div>

        {/* Shop with cart */}
        <div className="text-ink [&_button]:rounded-full [&_button]:uppercase [&_button]:tracking-[0.1em] [&_h3]:font-label">
          <ShopClient products={products} />
        </div>

        {/* Commission CTA */}
        <div className="mt-24 border-t border-ink/10 pt-12">
          <div className="max-w-lg">
            <p className="font-display font-light text-ink text-2xl md:text-3xl mb-4 leading-[1]">
              Nichts gefunden, das zu dir passt?
            </p>
            <p className="font-label text-ink/60 text-sm leading-relaxed mb-6">
              Ich male auch Auftragsarbeiten — deine Geschichte, dein Stück.
              Schreib mir.
            </p>
            <a
              href="/#anfrage"
              className="inline-block font-label text-xs uppercase tracking-[0.18em] text-rust border-b border-rust pb-0.5 hover:opacity-70 transition-opacity"
            >
              Anfrage stellen
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
