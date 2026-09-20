export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  priceMonthly: 29,
  priceYearly: 290,
  name: "FitCircle",
  slug: "fitness-community-platform",
  productId: "PROD_27owJZoGQFD9UfSyuZFhCE",
  yearlyProductId: "PROD_33co39UJds5tleBPJrXvha",
  checkoutUrl: "",
  tagline: "Build an engaged fitness community without the busywork",
  description: "AI-generated challenges, discussion prompts, and newsletters that keep your fitness community active, connected, and growing.",
  toolTitle: "Build your community plan",
  resultLabel: "Your community kit",
  ctaLabel: "Generate plan",
  features: [
  "30-day challenge generator",
  "Daily discussion prompts",
  "Weekly newsletter drafts",
  "Member spotlight ideas"
],
  inputs: [
  {
    "key": "community_niche",
    "label": "Community niche",
    "type": "input",
    "placeholder": "e.g. Runners training for their first 5K"
  },
  {
    "key": "size",
    "label": "Community size",
    "type": "select",
    "options": [
      "Under 50",
      "50-500",
      "500+"
    ]
  },
  {
    "key": "goal",
    "label": "Primary goal",
    "type": "select",
    "options": [
      "Engagement",
      "Retention",
      "Growth"
    ]
  },
  {
    "key": "tone",
    "label": "Tone",
    "type": "select",
    "options": [
      "Motivational",
      "Casual",
      "Expert"
    ]
  }
] as InputField[],
  definitionLead: "FitCircle keeps a fitness community active with AI-generated 30-day challenges, daily discussion prompts, weekly newsletter drafts, and member spotlight ideas — without the busywork.",
  geoFaq: [
    { q: "What is FitCircle?", a: "FitCircle is a fitness community platform that uses AI to generate challenges, discussion prompts, newsletters, and member spotlights." },
    { q: "What does it generate?", a: "A 30-day challenge generator, daily discussion prompts, weekly newsletter drafts, and member spotlight ideas." },
    { q: "Do I still write posts?", a: "It drafts the content; you review and post, which removes the daily blank-page friction." },
    { q: "Who should use FitCircle?", a: "Community managers and fitness creators who want consistent engagement without hand-writing every post." },
    { q: "How does it help growth?", a: "Steady prompts and member spotlights drive the engagement and social proof that grow a community." },
    { q: "Is it only for fitness?", a: "It is built for fitness communities specifically, with challenge and spotlight flows tuned to that audience." },
  ],
  systemPrompt: "You are an expert fitness community manager. Based on the niche, size, goal, and tone, produce a 30-day engagement plan: a kickoff challenge, 7 daily discussion prompts, a weekly newsletter draft, and 3 member-spotlight ideas. Use the given tone. Output clear markdown sections with no preamble.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "1 plan/month, motivational tone"
  },
  {
    "tier": "Starter",
    "price": "$19/mo",
    "desc": "Unlimited plans, all tones, newsletter drafts"
  },
  {
    "tier": "Pro",
    "price": "$49/mo",
    "desc": "Brand kit, scheduling, API access"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const n = inputs['community_niche'] || 'your fitness community'
  const s = inputs['size'] || 'Under 50'
  const g = inputs['goal'] || 'Engagement'
  const t = inputs['tone'] || 'Motivational'
  return `**FitCircle 30-Day Community Plan**  (${t} tone)
For: ${n}
Size: ${s}  |  Goal: ${g}

**Kickoff Challenge**
"7-Day Starter Streak" — members post one win daily. Prize: shoutout + badge.

**Daily Discussion Prompts (sample week)**
1. What's your top goal this month?
2. Share your favorite recovery tip.
3. Post a photo of today's workout.
4. Biggest obstacle right now?
5. A habit you're building.
6. Weekend plans to stay active?
7. One thing you're proud of.

**Weekly Newsletter Draft**
Subject: Your weekly ${n} wins & what's next
Hey team — 3 highlights, 1 challenge, 1 ask. Keep it short, keep it real.

**Member Spotlights**
1. Newcomer of the week  2. Consistency king/queen  3. Transformation story

---
(Tone: ${t} | This is a mock demo. Add OPENAI_API_KEY for real generation.)`
}
}
