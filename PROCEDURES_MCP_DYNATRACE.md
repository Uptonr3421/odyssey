# MCP & Dynatrace Integration Procedures
**Last Updated**: November 1, 2025
**Status**: Active | **Tier 1 MCPs**: 6 Active | **Dynatrace**: Connected
**Purpose**: Standardized workflows to maximize monitoring and automation benefits

---

## 📋 Table of Contents
1. [Daily Monitoring Procedures](#daily-monitoring-procedures)
2. [Form Data Management (Supabase)](#form-data-management)
3. [Content Management (Notion)](#content-management)
4. [Error Tracking (Sentry)](#error-tracking)
5. [Performance Analysis (Dynatrace)](#performance-analysis)
6. [Deployment Procedures](#deployment-procedures)
7. [Weekly Review Checklist](#weekly-review-checklist)
8. [Emergency Procedures](#emergency-procedures)

---

## Daily Monitoring Procedures

### Morning Check (5 minutes)
**Purpose**: Verify system health before starting work

**Procedure**:
```
1. Ask Claude: "What's the current system status across all MCPs?"
2. Expected queries:
   - Dynatrace: Page load times, error rates, active sessions
   - Sentry: Any critical errors overnight
   - Supabase: Database connection health
   - GitHub: Any workflow failures
3. Verify response shows:
   ✅ Load times < 3 seconds
   ✅ Error rate < 0.1%
   ✅ No database errors
   ✅ All workflows passing
4. If ANY metric red: Follow Emergency Procedures (see below)
```

**Query Template**:
```
"Check system health:
1. Dynatrace: Last 24h page load time, error rate, session count
2. Sentry: Any critical/high priority errors
3. Supabase: DB connection status
4. GitHub: Last 3 workflow runs - pass/fail"
```

---

### Form Submission Processing
**Frequency**: Check after each significant traffic event
**Owner**: Automated (but manual verification recommended)

**Procedure**:
```
1. Monitor form submissions via Dynatrace
   - Track form_submission event count
   - Monitor submission latency (target: <500ms)
   - Alert on validation failures >5%

2. New submissions go to Supabase automatically
   - Table: contacts / subscribers
   - Fields: email, name, message, created_at, status

3. Query new submissions:
   Ask Claude: "What are the last 10 contact form submissions in Supabase?"

4. Response checklist:
   ✅ Email is valid format
   ✅ Name is present and reasonable length
   ✅ Message length acceptable (>10 chars)
   ✅ Timestamp is recent

5. Actions per submission:
   - ✅ Valid: No action needed (auto-acknowledged)
   - ⚠️ Spam/Bot: Mark status='spam' in Supabase
   - ❌ Error: Flag for manual review
```

**Emergency Response**:
If form error rate jumps >10%:
```
Ask Claude: "Diagnose form submission errors - check:
1. Supabase connection status
2. Recent form validation changes
3. Browser errors in Dynatrace
4. Network latency issues"
```

---

### Error Monitoring (Continuous)
**Purpose**: Catch issues before users do

**Automated Alerts** (via Sentry):
- ✅ Critical: Any exception
- ✅ High: >5 errors/hour
- ✅ Medium: New error type
- ✅ Low: Recurrence of known issue

**Manual Check** (as needed):
```
Ask Claude: "List all Sentry errors from last 24h, grouped by:
1. Severity (critical, high, medium, low)
2. Frequency (most common first)
3. Component (page/form/API)
4. Stack trace summaries"
```

**Response Action Items**:
- Critical → Fix immediately
- High (>5/day) → Schedule for today
- Medium → Add to sprint backlog
- Low → Monitor, fix if pattern emerges

---

## Form Data Management (Supabase)

### Contact Form Processing
**When**: Daily (or after traffic spike)
**Owner**: Claude (with your verification)

**Procedure**:
```
1. Query recent contacts:
   "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 20"

2. Claude retrieves and presents:
   - Email, name, message
   - Source (how they heard about you)
   - Status (new, responded, spam)
   - Follow-up needed flag

3. For each contact:
   - Email: Send automated thank you (recommend automation tool)
   - Name + message: Review for fit
   - If interested lead: Move to follow-up queue
   - If wrong audience: Polite decline email

4. Update Supabase status:
   Status values:
   - 'new': Just arrived
   - 'reviewed': You've seen it
   - 'qualified': Good lead, needs follow-up
   - 'contacted': Email sent
   - 'spam': Bot/irrelevant
   - 'closed': Deal done or passed
```

**Query Template**:
```
"Process Supabase contacts:
1. Get last 20 contacts (new status only)
2. For each, extract:
   - Email validation status
   - Interest fit (1-5 scale)
   - Action recommendation
3. Summarize as CSV: email, name, date, interest_level, action"
```

---

### Subscriber Management
**When**: Weekly
**Owner**: Automated collection, manual curation

**Procedure**:
```
1. Query subscriber count:
   "How many newsletter subscribers do we have in Supabase?"

2. Track metrics:
   - Total: Cumulative growth
   - New (last 7d): Weekly adds
   - Churn (unsubscribed): Retention rate

3. Segment for content:
   Ask Claude: "Segment subscribers by signup source:
   1. Homepage form
   2. Blog posts
   3. Services page
   4. Newsletter signup"

4. Use for targeted messaging:
   - Homepage signups: Welcome to services
   - Blog signups: Content roundup
   - Services signups: Case study updates
   - Newsletter signups: Deep dives
```

---

## Content Management (Notion)

### Syncing Content to Site
**Purpose**: Keep Notion as single source of truth
**When**: Before each deployment
**Owner**: Claude (automated via Notion MCP)

**Procedure**:
```
1. Query Notion for all content:
   Ask Claude: "Pull all content from Notion:
   1. Case Studies (published=true only)
   2. Services (active=true only)
   3. Blog Posts (draft=false, published <= today)
   4. Testimonials (approved=true only)"

2. Claude returns structured data:
   - Case Studies: title, industry, client_type, metrics, image_url
   - Services: name, description, price, icon, order
   - Blog Posts: title, author, category, publish_date, content
   - Testimonials: quote, client, role, company

3. Verify consistency:
   ✅ All required fields present
   ✅ Images are valid URLs
   ✅ Dates are in correct format
   ✅ Text is well-formatted (no encoding issues)

4. Update Astro files if content changed:
   - If Notion content changed: Update corresponding .astro file
   - Commit with message: "Update content from Notion [date]"
   - Deploy to Vercel

5. Notion stays in sync as fallback:
   - Astro is source of rendered truth
   - Notion is editorial/versioning history
```

**Sync Trigger Conditions**:
- Weekly: Scheduled refresh
- As-needed: When you update Notion
- Before campaign: Major content updates

**Query Template**:
```
"Sync content from Notion:
1. Get all published Case Studies with full details
2. Get all active Services with pricing
3. Get all published blog posts (title, date, excerpt)
4. Get all approved testimonials
5. Format as JSON for import into Astro"
```

---

## Error Tracking (Sentry)

### Daily Error Review
**When**: Morning check + anytime you see issues
**Duration**: 5-10 minutes

**Procedure**:
```
1. Check error dashboard:
   Ask Claude: "Sentry status:
   1. Total errors last 24h
   2. Critical/high severity count
   3. Most common error (type & count)
   4. Error rate trend (improving/worsening?)"

2. Response categories:

   CRITICAL (fix immediately):
   - Production down errors (500, timeout)
   - Authentication failures
   - Payment/transaction errors
   - Data loss risks

   HIGH (fix today):
   - Forms not submitting
   - Performance degradation (>2x baseline)
   - JavaScript syntax errors
   - API connection failures

   MEDIUM (fix this week):
   - UI rendering issues
   - Form validation bugs
   - Analytics failures
   - Non-critical 3rd party failures

   LOW (backlog):
   - Console warnings
   - Deprecated API usage
   - Browser-specific quirks

3. For each critical/high error:
   Ask Claude: "Deep dive on [error_name]:
   1. When did it start?
   2. How many users affected?
   3. What changed recently?
   4. Root cause analysis?
   5. Fix recommendation?"

4. Action items:
   - Critical: Create P1 issue, fix now
   - High: Create P2 issue, schedule today/tomorrow
   - Medium/Low: Log in issue tracker
```

**Response Examples**:
```
Error: "Cannot read property 'email' of undefined"
- Affect: 12 users, last 3 hours
- Likely cause: Form submission before page full load
- Fix: Add null-check in form validation
- Priority: High (affects conversions)
```

---

## Performance Analysis (Dynatrace)

### Weekly Performance Review
**When**: Every Friday, 2pm
**Duration**: 15 minutes
**Owner**: You (Claude provides data)

**Procedure**:
```
1. Get weekly baseline:
   Ask Claude: "Dynatrace weekly summary:
   1. Avg page load time (compare to last week)
   2. 95th percentile load time
   3. Error rate (compared to SLA)
   4. Top 3 slowest pages
   5. User session trends
   6. Geographic performance variation"

2. Analyze results:

   LOAD TIME:
   - Target: <2s average, <3s 95th percentile
   - If higher: Investigate image optimization, lazy loading
   - If lower: Celebrate and maintain

   ERROR RATE:
   - Target: <0.5%
   - If higher: Check Sentry for root cause
   - If improving: Identify what changed (good or coincidence?)

   SLOWEST PAGES:
   - Case Studies page slow? → Check image loading
   - Contact form slow? → Check form validation
   - Blog slow? → Check if new posts added (scale check)

   USER TRENDS:
   - Sessions growing? → Marketing is working
   - Bounce rate high? → Check page content/UX
   - Geographic patterns? → Adjust CDN if needed

3. Document findings:
   Create entry in performance log:
   - Date
   - 3 key metrics (load time, error rate, sessions)
   - 1 improvement made since last week
   - 1 thing to monitor next week

4. If metrics degrading:
   Ask Claude: "Performance dropped vs last week:
   1. What changed in deployments?
   2. Were new features added?
   3. Did image sizes change?
   4. Any third-party service slowdowns?"
```

### Real-Time Monitoring (During Campaigns)
**When**: During marketing campaign, product launch
**Duration**: Active monitoring

**Procedure**:
```
1. Set up Dynatrace dashboard for:
   - Real-time page load time (5-min average)
   - Active user sessions
   - Error rate spike detection
   - Conversion funnel (form starts vs submissions)

2. Check every 30 minutes during campaign:
   Ask Claude: "Last 30 min Dynatrace metrics:
   1. Load time average
   2. Currently active users
   3. Any errors?
   4. Traffic vs baseline (% increase)"

3. Alert thresholds:
   - Load time >3s → Check server/CDN
   - Error rate >1% → Check Sentry immediately
   - Users >2x baseline → Celebrate!

4. If problems emerge:
   - Load time creeping up: Purge CDN cache, check server load
   - Errors appearing: Check recent deployments, rollback if needed
   - Too much traffic: Success! Monitor for scale issues
```

---

## Deployment Procedures

### Pre-Deployment Checklist
**Before every deployment to Vercel**

```
□ Security checks:
  □ Run: npm audit (verify 0 vulnerabilities)
  □ Check: No secrets in code (API keys, passwords)
  □ Verify: .env file is in .gitignore
  □ Confirm: HTTPS enforced, security headers present

□ Performance checks:
  □ Build size < 500KB (gzipped)
  □ Lighthouse score >90 (all categories)
  □ Image sizes optimized (<100KB each)
  □ No unused JavaScript

□ Functional tests:
  □ Forms submit successfully
  □ Links work (internal + external)
  □ Mobile responsive (test on device)
  □ Dark/light theme toggle works

□ Sentry integration:
  □ Error tracking enabled
  □ DSN configured in astro.config.mjs
  □ Source maps uploaded

□ Content verification:
  □ Case studies up to date (from Notion)
  □ Services pricing current
  □ Contact info correct
  □ Social links working
```

### Deployment Steps
```
1. Create feature branch:
   git checkout -b deploy/[date]

2. Run final checks:
   npm run build  # Verify no errors
   npm run preview  # Test locally

3. Commit changes:
   git add .
   git commit -m "Deploy: [description of changes]"

4. Push to Vercel:
   git push origin deploy/[date]
   # Vercel auto-deploys on push

5. Post-deployment (10 min):
   □ Visit https://bespokeethos.com
   □ Verify page loads (<3s)
   □ Test forms work
   □ Check Sentry shows no new errors
   □ Verify Dynatrace metrics normal

6. If issues found:
   - Rollback: git revert [commit]
   - Push: git push origin main
   - Fix: Address in new branch
   - Re-deploy: Repeat above
```

---

## Weekly Review Checklist

### Every Friday, 3pm (15 minutes)
**Owner**: You
**Inputs**: Claude pulls data from all MCPs

**Ask Claude**:
```
"Weekly status report:
1. Form submissions (last 7 days):
   - Count
   - Lead quality (1-5 scale)
   - Actions taken

2. Performance (last 7 days):
   - Avg load time & trend
   - Error rate & trend
   - User sessions & trend
   - Top issue if any

3. Content (Notion):
   - Case studies pending review
   - Blog posts to publish
   - Services need updates?

4. Deployments:
   - Changes deployed last week
   - Any rollbacks?
   - Issues found?

5. Next week priorities:
   - 1 performance improvement
   - 1 content update
   - 1 feature/fix"
```

**Response Template** (Claude provides):
```
📊 WEEKLY REPORT: Oct 23-29, 2025

FORMS & LEADS
• Submissions: 23 (+15% vs last week)
• Lead quality: Average 4.2/5
• Actions: 15 followed up, 8 qualified

PERFORMANCE
• Avg load time: 2.1s (↓0.3s, good!)
• Error rate: 0.2% (↑0.1% - investigate)
• Sessions: 1,250 (↑18%, campaign working)
• Issue: Hero image slow on mobile

CONTENT
• Blog drafts: 3 ready to publish
• Case studies: 2 need update
• Services: Current

DEPLOYMENTS
• 2 deployments (both successful)
• 0 rollbacks
• Sentry: 3 errors fixed

NEXT WEEK
• Optimize mobile images
• Publish 3 blog posts
• Update 2 case studies
```

---

## Emergency Procedures

### Site Down / Not Loading
**Response Time**: <5 minutes

```
1. Verify you can access site:
   - Open https://bespokeethos.com
   - Wait 10 seconds
   - Try incognito/private window

2. Check status:
   Ask Claude: "URGENT - Site status check:
   1. Dynatrace: any errors/downtime?
   2. Vercel: deployment status
   3. DNS: bespokeethos.com resolving?
   4. GitHub: recent failed workflows?"

3. Common causes & fixes:

   VERCEL DOWN:
   - Check https://vercel.com/status
   - Wait for Vercel to recover (usually <30 min)
   - Contact Vercel support if >1 hour

   BUILD FAILED:
   - Check GitHub Actions for error
   - Rollback last commit if needed
   - Fix code issue locally, push new version

   DNS ISSUE:
   - Check domain registrar DNS settings
   - Verify CNAME/A records point to Vercel
   - DNS can take 2-24h to propagate

   CERTIFICATE EXPIRED:
   - Vercel auto-renews SSL
   - If showing cert error: Clear browser cache
   - Contact Vercel support if persists >1 hour

4. Notify team:
   - Estimated recovery time
   - What users see (error page, timeout, etc)
   - ETA for fix
```

### High Error Rate (>5% errors)
**Response Time**: <10 minutes

```
1. Get error details:
   Ask Claude: "URGENT - Error spike detected:
   1. Sentry: What's the most common error?
   2. When did errors start?
   3. How many users affected?
   4. Any recent code changes?"

2. Diagnose by type:

   FORM ERRORS:
   - Check form submission latency in Dynatrace
   - Verify Supabase connection
   - Look for JavaScript errors
   - Ask Claude: "Form error details:
     - Which field failing?
     - Validation or submission issue?
     - Browser-specific?"

   API ERRORS:
   - Check third-party services (GitHub, Notion, Supabase)
   - Verify API keys/credentials still valid
   - Check rate limiting (too many requests?)
   - Ask Claude: "API error analysis:
     - Which service failing?
     - Error message?
     - Retry strategy working?"

   JAVASCRIPT ERRORS:
   - Check browser console errors (Sentry shows these)
   - Verify recent deployments didn't break something
   - Check for missing dependencies
   - Ask Claude: "JS error details:
     - Which component/page?
     - Error message?
     - Reproducible?"

3. Fix priority:
   - Critical (auth/payments down): Rollback last deploy
   - High (forms broken): Fix now, push hotfix
   - Medium (UI issue): Fix within 2 hours
   - Low (warning messages): Add to backlog

4. Post-incident:
   - Document what happened
   - Add monitoring alert to prevent recurrence
   - Discuss in next team sync
```

### Performance Degradation (Page loads >3s)
**Response Time**: <15 minutes

```
1. Collect data:
   Ask Claude: "Performance degradation:
   1. Dynatrace: Page load time trend
   2. Which pages affected? (or all?)
   3. When did slowdown start?
   4. Server or client-side issue?"

2. Common causes:

   IMAGE LOADING SLOW:
   - Check image file sizes (should be <50KB each)
   - Verify CDN caching working
   - Try WebP format instead of JPEG
   - Ask Claude: "Image optimization:
     - Which images biggest?
     - Using lazy loading?
     - CDN headers correct?"

   SERVER OVERLOAD:
   - Check Vercel metrics in dashboard
   - Look for traffic spike
   - Check if new feature deployed
   - Ask Claude: "Server analysis:
     - Traffic vs baseline?
     - Function duration trending up?
     - Memory usage spiking?"

   JAVASCRIPT BUNDLE TOO LARGE:
   - Check build size: npm run build
   - Verify tree-shaking working
   - Look for unused libraries
   - Ask Claude: "Bundle analysis:
     - Total size?
     - Top 5 largest libraries?
     - Any dead code?"

   DATABASE QUERY SLOW:
   - Check Supabase query times
   - Verify database indexes exist
   - Look for N+1 queries
   - Ask Claude: "Database analysis:
     - Which queries slow?
     - When did performance drop?
     - Index recommendations?"

3. Fix action items:
   - Immediate: Purge CDN, restart Vercel
   - Next deployment: Optimize code/images/queries
   - Long-term: Add monitoring alerts
```

---

## Tool Credentials Reference

| Tool | Status | Credential | Location |
|------|--------|-----------|----------|
| **Notion** | ✅ Active | NOTION_API_KEY | .env |
| **Supabase** | ✅ Active | SUPABASE_URL, SUPABASE_KEY | .env |
| **Sentry** | ✅ Active | SENTRY_DSN | .env |
| **Dynatrace** | ✅ Active | DT_ENVIRONMENT, DT_API_TOKEN | .env |
| **Apify** | ⏳ Optional | APIFY_TOKEN | .env |
| **GitHub** | ✅ Active | GITHUB_TOKEN | .env |

---

## Quick Reference Commands

```bash
# Check all systems
"System status check: Dynatrace, Sentry, Supabase, GitHub"

# Get recent forms
"List last 10 contact submissions from Supabase"

# Check errors
"Show Sentry errors from last 24h, ordered by severity"

# Performance analysis
"Dynatrace: avg load time, error rate, top slow pages"

# Sync content
"Pull all published content from Notion (case studies, services, blog)"

# Deploy
npm run build  # Test build
npm run preview  # Test locally
git push  # Deploy to Vercel

# Verify deployment
"Post-deploy check: load time, errors, forms working"
```

---

## Notes & Customization

- **Frequencies**: Adjust based on your business volume
- **Thresholds**: Edit target load times, error rates based on your goals
- **Alerts**: Set up Sentry/Dynatrace native alerts for your thresholds
- **Team**: Add team members with appropriate access to each tool
- **Documentation**: Keep this procedures doc in your repo root

---

**Last Review**: November 1, 2025
**Next Review**: December 1, 2025
**Owner**: Bespoke Ethos Team
**Status**: Active ✅
