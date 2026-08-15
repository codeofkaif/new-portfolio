# Md. Kaif Ali — Developer Portfolio

A production-grade personal portfolio built with **React + Vite + TypeScript**, featuring
an AI assistant, interactive API explorer, terminal mode, and animated UI.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + Vanilla CSS |
| Animation | Framer Motion |
| Charts | Recharts |
| Routing | React Router v6 |
| Markdown | react-markdown |
| Icons | lucide-react, react-icons |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# ── AI Backend ─────────────────────────────────────────────────────────────────
# URL of your Spring Boot backend that proxies to Anthropic.
# In production, set this in your Vercel dashboard as an env var.
VITE_API_BASE_URL=http://localhost:8080

# ── Optional: if you proxy via Vite dev server ──────────────────────────────────
# The vite.config.ts proxy already forwards /api → VITE_API_BASE_URL in dev.
```

> **Note:** The AI chat currently runs in **mock mode** (`MOCK_MODE = true` in
> `src/lib/aiClient.ts`). To enable real AI responses:
> 1. Set `MOCK_MODE = false` in `src/lib/aiClient.ts`.
> 2. Deploy the Spring Boot backend (see Deployment Checklist below).
> 3. Set `VITE_API_BASE_URL` in your Vercel environment variables.

---

## Replace Placeholder Assets

| File | Description |
|---|---|
| `/public/profile-photo.jpg` | Your actual profile photo (any aspect ratio; 3:4 recommended). The app renders it at 260×347 px on the hero. |
| `/public/resume.pdf` | Your latest resume in PDF format. Linked from profile.ts `resumeLink`. |

After replacing, update `src/data/profile.ts` if needed:
```ts
photo: '/profile-photo.jpg',
resumeLink: '/resume.pdf',
```

---

## Key Files

```
src/
├── data/
│   ├── profile.ts        ← All personal info (name, bio, links, stats)
│   ├── projects.ts       ← Project case studies
│   ├── skills.ts         ← Skill proficiency data for TechRadar
│   ├── timeline.ts       ← Journey timeline events
│   ├── blog.ts           ← Blog post content (markdown)
│   ├── endpoints.ts      ← API Explorer mock endpoints
│   └── knowledge.ts      ← AI context builder
├── lib/
│   └── aiClient.ts       ← AI chat client (mock + real fetch)
├── sections/
│   ├── HeroSection.tsx   ← Hero with floating particles
│   ├── StatsRow.tsx      ← Animated stat cards
│   ├── FeaturedProjects.tsx ← Project carousel + code editor
│   ├── TechScroller.tsx  ← Marquee tech ticker
│   ├── TechRadar.tsx     ← Radial proficiency chart
│   ├── JourneyTimeline.tsx ← Alternating timeline
│   └── ApiExplorer.tsx   ← Swagger-like API explorer
└── components/
    ├── AIChatBox.tsx     ← Reusable AI chat component
    ├── CodePlayground.tsx ← Code editor with mock runner
    └── TerminalMode.tsx  ← Full-screen terminal (Ctrl+`)
```

---

## Terminal Mode

Press **Ctrl + `** (backtick) anywhere on the site to open the terminal overlay.

Available commands: `help`, `about`, `projects`, `skills`, `contact`, `resume`, `clear`, `exit`

---

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About + Journey Timeline |
| `/projects` | Projects list |
| `/projects/:slug` | Case study detail |
| `/skills` | TechRadar chart |
| `/blog` | Blog list |
| `/blog/:slug` | Blog post (markdown) |
| `/contact` | Contact page |
| `/recruiter` | Recruiter kit one-pager |
| `/experience` | Experience |

---

## Deployment Checklist

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the step-by-step deploy guide.
