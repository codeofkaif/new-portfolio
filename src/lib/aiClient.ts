/**
 * AI Client — askAI(question, context)
 *
 * In production this POSTs to POST /api/ask-ai on a Spring Boot backend.
 * The Spring Boot controller should:
 *   1. Receive { question, context } from the request body.
 *   2. Build an Anthropic messages payload:
 *        { model: "claude-3-5-sonnet-20241022",
 *          max_tokens: 1024,
 *          system: context,
 *          messages: [{ role: "user", content: question }] }
 *   3. Call https://api.anthropic.com/v1/messages with the x-api-key header.
 *   4. Return { answer: response.content[0].text } to the frontend.
 *
 * Example Spring Boot pseudo-code:
 *   @PostMapping("/api/ask-ai")
 *   public AiResponse askAi(@RequestBody AiRequest req) {
 *       // call Anthropic REST client, return { answer }
 *   }
 *
 * For local development without a backend the MOCK_MODE constant below
 * returns canned answers so the UI is fully functional.
 */

// ─── Toggle ───────────────────────────────────────────────────────────────────
// Set to false and ensure /api/ask-ai is running to use the real backend.
const MOCK_MODE = true;

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AskAIResult {
  answer: string;
  error?: string;
}

// ─── Mock responses ───────────────────────────────────────────────────────────
const MOCK_ANSWERS: string[] = [
  "That's a great question! Based on Kaif's profile, he specialises in Spring Boot backends with JWT auth, Redis caching, and PostgreSQL. He's actively looking for a Software Developer Internship.",
  "Kaif built the Hospital Management REST API using Spring Boot, Spring Security 6, JPA/Hibernate, PostgreSQL, and Redis. Redis was chosen to cache doctor availability windows, cutting query latency from ~120 ms to ~8 ms.",
  "For ADIL CONSTRUCTIONS, Kaif architected a full-stack platform with a React + Vite + TypeScript frontend and a Spring Boot + MySQL backend. JWT authentication guards both the client dashboard and admin panel.",
  "The AI Code Security Reviewer uses a Python + FastAPI rule-based OWASP engine that pre-filters code blocks. Only ~15% of blocks require a Claude API call, significantly reducing latency and cost.",
  "Kaif is proficient in Java (92%), Spring Boot (90%), PostgreSQL (86%), Git (92%), and REST APIs (92%). He's currently completing the GRAS 90-hour AI & Data Science program.",
  "You can reach Kaif at his GitHub or LinkedIn. He's based in Lucknow, Uttar Pradesh, India and is open to internship opportunities in software development.",
];

let mockIndex = 0;
function nextMockAnswer(): string {
  const answer = MOCK_ANSWERS[mockIndex % MOCK_ANSWERS.length];
  mockIndex++;
  return answer;
}

// ─── Main client function ─────────────────────────────────────────────────────
export async function askAI(
  question: string,
  context: string
): Promise<AskAIResult> {
  // ── Mock path (local dev) ──────────────────────────────────────────────────
  if (MOCK_MODE) {
    await new Promise((res) => setTimeout(res, 900 + Math.random() * 600)); // simulate latency
    return { answer: nextMockAnswer() };
  }

  // ── Real path: POST /api/ask-ai (Spring Boot → Anthropic) ─────────────────
  // TODO: Replace MOCK_MODE = true with false and deploy the Spring Boot backend.
  // The controller at POST /api/ask-ai should accept { question, context }
  // and return { answer: string }.
  try {
    const res = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { answer: '', error: `Server error ${res.status}: ${text}` };
    }

    const data = (await res.json()) as { answer: string };
    return { answer: data.answer };
  } catch (err) {
    return {
      answer: '',
      error: err instanceof Error ? err.message : 'Unknown network error',
    };
  }
}
