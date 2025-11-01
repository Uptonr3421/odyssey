# 👨‍💻 Developer Quick Start

**Purpose**: Get new developers productive in 15 minutes
**Audience**: Developers joining the project
**Last Updated**: November 1, 2025

---

## ⚡ 5-Minute Setup

```bash
# 1. Clone repo
git clone [your-repo]
cd bespokeethos

# 2. Install dependencies
npm install

# 3. Copy environment file
cp odyssey/.env.example odyssey/.env

# 4. Edit .env and add your credentials
# (Ask team for credentials)

# 5. Start dev server
cd odyssey
npm run dev

# 6. Visit http://localhost:3000
# ✅ Done! You're ready to code
```

---

## 🎯 Before You Code

### 1. Read These Files (5 minutes)
- [ ] `.cursor/rules/POST_SPRINT_STANDARDS.md` - What's expected
- [ ] `.cursor/rules/development.mdc` - What Cursor enforces
- [ ] `CRITICAL_FILES_CHECKLIST.md` - What's already set up

### 2. Understand Standards (3 minutes)
- No console.logs (except debug files)
- No hardcoded secrets (use .env)
- TypeScript strict mode
- Commit message format: `[feat] Scope: Description`

### 3. Configure Your IDE (2 minutes)
- **VS Code/Cursor**: Rules load automatically
- **Other IDE**: Install Prettier, ESLint manually

---

## 📝 Typical Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-name
```

**Branch naming**:
- ✅ `feature/add-email-validation`
- ✅ `fix/form-not-submitting`
- ❌ `my-changes`
- ❌ `update`

---

### 2. Code (Make Your Changes)

Cursor automatically checks:
- ✅ TypeScript errors (underlined in red)
- ✅ Unused variables (grayed out)
- ✅ Missing types (suggestions shown)

**Don't ignore Cursor's hints** - they catch bugs early

---

### 3. Commit Your Changes
```bash
git add .
git commit -m "[feat] ContactForm: Add email validation"
```

**Pre-commit hook will**:
1. Check for console.logs ✅
2. Check for secrets ✅
3. Run TypeScript check ✅
4. Run ESLint ✅
5. Build test ✅

**If checks fail**:
- Read error message
- Fix the issue
- Try commit again

**Examples**:
```bash
# ✅ Good commit message
[feat] ContactForm: Add client-side validation
[fix] Hero: Fix image scaling on mobile
[docs] README: Update setup instructions
[perf] Images: Optimize WebP conversion

# ❌ Bad commit message
"fixed stuff"
"updates"
"working on forms"
```

---

### 4. Push to GitHub
```bash
git push origin feature/your-feature-name
```

GitHub will:
- Run all checks again
- Show results on PR
- Block merge if any check fails

---

### 5. Create Pull Request
1. Go to GitHub
2. Click "Compare & pull request"
3. Fill in description
4. Request review from team
5. Wait for approval

**PR Description**:
```
## Summary
What does this PR do?

## Testing
How did you test it?

## Screenshots (if UI change)
Before/after images

## Checklist
- [ ] Tests pass
- [ ] No console.logs
- [ ] TypeScript strict mode
- [ ] Forms work (if applicable)
```

---

### 6. Code Review & Merge
1. Team reviews your code
2. Address feedback (new commits)
3. Team approves
4. You merge to main
5. GitHub auto-deploys (Vercel)

---

## 🧪 Testing

### Run Locally
```bash
cd odyssey

# TypeScript check
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Dev server
npm run dev
```

### Test in Browser
- Open http://localhost:3000
- Test your changes
- Check browser console (F12) for errors
- Test on mobile (DevTools responsive mode)

### Forms Testing
```bash
# 1. Fill out form
# 2. Try submit
# 3. Check browser console (should be empty)
# 4. Check Supabase (form data saved?)
# 5. Check Sentry (any errors logged?)
```

---

## 🚀 Deployment

### Your Code Goes Live When:
1. ✅ PR approved by team
2. ✅ All checks pass
3. ✅ You merge to `main`
4. ✅ GitHub Actions runs
5. ✅ Vercel deploys (automatic)

### Monitor After Deploy
```bash
# Check for errors (ask Claude)
"Any new errors in Sentry?"

# Check performance
"Is the site fast? Any performance issues?"

# Test functionality
Visit https://bespokeethos.com and test your changes
```

---

## 🎓 Common Tasks

### Add New Component
```astro
---
/**
 * MyComponent - Description
 *
 * @param {string} label - The label text
 * @param {boolean} required - Is it required?
 */

const { label, required = false } = Astro.props;
---

<div class="my-component">
  {label && <label>{label}</label>}
  <!-- Your JSX here -->
</div>

<style>
  .my-component {
    /* Your styles */
  }
</style>
```

### Add Form Validation
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

### Add Error Handling
```typescript
try {
  await submitForm(data);
} catch (error) {
  console.error("Failed:", error); // Logged with context
  showErrorMessage("Please try again");
}
```

### Use Environment Variables
```typescript
// ✅ Good
const apiKey = import.meta.env.GITHUB_TOKEN;

