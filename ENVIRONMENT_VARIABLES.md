# SyncScript Environment Variables Documentation

**Generated:** 2025-10-13T23:45:57.546Z
**Security Score:** 10/10
**Status:** Ready for Production

## Required Environment Variables

### AUTH0_SECRET
- **Description:** Auth0 secret key for JWT signing
- **Required:** Yes
- **Sensitive:** Yes

### AUTH0_BASE_URL
- **Description:** Base URL of your application
- **Required:** Yes
- **Sensitive:** No

### AUTH0_ISSUER_BASE_URL
- **Description:** Auth0 domain (replace YOUR_DOMAIN with your actual domain)
- **Required:** Yes
- **Sensitive:** No
- **Example:** https://your-domain.auth0.com

### AUTH0_CLIENT_ID
- **Description:** Auth0 application client ID
- **Required:** Yes
- **Sensitive:** No
- **Example:** your-auth0-client-id

### AUTH0_CLIENT_SECRET
- **Description:** Auth0 application client secret
- **Required:** Yes
- **Sensitive:** Yes
- **Example:** your-auth0-client-secret

### NEXT_PUBLIC_POSTHOG_KEY
- **Description:** PostHog project API key
- **Required:** Yes
- **Sensitive:** No
- **Example:** phc_your-posthog-project-key

## Optional Environment Variables

### AUTH0_SCOPE
- **Description:** Auth0 scopes
- **Default Value:** openid profile email

### AUTH0_SESSION_COOKIE_NAME
- **Description:** Session cookie name
- **Default Value:** app_session

### AUTH0_SESSION_COOKIE_LIFETIME
- **Description:** Session cookie lifetime in seconds (24 hours)
- **Default Value:** 86400

### AUTH0_SESSION_COOKIE_SECURE
- **Description:** Secure session cookie flag
- **Default Value:** true

### AUTH0_SESSION_COOKIE_SAME_SITE
- **Description:** Session cookie same-site policy
- **Default Value:** lax

### NEXT_PUBLIC_POSTHOG_HOST
- **Description:** PostHog host URL
- **Default Value:** https://app.posthog.com

### NEXT_PUBLIC_APP_VERSION
- **Description:** Application version
- **Default Value:** 1.0.0

### NEXT_PUBLIC_ENVIRONMENT
- **Description:** Application environment
- **Default Value:** production

### MFA_ENABLED
- **Description:** Enable multi-factor authentication
- **Default Value:** true

### RBAC_ENABLED
- **Description:** Enable role-based access control
- **Default Value:** true

### API_PROTECTION_ENABLED
- **Description:** Enable API protection
- **Default Value:** true

### RESOURCE_PERMISSIONS_ENABLED
- **Description:** Enable resource-level permissions
- **Default Value:** true

### PRIVILEGE_ESCALATION_PREVENTION
- **Description:** Enable privilege escalation prevention
- **Default Value:** true

### RATE_LIMIT_WINDOW_MS
- **Description:** Rate limiting window (15 minutes)
- **Default Value:** 900000

### RATE_LIMIT_MAX_REQUESTS
- **Description:** Maximum requests per window
- **Default Value:** 100

### SESSION_TIMEOUT
- **Description:** Session timeout (15 minutes)
- **Default Value:** 900000

### JWT_EXPIRATION
- **Description:** JWT expiration (1 hour)
- **Default Value:** 3600

### GDPR_COMPLIANCE
- **Description:** Enable GDPR compliance features
- **Default Value:** true

### CCPA_COMPLIANCE
- **Description:** Enable CCPA compliance features
- **Default Value:** true

### SOC2_COMPLIANCE
- **Description:** Enable SOC 2 compliance features
- **Default Value:** true

### ACCESSIBILITY_COMPLIANCE
- **Description:** Enable accessibility compliance features
- **Default Value:** true

### DATA_RETENTION_ENABLED
- **Description:** Enable data retention policies
- **Default Value:** true

### RIGHT_TO_DELETION
- **Description:** Enable right to deletion
- **Default Value:** true

### ENCRYPTION_AT_REST
- **Description:** Enable encryption at rest
- **Default Value:** true

### ENCRYPTION_IN_TRANSIT
- **Description:** Enable encryption in transit
- **Default Value:** true

### DATA_ANONYMIZATION
- **Description:** Enable data anonymization
- **Default Value:** true

