export type SkillCategory = {
  id: string
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'blockchain',
    label: 'Blockchain / Web3',
    skills: ['EVM Chains', 'Ethers.js', 'Web3.py', 'wagmi', 'Wallet Integration'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['FastAPI', 'Flask', 'Node.js', 'Django'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js'],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Solidity', 'SQL'],
  },
]
