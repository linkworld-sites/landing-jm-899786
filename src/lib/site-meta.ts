import fs from "fs";
import path from "path";

export interface OrganizationMeta {
  name: string;
  description: string;
  foundingDate?: string;
  addressLocality?: string;
  addressCountry?: string;
  priceRange?: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface SiteMeta {
  organization: OrganizationMeta;
  faq: FaqEntry[];
}

const FILE = path.join(process.cwd(), "content", "site-meta.json");

const FALLBACK: SiteMeta = { organization: { name: "JM", description: "" }, faq: [] };

export function getSiteMeta(): SiteMeta {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as SiteMeta;
  } catch {
    return FALLBACK;
  }
}
