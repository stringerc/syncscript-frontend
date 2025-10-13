# 📊 PostHog Setup Guide for SyncScript

## PostHog Configuration Steps

### Step 1: Create PostHog Account & Project

#### 1.1 Create PostHog Account
1. Go to [PostHog Dashboard](https://app.posthog.com)
2. Sign up for a free PostHog account
3. Verify your email address
4. Complete the onboarding process

#### 1.2 Create Project
1. In PostHog Dashboard, click **Create Project**
2. **Project Name:** `SyncScript`
3. **Description:** `Enterprise-grade productivity platform`
4. **Data Residency:** Choose your preferred region
5. Click **Create Project**

### Step 2: Configure Project Settings

#### 2.1 Project Settings
Navigate to **Project Settings**

**Basic Information:**
- **Project Name:** SyncScript
- **Description:** Enterprise-grade productivity platform
- **Timezone:** Your preferred timezone
- **Data Residency:** US/EU (choose based on compliance needs)

#### 2.2 API Keys
Go to **Project Settings** → **API Keys**

**Project API Key:**
- Copy the **Project API Key** (starts with `phc_`)
- This will be your `NEXT_PUBLIC_POSTHOG_KEY`

**Personal API Key:**
- Copy the **Personal API Key** (starts with `phx_`)
- Use for server-side API calls

### Step 3: Security Configuration

#### 3.1 Data Privacy
Go to **Project Settings** → **Data Privacy**

**Privacy Settings:**
- **Auto-capture:** ✅ Enabled
- **Session Recording:** ✅ Enabled
- **Feature Flags:** ✅ Enabled
- **A/B Testing:** ✅ Enabled

**Data Collection:**
- **IP Address:** ✅ Collect (for security monitoring)
- **User Agent:** ✅ Collect
- **Device Information:** ✅ Collect
- **Geographic Data:** ✅ Collect (for compliance)

#### 3.2 GDPR Compliance
Go to **Project Settings** → **GDPR**

**GDPR Settings:**
- **GDPR Compliance:** ✅ Enabled
- **Data Residency:** EU (if applicable)
- **Data Retention:** 25 months (GDPR compliant)
- **Right to Deletion:** ✅ Enabled

#### 3.3 Access Control
Go to **Project Settings** → **Access Control**

**Team Members:**
- **Admin Access:** You (project owner)
- **Developer Access:** Development team
- **Viewer Access:** Stakeholders (if needed)

### Step 4: Feature Configuration

#### 4.1 Auto-capture Settings
Go to **Project Settings** → **Auto-capture**

**Auto-capture Configuration:**
- **Page Views:** ✅ Enabled
- **Click Events:** ✅ Enabled
- **Form Submissions:** ✅ Enabled
- **API Calls:** ✅ Enabled
- **Error Tracking:** ✅ Enabled

**Custom Events:**
- **User Authentication:** Track login/logout
- **Security Events:** Track security incidents
- **Performance Metrics:** Track page load times
- **User Actions:** Track feature usage

#### 4.2 Session Recording
Go to **Project Settings** → **Session Recording**

**Recording Settings:**
- **Enable Recording:** ✅ Enabled
- **Record All Sessions:** ✅ Enabled
- **Mask Sensitive Data:** ✅ Enabled

**Privacy Controls:**
- **Mask Inputs:** ✅ Enabled
- **Mask Text:** ✅ Enabled (for sensitive data)
- **Exclude URLs:** Add sensitive endpoints

#### 4.3 Feature Flags
Go to **Feature Flags**

**Create Feature Flags:**
1. **Security Monitoring:**
   - **Flag Name:** `security-monitoring`
   - **Description:** `Enable real-time security monitoring`
   - **Status:** ✅ Enabled

2. **Advanced Analytics:**
   - **Flag Name:** `advanced-analytics`
   - **Description:** `Enable advanced analytics features`
   - **Status:** ✅ Enabled

3. **Performance Tracking:**
   - **Flag Name:** `performance-tracking`
   - **Description:** `Enable performance monitoring`
   - **Status:** ✅ Enabled

### Step 5: Analytics Configuration

#### 5.1 Dashboards
Go to **Dashboards**

**Create Security Dashboard:**
1. **Dashboard Name:** `SyncScript Security`
2. **Description:** `Security monitoring and analytics`
3. **Add Widgets:**
   - **User Authentication Events**
   - **Failed Login Attempts**
   - **Security Incidents**
   - **Performance Metrics**
   - **Error Rates**

**Create Performance Dashboard:**
1. **Dashboard Name:** `SyncScript Performance`
2. **Description:** `Application performance metrics`
3. **Add Widgets:**
   - **Page Load Times**
   - **API Response Times**
   - **Error Rates**
   - **User Engagement**
   - **Feature Usage**

#### 5.2 Insights
Go to **Insights**

**Create Key Insights:**
1. **Security Events:**
   - **Query:** Security events by type
   - **Visualization:** Bar chart
   - **Time Range:** Last 30 days

2. **User Engagement:**
   - **Query:** Daily active users
   - **Visualization:** Line chart
   - **Time Range:** Last 7 days

3. **Performance Metrics:**
   - **Query:** Average page load time
   - **Visualization:** Line chart
   - **Time Range:** Last 24 hours

### Step 6: Alerts Configuration

#### 6.1 Create Alerts
Go to **Alerts**

**Security Alerts:**
1. **Failed Login Attempts:**
   - **Trigger:** More than 10 failed logins in 5 minutes
   - **Action:** Send email notification
   - **Recipients:** Security team

2. **Security Incidents:**
   - **Trigger:** Security event detected
   - **Action:** Send Slack notification
   - **Recipients:** Security channel

**Performance Alerts:**
1. **High Error Rate:**
   - **Trigger:** Error rate > 5%
   - **Action:** Send email notification
   - **Recipients:** Development team

2. **Slow Response Time:**
   - **Trigger:** Average response time > 2 seconds
   - **Action:** Send Slack notification
   - **Recipients:** Performance channel

### Step 7: Integration Setup

#### 7.1 Next.js Integration
Configure PostHog in your Next.js application:

**Environment Variables:**
```bash
NEXT_PUBLIC_POSTHOG_KEY=your-project-api-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**PostHog Configuration:**
```javascript
// posthog-config.js
export const posthogConfig = {
  api_host: 'https://app.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: false,
  capture_pageleave: true,
  disable_session_recording: false,
  session_recording: {
    recordCrossOriginIframes: false,
    maskAllInputs: true,
    maskInputOptions: {
      password: true,
      email: true,
      phone: true,
    },
  },
  capture_performance: true,
  capture_network_requests: true,
  capture_console_logs: true,
  respect_dnt: true,
  opt_out_capturing_by_default: false,
}
```

#### 7.2 Custom Events
Define custom events for SyncScript:

**Security Events:**
```javascript
// Track security events
posthog.capture('security_event', {
  event_type: 'authentication_failure',
  severity: 'high',
  user_id: user.id,
  ip_address: request.ip,
  user_agent: request.headers['user-agent'],
  timestamp: new Date().toISOString()
});
```

**Performance Events:**
```javascript
// Track performance metrics
posthog.capture('performance_metric', {
  metric_type: 'page_load_time',
  value: loadTime,
  page: window.location.pathname,
  timestamp: new Date().toISOString()
});
```

**User Actions:**
```javascript
// Track user actions
posthog.capture('user_action', {
  action: 'task_created',
  task_id: task.id,
  task_type: task.type,
  user_id: user.id,
  timestamp: new Date().toISOString()
});
```

### Step 8: Monitoring Setup

#### 8.1 Real-time Monitoring
Configure real-time monitoring:

**Key Metrics to Track:**
- **User Authentication Events**
- **Security Incidents**
- **Performance Metrics**
- **Error Rates**
- **Feature Usage**
- **User Engagement**

**Monitoring Queries:**
```sql
-- Security events by type
SELECT event, COUNT(*) as count 
FROM events 
WHERE event LIKE 'security_%' 
GROUP BY event 
ORDER BY count DESC;

-- Performance metrics
SELECT 
  properties.page as page,
  AVG(properties.load_time) as avg_load_time
FROM events 
WHERE event = 'performance_metric' 
GROUP BY properties.page;
```

#### 8.2 Automated Reports
Set up automated reports:

**Daily Security Report:**
- **Schedule:** Daily at 9 AM
- **Recipients:** Security team
- **Content:** Security events, failed logins, incidents

**Weekly Performance Report:**
- **Schedule:** Weekly on Monday
- **Recipients:** Development team
- **Content:** Performance metrics, error rates, user engagement

### Step 9: Testing Configuration

#### 9.1 Test Event Tracking
Test PostHog integration:

```javascript
// Test basic event tracking
posthog.capture('test_event', {
  message: 'PostHog integration test',
  timestamp: new Date().toISOString()
});

// Test user identification
posthog.identify('user-123', {
  email: 'test@syncscript.com',
  name: 'Test User'
});

// Test feature flags
const featureFlag = posthog.isFeatureEnabled('security-monitoring');
console.log('Security monitoring enabled:', featureFlag);
```

#### 9.2 Test Session Recording
Test session recording:
1. Enable session recording
2. Navigate through the application
3. Verify recordings are captured
4. Check privacy controls are working

#### 9.3 Test Alerts
Test alert system:
1. Trigger test events
2. Verify alerts are sent
3. Check notification delivery
4. Validate alert content

### Step 10: Production Checklist

#### 10.1 Configuration Checklist
- [ ] **Project Created:** ✅
- [ ] **API Key Generated:** ✅
- [ ] **Auto-capture Enabled:** ✅
- [ ] **Session Recording Enabled:** ✅
- [ ] **Feature Flags Created:** ✅
- [ ] **Dashboards Created:** ✅
- [ ] **Alerts Configured:** ✅
- [ ] **GDPR Compliance:** ✅

#### 10.2 Integration Checklist
- [ ] **Next.js Integration:** ✅
- [ ] **Custom Events:** ✅
- [ ] **User Identification:** ✅
- [ ] **Performance Tracking:** ✅
- [ ] **Security Monitoring:** ✅
- [ ] **Error Tracking:** ✅

#### 10.3 Testing Checklist
- [ ] **Event Tracking:** ✅ Working
- [ ] **Session Recording:** ✅ Working
- [ ] **Feature Flags:** ✅ Working
- [ ] **Alerts:** ✅ Working
- [ ] **Dashboards:** ✅ Working
- [ ] **Reports:** ✅ Working

## Environment Variables

### Required Environment Variables
```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your-project-api-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional Configuration
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
```

### Vercel Configuration
1. Go to **Vercel Dashboard** → **Project Settings** → **Environment Variables**
2. Add the PostHog environment variables
3. Set for **Production**, **Preview**, and **Development** environments

## Troubleshooting

### Common Issues

#### 1. Events Not Appearing
**Problem:** Events not showing in PostHog dashboard
**Solution:** 
- Check API key is correct
- Verify events are being sent
- Check network connectivity
- Review PostHog logs

#### 2. Session Recording Not Working
**Problem:** Sessions not being recorded
**Solution:**
- Verify session recording is enabled
- Check privacy settings
- Ensure proper PostHog initialization
- Review browser console for errors

#### 3. Feature Flags Not Working
**Problem:** Feature flags not evaluating correctly
**Solution:**
- Check flag configuration
- Verify user identification
- Review flag targeting rules
- Test with different user segments

### Support Resources

#### PostHog Documentation
- [PostHog Documentation](https://posthog.com/docs)
- [Next.js Integration Guide](https://posthog.com/docs/integrate/client/js)
- [PostHog Community](https://github.com/PostHog/posthog/discussions)

#### SyncScript Integration
- Use the configuration from this guide
- Test with our local development setup
- Validate with our deployment scripts

## Success Criteria

### PostHog Setup Success
- [ ] **Project Created:** ✅
- [ ] **API Key Generated:** ✅
- [ ] **Configuration Complete:** ✅
- [ ] **Integration Working:** ✅
- [ ] **Events Tracking:** ✅
- [ ] **Session Recording:** ✅
- [ ] **Feature Flags:** ✅
- [ ] **Alerts Configured:** ✅

### Monitoring Success
- [ ] **Real-time Data:** ✅ Flowing
- [ ] **Security Events:** ✅ Tracked
- [ ] **Performance Metrics:** ✅ Monitored
- [ ] **User Analytics:** ✅ Active
- [ ] **Error Tracking:** ✅ Working
- [ ] **Dashboards:** ✅ Populated

---

**PostHog Setup Guide Prepared By:** AI Security Team  
**Date:** December 19, 2024  
**Status:** ✅ **READY FOR POSTHOG CONFIGURATION**