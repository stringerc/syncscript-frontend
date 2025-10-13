# 🔧 SyncScript Production Environment Setup

## Environment Variables Required for Production

### Auth0 Configuration
```bash
# Auth0 Domain (from your Auth0 dashboard)
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com

# Auth0 Application Credentials
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# Application URLs
AUTH0_BASE_URL=https://syncscript.vercel.app
AUTH0_SECRET=your-long-random-secret-key-32-chars-minimum

# Auth0 Configuration
AUTH0_SCOPE=openid profile email
AUTH0_SESSION_COOKIE_NAME=app_session
AUTH0_SESSION_COOKIE_LIFETIME=86400
AUTH0_SESSION_COOKIE_SECURE=true
AUTH0_SESSION_COOKIE_SAME_SITE=lax
```

### PostHog Analytics
```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Security Configuration
```bash
# Security Settings
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Session Management
SESSION_TIMEOUT=900000
JWT_EXPIRATION=3600

# Security Features
MFA_ENABLED=true
RBAC_ENABLED=true
API_PROTECTION_ENABLED=true
RESOURCE_PERMISSIONS_ENABLED=true
PRIVILEGE_ESCALATION_PREVENTION=true

# Data Protection
ENCRYPTION_AT_REST=true
ENCRYPTION_IN_TRANSIT=true
DATA_ANONYMIZATION=true
DATA_RETENTION_ENABLED=true
RIGHT_TO_DELETION=true

# Monitoring
SECURITY_EVENT_LOGGING=true
AUDIT_TRAIL=true
LOG_INTEGRITY=true
MONITORING_COVERAGE=true

# Compliance
GDPR_COMPLIANCE=true
CCPA_COMPLIANCE=true
SOC2_COMPLIANCE=true
ACCESSIBILITY_COMPLIANCE=true

# Error Handling
ERROR_MESSAGE_SECURITY=true
STACK_TRACE_PROTECTION=true
ERROR_LOGGING=true

# Network Security
HTTPS_ENFORCEMENT=true
SECURITY_HEADERS_ENABLED=true
CORS_CONFIGURED=true
DDOS_PROTECTION=true

# Session Security
SESSION_SECURITY=true
SESSION_REGENERATION=true
CONCURRENT_SESSION_CONTROL=true

# Input Validation
SQL_INJECTION_PREVENTION=true
CSRF_PROTECTION=true
FILE_UPLOAD_VALIDATION=true
```

## Vercel Environment Variable Setup Instructions

### Step 1: Access Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your SyncScript project
3. Navigate to **Settings** → **Environment Variables**

### Step 2: Add Environment Variables
Add each environment variable with the following settings:
- **Environment:** Production, Preview, Development
- **Value:** Your actual configuration value
- **Encrypted:** Yes (for sensitive values)

### Step 3: Required Environment Variables (Priority Order)

#### **Critical (Must be set before deployment):**
1. `AUTH0_SECRET` - 32+ character random string
2. `AUTH0_BASE_URL` - https://syncscript.vercel.app
3. `AUTH0_ISSUER_BASE_URL` - Your Auth0 domain
4. `AUTH0_CLIENT_ID` - From Auth0 dashboard
5. `AUTH0_CLIENT_SECRET` - From Auth0 dashboard
6. `NEXT_PUBLIC_POSTHOG_KEY` - From PostHog dashboard

#### **Security Features (Recommended):**
7. `MFA_ENABLED` - true
8. `RBAC_ENABLED` - true
9. `API_PROTECTION_ENABLED` - true
10. `SECURITY_EVENT_LOGGING` - true

#### **Compliance (Recommended):**
11. `GDPR_COMPLIANCE` - true
12. `CCPA_COMPLIANCE` - true
13. `SOC2_COMPLIANCE` - true

### Step 4: Generate Secure Secrets

#### Generate AUTH0_SECRET
```bash
# Generate a secure 32-character secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Generate Session Secret
```bash
# Generate session secret
openssl rand -hex 32
```

## Auth0 Dashboard Configuration

### Step 1: Application Settings
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** → **Your SyncScript App**
3. Configure the following settings:

#### **Application Settings:**
- **Application Type:** Regular Web Application
- **Token Endpoint Authentication Method:** POST
- **Allowed Callback URLs:** 
  ```
  https://syncscript.vercel.app/api/auth/callback
  ```
- **Allowed Logout URLs:**
  ```
  https://syncscript.vercel.app
  ```
- **Allowed Web Origins:**
  ```
  https://syncscript.vercel.app
  ```
