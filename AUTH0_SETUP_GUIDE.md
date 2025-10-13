# 🔐 Auth0 Setup Guide for SyncScript

## Auth0 Configuration Steps

### Step 1: Create Auth0 Account & Application

#### 1.1 Create Auth0 Account
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Sign up for a free Auth0 account
3. Choose your region (US, EU, AU)
4. Verify your email address

#### 1.2 Create Application
1. In Auth0 Dashboard, go to **Applications**
2. Click **Create Application**
3. Name: `SyncScript`
4. Type: **Regular Web Application**
5. Click **Create**

### Step 2: Configure Application Settings

#### 2.1 Basic Settings
Navigate to your SyncScript application → **Settings**

**Application Details:**
- **Name:** SyncScript
- **Description:** Enterprise-grade productivity platform
- **Application Type:** Regular Web Application

**Application URIs:**
```
Allowed Callback URLs:
https://syncscript.vercel.app/api/auth/callback
http://localhost:3000/api/auth/callback (for development)

Allowed Logout URLs:
https://syncscript.vercel.app
http://localhost:3000 (for development)

Allowed Web Origins:
https://syncscript.vercel.app
http://localhost:3000 (for development)

Allowed Origins (CORS):
https://syncscript.vercel.app
http://localhost:3000 (for development)
```

#### 2.2 Advanced Settings
Click **Show Advanced Settings**

**Grant Types:**
- ✅ **Authorization Code**
- ✅ **Refresh Token**
- ❌ **Implicit**
- ❌ **Client Credentials**

**Token Endpoint Authentication Method:** POST

**Refresh Token Settings:**
- **Refresh Token Rotation:** Enabled
- **Refresh Token Expiration:** Absolute
- **Absolute Refresh Token Lifetime:** 30 days
- **Inactivity Refresh Token Lifetime:** 24 hours

### Step 3: Security Configuration

#### 3.1 Attack Protection
Go to **Security** → **Attack Protection**

**Brute Force Protection:**
- **Enabled:** ✅
- **Maximum Failed Attempts:** 5
- **Lockout Duration:** 15 minutes

**Suspicious IP Throttling:**
- **Enabled:** ✅
- **Threshold:** 10 requests per minute

**Breached Password Detection:**
- **Enabled:** ✅
- **Action:** Block login

#### 3.2 Multi-Factor Authentication
Go to **Security** → **Multi-factor Authentication**

**Enable MFA:**
- **Google Authenticator:** ✅ Enabled
- **SMS:** ✅ Enabled (optional)

**MFA Policies:**
- **Enforce MFA:** Always
- **Remember Browser:** 30 days

#### 3.3 Password Policy
Go to **Authentication** → **Password Policy**

**Password Requirements:**
- **Minimum Length:** 8 characters
- **Require Uppercase:** ✅
- **Require Lowercase:** ✅
- **Require Numbers:** ✅
- **Require Symbols:** ✅
- **Prevent Password Reuse:** Last 5 passwords

### Step 4: Database Configuration

#### 4.1 Database Connection
Go to **Authentication** → **Database**

**Username-Password-Authentication:**
- **Enabled:** ✅
- **Disable Sign Ups:** ❌ (allow new users)
- **Disable Reset Password:** ❌ (allow password reset)

#### 4.2 Password Reset
Configure password reset flow:
- **Email Template:** Customize if needed
- **Reset URL:** https://syncscript.vercel.app/reset-password

### Step 5: Social Connections (Optional)

#### 5.1 Google OAuth (Recommended)
Go to **Authentication** → **Social**

**Enable Google:**
1. Click **Google**
2. **Enabled:** ✅
3. **Client ID:** Your Google OAuth client ID
4. **Client Secret:** Your Google OAuth client secret

#### 5.2 GitHub OAuth (Optional)
Go to **Authentication** → **Social**

**Enable GitHub:**
1. Click **GitHub**
2. **Enabled:** ✅
3. **Client ID:** Your GitHub OAuth app client ID
4. **Client Secret:** Your GitHub OAuth app client secret

### Step 6: User Management

#### 6.1 User Roles
Go to **User Management** → **Roles**

**Create Roles:**
1. **Admin Role:**
   - Name: `admin`
   - Description: `Full system access`

2. **User Role:**
   - Name: `user`
   - Description: `Standard user access`

3. **Guest Role:**
   - Name: `guest`
   - Description: `Limited access`

#### 6.2 Role Permissions
For each role, configure permissions:

**Admin Role Permissions:**
- `read:users`
- `write:users`
- `delete:users`
- `read:settings`
- `write:settings`
- `read:analytics`
- `write:analytics`

**User Role Permissions:**
- `read:profile`
- `write:profile`
- `read:tasks`
- `write:tasks`
- `delete:tasks`

**Guest Role Permissions:**
- `read:profile`

### Step 7: API Configuration

#### 7.1 Create API
Go to **Applications** → **APIs**

**Create API:**
1. Click **Create API**
2. **Name:** SyncScript API
3. **Identifier:** `https://api.syncscript.app`
4. **Signing Algorithm:** RS256

