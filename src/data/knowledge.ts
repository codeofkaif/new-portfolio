import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';

/**
 * Builds a plain-text knowledge base that is injected as context
 * into every AI chat request. Keep it concise — it is prepended to
 * every prompt sent to the LLM.
 */
function buildKnowledgeBase(): string {
  const edu = profile.education;

  const projectsSummary = projects
    .map(
      (p) =>
        `Project: ${p.title} (${p.status})\n` +
        `  Tech: ${p.techStack.join(', ')}\n` +
        `  Description: ${p.description}\n` +
        `  Problem: ${p.problem}\n` +
        `  Architecture: ${p.architecture}\n` +
        `  Challenges: ${p.challenges}\n` +
        `  Performance: ${p.performance}\n` +
        `  Lessons: ${p.lessons}`
    )
    .join('\n\n');

  const skillsSummary = skills
    .map((s) => `${s.name} (${s.category}, ${s.proficiency}% proficiency)`)
    .join(', ');

  return `
=== ABOUT THE DEVELOPER ===
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Status: ${profile.status}
Bio: ${profile.tagline}

=== EDUCATION ===
Degree: ${edu.degree}
University: ${edu.university}
Semester: ${edu.semester}
Expected Graduation: ${edu.expectedGraduation}

=== SPECIAL TRAINING ===
${profile.learning.join('\n')}

=== TECHNICAL SKILLS ===
${skillsSummary}

=== TECH STACK HIGHLIGHTS ===
${profile.techStack.join(', ')}

=== PROJECTS ===
${projectsSummary}

=== CONTACT & SOCIALS ===
GitHub: ${profile.socials.github}
LinkedIn: ${profile.socials.linkedin}
Email: ${profile.socials.email}
`.trim();
}

export const knowledgeBase = buildKnowledgeBase();

/**
 * Per-project context snippet for scoped "ask about this project" chat.
 */
export function projectContext(slug: string): string {
  const p = projects.find((proj) => proj.slug === slug);
  if (!p) return knowledgeBase;
  return `
You are answering questions specifically about the project "${p.title}".

Project: ${p.title} (${p.status})
Tech Stack: ${p.techStack.join(', ')}
Description: ${p.description}
Problem being solved: ${p.problem}
Architecture: ${p.architecture}
Challenges faced: ${p.challenges}
Performance outcomes: ${p.performance}
Key lessons: ${p.lessons}

Developer: ${profile.name}, ${profile.role}
`.trim();
}
