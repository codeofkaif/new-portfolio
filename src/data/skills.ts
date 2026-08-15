export interface SkillEntry {
  name: string;
  proficiency: number; // 0–100
  category: 'Language' | 'Backend' | 'Database' | 'DevOps' | 'Frontend' | 'CS';
  color: string;
}

export const skills: SkillEntry[] = [
  // Languages
  { name: 'Java',       proficiency: 92, category: 'Language',  color: '#f89820' },
  { name: 'Python',     proficiency: 75, category: 'Language',  color: '#ffd43b' },
  { name: 'SQL',        proficiency: 82, category: 'Language',  color: '#38BDF8' },
  { name: 'TypeScript', proficiency: 70, category: 'Language',  color: '#3178C6' },
  { name: 'JavaScript', proficiency: 72, category: 'Language',  color: '#F7DF1E' },
  { name: 'C',          proficiency: 65, category: 'Language',  color: '#A8B9CC' },

  // Backend
  { name: 'Spring Boot',     proficiency: 90, category: 'Backend', color: '#6db33f' },
  { name: 'Spring Security', proficiency: 85, category: 'Backend', color: '#6db33f' },
  { name: 'REST APIs',       proficiency: 92, category: 'Backend', color: '#8B5CF6' },
  { name: 'Microservices',   proficiency: 74, category: 'Backend', color: '#A78BFA' },
  { name: 'FastAPI',         proficiency: 68, category: 'Backend', color: '#009688' },

  // Databases
  { name: 'PostgreSQL', proficiency: 86, category: 'Database', color: '#4169e1' },
  { name: 'MySQL',      proficiency: 82, category: 'Database', color: '#4479A1' },
  { name: 'Redis',      proficiency: 76, category: 'Database', color: '#dc382d' },
  { name: 'MongoDB',    proficiency: 60, category: 'Database', color: '#47A248' },

  // DevOps
  { name: 'Docker',     proficiency: 80, category: 'DevOps', color: '#0db7ed' },
  { name: 'Kubernetes', proficiency: 58, category: 'DevOps', color: '#326ce5' },
  { name: 'Git',        proficiency: 92, category: 'DevOps', color: '#f05032' },
  { name: 'AWS',        proficiency: 62, category: 'DevOps', color: '#ff9900' },

  // Frontend
  { name: 'React',   proficiency: 74, category: 'Frontend', color: '#61DAFB' },
  { name: 'HTML',    proficiency: 85, category: 'Frontend', color: '#E34F26' },
  { name: 'CSS',     proficiency: 78, category: 'Frontend', color: '#1572B6' },

  // CS Fundamentals
  { name: 'DSA',  proficiency: 80, category: 'CS', color: '#22D3EE' },
  { name: 'OS',   proficiency: 72, category: 'CS', color: '#A855F7' },
  { name: 'DBMS', proficiency: 78, category: 'CS', color: '#EC4899' },
];
