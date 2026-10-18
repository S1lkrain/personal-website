// All site text lives here. Source of truth: docs/copy-deck.md.
// Wrap a phrase in **double asterisks** to render it bold (used for metrics).

export type LinkItem = { label: string; href: string }

export type Project = {
  id: string
  title: string
  subtitle?: string
  status: 'Live' | 'In progress' | 'Shelved'
  description: [string, string]
  tags: [string, string, string]
  links: LinkItem[]
  motif: 'board' | 'pipeline' | 'rings' | 'fracture'
}

export type Role = {
  org: string
  role: string
  period: string
  points: [string, string]
  link?: LinkItem
}

export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

const github = 'https://github.com/S1lkrain'

export const site = {
  name: 'Benjamin Zhang',
  firstName: 'Benjamin',
  lastName: 'Zhang',
  initials: 'BZ',
  kicker: 'Portfolio · Class of 2028',
  subtitle: 'Student Developer | Computer Science & AI',
  bio: "I'm a high school student who enjoys turning ideas into working software. I spend much of my free time coding, experimenting with AI, and building games in Unity and JavaScript. Outside of programming, I tutor math on Schoolhouse.world and co-founded my school's Key Club.",
  ctas: {
    primary: { label: 'View My Projects', href: '#projects' },
    secondary: { label: 'Explore My GitHub', href: github },
  },

  nav: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ],

  facts: [
    { label: 'School', value: 'Pioneer Academy' },
    { label: 'Class', value: '2028' },
    { label: 'Focus', value: 'Computer Science & AI' },
    { label: 'Building', value: 'MagicField, APForge' },
    {
      label: 'Tools',
      value: 'Python · TypeScript · React · Unity · JavaScript',
    },
  ],

  about: {
    title: 'About Me',
    paragraphs: [
      'I got interested in computer science because I liked the idea of making something from scratch and seeing it actually work. What started as small coding experiments gradually turned into larger projects involving websites, AI tools, and games.',
      "One thing I enjoy most about programming is solving problems. Sometimes a feature doesn't work as expected, or an application becomes difficult to maintain as it grows. I like figuring out what went wrong, testing different solutions, and improving the design instead of just adding more code.",
      "Recently, I've been exploring AI-assisted development and building web applications. I'm especially interested in how AI can help people learn, automate repetitive tasks, and make software easier to use. That's why I started APForge, an AP question generator that checks AI-written questions before accepting them.",
      'Outside of coding, I co-founded a Key Club at my school, which now has about 20 members, and I tutor Pre-Algebra and AP Precalculus through Schoolhouse.world. Teaching has helped me improve how I explain complicated ideas, while organizing a club has given me experience working with other people.',
      'I plan to study computer science in college, with a focus on AI and software engineering. For now, I want to keep building projects, learning from mistakes, and exploring new ideas.',
    ],
  },

  stats: [
    { value: 176, label: 'skills designed for MagicField' },
    { value: 200, prefix: '~', label: 'hours spent on Project: Magic' },
    { value: 10, label: 'learners tutored on Schoolhouse.world' },
    { value: 20, prefix: '~', label: 'Key Club members in year one' },
  ] as Stat[],

  projects: [
    {
      id: 'magicfield',
      title: 'MagicField',
      subtitle: '法域棋局',
      status: 'Live',
      description: [
        "MagicField is a board-based strategy game I'm building as my main project, with **11 characters** across different elements and **176 skills**.",
        'I also built a wiki that generates its character, skill, and rules pages directly from the game data, in both Chinese and English.',
      ],
      tags: ['Game Design', 'JavaScript', 'Python'],
      links: [
        {
          label: 'Play the Game',
          href: 'https://magic-field-game.vercel.app/',
        },
        { label: 'Read the Wiki', href: 'https://magicfield.vercel.app/' },
      ],
      motif: 'board',
    },
    {
      id: 'apforge',
      title: 'APForge',
      subtitle: 'AP Question Generator',
      status: 'In progress',
      description: [
        "I'm developing an open-source tool that uses AI to generate AP-style practice questions.",
        'Instead of trusting the first answer, it runs each question through validators and an evaluation step, then accepts, repairs, or rejects it.',
      ],
      tags: ['Python', 'LLM Evaluation', 'React'],
      links: [{ label: 'View on GitHub', href: `${github}/APForge` }],
      motif: 'pipeline',
    },
    {
      id: 'keyclub-web',
      title: 'Key Club Website',
      subtitle: 'Pioneer Academy',
      status: 'Live',
      description: [
        "I built a website for our school's Key Club using React, TypeScript, and Tailwind CSS.",
        'It introduces the club, explains its activities, and provides information for students interested in joining.',
      ],
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      links: [
        { label: 'Visit Website', href: 'https://key-club-web.vercel.app/' },
        { label: 'Source', href: `${github}/KeyClubWeb` },
      ],
      motif: 'rings',
    },
    {
      id: 'project-magic',
      title: 'Project: Magic',
      subtitle: 'Shelved game prototype',
      status: 'Shelved',
      description: [
        'An earlier game I spent **about 200 hours** developing before I stopped because the gameplay did not feel strong enough.',
        'Letting it go was hard, but it taught me to test whether a game is fun early, before building every system around it.',
      ],
      tags: ['Game Design', 'Prototyping', 'Debugging'],
      links: [],
      motif: 'fracture',
    },
  ] satisfies Project[],

  leadership: [
    {
      org: 'Schoolhouse.world',
      role: 'Peer Math Tutor',
      period: 'Oct 2025 – Present',
      points: [
        'Hosted **3 sessions** (**5 tutoring hours**) for **10 learners** in **2 countries**, covering Pre-Algebra and AP Precalculus.',
        'Received **9 positive ratings** from learners, including **7 "Super Helpful"** ratings.',
      ],
    },
    {
      org: 'Key Club, Pioneer Academy',
      role: 'Co-founder',
      period: '2026 – Present',
      points: [
        'Co-founded the club in 2026; it now has **about 20 members** in its first year.',
        "Built the club's website with React and TypeScript to share meeting times and help new students join.",
      ],
      link: { label: 'Club website', href: 'https://key-club-web.vercel.app/' },
    },
  ] satisfies Role[],

  contact: {
    heading: 'Want to talk about a project?',
    sub: 'Reach out by email, or take a look at my code on GitHub.',
    emails: ['benjaminzhang1207@gmail.com', 'yanchen.zhang@pioneeracademy.org'],
    links: [{ label: 'GitHub', href: github }],
  },
}
