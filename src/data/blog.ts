export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  tags: string[];
  coverColor: string; // accent color for the header
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'jwt-authentication-explained',
    title: 'JWT Authentication Explained From Scratch',
    excerpt:
      'A ground-up walkthrough of how JSON Web Tokens work, why stateless auth matters, and how to implement a production-grade filter chain in Spring Boot 3.',
    coverColor: '#F5C76A',
    date: '2025-07-10',
    readingTime: 9,
    tags: ['Java', 'Spring Boot', 'Security', 'JWT'],
    content: `# JWT Authentication Explained From Scratch

## What Problem Does JWT Solve?

Traditional session-based auth stores session state **on the server**. Every request carries a session ID cookie, the server looks it up in memory (or Redis), and decides what the user can do. This works well for monoliths, but breaks down once you have multiple backend instances — they don't share memory.

**JWT (JSON Web Token)** flips the model: the server signs a compact token and hands it to the client. The client sends it back on every request. The server just **verifies the signature** — no database lookup needed.

## Anatomy of a JWT

A JWT has three Base64-URL encoded parts, separated by dots:

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← Header
.eyJzdWIiOiJrYWlmQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzI1MDAwMDAwfQ  ← Payload
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c   ← Signature
\`\`\`

- **Header** — algorithm (\`HS256\`, \`RS256\`, etc.) and token type.
- **Payload** — claims: \`sub\` (subject/user), \`exp\` (expiry), \`iat\` (issued at), custom claims like \`role\`.
- **Signature** — HMAC or RSA signature over header + payload using a secret key.

> ⚠️ The payload is **encoded, not encrypted**. Never put sensitive data (passwords, PII) in a JWT payload.

## Spring Boot Implementation

### 1. Dependencies

\`\`\`xml
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>0.12.5</version>
</dependency>
\`\`\`

### 2. JwtService — Token Generation & Validation

\`\`\`java
@Service
public class JwtService {

    @Value("\${app.jwt.secret}")
    private String secret;

    public String generateToken(UserDetails user) {
        return Jwts.builder()
            .subject(user.getUsername())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 900_000)) // 15 min
            .signWith(getSignKey())
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        return extractUsername(token).equals(user.getUsername())
            && !isTokenExpired(token);
    }

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }
}
\`\`\`

### 3. JwtAuthFilter — Intercepting Every Request

\`\`\`java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {

        String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext()
                                                     .getAuthentication() == null) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, user)) {
                // Authenticate in SecurityContext
                var authToken = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(req, res);
    }
}
\`\`\`

## Access Token + Refresh Token Pattern

A short-lived **access token** (15 min) and a long-lived **refresh token** (7 days, stored in HttpOnly cookie) give you the best security/UX balance:

1. Client sends credentials → server returns \`accessToken\` (JSON body) + \`refreshToken\` (HttpOnly cookie).
2. Client uses \`accessToken\` in \`Authorization\` header for every API call.
3. When access token expires, client POSTs to \`/api/auth/refresh\` — server validates the cookie, issues a new access token.
4. On logout, server adds the refresh token to a Redis blacklist.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Long-lived access tokens | Keep them short (15 min max) |
| JWT secret in source code | Use env vars or Vault |
| Not validating \`exp\` | JJWT validates automatically — don't skip it |
| Trusting the \`alg\` header | Pin the algorithm server-side, ignore client \`alg\` |

## Conclusion

JWT is a powerful tool when used correctly. Keep tokens short-lived, sign with a strong secret, never put sensitive data in the payload, and always implement a refresh-token rotation strategy.`,
  },

  {
    slug: 'spring-security-internals',
    title: 'Spring Security Internals: How the Filter Chain Really Works',
    excerpt:
      'A deep dive into Spring Security 6\'s SecurityFilterChain, how requests flow through the filter stack, and why OncePerRequestFilter is the right hook for JWT validation.',
    coverColor: '#8B5CF6',
    date: '2025-05-22',
    readingTime: 7,
    tags: ['Java', 'Spring Boot', 'Spring Security', 'Backend'],
    content: `# Spring Security Internals: How the Filter Chain Really Works

## The Big Picture

Most developers know Spring Security "secures HTTP requests", but the mechanics are less obvious. At its core, Spring Security is a **chain of servlet filters** that runs before your controller code ever executes.

\`\`\`
Request → [DelegatingFilterProxy] → [SecurityFilterChain] → DispatcherServlet → @Controller
\`\`\`

Every filter in the chain has a chance to:
- **Allow** the request to continue to the next filter.
- **Block** the request and write an error response directly.
- **Authenticate** the user by populating the \`SecurityContextHolder\`.

## Key Filters in the Default Stack

Spring Security 6 ships ~30 filters, but these are the ones you'll interact with most:

| Filter | Purpose |
|---|---|
| \`SecurityContextHolderFilter\` | Loads/saves \`SecurityContext\` per request |
| \`UsernamePasswordAuthenticationFilter\` | Handles form login (POST /login) |
| \`BearerTokenAuthenticationFilter\` | Handles OAuth2 Bearer tokens |
| \`ExceptionTranslationFilter\` | Converts \`AccessDeniedException\` → 403 |
| \`AuthorizationFilter\` | Final access-control check |

## Defining Your Own Chain (Spring Boot 3)

In Spring Security 6, you define the chain as a \`@Bean\`:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable) // REST APIs don't need CSRF
            .sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
\`\`\`

## Why OncePerRequestFilter?

Servlet filters can theoretically be called multiple times per request (e.g., during forwards/includes). \`OncePerRequestFilter\` guarantees your JWT validation runs **exactly once** per HTTP request, preventing double-authentication bugs.

\`\`\`java
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        // Your JWT logic — runs exactly once per request
        filterChain.doFilter(request, response);
    }
}
\`\`\`

## The SecurityContextHolder

After successful authentication, you store the user's identity here:

\`\`\`java
var token = new UsernamePasswordAuthenticationToken(
    userDetails, null, userDetails.getAuthorities()
);
SecurityContextHolder.getContext().setAuthentication(token);
\`\`\`

This makes the user accessible anywhere in the request thread:

\`\`\`java
@GetMapping("/profile")
public UserDto myProfile(
    @AuthenticationPrincipal UserDetails user
) {
    // Spring injects the authenticated user automatically
    return userService.findByEmail(user.getUsername());
}
\`\`\`

## Method-Level Security

Enable it with \`@EnableMethodSecurity\`, then use annotations:

\`\`\`java
@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN') or #id == principal.id")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}
\`\`\`

## Takeaways

1. **Understand the filter order** — your custom filter must be registered at the right position.
2. **STATELESS sessions** — essential for REST APIs; never use \`HttpSession\` with JWT.
3. **\`SecurityContextHolder\`** is thread-local — it's cleared at the end of each request automatically.
4. **Test your security config** — Spring Security Test provides \`@WithMockUser\` and \`@WithUserDetails\` for unit testing secured endpoints.`,
  },

  {
    slug: 'dsa-interview-prep',
    title: 'My LeetCode Strategy as a CSE Student',
    excerpt:
      'How I structure my DSA practice sessions around patterns, not problems — and why it made the difference.',
    coverColor: '#22D3EE',
    date: '2025-01-15',
    readingTime: 5,
    tags: ['DSA', 'LeetCode', 'Career'],
    content: `# My LeetCode Strategy as a CSE Student

## The Problem With Grinding Problems

Most people approach LeetCode by solving as many problems as possible. After a few hundred problems, they still blank on new ones in interviews. Why?

Because they're memorising **solutions**, not learning **patterns**.

## The Pattern-First Approach

Every LeetCode problem belongs to one of ~15 patterns:

- Two Pointers
- Sliding Window
- Binary Search
- BFS / DFS
- Dynamic Programming
- Backtracking
- Heap / Priority Queue
- Monotonic Stack
- Union-Find
- Trie

Once you recognise the pattern, the solution structure becomes obvious.

## My Weekly Schedule

| Day | Focus |
|---|---|
| Mon | New pattern — theory + 2 easy problems |
| Tue–Wed | 2 medium problems on the same pattern |
| Thu | 1 hard problem |
| Fri | Review mistakes + time complexity analysis |
| Sat | Mock interview (blind75 random) |
| Sun | Rest |

## Closing Thoughts

280+ problems solved. More importantly: I can now *identify* the pattern within 2 minutes of reading a new problem — which is what interviews actually test.`,
  },
];
