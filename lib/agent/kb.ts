import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What FitCircle does",
    keywords: ["FitCircle", "fitness-community-platform", "what", "product", "about", "Build an engaged fitness community without the busywork"],
    body: "Build an engaged fitness community without the busywork. FitCircle keeps a fitness community active with AI-generated 30-day challenges, daily discussion prompts, weekly newsletter drafts, and member spotlight ideas — without the busywork.",
    source: "FitCircle product definition",
    tags: [],
  },
  {
    id: "features",
    title: "FitCircle features",
    keywords: ["features", "feature", "can", "does", "30-day challenge generator", "Daily discussion prompts", "Weekly newsletter drafts", "Member spotlight ideas"],
    body: "FitCircle includes: 30-day challenge generator; Daily discussion prompts; Weekly newsletter drafts; Member spotlight ideas. It does not add capabilities that are not listed here.",
    source: "FitCircle feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "FitCircle pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for FitCircle: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "FitCircle pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use FitCircle",
    keywords: ["how", "start", "use", "tool", "run", "Build your community plan"],
    body: "Open FitCircle and use Build your community plan. The form asks for: Community niche; Community size; Primary goal; Tone.",
    source: "FitCircle tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is FitCircle?",
    keywords: ["What", "is", "FitCircle?"],
    body: "FitCircle is a fitness community platform that uses AI to generate challenges, discussion prompts, newsletters, and member spotlights.",
    source: "FitCircle FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What does it generate?",
    keywords: ["What", "does", "it", "generate?"],
    body: "A 30-day challenge generator, daily discussion prompts, weekly newsletter drafts, and member spotlight ideas.",
    source: "FitCircle FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Do I still write posts?",
    keywords: ["Do", "I", "still", "write", "posts?"],
    body: "It drafts the content; you review and post, which removes the daily blank-page friction.",
    source: "FitCircle FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about FitCircle are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "FitCircle support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
