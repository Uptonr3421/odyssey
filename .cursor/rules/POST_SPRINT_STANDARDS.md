# 🏁 Post-Sprint Standards & Enforcement Rules

**Purpose**: Ensure every sprint ends with deployable, monitored, documented code
**Owner**: Development team (enforced via Cursor + pre-commit hooks)
**Updated**: November 1, 2025

---

## ✅ Pre-Deployment Checklist (Required)

### Code Quality
- [ ] **No console.log() left** (except debug in dev-only files)
- [ ] **No TODO/FIXME comments** without ticket reference (format: `// TODO: [TICKET-123] description`)
- [ ] **No commented-out code** (delete it, use git history if needed)
- [ ] **No unused imports** (eslint should catch)
- [ ] **TypeScript: 0 errors** (strict mode)
- [ ] **No any types** (use unknown or specific types)

### Security
- [ ] **No secrets in code** (no API keys, passwords, tokens)
- [ ] **Environment variables used correctly** (import from .env, not hardcoded)
- [ ] **.env in .gitignore** (verify)
- [ ] **Security headers present** (check vercel.json)
- [ ] **npm audit shows 0 vulnerabilities** (`npm audit` command)

### Performance
- [ ] **Build size checked** (`npm run build` size report)
- [ ] **Lighthouse score >90** (all categories)
- [ ] **No unused dependencies** (`npm prune`)
- [ ] **Images optimized** (<100KB each)
- [ ] **Lazy loading on images** (if applicable)
- [ ] **No memory leaks** (useEffect cleanup, event listeners removed)

### Functionality
- [ ] **All forms tested** (submit works end-to-end)
- [ ] **Mobile responsive** (tested on actual device or simulator)
- [ ] **Links tested** (internal + external)
- [ ] **Dark/light mode works** (if applicable)
- [ ] **No JavaScript console errors** (test in browser)
- [ ] **Accessibility minimum** (buttons clickable, labels present, alt text on images)

### Documentation
- [ ] **README updated** (if changes affect setup)
- [ ] **Component props documented** (JSDoc comments)
- [ ] **Complex logic explained** (inline comments)
- [ ] **Env variables documented** (.env.example updated)
- [ ] **Breaking changes noted** (in commit message)

### Monitoring & Observability
- [ ] **Sentry DSN configured** (error tracking active)
- [ ] **Dynatrace tracking ready** (if monitoring enabled)
- [ ] **Form submissions tracked** (Supabase integration confirmed)
- [ ] **Monitoring alerts set** (critical error notifications on)

### Git & Deployment
- [ ] **All changes committed** (nothing left staged)
- [ ] **Commit message follows format** (see Commit Message Standards below)
- [ ] **No merge conflicts** (rebased/merged cleanly)
- [ ] **Branch deleted after merge** (cleanup)
- [ ] **GitHub Actions passing** (all CI checks green)

---

## 📝 Commit Message Standards

**Format**: `[TYPE] Scope: Description`

**Valid Types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code reorganization (no logic change)
- `perf`: Performance improvement
- `docs`: Documentation only
- `test`: Tests only
- `chore`: Build/tooling/CI changes
- `security`: Security fix

**Scope** (optional but recommended):
- Component name (e.g., `ContactForm`)
- File path (e.g., `src/components/forms`)
- Feature area (e.g., `authentication`)

**Examples**:
```
✅ [feat] ContactForm: Add client-side email validation
✅ [fix] Hero: Fix image scaling on mobile
✅ [perf] Images: Optimize WebP conversion
✅ [security] Forms: Add CSRF token validation
✅ [docs] README: Update setup instructions

❌ "fixed stuff"
❌ "updated files"
❌ "changes"
```

**With ticket reference**:
```
✅ [feat] ContactForm: Add validation (#TICKET-42)
✅ [fix] Hero: Fix scaling (fixes #TICKET-38)
```

---

## 🔄 Pre-Sprint Standards

**Before starting new sprint**:

### Planning Phase
- [ ] Acceptance criteria defined (clear done = definition)
- [ ] Estimate in story points (follow Fibonacci: 1, 2, 3, 5, 8, 13)
- [ ] Dependencies identified (blocking items flagged)
- [ ] Known risks documented

