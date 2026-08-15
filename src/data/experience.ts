export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  current: boolean;
}

/**
 * Real / near-future experience for Md. Kaif Ali.
 * Replace with actual internship / job data as it happens.
 */
export const experiences: Experience[] = [
  {
    id: "exp-gras",
    role: "AI & Data Science Trainee",
    company: "GRAS Program",
    period: "2025 – Present",
    description:
      "Completing a 90-hour intensive program covering Python, Statistics, Machine Learning, Deep Learning, NLP, and a capstone project.",
    tech: ["Python", "scikit-learn", "TensorFlow", "NLP", "Pandas"],
    current: true,
  },
  {
    id: "exp-bbdu",
    role: "B.Tech CSE Student",
    company: "Babu Banarasi Das University",
    period: "2023 – May 2027",
    description:
      "Core coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks. Active in coding competitions and technical clubs.",
    tech: ["Java", "C", "DSA", "OS", "DBMS", "SQL","SpringBoot","Spring security","Spring JPA","PostgreSQL","MySQL","hibernate"],
    current: true,
  },
];
