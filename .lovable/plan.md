

# Add Rate Limiting to Registration Edge Function

## Approach
Use an **in-memory sliding window** rate limiter inside the edge function, keyed by both **IP address** and **email address**. This prevents spam without requiring additional database tables or external services.

## Limits
- **Per IP**: Max 3 registrations per 15-minute window
- **Per email**: Max 1 registration per 60-minute window (prevents duplicate submissions)

## Changes

### 1. Update `supabase/functions/send-confirmation-email/index.ts`
- Add an in-memory `Map<string, number[]>` to track timestamps of recent requests per key
- Extract client IP from request headers (`x-forwarded-for` or `x-real-ip`)
- Before processing, check both IP and email rate limits
- Return `429 Too Many Requests` with a clear French error message when limits are exceeded
- Clean up expired entries on each request to prevent memory leaks

### 2. Update `src/components/RegistrationForm.tsx`
- Handle `429` status responses from the edge function gracefully
- Display a user-friendly message: "Trop de tentatives. Veuillez réessayer dans quelques minutes."

## Technical Notes
- In-memory rate limiting resets on cold starts, which is acceptable for this use case — it's a lightweight spam deterrent, not a security-critical system
- The email-based limit also provides duplicate registration protection at the function level

