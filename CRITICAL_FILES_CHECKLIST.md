# 🎯 Critical Files Checklist

**Purpose**: Ensure all critical standards are installed and active
**Status**: Installation verification checklist
**Last Updated**: November 1, 2025

---

## ✅ File Installation Status

### Core Standards Files
| File | Location | Purpose | Status |
|------|----------|---------|--------|
| **POST_SPRINT_STANDARDS.md** | `.cursor/rules/` | Pre/post-sprint checklist | ✅ Active |
| **development.mdc** | `.cursor/rules/` | Cursor IDE rules enforcement | ✅ Active |
| **pre-commit hook** | `.husky/pre-commit` | Git pre-commit validation | ✅ Active |
| **.env.example** | `odyssey/` | Environment variables template | ✅ Active |
| **.gitignore** | `odyssey/` | Prevent accidental commits | ✅ Verify |
| **package.json** | `odyssey/` | Build scripts & hooks | ✅ Verify |
| **astro.config.mjs** | `odyssey/` | Security headers & config | ✅ Active |
| **vercel.json** | `odyssey/` | Deployment & headers | ✅ Active |

---

## 📋 Pre-Deployment Verification

### Step 1: Verify Standard Files Exist
```bash
# Check files are in place
ls -la .cursor/rules/POST_SPRINT_STANDARDS.md
ls -la .cursor/rules/development.mdc
ls -la .husky/pre-commit
ls -la odyssey/.env.example
```

**Expected**: All files exist and are readable

---

### Step 2: Verify Git Configuration
```bash
# Check .gitignore includes .env
grep "\.env" odyssey/.gitignore

# Should output:
# .env
# .env.local
# .env.*.local
```

**Expected**: `.env` is in `.gitignore` (NOT committed to git)

---

### Step 3: Verify Husky Pre-Commit Hook
```bash
# Check hook is executable
ls -la odyssey/.husky/pre-commit

# Should show: -rwxr-xr-x (executable)
```

**Expected**: Hook file has executable permissions

---

### Step 4: Verify Build Scripts
```bash
# Check package.json has required scripts
cat odyssey/package.json | grep -A 10 '"scripts"'

# Should include:
# - build: astro build
# - dev: astro dev
# - type-check: astro check (if available)
# - lint: eslint . (if available)
```

**Expected**: All build scripts present

---

### Step 5: Verify Security Headers
```bash
# Check vercel.json has security headers
cat odyssey/vercel.json | grep -A 5 "headers"

# Should include:
# - X-Frame-Options
# - X-Content-Type-Options
# - CSP header
# - HSTS header
```

**Expected**: All required security headers present

---

### Step 6: Verify Environment Variables
```bash
# Check .env exists (not tracked by git)
[ -f odyssey/.env ] && echo "✅ .env file exists" || echo "❌ .env missing"

# Check .env is ignored
git status odyssey/.env

# Should show:
# (nothing - .env is git-ignored)
```

**Expected**: `.env` exists locally but not in git

---

## 🚀 First Run Setup

### Installation Steps

```bash
# 1. Copy .env template
cd odyssey
cp .env.example .env

# 2. Fill in your credentials
# Edit odyssey/.env and add your actual values:
# GITHUB_TOKEN=...
# NOTION_API_KEY=...
# SUPABASE_URL=...
# etc

# 3. Verify .env is not tracked
git status .env
# Should show: (nothing - it's ignored)

# 4. Install pre-commit hooks (if using husky)
npx husky install

# 5. Test build
npm run build

# 6. Verify no secrets in build
npm run build 2>&1 | grep -i "secret\|token\|key" || echo "✅ No secrets leaked"

# 7. Test pre-commit hook
# (will run automatically on next commit)
```

---

## 📝 Daily Checklist

### Before Starting Work
- [ ] Pull latest code: `git pull`
- [ ] Install dependencies: `npm install`
- [ ] Build locally: `npm run build`
- [ ] Verify no errors in terminal
- [ ] Start dev server: `npm run dev`

### Before Committing Code
```bash
# Pre-commit hook will run automatically:
# 1. Check for console.logs ✅
# 2. Check for secrets ✅
# 3. Check for TODO without tickets ✅
# 4. Run TypeScript check ✅
# 5. Run ESLint ✅
# 6. Check .env is ignored ✅
# 7. Verify build succeeds ✅

# If any check fails:
# - Fix the issue
# - Try committing again
# - Hook will auto-rerun
```

### Before Pushing to GitHub
```bash
# 1. Verify all tests pass (if applicable)
npm test

# 2. Verify build size is reasonable
npm run build 2>&1 | tail -20

# 3. Check for any Sentry/monitoring issues
# (Ask Claude: "Any current issues in Sentry?")

# 4. Push to GitHub
git push origin feature/your-branch

# GitHub Actions will:
# - Re-run all checks
# - Deploy to staging (if configured)
# - Show results on PR
```

---

## 🔍 Monitoring Active

### Cursor IDE Integration
- **When**: Every time you edit code
- **What**: Cursor checks:
  - TypeScript errors (real-time)
  - ESLint violations (real-time)
  - Security issues (real-time)
  - Missing documentation (on hover)

### Pre-Commit Hook
- **When**: When you run `git commit`
- **What**: Checks:
  - No console.logs left
  - No secrets in code
  - All TODOs have ticket refs
  - TypeScript passes
  - ESLint passes
  - Build succeeds

