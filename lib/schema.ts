// Shared rule/result types for deterministic domain rulesets.
// Mirrors the factory-standard schema used across micro-SaaS verticals.

export type RuleCategory = 'compliance' | 'claims' | 'safety'

export interface RuleResult {
  ruleId: string
  name: string
  passed: boolean
  message: string
  category: RuleCategory
  severity: 'low' | 'medium' | 'high'
  regulation?: string
}

export interface Finding {
  id?: string
  title: string
  severity: 'low' | 'medium' | 'high'
  evidence?: string
  remediation?: string
  source?: 'Rule-based' | 'Model-assisted'
}

// --- GEO JSON-LD helpers (server-side Head injection) ---
export interface FaqItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  }
}

export function buildHowToJsonLd(name: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
