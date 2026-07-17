export type ExperienceEntry = {
  id: string
  type: 'work' | 'education'
  title: string
  org: string
  period: string
  bullets: string[]
  link?: string
}

export const experience: ExperienceEntry[] = [
  {
    id: 'heyelsa-parttime',
    type: 'work',
    title: 'Web3 Engineering Intern (Part-time)',
    org: 'Heyelsa.ai',
    period: 'Jan 2026 — Jun 2026',
    bullets: [
      'Continuing Web3 engineering work part-time alongside final-year coursework',
      'Maintaining and extending Sui wallet connectivity and staking integrations shipped during the full-time internship',
    ],
    link: 'https://www.heyelsa.ai/',
  },
  {
    id: 'heyelsa-intern',
    type: 'work',
    title: 'Web3 Engineering Intern',
    org: 'Heyelsa.ai',
    period: 'Jun 2025 — Dec 2025',
    bullets: [
      'Integrated the Sui blockchain for wallet connectivity and staking flows in production',
      'Built and deployed smart contracts on Base Sepolia',
      'Shipped full-stack dApps combining on-chain logic with backend infrastructure',
    ],
    link: 'https://www.heyelsa.ai/',
  },
  {
    id: 'psg-education',
    type: 'education',
    title: 'Integrated MSc, Software Systems',
    org: 'PSG College of Technology, Coimbatore',
    period: 'Final Year',
    bullets: [
      'Built a blockchain from scratch in Python — proof-of-work consensus, ECDSA wallets, and Merkle trees — before touching any framework',
      'Focus areas: distributed systems, backend engineering, and applied Web3',
    ],
  },
]
