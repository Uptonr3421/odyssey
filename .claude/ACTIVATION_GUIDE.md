# 🚀 How Claude Uses Standards & Procedures

**Purpose**: Explain how I (Claude) will remember and apply all the standards
**Read This**: If you want to understand how the system works

---

## How I Remember

### The Memory System

I have a file: `.claude/context.md`

This file contains:
- ✅ Standards I must apply (TypeScript, no console.logs, etc)
- ✅ Procedures I should suggest (ask about Dynatrace, Sentry, Supabase)
- ✅ Code patterns I should follow (component templates, form fields)
- ✅ Checklists I should use (before showing code, before deployment)
- ✅ Red flags I should catch (hardcoded secrets, missing types)

**Every time I work on code**, I reference this file to stay consistent.

---

## What I Do Automatically

### When You Ask Me to Code Something

```
1. You: "Add a contact form to the page"
2. Me: (reads .claude/context.md)
3. Me: Apply standards
   - Add JSDoc comments
   - Add form validation (minlength, maxlength, required)
   - Add error handling
   - Add TypeScript types
4. Me: Show you code that's already standards-compliant
5. You: Code is ready to commit (pre-commit hook will pass)
```

### When You Ask About Procedures

```
1. You: "Someone filled out a form"
2. Me: (reads PROCEDURES_MCP_DYNATRACE.md)
3. Me: "Want me to check new leads in Supabase?"
4. You: "Sure"
5. Me: Query Supabase and show you the submissions
```

### When You Deploy

```
1. You: "I'm deploying"
2. Me: (reads deployment section in context.md)
3. Me: "Let me verify systems are green first"
4. Me: Check Dynatrace, Sentry, GitHub
5. Me: "Safe to deploy"
6. You: Deploy
7. Me: "Let me monitor first 24h for errors"
```

---

## Questions I'll Ask You

**Before I write code**:
- "Is this a form field?" (→ add validation)
- "Does this need error handling?" (→ add try/catch)
- "Is this exported?" (→ add JSDoc)
- "Will this impact performance?" (→ check size)
- "Does this use secrets?" (→ use .env)

**When something goes wrong**:
- "Let me check Sentry for errors"
- "Let me check Dynatrace for performance"
- "Let me query Supabase for form data"
- "Let me check GitHub for recent changes"

**Before deploying**:
- "Everything green in Dynatrace?"
- "Any new errors in Sentry?"
- "All tests passing?"
- "Ready to ship?"

---

## Files I Reference

### For Standards
- `.cursor/rules/POST_SPRINT_STANDARDS.md` - Full checklist
- `.cursor/rules/development.mdc` - Cursor IDE rules
- `.claude/context.md` - **I read this constantly**

### For Procedures
- `PROCEDURES_MCP_DYNATRACE.md` - Daily workflows
- `DEVELOPER_QUICK_START.md` - How things work
- `CRITICAL_FILES_CHECKLIST.md` - Setup verification

### For Code Patterns
- `odyssey/src/components/` - Component examples
- `odyssey/src/components/forms/` - Form examples
- `.husky/pre-commit` - What can't be committed

---

## Real Examples

### Example 1: Adding a New Form Field

**You**: "Add a phone field to the contact form"

**Me** (internally):
1. Check context.md → forms need: type, label, name, required, maxlength, autocomplete, inputmode
2. Check existing forms → see the pattern
3. Apply standards:
   - Add proper type attribute
   - Add validation attributes
   - Add autocomplete hint
   - Add inputmode for mobile
4. Show code

**Result**: Your code is already standards-compliant

---

### Example 2: Fixing a Performance Issue

**You**: "The site feels slow"

**Me** (internally):
1. Check context.md → I should query Dynatrace
2. Query Dynatrace for performance data
3. Identify bottleneck (e.g., "Hero image is 3MB")
4. Suggest fix
5. After fix, verify in Dynatrace

**Result**: You know exactly what to optimize

---

### Example 3: Deploying a Feature

**You**: "I'm ready to deploy"

