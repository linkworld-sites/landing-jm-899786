import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getSiteMeta } from "@/lib/site-meta";

const SITE_URL = "https://9f0e90d0.run.linkworld.ai";

export const metadata: Metadata = {
  title: "JM — Handbemalte Jeansjacken-Unikate aus Wien",
  description:
    "Jede Jacke ein Unikat. Handbemalte Denim-Einzelstücke und Auftragsarbeiten aus dem Atelier Wien — von einem Künstler, für eine Person.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const { faq } = getSiteMeta();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Handbemalte Jeansjacke — Auftragsarbeit",
    description:
      "Vollständig handbemalte Denim-Jacke, individuell nach deiner Geschichte gestaltet, signiert und datiert. Jedes Design entsteht nur einmal (0/1).",
    brand: { "@type": "Brand", name: "JM" },
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#anfrage-form`,
      priceCurrency: "EUR",
      availability: "https://schema.org/MadeToOrder",
      areaServed: "AT",
    },
  };

  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <HomeClient faq={faq} />
    </>
  );
}
