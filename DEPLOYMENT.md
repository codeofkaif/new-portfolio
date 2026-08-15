# Deployment Checklist

## Before You Deploy

- [ ] Replace `/public/profile-photo.jpg` with your real photo
- [ ] Replace `/public/resume.pdf` with your latest resume
- [ ] Update `src/data/profile.ts` — check all social links, email, and resumeLink
- [ ] Set `MOCK_MODE = false` in `src/lib/aiClient.ts` if you have a backend
- [ ] Run `npm run build` locally and verify `dist/` builds without errors
- [ ] Test all routes: `/`, `/about`, `/projects`, `/skills`, `/blog`, `/contact`, `/recruiter`

---

## Frontend → Vercel

1. Push your repo to **GitHub** (or GitLab / Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo.
3. Vercel auto-detects Vite. Leave defaults:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add **Environment Variables** in Vercel dashboard:
   ```
   VITE_API_BASE_URL = https://your-spring-boot-app.railway.app
   ```
5. Click **Deploy**. Your site will be live at `https://your-project.vercel.app`.
6. Add a **Custom Domain** in Vercel Settings → Domains.

### Vercel Rewrites (for client-side routing)

Create `vercel.json` in project root if you haven't already:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Backend (Spring Boot) → Railway

1. Go to [railway.app](https://railway.app) → **New Project** → Deploy from GitHub.
2. Select your Spring Boot backend repo.
3. Add environment variables in Railway dashboard:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   JWT_SECRET        = <base64 256-bit secret>
   DATABASE_URL      = <provided by Railway PostgreSQL plugin>
   REDIS_URL         = <provided by Railway Redis plugin>
   ```
4. Railway will detect the `pom.xml` / `build.gradle` and build with Maven/Gradle.
5. Add a **PostgreSQL** plugin and a **Redis** plugin from the Railway dashboard.
6. Your backend will be live at `https://your-app.up.railway.app`.

### Backend → Render (alternative)

1. Go to [render.com](https://render.com) → **New Web Service** → Connect GitHub.
2. Build Command: `./mvnw clean package -DskipTests`
3. Start Command: `java -jar target/app.jar`
4. Add the same env vars as above.
5. Add a **PostgreSQL** database and **Redis** from Render's dashboard.

---

## AI Integration

The frontend sends `POST /api/ask-ai` with `{ question, context }`.

Your Spring Boot controller should:

```java
// TODO: implement in your Spring Boot project
@RestController
@RequestMapping("/api")
public class AiController {

    @PostMapping("/ask-ai")
    public ResponseEntity<Map<String, String>> askAi(
            @RequestBody AiRequest req) {

        // 1. Build the Anthropic request
        // POST https://api.anthropic.com/v1/messages
        // Headers: x-api-key, anthropic-version, Content-Type
        // Body: {
        //   "model": "claude-3-5-sonnet-20241022",
        //   "max_tokens": 1024,
        //   "system": req.context(),
        //   "messages": [{ "role": "user", "content": req.question() }]
        // }

        // 2. Parse response.content[0].text
        // 3. Return { "answer": text }

        return ResponseEntity.ok(Map.of("answer", "..."));
    }
}
```

---

## CORS Configuration (Spring Boot)

Allow requests from your Vercel domain:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "https://your-portfolio.vercel.app"
    ));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

---

## Post-Deploy Checks

- [ ] Hero AI chat responds (mock or real)
- [ ] `/recruiter` page loads and all links work
- [ ] Ctrl+` opens terminal on desktop
- [ ] `/blog` posts render markdown correctly
- [ ] `/projects/:slug` scoped chat works
- [ ] Resume PDF download works
- [ ] Mobile (375px) — hero is single column, photo hidden
- [ ] Tablet (768px) — hero shows photo, cards hidden
- [ ] Desktop (1440px) — full 3-column hero layout
