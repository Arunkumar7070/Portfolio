export type Project = {
  id: string
  name: string
  tagline: string
  period?: string
  whatItDoes: string
  functionality?: string
  stack: string[]
  status: 'deployed' | 'in-progress'
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'warrantyvault',
    name: 'WarrantyVault',
    tagline: 'Decentralized Warranty Management',
    period: 'Feb — Mar 2026',
    whatItDoes:
      'A decentralized application (dApp) that replaces traditional paper warranties with secure, tamper-proof digital records stored on the Base Sepolia blockchain.',
    functionality:
      'Users connect a MetaMask wallet to register a warranty on-chain via the WarrantyRegistry.sol smart contract, verify its status anytime, transfer ownership peer-to-peer, and store the original invoice permanently on IPFS through Pinata.',
    stack: [
      'Solidity',
      'Hardhat',
      'Ethers.js',
      'FastAPI',
      'Web3.py',
      'MongoDB Atlas',
      'React',
      'TypeScript',
      'Pinata/IPFS',
    ],
    status: 'deployed',
    links: [
      { label: 'GitHub', href: 'https://github.com/Arunkumar7070/WarrantyVault' },
      { label: 'Live', href: 'https://warranty-vault-631l.vercel.app' },
    ],
  },
  {
    id: 'docuflow',
    name: 'DocuFlow',
    tagline: 'Backend SaaS for Document Processing',
    period: 'Oct — Nov 2025',
    whatItDoes:
      'A backend-as-a-service platform that lets developers upload documents and automatically extract text from them via OCR, without managing their own processing infrastructure.',
    functionality:
      'A user uploads a file and instantly gets back a tracking job ID while OCR runs in the background on Celery workers; they can then poll job status, retrieve extracted text, and authenticate as either a human user (JWT) or a developer (hashed API key), all served from a Redis-cached, PostgreSQL-backed API.',
    stack: [
      'Python',
      'FastAPI',
      'Celery',
      'Redis',
      'PostgreSQL',
      'SQLAlchemy (Async)',
      'Alembic',
      'Docker',
      'Cloudinary',
      'PyTesseract',
    ],
    status: 'deployed',
    links: [
      { label: 'GitHub', href: 'https://github.com/Arunkumar7070/DocuFlow' },
      { label: 'API Docs', href: 'https://docuflow-9smq.onrender.com/docs' },
    ],
  },
  {
    id: 'querywhisper',
    name: 'QueryWhisper',
    tagline: 'AI Natural-Language-to-SQL Engine',
    period: 'May — Jun 2025',
    whatItDoes:
      'A web application that lets users query a database using plain English instead of writing SQL themselves.',
    functionality:
      "A user types a question in natural language; the app reads the connected database's live schema, generates the correct SQL for that specific engine (MySQL, PostgreSQL, SQLite, or SQL Server) via the Groq LLaMA-3.3-70B model, and executes it — restricting write operations (INSERT/UPDATE/DELETE) to admin accounts only.",
    stack: ['Flask', 'LangChain', 'Groq API (LLaMA-3.3-70B)', 'SQLAlchemy', 'MongoDB', 'Docker'],
    status: 'deployed',
    links: [
      { label: 'GitHub', href: 'https://github.com/Arunkumar7070/Querywhisper' },
      { label: 'Live', href: 'https://querywhisper-pgft.onrender.com' },
    ],
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    tagline: 'Personal Finance & Budgeting Web App',
    whatItDoes:
      'A personal finance management web application for securely tracking expenses, setting budget limits, and generating spending reports, with MySQL storing and managing all user and financial data.',
    stack: ['Flask', 'Python', 'HTML/CSS', 'MySQL'],
    status: 'deployed',
    links: [{ label: 'GitHub', href: 'https://github.com/Arunkumar7070/Expense_tracker' }],
  },
  {
    id: 'syncswift',
    name: 'SyncSwift',
    tagline: 'Scheduling & Booking Automation',
    whatItDoes:
      'A scheduling app that streamlines meeting management, availability tracking, and booking automation, with secure authentication, customizable booking links, and seamless calendar and Google Meet integration in real time.',
    stack: ['Next.js', 'Prisma', 'Neon DB'],
    status: 'deployed',
    links: [{ label: 'GitHub', href: 'https://github.com/Arunkumar7070/notify' }],
  },
]
