# MCP Memory Configuration for State Tracking

**Purpose**: Claude remembers system state between sessions
**Uses**: @modelcontextprotocol/server-memory

---

## 📚 What We Track

```json
{
  "system_checks": {
    "last_full_check": "ISO timestamp",
    "last_sentry_check": "ISO timestamp",
    "last_dynatrace_check": "ISO timestamp",
    "last_supabase_check": "ISO timestamp",
    "checks_this_week": "number"
  },

  "deployments": {
    "last_deployment_time": "ISO timestamp",
    "deployment_age_hours": "number",
    "post_deploy_monitoring_active": "boolean",
    "last_deployment_hash": "commit hash"
  },

  "alerts": {
    "active_alerts": [
      {
        "system": "sentry|dynatrace|supabase",
        "severity": "critical|high|medium|low",
        "message": "string",
        "timestamp": "ISO timestamp",
        "acknowledged": "boolean"
      }
    ],
    "alert_count_24h": "number",
    "alert_count_7d": "number"
  },

  "metrics": {
    "baseline_load_time": "2.1s",
    "baseline_error_rate": "0.3%",
    "current_load_time": "string",
    "current_error_rate": "string",
    "metric_trend": "improving|stable|degrading"
  },

  "forms": {
    "last_submission_count": "number",
    "last_check_time": "ISO timestamp",
    "spam_count_24h": "number"
  },

  "session_info": {
    "session_start": "ISO timestamp",
    "last_activity": "ISO timestamp",
    "session_duration": "duration string"
  }
}
```

---

## 🔄 Update Triggers

### Automatic Updates (No User Action)

**On Every Claude Startup**:
```
1. Check if time since last_full_check > 24h
2. If yes: Run all checks, update memory
3. If no: Just read current state
4. Update: last_activity, session_duration
```

**After Each Check**:
```
1. Query Sentry → update last_sentry_check, add any alerts
2. Query Dynatrace → update metrics, load_time, error_rate
3. Query Supabase → update form counts
4. If any alerts → add to active_alerts array
```

**On Deployment Detection**:
```
1. GitHub Action detects new deployment
2. Sets: last_deployment_time, post_deploy_monitoring_active=true
3. Sets: deployment_age_hours = 0
4. Creates: post-deployment check reminder
```

### Manual Updates (User Request)

**When you ask me**:
```
You: "Force a system check"
Claude:
  1. Queries all systems
  2. Updates all timestamps
  3. Shows results
  4. Stores in memory
```

---

## 🎯 How I Use This Memory

### Scenario 1: Morning Startup
```
Memory says:
  - last_full_check: 30 hours ago
  - alerts: none currently
  - last_deployment: 5 days ago

I do:
  1. Note checks are stale (>24h)
  2. Run full system check
  3. Show results: "✅ System Check Complete..."
  4. Update memory with new timestamps
```

### Scenario 2: Just Deployed
```
Memory says:
  - last_deployment: 15 minutes ago
  - post_deploy_monitoring_active: true
  - deployment_age_hours: 0.25

I do:
  1. Know to focus on post-deploy metrics
  2. Query Sentry/Dynatrace intensively
  3. Show: "🚀 Deployment Monitoring (15min in)"
  4. Note: Enhanced monitoring for 24h
```

### Scenario 3: Active Alert
```
Memory says:
  - active_alerts: [
      {system: "dynatrace", severity: "high", message: "Load time 3.2s"}
    ]
  - alert_count_24h: 3

I do:
  1. Show alert immediately: "⚠️ Alert: Load time elevated"
  2. Track: This is alert #3 in 24h
  3. Suggest investigation
  4. Don't nag (already acknowledged by memory)
```

### Scenario 4: Recently Checked
```
Memory says:
  - last_full_check: 2 hours ago
  - last check status: all green
  - no new alerts since

I do:
  1. Don't run full check (too soon)
  2. Quick note: "✅ Last check 2h ago, still good"
  3. Continue with your request
```

---

## 📊 Decision Logic

### When Should I Run Checks?

```
if (time since last_full_check > 24h) {
  → Run full check, update everything
} else if (time since last_check < 2h && no_new_alerts) {
  → Quick summary, don't query APIs
} else if (deployment_age_hours < 24 && post_deploy_monitoring_active) {
  → Intensive post-deploy checks every 6h
} else if (active_alerts.length > 0) {
  → Show alerts, suggest investigation
} else {
  → Mention last check time, continue
}
```

