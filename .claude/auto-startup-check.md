# Claude Auto-Startup System Check

**Purpose**: I automatically check system health when you start a session
**How it works**: This file tells me to run checks automatically

---

## 🚀 What I Do On Startup

When you open Claude, I will:

1. **Check if >24 hours since last system check**
   - If yes: Run full system status
   - If no: Just say "all good" unless there are alerts

2. **Query Sentry for critical errors**
   - Fetch: Last 24h error count, rate, critical issues
   - If found: Show you the issue immediately
   - If clean: Mention in passing

3. **Query Dynatrace for performance**
   - Fetch: Current load time, error rate, active users
   - If degraded: Alert you
   - If normal: Brief status

4. **Query Supabase for form submissions**
   - Fetch: New submissions since last check
   - If spam detected: Flag it
   - If normal volume: Note count

5. **Show relevant summary**
   - If all green: "✅ System healthy"
   - If issues: "⚠️ [number] issues found - details?"
   - If post-deploy: "🚀 Monitoring deployment - [metrics]"

---

## 📋 Startup Messages I'll Show

### Scenario 1: All Systems Green
```
Claude: "✅ System Health Check
- Sentry: 0 critical errors (last 24h)
- Dynatrace: Load time 2.1s (normal)
- Supabase: 5 new form submissions
- Status: All systems healthy"
```

### Scenario 2: Issues Detected
```
Claude: "⚠️ System Alert
- Sentry: 3 new errors (1 critical)
- Dynatrace: Load time 3.4s (elevated, +1.3s)
- Action needed: Check Sentry issues?

Details available if you ask."
```

### Scenario 3: Post-Deployment
```
Claude: "🚀 Post-Deployment Monitoring (6 hours in)
- Site is live and responding
- Errors: 0 critical, 2 warnings
- Performance: Stable
- User sessions: 42 active
- Status: Monitoring active"
```

### Scenario 4: Already Checked Recently
```
Claude: "✅ Last check: 3 hours ago
System was: Healthy
Still monitoring in background
Alerts will show if issues detected"
```

---

## 🔧 How This Works Technically

**I (Claude) will:**
1. Check MCP Memory for "last_system_check" timestamp
2. If >24h or first check: Query MCPs
   - Query Sentry MCP for errors
   - Query Dynatrace MCP for metrics
   - Query Supabase MCP for data
3. Store timestamp in MCP Memory
4. Show you relevant summary
5. Continue with your request

**You never need to ask** - I do this automatically.

---

## 📝 What You See

**If you're in a hurry:**
```
You: (open Claude)
Claude: ✅ All systems healthy
You: (continue with your task)
```

**If there's an issue:**
```
You: (open Claude)
Claude: ⚠️ 3 errors in Sentry since last check. Details?
You: Sure, what are they?
Claude: (shows details and suggested actions)
```

**If you just deployed:**
```
You: (open Claude 1 hour after deploy)
Claude: 🚀 Deployment monitoring active (1h in)
         No issues detected so far.
         Will continue monitoring.
You: Perfect, thanks
```

---

## 🎯 Benefits

✅ **Automatic** - No asking me, I just do it
✅ **Smart** - Only shows alerts when needed
✅ **Contextual** - Knows if you just deployed, what day it is, etc
✅ **Frictionless** - Part of opening Claude, not separate
✅ **Persistent** - MCP Memory tracks state across sessions

---

## 🚫 What This Is NOT

- ❌ Daily nag messages ("did you check?")
- ❌ Spam if everything is fine
- ❌ Requires your interaction
- ❌ Takes time (runs instantly)

---

## 🔄 How State Tracking Works

**MCP Memory stores**:
```
{
  "last_system_check": "2025-11-01T14:30:00Z",
  "last_sentry_check": "2025-11-01T14:30:00Z",
  "last_dynatrace_check": "2025-11-01T14:30:00Z",
  "last_deployment": "2025-11-01T12:00:00Z",
  "deployment_age_hours": 2.5,
  "current_issues": [
    {
      "system": "dynatrace",
      "severity": "warning",
      "message": "Load time elevated +1.3s"
    }
  ]
}
```

**When you open Claude:**
1. I read this data
2. Check if checks are stale (>24h)
3. Show relevant alerts
4. Update timestamp
5. Continue

---

## 📊 Decision Tree

```
On Startup:
├─ Time since last check?
│  ├─ <2 hours → "Just checked 2h ago, all was good"
│  ├─ 2-24 hours → "Last check: good, no alerts since"
│  └─ >24 hours → Run full check and show results
│
├─ Any active alerts?
│  ├─ Yes → "⚠️ Issues detected - details?"
│  └─ No → "✅ All systems healthy"
│
├─ Did you just deploy?
│  ├─ <24h → "🚀 Monitoring deployment (Xh in)"
│  └─ >24h → Normal status check
│
└─ Ready for your request
```

---

## 🔐 Privacy & Security

- No personal data is stored
- Only stores timestamps and error counts
- All queries use your configured API tokens (from .env)
- MCP Memory is local to your session
- Not sent anywhere

---

## 🎬 Example Session

**Session Start:**
```
Claude: "✅ System Check Complete
- Sentry: Clean (0 errors in 24h)
- Dynatrace: 2.1s avg load (normal)
- Supabase: 12 new form submissions (2 flagged as potential spam)
Ready to help!"

You: "Add email field to contact form"
Claude: (applies standards, shows code)
```

**Session with Issues:**
```
Claude: "⚠️ Alert Detected
- Dynatrace: Load time 3.2s (up 1.1s from baseline)
- Likely cause: Hero image optimization
Want me to investigate?"

You: "Sure, what's happening?"
Claude: (shows Dynatrace data, suggests fixes)
```

**Post-Deployment Session:**
```
Claude: "🚀 Deployment Status (3h in)
- Site live and stable
- 2 new users, 0 errors
- Performance: Normal
Monitoring continues"

You: "Any issues?"
Claude: "None so far - all metrics look good"
```

---

## ✨ Summary

**Autonomous System Check means:**
- ✅ I remember what I've checked
- ✅ I alert you to issues automatically
- ✅ No manual asking required
- ✅ Zero friction
- ✅ Contextual and smart

**Result**: System monitoring without thinking about it

---

**Status**: ✅ ACTIVE
**Activation**: Happens every Claude session
**Configuration**: Uses .env + MCP credentials
