import { fetchProducts } from "@/lib/checkout";
import ShopClient from "@/components/ShopClient";
import { ShopTracker } from "@/components/ShopTracker";

export const metadata = {
  title: "Shop — JM Unikate",
  description: "Handbemalte Jeansjacken-Unikate. Jedes Stück ein Original aus dem Wiener Atelier.",
};

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-linen pt-28 md:pt-36 pb-24">
      <ShopTracker />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <span className="text-[11px] font-body uppercase tracking-[0.22em] text-sienna block mb-3">
            Shop
          </span>
          <h1 className="font-heading font-medium text-ink text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] mb-6">
            Einzelstücke
          </h1>
          <p className="font-body text-ink/60 text-base leading-relaxed">
            Jede Jacke wird einmal gemalt. Kein Stück wie das andere.
            Gefertigt und bemalt im Atelier, Wien.
          </p>
        </div>

        {/* Shop with cart */}
        <ShopClient products={products} />

        {/* Commission CTA */}
        <div className="mt-24 border-t border-ink/10 pt-12">
          <div className="max-w-lg">
            <p className="font-heading font-medium italic text-ink text-xl md:text-2xl mb-4">
              Nichts gefunden, das zu dir passt?
            </p>
            <p className="font-body text-ink/60 text-sm leading-relaxed mb-6">
              Ich male auch Auftragsarbeiten — deine Geschichte, dein Stück.
              Schreib mir.
            </p>
            <a
              href="/#commission"
              className="inline-block text-xs font-body uppercase tracking-[0.18em] text-sienna border-b border-sienna pb-0.5 hover:opacity-70 transition-opacity"
            >
              Anfrage stellen
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