---

## 🔔 Alert Acknowledgment

**When alert is created**:
```json
{
  "system": "sentry",
  "severity": "high",
  "message": "5 errors in last hour",
  "timestamp": "2025-11-01T14:30:00Z",
  "acknowledged": false
}
```

**After you've seen it once**:
```json
// Same alert, but marked as seen
"acknowledged": true,
"acknowledged_by_user": true,
"acknowledged_at": "2025-11-01T14:31:00Z"
```

**Next session**:
```
Claude: "You have 1 acknowledged alert from yesterday
         Load time: 3.2s (resolved?)"
```

This prevents alert spam while keeping you informed.

---

## 📈 Trending

**I track trends to show progress**:

```json
"metrics": {
  "load_time_trend": {
    "7_days_ago": "2.3s",
    "today": "2.1s",
    "trend": "improving",
    "percent_change": "-8.7%"
  },

  "error_rate_trend": {
    "7_days_ago": "0.5%",
    "today": "0.3%",
    "trend": "improving",
    "percent_change": "-40%"
  }
}
```

**I use this to say**:
```
"Performance improving! Load time down 8.7% this week.
Error rate down 40%. Great progress!"
```

---

## 🔐 Memory Reset Scenarios

**When memory should reset**:
- Monthly (start fresh for new insights)
- After major deployment (clear old alerts)
- On request: "Reset memory"
- If corrupted/inconsistent

**What persists**:
- Historical metrics (7-day trend data)
- Deployment history
- Alert history (for trending)

---

## 🎯 Real Example: 5-Day Lifecycle

**Day 1 - Deploy**:
```
Memory:
  last_deployment: now
  post_deploy_monitoring_active: true
  deployment_age_hours: 0

Claude: "🚀 Deployment live. Monitoring activated."
```

**Day 1 - 6 hours later**:
```
Memory:
  deployment_age_hours: 6
  active_alerts: [{sentry: "1 error"}]
  alert_count_24h: 1

Claude: "⚠️ 1 error detected. Critical? No, just warning."
```

**Day 2**:
```
Memory:
  deployment_age_hours: 24
  post_deploy_monitoring_active: false (24h passed)
  active_alerts: [] (no new ones)
  alert_count_24h: 1 (resolved)

Claude: "✅ Deployment stable. Monitoring scaled back."
```

**Day 3 - You open Claude**:
```
Memory:
  last_full_check: 38 hours ago (stale!)
  active_alerts: none

Claude: "Haven't checked in 38h. Want current status?"
You: "Sure"
Claude: (runs full check, updates memory)
```

**Day 5 - You return**:
```
Memory:
  last_full_check: 3 days ago
  metrics show: stable performance all week
  alert_count_7d: 1 (resolved)
  trend: stable, no issues

Claude: "Week summary: Stable. 1 resolved alert. No issues."
```

---

## 📊 Dashboard View (What Memory Sees)

```
═══════════════════════════════════════════════════════
  BESPOKE ETHOS - SYSTEM STATE (MCP Memory)
═══════════════════════════════════════════════════════

Last Check:     3 hours ago ✅
Deployment:     5 days ago (stable)
Active Alerts:  0
Health:         ✅ GOOD

Recent Checks (7 days):
  ✅ Mon: 2.1s load, 0.3% errors
  ✅ Tue: 2.0s load, 0.2% errors
  ✅ Wed: 2.2s load, 0.3% errors (increased, but normal)
  ✅ Thu: 2.1s load, 0.3% errors
  ✅ Fri: 2.0s load, 0.2% errors ← best day
  ✅ Sat: (weekend, 12h monitoring lag)
  ⏳ Sun: not yet checked

Trend: ↗️ Improving (0.3% → 0.2% errors, consistent 2.0-2.2s load)
═══════════════════════════════════════════════════════
```

---

## ✨ Benefits

✅ **Persistent** - State survives across sessions
✅ **Smart** - Doesn't run unnecessary checks
✅ **Contextual** - Knows if you just deployed
✅ **Trending** - Shows progress over time
✅ **Alert Management** - Prevents spam, tracks resolution
✅ **Zero Friction** - Automatic, no configuration needed

---

**Status**: ✅ READY
**Integration**: Requires MCP Memory server
**Update Frequency**: Every check + session start
**Data Retention**: 7-day rolling window for trends