#### 7.2 API Permissions
Configure API permissions:
- `read:profile`
- `write:profile`
- `read:tasks`
- `write:tasks`
- `delete:tasks`
- `read:projects`
- `write:projects`
- `delete:projects`

### Step 8: Rules & Actions

#### 8.1 Create Rules
Go to **Auth Pipeline** → **Rules**

**Create Rule: Add User Roles**
```javascript
function addUserRoles(user, context, callback) {
  const namespace = 'https://syncscript.app/';
  
  // Assign default role
  if (user.email) {
    context.idToken[namespace + 'roles'] = ['user'];
    context.idToken[namespace + 'permissions'] = ['read:profile', 'write:profile'];
  }
  
  callback(null, user, context);
}
```

#### 8.2 Create Actions
Go to **Auth Pipeline** → **Actions**

**Login Action:**
- **Name:** SyncScript Login
- **Trigger:** Post Login
- **Code:** Add custom logic for login tracking

**Pre User Registration Action:**
- **Name:** SyncScript Registration
- **Trigger:** Pre User Registration
- **Code:** Add custom validation

### Step 9: Monitoring & Logs

#### 9.1 Monitoring Dashboard
Go to **Monitoring** → **Dashboard**

**Key Metrics to Monitor:**
- **Logins per day**
- **Failed login attempts**
- **MFA adoption rate**
- **Password reset requests**

#### 9.2 Logs Configuration
Go to **Monitoring** → **Logs**

**Log Retention:**
- **Free Tier:** 7 days
- **Paid Tier:** Up to 90 days

**Log Streaming:**
- **Webhook:** Configure for SyncScript monitoring
- **Real-time:** Enable for security monitoring

### Step 10: Environment Variables

#### 10.1 Get Credentials
From your Auth0 application settings, copy:

**Required Credentials:**
```
AUTH0_SECRET=your-32-character-secret-key
AUTH0_BASE_URL=https://syncscript.vercel.app
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

#### 10.2 Generate AUTH0_SECRET
```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 11: Testing Configuration

#### 11.1 Test Login Flow
1. Go to **Auth0 Dashboard** → **Test** tab
2. Test the login flow
3. Verify callback URLs work
4. Test password reset
5. Test MFA setup

#### 11.2 Test API Integration
1. Use Auth0's test tools
2. Verify JWT tokens are generated correctly
3. Test token validation
4. Verify role assignments

### Step 12: Production Checklist

#### 12.1 Security Checklist
- [ ] **MFA Enabled:** ✅
- [ ] **Brute Force Protection:** ✅
- [ ] **Password Policy:** ✅
- [ ] **Attack Protection:** ✅
- [ ] **Secure Callback URLs:** ✅
- [ ] **HTTPS Only:** ✅

#### 12.2 Configuration Checklist
- [ ] **Application Settings:** ✅
- [ ] **Database Connection:** ✅
- [ ] **Social Connections:** ✅
- [ ] **User Roles:** ✅
- [ ] **API Configuration:** ✅
- [ ] **Rules & Actions:** ✅

#### 12.3 Monitoring Checklist
- [ ] **Logs Enabled:** ✅
- [ ] **Monitoring Dashboard:** ✅
- [ ] **Alerts Configured:** ✅
- [ ] **Log Streaming:** ✅

## Troubleshooting

### Common Issues

#### 1. Callback URL Mismatch
**Error:** `redirect_uri_mismatch`
**Solution:** Ensure callback URLs match exactly in Auth0 settings

#### 2. Invalid Client Secret
**Error:** `invalid_client`
**Solution:** Verify client secret is correct and not expired

#### 3. MFA Not Working
**Error:** MFA setup fails
**Solution:** Check MFA provider configuration and user permissions

#### 4. Role Assignment Issues
**Error:** Roles not appearing in JWT
**Solution:** Verify rules are properly configured and active

### Support Resources

#### Auth0 Documentation
- [Auth0 Documentation](https://auth0.com/docs)
- [Next.js Auth0 SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Auth0 Community](https://community.auth0.com)

#### SyncScript Integration
- Use the environment variables from this guide
- Test with our local development setup
- Validate with our deployment scripts

## Success Criteria

### Auth0 Setup Success
- [ ] **Application Created:** ✅
- [ ] **Settings Configured:** ✅
- [ ] **Security Enabled:** ✅
- [ ] **MFA Working:** ✅
- [ ] **Roles Assigned:** ✅
- [ ] **API Configured:** ✅
- [ ] **Environment Variables:** ✅
- [ ] **Testing Complete:** ✅

### Integration Success
- [ ] **Login Flow:** ✅ Working
- [ ] **Logout Flow:** ✅ Working
- [ ] **Password Reset:** ✅ Working
- [ ] **MFA Setup:** ✅ Working
- [ ] **Role-Based Access:** ✅ Working
- [ ] **JWT Tokens:** ✅ Valid
- [ ] **API Access:** ✅ Working

---

**Auth0 Setup Guide Prepared By:** AI Security Team  
**Date:** December 19, 2024  
**Status:** ✅ **READY FOR AUTH0 CONFIGURATION**
