export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  icon: string; // emoji or short label
  current?: boolean;
  image?: string; // optional image URL or path for the card
}

export const timeline: TimelineEvent[] = [
  {
    id: 'started-programming',
    year: '2022',
    title: 'Started Programming',
    subtitle: 'First Lines of Code',
    description:
      'Took my first steps into the world of programming through C, followed by Python and Java. Fell in love with the logic and problem-solving aspect of coding from day one.',
    tags: ['C', 'Python', 'Java'],
    color: '#F5C76A',
    icon: '🚀',
  },
  {
    id: 'dsa-fundamentals',
    year: '2022 – 2023',
    title: 'DSA & CS Fundamentals',
    subtitle: 'Building the Foundation',
    description:
      'Dived deep into Data Structures & Algorithms, Operating Systems, and DBMS. Solved 280+ LeetCode problems and built strong fundamentals that underpin every system I design today.',
    tags: ['DSA', 'LeetCode', 'OS', 'DBMS'],
    color: '#8B5CF6',
    icon: '🧠',
  },
  {
    id: 'web-java-projects',
    year: '2023',
    title: 'Web & Java Projects',
    subtitle: 'From Console to Full Stack',
    description:
      'Built my first full-stack web applications using core Java, HTML/CSS/JavaScript, and MySQL. Learned Git workflows, REST principles, and shipped several small but real projects.',
    tags: ['Java', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Git'],
    color: '#22D3EE',
    icon: '🌐',
  },
  {
    id: 'spring-boot-rest',
    year: '2023 – 2024',
    title: 'Spring Boot & REST APIs',
    subtitle: 'Backend Engineering',
    description:
      'Mastered Spring Boot, Spring Security 6, JPA/Hibernate, and PostgreSQL. Built production-ready REST APIs with JWT authentication, Redis caching, role-based access control, and Swagger documentation.',
    tags: ['Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Redis'],
    color: '#4ADE80',
    icon: '⚙️',
  },
  {
    id: 'hospital-api',
    year: '2024',
    title: 'Hospital Management REST API',
    subtitle: 'Flagship Backend Project',
    description:
      'Designed and shipped a comprehensive hospital management API covering appointments, doctors, patients, and billing. Applied SecurityFilterChain, JPQL projections, Redis caching, and Docker-based deployment.',
    tags: ['Spring Boot', 'JPA', 'Redis', 'Docker', 'PostgreSQL'],
    color: '#F472B6',
    icon: '🏥',
  },
  {
    id: 'gras-ai',
    year: '2025',
    title: 'GRAS Data Science & AI Program',
    subtitle: '90-Hour Intensive Training',
    description:
      'Enrolled in an intensive 90-hour AI & Data Science program covering Python, Statistics, Machine Learning, Deep Learning, NLP, and a capstone AI project. Expanding backend skills into AI/LLM-powered applications.',
    tags: ['Python', 'ML', 'Deep Learning', 'NLP', 'AI/LLM'],
    color: '#A78BFA',
    icon: '🤖',
  },
  {
    id: 'adil-constructions',
    year: '2025 – Present',
    title: 'Building ADIL CONSTRUCTIONS',
    subtitle: 'Full-Stack Production App',
    description:
      'Architecting and building a full-stack construction management platform — React + Vite + TypeScript frontend, Spring Boot + MySQL backend, JWT auth, client dashboards, admin panel with real-time notifications.',
    tags: ['React', 'Spring Boot', 'MySQL', 'JWT', 'TypeScript'],
    color: '#FB923C',
    icon: '🏗️',
  },
  {
    id: 'current',
    year: '2026',
    title: 'B.Tech 7th Semester — Seeking Internship',
    subtitle: 'Currently',
    description:
      'Enrolled in B.Tech CSE at Babu Banarasi Das University (expected graduation May 2027). Actively seeking a Software Developer Internship to apply backend and AI expertise in a professional engineering environment.',
    tags: ['B.Tech', 'Internship', 'CSE', 'May 2027'],
    color: '#34D399',
    icon: '🎓',
    current: true,
  },
];