// ❌ Bad
const apiKey = "secret_key_hardcoded";
```

---

## 🐛 Debugging

### Issue: "Build failed"
```bash
# 1. Read error message (usually points to file)
# 2. Run build locally to debug
npm run build

# 3. Check the file mentioned
# 4. Fix and retry
```

### Issue: "TypeScript errors"
```bash
# 1. Check for missing types (use unknown or Type)
// ❌ const data: any = ...
// ✅ const data: MyData = ...

# 2. Check for null safety
// ❌ user.name.toUpperCase()
// ✅ user?.name?.toUpperCase() or if (user?.name)
```

### Issue: "Console errors in browser"
```bash
# 1. Open browser DevTools (F12)
# 2. Go to Console tab
# 3. Look for red errors
# 4. Fix in your code
# 5. Reload page (F5)
```

### Issue: "Forms not working"
```bash
# 1. Check form is submitting (network tab in DevTools)
# 2. Check Supabase has data
# 3. Check Sentry for errors (ask Claude)
# 4. Check browser console for JavaScript errors
```

---

## 📋 Pre-Commit Checklist

**Before committing, ask yourself**:

- [ ] Did I remove all console.logs?
- [ ] Did I add comments for complex logic?
- [ ] Did I test the feature locally?
- [ ] Did I follow the coding style?
- [ ] Did I update related documentation?
- [ ] Is my code TypeScript strict-safe?
- [ ] Am I using environment variables (not hardcoding secrets)?
- [ ] Did I handle errors properly?

---

## 🆘 Getting Help

### When Stuck
1. **Check existing code** - Look for similar patterns
2. **Search docs** - README, CONTRIBUTING, etc
3. **Ask team** - Slack or team chat
4. **Google it** - Stack Overflow, MDN, etc
5. **Ask Claude** - For technical questions about code

### Common Questions
```
"How do I add a new form field?"
→ Copy FormInput.astro pattern

"How do I track an error?"
→ Use try/catch, Sentry logs automatically

"How do I deploy?"
→ Merge to main, Vercel auto-deploys

"Is my code performance OK?"
→ Run Lighthouse, check Dynatrace

"How do I know if forms work?"
→ Test locally, check Supabase data, check Sentry
```

---

## 🔍 Code Review Checklist

**When reviewing someone's code**:

- [ ] Does it solve the problem?
- [ ] Does code follow standards?
- [ ] Are there console.logs? (flag to remove)
- [ ] Are secrets hardcoded? (flag to move to .env)
- [ ] Is error handling present?
- [ ] Is it well-documented?
- [ ] Did they test it?
- [ ] Will it performance impact?

---

## 🚫 Don't Do

```javascript
// ❌ console.log left in
console.log(user);

// ❌ Secrets hardcoded
const apiKey = "sk_live_12345";

// ❌ Any type
const data: any = response;

// ❌ No error handling
const result = await fetch(url);

// ❌ Commented out code
// const oldFunction = () => {};

// ❌ TODOs without tickets
// TODO: fix this later

// ❌ var keyword
var x = 5;

// ❌ Unvalidated user input
const html = `<div>${userInput}</div>`;
```

---

## ✅ Do This

```typescript
// ✅ Clean code
const user = getUserData();

// ✅ Secrets in .env
const apiKey = import.meta.env.GITHUB_TOKEN;

// ✅ Proper typing
const data: UserData = response;

// ✅ Error handling
try {
  const result = await fetch(url);
  // handle response
} catch (error) {
  console.error("Request failed:", error);
}

// ✅ No commented code (use git)
// (Old code removed, available in git history)

// ✅ TODOs with tickets
// TODO: [TICKET-42] implement pagination

// ✅ const/let
const x = 5;

// ✅ User input sanitized
const html = `<div>${sanitize(userInput)}</div>`;
```

---

## 📚 Resources

**Project Docs**:
- `README.md` - Project overview
- `PROCEDURES_MCP_DYNATRACE.md` - Monitoring procedures
- `POST_SPRINT_STANDARDS.md` - Standards details
- `CRITICAL_FILES_CHECKLIST.md` - Setup verification

**Astro**:
- https://docs.astro.build/
- https://docs.astro.build/en/guides/framework-components/

**TypeScript**:
- https://www.typescriptlang.org/docs/
- https://www.typescriptlang.org/play

**Git**:
- https://git-scm.com/book/
- https://github.com/features/actions

**Tools**:
- Cursor IDE: https://www.cursor.com/
- VS Code: https://code.visualstudio.com/
- GitHub: https://github.com/

---

## 🎯 Summary

**Just remember**:

1. **Create feature branch** → Code → Commit → Push → PR → Merge
2. **Let Cursor help** → It checks your code as you type
3. **Pre-commit hook prevents mistakes** → Can't commit bad code
4. **Ask for help** → Team is here to support you
5. **Monitor after deploy** → Check Sentry/Dynatrace for issues

**You're good to go!** 🚀

---

**Questions?** Ask the team or Claude
**Ready to code?** Start with `git checkout -b feature/your-feature`
**Good luck!** 🎉