- **Allowed Origins (CORS):**
  ```
  https://syncscript.vercel.app
  ```

#### **Advanced Settings:**
- **Grant Types:** Authorization Code, Refresh Token
- **Refresh Token Rotation:** Enabled
- **Refresh Token Expiration:** Absolute
- **Absolute Refresh Token Lifetime:** 30 days
- **Inactivity Refresh Token Lifetime:** 24 hours

### Step 2: Security Settings
1. Navigate to **Security** → **Attack Protection**
2. Enable the following protections:
   - **Brute Force Protection:** Enabled
   - **Suspicious IP Throttling:** Enabled
   - **Breached Password Detection:** Enabled

### Step 3: Multi-Factor Authentication
1. Navigate to **Security** → **Multi-factor Authentication**
2. Enable **SMS** or **Google Authenticator**
3. Configure MFA policies:
   - **Enforce MFA:** Always
   - **Remember Browser:** 30 days

## PostHog Configuration

### Step 1: Create PostHog Project
1. Go to [PostHog Dashboard](https://app.posthog.com)
2. Create a new project for SyncScript
3. Copy the Project API Key

### Step 2: Configure PostHog Settings
1. Navigate to **Project Settings**
2. Configure the following:
   - **Auto-capture:** Enabled
   - **Session Recording:** Enabled (with privacy controls)
   - **Feature Flags:** Enabled
   - **A/B Testing:** Enabled

### Step 3: Security Settings
1. Navigate to **Project Settings** → **Security**
2. Configure:
   - **Data Residency:** Your preferred region
   - **GDPR Compliance:** Enabled
   - **Data Retention:** 25 months (GDPR compliant)

## Environment Variable Validation

### Pre-Deployment Checklist
- [ ] All Auth0 environment variables set
- [ ] PostHog API key configured
- [ ] Security feature flags enabled
- [ ] Compliance flags set
- [ ] Monitoring flags enabled

### Validation Script
```bash
# Validate environment variables (run after deployment)
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v1/projects/YOUR_PROJECT_ID/env" \
  | jq '.envs[] | select(.key | startswith("AUTH0") or startswith("POSTHOG"))'
```

## Production Security Configuration

### Security Headers Validation
After deployment, validate security headers:
```bash
curl -I https://syncscript.vercel.app/dashboard
```

Expected headers:
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy`
- `Permissions-Policy`

### Authentication Testing
Test authentication flow:
```bash
# Test login redirect
curl -I https://syncscript.vercel.app/api/auth/login

# Test callback URL
curl -I https://syncscript.vercel.app/api/auth/callback
```

### Monitoring Validation
Test monitoring endpoints:
```bash
# Test PostHog integration
curl -I https://syncscript.vercel.app/api/monitoring/health

# Test security monitoring
curl -I https://syncscript.vercel.app/api/monitoring/security
```

## Troubleshooting

### Common Issues

#### 1. Auth0 Configuration Errors
**Symptoms:** 500 errors on authentication
**Solution:** Verify all Auth0 environment variables are set correctly

#### 2. PostHog Not Tracking
**Symptoms:** No analytics data
**Solution:** Verify `NEXT_PUBLIC_POSTHOG_KEY` is set

#### 3. Security Headers Missing
**Symptoms:** Security headers not present
**Solution:** Verify `SECURITY_HEADERS_ENABLED=true`

#### 4. Rate Limiting Not Working
**Symptoms:** No rate limit responses
**Solution:** Verify rate limiting environment variables

### Debug Commands
```bash
# Check environment variables in Vercel
vercel env ls

# Check deployment logs
vercel logs

# Test security headers
curl -I https://syncscript.vercel.app/dashboard
```

## Success Criteria

### Environment Setup Success
- [ ] All Auth0 environment variables configured
- [ ] PostHog analytics key set
- [ ] Security feature flags enabled
- [ ] Compliance flags configured
- [ ] Monitoring flags active

### Post-Deployment Validation
- [ ] Authentication flow working
- [ ] Security headers present
- [ ] Analytics tracking active
- [ ] Rate limiting functional
- [ ] Monitoring operational

## Next Steps

1. **Configure Environment Variables** in Vercel dashboard
2. **Test Authentication Flow** in Auth0 dashboard
3. **Validate PostHog Integration** in PostHog dashboard
4. **Deploy Security Framework** using automated script
5. **Run Post-Deployment Validation** using validation script

---

**Environment Setup Guide Prepared By:** AI Security Team  
**Date:** December 19, 2024  
**Status:** ✅ **READY FOR PRODUCTION CONFIGURATION**