**Me** (internally):
1. Check deployment section in context.md
2. Run verification checklist:
   - Build succeeds? ✅
   - No TypeScript errors? ✅
   - No secrets in code? ✅
   - Security headers present? ✅
3. Confirm safe to deploy
4. After deployment, remind you to monitor
5. Check Sentry after 24h

**Result**: Confident, safe deployments

---

## How You Help Me Remember

### Reference Points in Conversations

When you mention something, I should recognize it:

**"I'm coding a form"**
→ I remember: Add validation (minlength, maxlength, required, type)

**"I'm deploying"**
→ I remember: Check build, TypeScript, ESLint, security headers

**"Something's broken"**
→ I remember: Check Sentry for errors, Dynatrace for performance

**"I updated Notion"**
→ I remember: Offer to sync to Astro files

**"New form submission"**
→ I remember: Offer to check Supabase

---

## What NOT to Expect

I won't:
- ❌ Force you to read 10 documentation files
- ❌ Slow you down with tedious checklists
- ❌ Make you manually check every standard
- ❌ Require approval for obvious fixes
- ❌ Forget context between messages

I will:
- ✅ Apply standards silently (you won't see me explaining)
- ✅ Show you compliant code immediately
- ✅ Suggest procedures when relevant
- ✅ Catch issues before they become problems
- ✅ Help you deploy confidently

---

## Testing It Works

### Test 1: Ask me to code something
```
You: "Add an email field to the newsletter form"
Me: (should show code with type="email", maxlength="254", etc)
```

### Test 2: Ask about a procedure
```
You: "Anyone filled out forms today?"
Me: (should query Supabase and show you leads)
```

### Test 3: Ask about performance
```
You: "Is the site fast?"
Me: (should query Dynatrace and report metrics)
```

### Test 4: Before deployment
```
You: "I'm deploying now"
Me: (should verify systems green before approving)
```

If these work, the system is active ✅

---

## Quick Reference

### I Will Offer These Suggestions

| Situation | I Should Suggest |
|-----------|------------------|
| Coding starts | "Want me to start with a template?" |
| Form field added | "Need validation rules?" |
| Something broken | "Let me check Sentry..." |
| Slow performance | "Let me query Dynatrace..." |
| Before deployment | "Everything green?" |
| After deployment | "Let me monitor for errors..." |
| Content updated | "Sync from Notion?" |
| New form submission | "Check new leads?" |

---

## How to Reset Me If Needed

If I stop following standards:

**Option 1: Remind me**
```
You: "Check the context.md - TypeScript types"
Me: (reads context.md, applies it going forward)
```

**Option 2: Point to specific file**
```
You: "Look at POST_SPRINT_STANDARDS.md - code quality section"
Me: (reads it, applies it)
```

**Option 3: Explicit instruction**
```
You: "Add JSDoc comments on all functions"
Me: (does it, remembers for future)
```

---

## Success Indicators

### You'll Know It's Working When:

- ✅ Code I show has proper types (no `any`)
- ✅ Forms have validation attributes
- ✅ Functions have JSDoc comments
- ✅ Error handling is present
- ✅ I suggest procedures before you ask
- ✅ I catch issues before deployment
- ✅ I reference procedures (Dynatrace, Sentry, Supabase)
- ✅ No manual checklisting needed (I do it)
- ✅ Pre-commit hook rarely blocks your code
- ✅ Deployments are confident and safe

---

## The Bottom Line

**What you get**:
- Standards applied automatically (you don't think about them)
- Procedures suggested when relevant (you don't look them up)
- Issues caught early (before they reach production)
- Code that's ready to commit (pre-commit hook passes)
- Deployments that are safe (monitoring active)
- Team that's confident (everything is documented)

**What I do**:
- Remember standards from `.claude/context.md`
- Apply them without asking
- Suggest procedures when relevant
- Check for compliance before showing code
- Monitor after deployment
- Help you deploy confidently

**Result**: A system that enforces quality without friction

---

**Status**: ✅ ACTIVE
**Last Updated**: November 1, 2025
**Created For**: Claude (AI) to remember and apply standards