### Setup Phase
- [ ] Branch created: `feature/description` or `fix/description`
- [ ] Branch strategy: Feature branch → PR → Review → Main
- [ ] Local build works: `npm run build` succeeds
- [ ] Testing environment ready

---

## 📊 Post-Sprint Standards

**End of every sprint** (before deployment):

### Code Freeze
- [ ] No new features added (bug fixes + docs only)
- [ ] All changes reviewed (min 1 approval)
- [ ] Testing complete (manual + automated)

### QA Sign-Off
- [ ] Staging deployment tested
- [ ] Forms work end-to-end
- [ ] No console errors
- [ ] Performance baseline met
- [ ] Accessibility checked

### Monitoring Setup
- [ ] Sentry alerts configured
- [ ] Dynatrace baseline recorded (pre-deployment)
- [ ] Error rate threshold set
- [ ] Performance thresholds set

### Deployment Approval
- [ ] Security scan passed
- [ ] All tests green
- [ ] Backup ready (can rollback)
- [ ] Team notified (deployment window)

### Post-Deployment (First 30 min)
- [ ] Site loads successfully
- [ ] Sentry shows no new errors
- [ ] Dynatrace metrics normal
- [ ] Forms working
- [ ] No spike in error rate

### Handoff Documentation
- [ ] Changelog updated
- [ ] Known issues documented
- [ ] Next sprint blockers identified
- [ ] Lessons learned captured

---

## 🚨 Auto-Enforced Rules (Via Cursor)

### Forbidden Patterns (auto-reject on commit)
```
❌ console.log (except .debug.ts files)
❌ TODO without ticket reference
❌ Commented code blocks
❌ var keyword (use const/let)
❌ any type (use unknown or specific)
❌ Direct env access (use import from .env)
❌ API keys in strings
❌ Large console objects (>10 lines)
```

### Required Patterns (auto-check)
```
✅ All functions have JSDoc comments
✅ All components have prop types
✅ Error handling present (try/catch or error boundary)
✅ Accessibility attrs (alt, aria-label, role)
✅ Security headers in config
✅ Environment variables prefixed (PUBLIC_*, or private)
```

---

## 📋 Component Standards

### Astro Components
```astro
---
/**
 * ComponentName - Brief description
 *
 * @param {string} label - Form field label
 * @param {string} type - Input type (text, email, etc)
 * @param {boolean} required - Is field required?
 *
 * @example
 * <FormInput label="Email" type="email" required={true} />
 */

const { label, type = "text", required = false } = Astro.props;

// Validation: Error messages defined here
const errors = {
  email: "Please enter a valid email",
  required: "This field is required",
};
---

<!-- Component JSX -->

<style>
  /* Scoped styles only */
</style>
```

### React/Lit Components
```typescript
/**
 * Button - Primary action button
 *
 * @param {string} text - Button text
 * @param {() => void} onClick - Click handler
 * @param {'primary' | 'secondary'} variant - Button style
 * @param {boolean} disabled - Disable state
 *
 * @example
 * <Button text="Submit" onClick={() => {}} variant="primary" />
 */
export function Button({ text, onClick, variant = "primary", disabled = false }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={text}
    >
      {text}
    </button>
  );
}
```

---

## 🧪 Testing Standards

### Before Deployment
```bash
# Unit tests (if applicable)
npm run test

# Build test
npm run build

# Performance audit
npm run lighthouse

# Security scan
npm audit

# Type check
npm run type-check
```

### Manual Testing Checklist
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS, Android)
- [ ] Tablet (iPad, Android tablet)
- [ ] Forms (submit, validation, error states)
- [ ] Navigation (all links work)
- [ ] Performance (Lighthouse >90)
- [ ] Accessibility (Tab through, screen reader test)

---

## 📈 Monitoring Standards

### Pre-Deployment Baseline
```
Record (in Dynatrace):
- Page load time (baseline)
- Error rate (baseline)
- Active sessions count
- Top pages by traffic
```

### Post-Deployment Monitoring (First 24h)
```
Alert thresholds:
- Load time >1.5x baseline → Investigate
- Error rate >5% → Investigate
- Specific errors >10 in 1h → Alert
- Form failure rate >5% → Alert
- Sentry critical error → Immediate alert
```