### GitHub Actions (if configured)
- **When**: When you push to GitHub
- **What**: Re-runs all pre-commit checks + tests

### Deployment Checks
- **When**: Before deploying to production
- **What**: Manual verification:
  - Security audit: `npm audit`
  - Performance: Lighthouse >90
  - Monitoring: Sentry/Dynatrace active
  - Forms: All working

---

## 🚨 If Checks Fail

### Pre-Commit Hook Failed

**Symptom**: Cannot commit code
```
❌ Console.logs found (non-debug files)
❌ Possible secrets found in code
```

**Solution**:
1. Read the error message
2. Fix the issue in your code
3. Try commit again
4. Hook will re-run automatically

**Example**:
```bash
# You see: "Console.logs found"
# 1. Remove the console.log() from your code
# 2. git add .
# 3. git commit -m "Your message"
# Hook re-runs - should pass now
```

---

### TypeScript Error
```
❌ TypeScript errors found
Type 'undefined' is not assignable to type 'string'
```

**Solution**:
1. Fix the TypeScript error
2. Or add type assertion if needed
3. Retry commit

---

### ESLint Error
```
❌ ESLint errors found
Unexpected console statement
```

**Solution**:
1. Run `npm run lint --fix` (auto-fixes many issues)
2. Manual fix remaining issues
3. Retry commit

---

### Build Failed
```
❌ Build failed
ENOENT: no such file or directory, open 'src/missing-file.ts'
```

**Solution**:
1. Check error message for file name
2. Verify file exists or import is correct
3. Run `npm run build` locally to debug
4. Retry commit

---

## 📊 Standards Dashboard

### What's Automatically Enforced

| Standard | Enforced By | When |
|----------|-----------|------|
| No console.logs | Pre-commit hook | On commit |
| No secrets | Pre-commit hook | On commit |
| TypeScript strict | Pre-commit hook + Cursor | Real-time + commit |
| ESLint rules | Pre-commit hook + Cursor | Real-time + commit |
| Build succeeds | Pre-commit hook | On commit |
| Security headers | Manual check | Pre-deployment |
| Performance >90 | Manual check | Pre-deployment |
| Monitoring active | Manual check | Pre-deployment |

### What's Manual (You Must Check)

| Standard | How to Check | When |
|----------|-------------|------|
| Forms working | Test in browser | Before deploy |
| Mobile responsive | Test on device | Before deploy |
| Accessibility | Tab navigation + screen reader | Before deploy |
| No new errors | Check Sentry | After deploy |
| Performance normal | Check Dynatrace | After deploy |
| Monitoring alerts | Set up in Sentry/Dynatrace | During setup |

---

## 🎓 Learning Resources

### For Cursor IDE Users
- View settings: `Cmd/Ctrl + ,` → Search "Cursor Rules"
- MDC format: https://github.com/continuedev/continue/wiki/MDC-format
- Custom rules: `.cursor/rules/*.mdc`

### For Git Users
- Pre-commit hooks: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- Husky documentation: https://typicode.github.io/husky/
- Best practices: https://github.blog/2015-06-08-the-power-of-git-hooks/

### For TypeScript
- Strict mode: https://www.typescriptlang.org/tsconfig#strict
- Best practices: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

### For Security
- OWASP: https://owasp.org/www-project-top-ten/
- npm audit: https://docs.npmjs.com/cli/v8/commands/npm-audit
- Security headers: https://securityheaders.com/

---

## 🔧 Troubleshooting

### "Hook failed" on commit
```bash
# Debug: Run checks manually
npm run type-check    # TypeScript
npm run lint         # ESLint
npm run build        # Build

# Fix issues, retry commit
```

### "My IDE not respecting rules"
```bash
# Restart IDE to reload Cursor rules
# Or: Check .cursor/rules/ files exist
# Or: Verify VS Code/Cursor is using correct workspace
```

### ".env file keeps getting tracked"
```bash
# If already committed:
git rm --cached odyssey/.env
git commit -m "Remove .env from git tracking"

# Verify .gitignore has .env:
grep -n "\.env" odyssey/.gitignore

# Should see: *.env or .env entries
```

### "Pre-commit hook not running"
```bash
# Check husky is installed
ls -la odyssey/.husky/pre-commit

# If missing, reinstall:
cd odyssey
npx husky install

# Make hook executable:
chmod +x .husky/pre-commit
```

---

## 📋 Final Verification Checklist

**Before pushing first code with standards**:

- [ ] `.cursor/rules/` directory exists with 2 files
- [ ] `.husky/pre-commit` exists and is executable
- [ ] `odyssey/.env.example` exists and is documented
- [ ] `odyssey/.env` exists locally (not in git)
- [ ] `odyssey/vercel.json` has security headers
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`
- [ ] Pre-commit hook runs on commit: `git commit -m "test"`
- [ ] All monitoring tools configured (Sentry, Dynatrace)

**Once verified**:
- [ ] Standards are active ✅
- [ ] Team can follow procedures
- [ ] Deployment safe and monitored
- [ ] Ready for production

---

**Status**: ✅ ACTIVE
**Last Verification**: November 1, 2025
**Next Review**: December 1, 2025
**Owner**: Development Team
