/**
 * Deterministic community-governance rules for fitness-community-platform.
 * Rule-based (no LLM) tagging with stable ids + real refs.
 *
 * Research-augmented (RAD) against:
 *  - EU DSA (Reg. 2022/2065) — moderation / illegal-content notice
 *  - GDPR — UGC consent, data portability
 *  - FTC — no medical advice in community content
 */
export const RULESET_ID = 'fitness-community'
export const RULESET_VERSION = '2026-07-20'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export interface Rule {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  ref: string
  check: (content: string, context?: Record<string, string>) => RuleResult
}

const rules: Rule[] = [
  {
    ruleId: 'FC-01',
    name: 'Moderation / harassment policy present',
    category: 'moderation',
    severity: 'high',
    ref: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act',
    check: (content) => {
      const passed = /(moderation|community guidelines|no harassment|report abuse|anti-harassment)/i.test(content)
      return {
        ruleId: 'FC-01',
        name: 'Moderation / harassment policy present',
        category: 'moderation',
        severity: 'high',
        passed,
        message: passed
          ? 'Moderation/harassment policy present (EU DSA Art.14).'
          : 'Add a moderation / anti-harassment policy (EU DSA Art.14).',
        ref: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act',
      }
    },
  },
  {
    ruleId: 'FC-02',
    name: 'UGC repost consent',
    category: 'consent',
    severity: 'high',
    ref: 'https://gdpr-info.eu/art-6/',
    check: (content) => {
      const passed = /(permission|consent|you grant us a licence|by posting you agree)/i.test(content)
      return {
        ruleId: 'FC-02',
        name: 'UGC repost consent',
        category: 'consent',
        severity: 'high',
        passed,
        message: passed
          ? 'UGC licence/consent language present (GDPR Art.6).'
          : 'Add UGC licence/consent language before reposting user content (GDPR Art.6).',
        ref: 'https://gdpr-info.eu/art-6/',
      }
    },
  },
  {
    ruleId: 'FC-03',
    name: 'No medical advice in community posts',
    category: 'safety',
    severity: 'high',
    ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
    check: (content) => {
      const medical = /(diagnose|prescribe|cure your|treatment plan)/i.test(content)
      const passed = !medical
      return {
        ruleId: 'FC-03',
        name: 'No medical advice in community posts',
        category: 'safety',
        severity: 'high',
        passed,
        message: passed
          ? 'No medical-advice language detected (FTC health claims).'
          : 'Remove medical-advice language; redirect to a professional (FTC).',
        ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
      }
    },
  },
  {
    ruleId: 'FC-04',
    name: 'Age gating for minors',
    category: 'safety',
    severity: 'medium',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/children-online-privacy-protection-rule-coppa',
    check: (content) => {
      const passed = /(13 years|age verification|parental consent|minimum age)/i.test(content)
      return {
        ruleId: 'FC-04',
        name: 'Age gating for minors',
        category: 'safety',
        severity: 'medium',
        passed,
        message: passed
          ? 'Minor age-gating present (COPPA).'
          : 'Add age-gating / minimum-age notice (COPPA).',
        ref: 'https://www.ftc.gov/legal-library/browse/rules/children-online-privacy-protection-rule-coppa',
      }
    },
  },
  {
    ruleId: 'FC-05',
    name: 'Hate-speech / discrimination prohibition',
    category: 'fairness',
    severity: 'high',
    ref: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act',
    check: (content) => {
      const passed = /(no hate speech|no discrimination|inclusive|zero tolerance)/i.test(content)
      return {
        ruleId: 'FC-05',
        name: 'Hate-speech / discrimination prohibition',
        category: 'fairness',
        severity: 'high',
        passed,
        message: passed
          ? 'Anti-discrimination / inclusive-language policy present (DSA).'
          : 'State a no-hate-speech / non-discrimination policy (DSA).',
        ref: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act',
      }
    },
  },
  {
    ruleId: 'FC-06',
    name: 'Data portability notice',
    category: 'privacy',
    severity: 'low',
    ref: 'https://gdpr-info.eu/art-20/',
    check: (content) => {
      const passed = /(export your data|data portability|download your (posts|content))/i.test(content)
      return {
        ruleId: 'FC-06',
        name: 'Data portability notice',
        category: 'privacy',
        severity: 'low',
        passed,
        message: passed
          ? 'Data-portability / export notice present (GDPR Art.20).'
          : 'Offer data export / portability to users (GDPR Art.20).',
        ref: 'https://gdpr-info.eu/art-20/',
      }
    },
  },
]

export function runAllRules(content: string, context?: Record<string, string>): RuleResult[] {
  return rules.map((r) => r.check(content, context))
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}