### First Week Review
```
Check (ask Claude):
- Performance degradation? (compare to baseline)
- Error spike? (investigate in Sentry)
- User complaints? (check support)
- Conversion drop? (compare to week before)
```

---

## 🔐 Security Standards

### Every Deployment Must Have
- [ ] HTTPS enforced
- [ ] Security headers present (CSP, X-Frame-Options, etc)
- [ ] No API keys in code
- [ ] .env properly ignored
- [ ] npm audit: 0 vulnerabilities
- [ ] Dependencies updated (check for critical security updates)

### Form Security
- [ ] Input validation (client-side + server-side)
- [ ] CSRF tokens (if form submits to backend)
- [ ] Rate limiting (max 10 submissions/minute per IP)
- [ ] Email validation (RFC 5322 compliant)
- [ ] Message length limits (min 10, max 5000 chars)

### Data Privacy
- [ ] No PII in logs
- [ ] No sensitive data in localStorage
- [ ] GDPR compliance (privacy policy updated)
- [ ] Form data encrypted (HTTPS)
- [ ] Delete old form submissions (>90 days)

---

## 📚 Documentation Standards

### README
- [ ] Setup instructions updated
- [ ] Dependencies documented
- [ ] Environment variables listed
- [ ] Build/deploy process explained
- [ ] Contributing guidelines present

### Code Comments
```javascript
// ✅ Good: Explains WHY, not what
// We cache form state to prevent resubmission on re-render
const [formState, setFormState] = useState(initialState);

// ❌ Bad: Obvious from code
// Set form state
const [formState, setFormState] = useState(initialState);

// ✅ Good: Complex logic explained
// Debounce email validation to reduce API calls
// (max 1 check per 500ms)
const debouncedValidateEmail = debounce(validateEmail, 500);

// ✅ Good: Edge case documented
// Handle null email field (can happen if form cleared)
if (!email) return null;
```

### JSDoc Comments
```typescript
/**
 * Validates email format
 *
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * isValidEmail("test@example.com") // true
 * isValidEmail("invalid") // false
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## 🎯 Quality Gates (Must Pass)

| Gate | Threshold | Action if Failed |
|------|-----------|------------------|
| TypeScript errors | 0 | Reject deployment |
| ESLint warnings | 0 (critical only) | Fix or suppress with reason |
| Security audit | 0 vulnerabilities | Fix or document exception |
| Build size | <500KB gzipped | Investigate bloat |
| Lighthouse | >90 all categories | Optimize or explain |
| Test coverage | >70% (if tests exist) | Add tests or justify |
| Type coverage | >95% | Add types |

---

## 🚀 Deployment Workflow

```
1. Feature complete + tested locally
2. Create PR (auto-runs: lint, type-check, build, tests)
3. PR review + approval (min 1 person)
4. Merge to main
5. GitHub Actions deploys to Vercel (auto)
6. Post-deployment check:
   - Verify site loads
   - Check Sentry (no new errors)
   - Check Dynatrace (metrics normal)
   - Test forms work
7. Done! Monitor for 24h
```

---

## 📋 Violation Handling

### Minor (warning)
- console.log left in code
- Missing comment on complex logic
- Unused import

**Action**: Add comment in PR, fix before merge

### Major (blocking)
- Security vulnerability detected
- Build fails
- TypeScript errors
- npm audit warnings
- Tests failing

**Action**: Must be fixed before merge (blocking PR)

### Critical (immediate action)
- Secrets found in code (API keys, passwords)
- Malicious dependencies detected
- Security header missing
- Production deploy broken

**Action**: Immediate rollback + incident review

---

## ✨ Best Practices

### Do's ✅
- Commit often (small, logical commits)
- Write meaningful commit messages
- Test locally before pushing
- Review your own code first
- Ask for help when stuck
- Document decisions (ADRs optional)
- Use TypeScript strict mode
- Add error boundaries
- Monitor performance
- Keep dependencies updated

### Don'ts ❌
- Don't commit directly to main (always PR)
- Don't skip tests to go faster
- Don't leave console.logs
- Don't commit API keys or secrets
- Don't mix refactoring with features
- Don't use var (use const/let)
- Don't use any type
- Don't hardcode values (use .env)
- Don't ship without testing
- Don't ignore Sentry errors

---

**Status**: Active ✅
**Last Updated**: November 1, 2025
**Next Review**: December 1, 2025
