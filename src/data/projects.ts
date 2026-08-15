export interface Project {
  slug: string;
  title: string;
  image: string;
  techStack: string[];
  description: string;
  problem: string;
  architecture: string;
  challenges: string;
  performance: string;
  lessons: string;
  liveUrl?: string;
  githubUrl?: string;
  status: 'Ongoing' | 'Completed' | 'In Progress';
  codeSnippet: string;
  codeLanguage: 'java' | 'python';
}

export const projects: Project[] = [
  {
    slug: 'adil-constructions',
    title: 'ADIL CONSTRUCTIONS',
    image: '/projects/adil-constructions.png',
    techStack: ['React', 'Vite', 'TypeScript', 'Spring Boot', 'MySQL', 'JWT', 'JPA'],
    description:
      'Full-stack construction company platform with a public landing page, client dashboard, and an admin panel featuring real-time notifications, project tracking, and role-based access.',
    problem:
      'The client needed a digital presence that could serve both potential customers (public landing page) and existing clients (private dashboard) while giving admins full control over projects, documents, and notifications — all secured behind JWT auth.',
    architecture:
      'React + Vite + TypeScript SPA communicating with a Spring Boot REST API. MySQL stores entities with JPA relationships (OneToMany, ManyToMany). Spring Security guards routes with role-based filters. Notifications are persisted in a dedicated table and pushed on key events via service-layer hooks.',
    challenges:
      'Designing a clean JPA entity graph that reflects real construction project hierarchies (Project → Phase → Task → Document) without N+1 query problems. Admin notification fan-out needed to be synchronous-safe while avoiding duplicate inserts.',
    performance:
      'Lazy-loaded JPA associations with JPQL JOIN FETCH for list views kept query count flat. React lazy-loading per route cut initial JS bundle by ~38%.',
    lessons:
      'Keeping the notification service interface-driven allowed swapping an in-process implementation for an async queue later with zero controller changes.',
    liveUrl: 'https://adilconstructions.in',
    githubUrl: 'https://github.com/codeofkaif',
    status: 'Ongoing',
    codeLanguage: 'java',
    codeSnippet: `@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String username = jwtService.extractUsername(jwt);

        if (username != null &&
            SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null,
                        userDetails.getAuthorities()
                    );
                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request)
                );
                SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`,
  },

  {
    slug: 'hospital-management-api',
    title: 'Hospital Management REST API',
    image: '/projects/hospital-api.png',
    techStack: ['Spring Boot', 'Spring Security', 'JPA', 'Hibernate', 'Redis', 'PostgreSQL', 'Docker'],
    description:
      'Production-grade REST API for managing hospital operations — doctors, patients, appointments, billing — secured with Spring Security 6 and accelerated with Redis caching.',
    problem:
      'Hospital staff needed a reliable backend to handle concurrent appointment scheduling, patient record management, and billing without data races or duplicated bookings.',
    architecture:
      'Layered Spring Boot application: Controller → Service → Repository. SecurityFilterChain guards each endpoint by role (ADMIN, DOCTOR, PATIENT). JPQL constructor expressions map flat queries to DTOs, bypassing unnecessary entity loading. Redis caches doctor availability windows with a 5-minute TTL.',
    challenges:
      'Preventing double-booking under concurrent requests required a database-level unique constraint on (doctorId, slotTime) combined with an optimistic-lock retry in the service layer. Redis cache invalidation on slot updates was coordinated through a custom CacheEvict aspect.',
    performance:
      'Redis caching cut average appointment-availability query time from 120 ms to 8 ms under load testing. JPQL DTO projections reduced payload size by 60% versus full entity serialisation.',
    lessons:
      'Designing SecurityFilterChain as a pure configuration bean (no inheritance) kept security rules readable and testable in isolation.',
    githubUrl: 'https://github.com/codeofkaif',
    status: 'Completed',
    codeLanguage: 'java',
    codeSnippet: `@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest request,
            @AuthenticationPrincipal UserDetails principal) {

        AppointmentResponse response =
            appointmentService.book(request, principal.getUsername());

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.getId())
            .toUri();

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .location(location)
            .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointment(
            @PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.findById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> cancel(@PathVariable Long id) {
        appointmentService.cancel(id);
        return ResponseEntity.noContent().build();
    }
}`,
  },

  {
    slug: 'ai-code-security-reviewer',
    title: 'AI Code Security Reviewer',
    image: '/projects/ai-security-reviewer.png',
    techStack: ['Spring Boot', 'Python', 'FastAPI', 'Claude API', 'React', 'OWASP'],
    description:
      'AI-powered tool that scans submitted code for OWASP Top 10 vulnerabilities, explains findings in plain English via Claude, and delivers a prioritised security report in the browser.',
    problem:
      'Developers often ship code with common but subtle security flaws (SQL injection, hardcoded secrets, insecure deserialization). Manual code review is slow; existing static-analysis tools give cryptic output without actionable explanations.',
    architecture:
      'React frontend → Spring Boot API gateway → Python FastAPI ML microservice. The FastAPI service runs a rule-based OWASP engine first (fast, deterministic), then passes flagged snippets to the Claude API for natural-language explanations. Results are streamed back through Spring Boot using SSE.',
    challenges:
      'Coordinating two independent backends (JVM + Python) required a lightweight contract enforced by OpenAPI schemas on both sides. Streaming Claude responses via SSE while batching rule-engine results needed careful backpressure handling.',
    performance:
      'Rule-engine pre-filtering meant only ~15% of code blocks required Claude API calls, cutting latency and cost significantly. SSE streaming gave users first-token feedback within 400 ms.',
    lessons:
      'Keeping the rule engine purely functional (no shared state) made it trivially parallelisable with Python asyncio for large files.',
    githubUrl: 'https://github.com/codeofkaif',
    status: 'In Progress',
    codeLanguage: 'python',
    codeSnippet: `from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import re

router = APIRouter(prefix="/scan", tags=["security"])

OWASP_RULES = [
    {
        "id":  "A03-SQL-INJECTION",
        "pattern": re.compile(
            r'(execute|query)\s*\(\s*["\'].*\+|'
            r'Statement.*createStatement|'
            r'f"SELECT.*{', re.IGNORECASE
        ),
        "severity": "CRITICAL",
        "title":   "Potential SQL Injection",
        "cwe":     "CWE-89",
    },
    {
        "id":  "A02-HARDCODED-SECRET",
        "pattern": re.compile(
            r'(password|secret|api_key)\s*=\s*["\'][^"\']{6,}["\']',
            re.IGNORECASE
        ),
        "severity": "HIGH",
        "title":   "Hardcoded Credential",
        "cwe":     "CWE-798",
    },
]

class ScanRequest(BaseModel):
    code: str
    language: str

class Finding(BaseModel):
    rule_id: str
    severity: str
    title: str
    cwe: str
    line: int

class ScanResponse(BaseModel):
    findings: List[Finding]
    scanned_lines: int

@router.post("/", response_model=ScanResponse)
async def scan_code(req: ScanRequest) -> ScanResponse:
    findings: List[Finding] = []
    lines = req.code.splitlines()

    for lineno, line in enumerate(lines, start=1):
        for rule in OWASP_RULES:
            if rule["pattern"].search(line):
                findings.append(Finding(
                    rule_id=rule["id"],
                    severity=rule["severity"],
                    title=rule["title"],
                    cwe=rule["cwe"],
                    line=lineno,
                ))

    return ScanResponse(findings=findings, scanned_lines=len(lines))`,
  },
];

// Legacy shape — keeps existing pages/ProjectsPage working unchanged
export type { Project as LegacyProject };
