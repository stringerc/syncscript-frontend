# 📋 MANUAL SETUP REQUIRED FOR 100/100

**Items That Need Your Action (External Services)**  
**Time Required:** ~1 hour total  
**Last Updated:** October 13, 2025

---

## 🔐 **SETUP 1: Auth0 API Configuration** (15 minutes)

**Why:** Enable backend API access tokens

**Steps:**
1. Go to: https://manage.auth0.com
2. Login with your Auth0 account
3. Navigate to: **Applications → APIs**
4. Click: **Create API**
5. Fill in:
   - Name: `SyncScript API`
   - Identifier: `https://api.syncscript.app`
   - Signing Algorithm: `RS256`
6. Click: **Create**
7. Go to: **Applications → SyncScript** (your app)
8. Navigate to: **APIs** tab
9. Toggle ON: **SyncScript API**
10. Save changes

**Verify:**
```bash
# Logout and login again
# Check browser console for: [TOKEN] logs
# Should see: "Access token retrieved"
```

**Result:** Backend API calls will work with real authentication

---

## 📊 **SETUP 2: PostHog Account & API Key** (20 minutes)

**Why:** Enable feature flags and advanced analytics

**Steps:**
1. Go to: https://posthog.com
2. Click: **Get started - free**
3. Sign up (use your email)
4. Create organization: `SyncScript`
5. Create project: `SyncScript Production`
6. Copy your **Project API Key** (starts with `phc_...`)
7. Add to `.env.local`:
   ```bash
   cd ~/syncscript-frontend
   echo "NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_KEY_HERE" >> .env.local
   ```
8. Add to **Vercel** environment variables:
   - Go to: Vercel Dashboard → syncscript-frontend → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_POSTHOG_KEY` = `phc_YOUR_KEY_HERE`
9. In PostHog Dashboard, create feature flags:
   - `backend_integration` (default: OFF)
   - `task_persistence` (default: OFF)
   - `ai_suggestions` (default: OFF)

**Verify:**
```bash
# Restart dev server
# Check console for: PostHog initialized
```

**Result:** Feature flags operational, progressive rollouts enabled

---

## 🧪 **SETUP 3: Pact Broker (PactFlow)** (30 minutes)

**Why:** Enable automated contract testing

**Steps:**
1. Go to: https://pactflow.io
2. Sign up: Free tier (5 users)
3. Create account
4. Create workspace: `SyncScript`
5. Get **Broker URL** and **API Token**:
   - Settings → API Tokens → Create Token
6. Add to GitHub Secrets:
   - Go to: GitHub → syncscript-frontend → Settings → Secrets
   - Add: `PACT_BROKER_URL` = `https://YOUR_WORKSPACE.pactflow.io`
   - Add: `PACT_BROKER_TOKEN` = `YOUR_TOKEN`
7. Do same for backend repository

**Verify:**
```bash
# CI will automatically publish contracts on merge
```

**Result:** Contract testing fully automated

---

## 💬 **SETUP 4: Slack Webhooks** (20 minutes)

**Why:** Enable automated alerts

**Steps:**
1. Go to: https://api.slack.com/apps
2. Click: **Create New App**
3. Choose: **From scratch**
4. App Name: `SyncScript Alerts`
5. Workspace: Your Slack workspace
6. Navigate to: **Incoming Webhooks**
7. Activate: Toggle **ON**
8. Click: **Add New Webhook to Workspace**
9. Choose channel: `#syncscript-alerts` (create if needed)
10. Copy webhook URL
11. Add to GitHub Secrets:
    - `SLACK_WEBHOOK_URL` = `https://hooks.slack.com/services/...`

**Test:**
```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"text":"🎉 SyncScript alert system test!"}'
```

**Result:** Automated alerts to Slack channel

---

## 🐛 **SETUP 5: Sentry Performance Monitoring** (15 minutes)

**Why:** Enhanced error tracking with performance traces

**Steps:**
1. Login to: https://sentry.io
2. Navigate to your SyncScript project
3. Go to: **Settings → Performance**
4. Enable: **Performance Monitoring**
5. Set sample rate: `1.0` (100% for MVP, reduce later)
6. Update `.env.local`:
   ```bash
   echo "NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=1.0" >> .env.local
   ```
7. Add to Vercel env variables

**Verify:**
```typescript
// Should see transactions in Sentry Performance tab
```

**Result:** Complete error + performance monitoring

---

## ✅ AFTER MANUAL SETUP

**Integration Score:** 90 → 97/100

**What Works:**
- ✅ Auth0 API: Access tokens flow to backend
- ✅ PostHog: Feature flags + analytics active
- ✅ Pact Broker: Contracts auto-published
- ✅ Slack: Alerts delivered
- ✅ Sentry: Performance traces captured

**Automated From That Point:**
- CI/CD runs contract tests
- Feature flags control rollouts
- Alerts fire on issues
- Monitoring tracks everything

---

## 📝 QUICK REFERENCE

**Accounts to Create:**
1. ✅ Auth0 (already have)
2. ⏳ PostHog (https://posthog.com)
3. ⏳ PactFlow (https://pactflow.io)  
4. ⏳ Slack App (https://api.slack.com/apps)
5. ✅ Sentry (already have)

**Environment Variables to Add:**
```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=1.0
```

**GitHub Secrets to Add:**
```
PACT_BROKER_URL=https://....pactflow.io
PACT_BROKER_TOKEN=...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

---

**Total Time:** ~1 hour  
**Impact:** +7 points (IAOB 90 → 97)

**Let me know when you've completed these setups, and I'll continue with the automated improvements!**

---

*Setup Guide Created: October 13, 2025*  
*Estimated Completion: 1 hour*

