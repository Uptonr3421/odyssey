# Claude Context - Bespoke Ethos Standards & Procedures

**Purpose**: Help Claude remember and consistently apply standards and procedures
**Updated**: November 1, 2025
**Status**: Active

---

## 🎯 Core Instructions for Claude

### When User Asks Me to Code or Make Changes

**ALWAYS DO THIS FIRST**:

1. **Check the context** - Is this a code change, feature, or fix?
2. **Verify compliance** - Will this require any of the standards?
3. **Enforce standards** - Apply them BEFORE showing code
4. **Document approach** - Explain what standards are being met

---

## 📋 Standards I Must Apply

### Before Writing ANY Code

- ✅ **No console.logs** (unless debug file)
- ✅ **No hardcoded secrets** (use .env)
- ✅ **TypeScript types** (no `any`, use proper types)
- ✅ **Error handling** (try/catch or error boundary)
- ✅ **Comments** (on complex logic, not obvious code)
- ✅ **Form validation** (minlength, maxlength, required, type)
- ✅ **JSDoc** (on exported functions/components)
- ✅ **No dead code** (remove, don't comment out)

### When Editing Component Files

**For Astro Components** (`.astro`):
```astro
---
/**
 * ComponentName - What it does
 * @param {type} paramName - Description
 */
const { paramName } = Astro.props;
---
<!-- JSX here -->
<style>
  /* Scoped styles only */
</style>
```

**For Form Components**:
```astro
<FormInput
  type="email"
  label="Email"
  name="email"
  required={true}
  maxlength="254"
  autocomplete="email"
  inputmode="email"
/>
```

### When Adding Dependencies

- ✅ Check size (<50KB preferred)
- ✅ Check security (npm audit)
- ✅ Check necessity (is there a lighter alternative?)
- ✅ Verify no conflicts

---

## 🔍 Questions I Should Ask BEFORE Coding

**When user says**: "Add a new feature" or "Fix this bug"

**I should ask myself**:
1. Is this a form field? → Apply form standards
2. Does this need error handling? → Add try/catch
3. Is this exported? → Add JSDoc
4. Does this access data? → Check for null safety
5. Will this impact performance? → Check bundle size
6. Is this security-related? → Review twice
7. Does this store/access secrets? → Use .env
8. Is this async? → Check error handling

---

## 🚀 Deployment Procedures

### Before Deployment

**I should verify**:
1. ✅ Build succeeds: `npm run build`
2. ✅ TypeScript: 0 errors
3. ✅ ESLint: passes
4. ✅ npm audit: 0 vulnerabilities
5. ✅ No console.logs left
6. ✅ No secrets in code
7. ✅ Security headers in vercel.json
8. ✅ Forms have validation

### After Deployment

**I should remind user to**:
1. Check Sentry for errors: "Ask Claude: 'Any new errors in Sentry?'"
2. Check Dynatrace performance: "Ask Claude: 'How's the performance?'"
3. Test forms work: "Test form submission manually"
4. Monitor first 24h: "Watch for issues"

---

## 📊 MCP Usage Procedures

### Daily Workflows I Should Suggest

When user mentions...

**"I'm starting work"**
→ Suggest: "Want me to check system status? (Dynatrace, Sentry, Supabase)"

**"Someone filled out a form"**
→ Suggest: "Want me to check new leads in Supabase?"

**"The site feels slow"**
→ Suggest: "Let me query Dynatrace to see what's happening"

**"I updated content in Notion"**
→ Suggest: "Want me to sync that to the Astro files?"

**"I'm about to deploy"**
→ Suggest: "Let me verify all systems are green before you deploy"

**"Something broke"**
→ Suggest: "Let me check Sentry and Dynatrace to diagnose"

---

## 🔐 Security Checks I Must Do

### When editing form code:
- [ ] Has required attribute?
- [ ] Has type attribute?
- [ ] Has maxlength?
- [ ] Has validation?
- [ ] No user input directly in HTML (sanitized)?

### When editing API/data code:
- [ ] No hardcoded API keys?
- [ ] Using .env variables?
- [ ] Error handling present?
- [ ] Null checks on data?

### When editing deployment config:
- [ ] Security headers present?
- [ ] HTTPS enforced?
- [ ] .env not in git?
- [ ] Secrets not in code?

---

## 📝 Commit Message Standards I Must Enforce

**Format**: `[TYPE] Scope: Description`

**Valid Types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code reorganization
- `perf`: Performance improvement
- `docs`: Documentation
- `test`: Tests only
- `chore`: Build/tooling
- `security`: Security fix

**Examples**:
- ✅ `[feat] ContactForm: Add email validation`
- ✅ `[fix] Hero: Fix image scaling on mobile`
- ✅ `[security] Forms: Add CSRF protection`
- ❌ `fixed stuff`
- ❌ `updates`

---

## 🎓 Code Review Standards I Should Apply

When reviewing code (my own or if user asks):
- [ ] Follows TypeScript strict mode?
- [ ] Has error handling?
- [ ] Has JSDoc comments?
- [ ] No console.logs?
- [ ] No hardcoded secrets?
- [ ] Forms properly validated?
- [ ] Accessibility checked?
- [ ] Performance impact considered?

---

## 🚨 Red Flags I Should Stop At

If I see code that has:
- ❌ `any` type → Ask user to fix (or use `unknown`)
- ❌ Hardcoded secret → STOP, ask to move to .env
- ❌ No error handling on async → Ask to add try/catch
- ❌ console.log → Ask to remove
- ❌ Commented code → Ask to delete
- ❌ Missing types → Ask to add
- ❌ No form validation → Ask to add
- ❌ Missing JSDoc on export → Ask to add

**I should NOT commit or approve code with these issues.**

---

## 📚 Documentation Standards I Should Follow

When writing code:

**Functions** - JSDoc required:
```typescript
/**
 * Description of what it does
 * @param {type} name - Description
 * @returns {type} Description
 */
function myFunction(name: string): string {
  return name.toUpperCase();
}
```

**Components** - JSDoc required:
```astro
/**
 * ComponentName - What it does
 * @param {string} label - The label
 * @param {boolean} required - Is required?
 */
```

**Complex logic** - Comments required:
```typescript
// We debounce to prevent excessive API calls
const debouncedSearch = debounce(search, 500);
```

**Obvious code** - Comments NOT needed:
```typescript
// ❌ Don't do this:
// Set the name
const name = "John";

// ✅ Do this:
const name = "John";
```

---

## 🔄 Workflow I Should Suggest

### For Features:
```
1. Create branch: git checkout -b feature/description
2. Code locally (I enforce standards)
3. Commit (pre-commit hook validates)
4. Push (GitHub Actions checks)
5. Create PR
6. Team reviews
7. Merge to main (Vercel auto-deploys)
8. Monitor Sentry + Dynatrace
```

### For Bugs:
```
1. Ask: "What's the error?"
2. Check Sentry for stack trace
3. Create fix branch: git checkout -b fix/description
4. Apply fix
5. Test locally
6. Same deployment flow as features
```

### For Performance Issues:
```
1. Ask Claude: "Why is [page] slow?"
2. Query Dynatrace data
3. Identify bottleneck
4. Fix issue
5. Verify in Dynatrace after deploy
```

---

## 🎯 When User Asks Questions

**"Should I add this dependency?"**
→ Check size, security, necessity, alternatives

**"How do I structure this component?"**
→ Show component template with JSDoc, props, styles

**"Is this secure?"**
→ Check for: secrets, validation, sanitization, auth

**"Will this be fast?"**
→ Check for: bundle size, lazy loading, unoptimized images

**"What do I commit?"**
→ Explain format: `[TYPE] Scope: Description`

**"How do I test this?"**
→ Local: `npm run build`, `npm run type-check`, browser test

**"How do I deploy?"**
→ Feature branch → PR → Merge → Auto-deploy → Monitor

---

## 💡 Pro Tips for Enforcement

### What I Should NOT Do:
- ❌ Write code without standards
- ❌ Suggest dirty solutions for speed
- ❌ Let hardcoded secrets slide
- ❌ Skip error handling
- ❌ Forget about types
- ❌ Leave console.logs in code

### What I SHOULD Do:
- ✅ Enforce standards from day 1
- ✅ Explain WHY standards matter
- ✅ Suggest best practices
- ✅ Catch issues early
- ✅ Help user learn patterns
- ✅ Make code production-ready

---

## 📋 Quick Checklist

**Before showing ANY code to user**:
- [ ] TypeScript strict? (types present)
- [ ] Error handling? (try/catch or boundary)
- [ ] Comments? (complex logic only)
- [ ] JSDoc? (on exports)
- [ ] Validation? (forms have rules)
- [ ] Secrets safe? (.env, not hardcoded)
- [ ] Console clean? (no logs)
- [ ] Accessible? (buttons have text, images have alt)
- [ ] Performant? (no obvious bloat)
- [ ] Git-ready? (commit message format)

If ANY checkbox is ❌, fix it BEFORE showing code.

---

## 📞 MCP Tools to Use

### When user asks about:

**System status** → Use Dynatrace MCP
- "How's performance?"
- "Any errors?"
- "Is it slow?"

**Forms/leads** → Use Supabase MCP
- "Any new leads?"
- "Show form submissions"
- "Who filled out forms?"

**Errors** → Use Sentry MCP
- "Any errors?"
- "Show me Sentry errors"
- "What broke?"

**Content** → Use Notion MCP
- "Pull from Notion"
- "Sync content"
- "Update blog posts"

**Code/deploy** → Use GitHub MCP
- "Check deployment status"
- "Show recent commits"
- "Any failed workflows?"

---

## 🔄 Daily Reminders

**I should offer these checks**:

Morning: "System status?" (Dynatrace, Sentry, Supabase)
After forms: "Any new leads?" (Supabase)
Before deploy: "Ready to ship?" (All systems check)
After deploy: "Any new errors?" (Sentry 24h check)
When slow: "Why is it slow?" (Dynatrace)
When confused: "What changed?" (Git/GitHub)

---

## ✨ Summary

**My job is to**:
1. Remember these standards exist
2. Apply them BEFORE showing code
3. Suggest procedures when relevant
4. Catch issues early
5. Help user deploy confidently
6. Monitor after deployment

**I should NOT**:
1. Write code that violates standards
2. Skip error handling for speed
3. Allow secrets in code
4. Let TypeScript issues slide
5. Forget about accessibility
6. Deploy without verification

---

**Status**: ✅ ACTIVE
**Last Updated**: November 1, 2025
**Used By**: Claude (AI assistant)
**Purpose**: Ensure consistent quality and security
