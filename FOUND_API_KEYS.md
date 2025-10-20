# 🔑 **FOUND API KEYS & ENVIRONMENT VARIABLES**

## Located in `.env.local.backup` and `.env.vercel`

Here are all the API keys and environment variables I found in your existing .env files:

---

## 🔐 **AUTH0 CONFIGURATION**
```bash
# Auth0 Configuration (ROTATED - Oct 12, 2025)
AUTH0_SECRET='9519d153ecf582be2ba69bcfccfd6c307bfdf88cd7c7a0cbb94394b7eea918c1'
AUTH0_BASE_URL='http://localhost:3000'  # Change to https://syncscript.com for production
AUTH0_ISSUER_BASE_URL='https://dev-w3z7dv32hd5fqkwx.us.auth0.com'
AUTH0_CLIENT_ID='dGtn0XOeaM572alLMcQAzOS7A9wb60wU'
AUTH0_CLIENT_SECRET='RaCnn8olt9OJ3MW2WLcvxhLeftmH27cbCBYRaigbZ7jhwi_CdZJDwL58E1mc2AXh'
AUTH0_AUDIENCE='https://api.syncscript.app'

# Public Auth0 Variables
NEXT_PUBLIC_AUTH0_DOMAIN='dev-w3z7dv32hd5fqkwx.us.auth0.com'
NEXT_PUBLIC_AUTH0_CLIENT_ID='dGtn0XOeaM572alLMcQAzOS7A9wb60wU'
NEXT_PUBLIC_AUTH0_AUDIENCE='https://api.syncscript.app'
```

---

## 🌐 **API CONFIGURATION**
```bash
NEXT_PUBLIC_API_URL='https://syncscript-backend-1.onrender.com'
NEXT_PUBLIC_WS_URL='wss://ws.syncscript.app'
```

---

## 📅 **GOOGLE CALENDAR INTEGRATION**
```bash
GOOGLE_CLIENT_ID='739263757591-f5mrjkesqg66pno8ni2oj5e1j0spn61h.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='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'
NEXT_PUBLIC_GOOGLE_CLIENT_ID='739263757591-f5mrjkesqg66pno8ni2oj5e1j0spn61h.apps.googleusercontent.com'
```

---

## 🤖 **OPENAI API KEY**
```bash
# OpenAI API Key (ROTATE THIS TOO!)
OPENAI_API_KEY="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"
```

---

## 📊 **POSTHOG ANALYTICS** (from .env.vercel)
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_Anrd6xXFlVMHoIN5Kfwkl3W7PcYov9bf252ytczqqtE
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 🏗️ **PRODUCTION CONFIGURATION** (from .env.vercel)
```bash
# Security & Compliance
AUTH0_SECRET=18+XNE3UVVuEOaK/hxLVRS28JZVoj0BZQoI1K/X1mKA=
AUTH0_BASE_URL=https://syncscript.vercel.app

# Application Settings
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production

# Security Features
MFA_ENABLED=true
RBAC_ENABLED=true
API_PROTECTION_ENABLED=true
GDPR_COMPLIANCE=true
CCPA_COMPLIANCE=true
SOC2_COMPLIANCE=true
ACCESSIBILITY_COMPLIANCE=true

# Rate Limiting & Sessions
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_TIMEOUT=900000
JWT_EXPIRATION=3600
```

---

## 🔑 **ADDITIONAL API KEYS PROVIDED**

### **Stripe API Keys**
```bash
# Stripe Publishable Key (LIVE) - Note: May need cleaning
STRIPE_PUBLISHABLE_KEY=pk_live_51OxbCHGnuF7uNW2kMOwGtCiygJAA8Z7iw5ui59Z9v9owRYHTFpgD70ygXw6RHqKQsfBExu94kPrJtAmUyEg2vxAp00v3hwsendgrid_secret

# Stripe Secret Key (LIVE) - MISSING
# You still need to provide: STRIPE_SECRET_KEY=sk_live_...
```

### **SendGrid API Keys**
```bash
# SendGrid API Key
SENDGRID_API_KEY=e0pTKjkq6QNbnxMBBHZJpo04ylZ7IE0u

# SendGrid SID  
SENDGRID_SID=SK68decbff575aa438caae5c24fc239221
```

---

## 🎯 **ACTION ITEMS FOR DEPLOYMENT**

### **1. Update Your .env.production Template**
Replace the placeholder values in your production environment with the actual values found above.

### **2. Critical Variables for Vercel Deployment**
Make sure these are set in Vercel dashboard:
- `AUTH0_SECRET` ✅ (Found: `18+XNE3UVVuEOaK/hxLVRS28JZVoj0BZQoI1K/X1mKA=`)
- `AUTH0_CLIENT_SECRET` ✅ (Found: `RaCnn8olt9OJ3MW2WLcvxhLeftmH27cbCBYRaigbZ7jhwi_CdZJDwL58E1mc2AXh`)
- `NEXT_PUBLIC_AUTH0_DOMAIN` ✅ (Found: `dev-w3z7dv32hd5fqkwx.us.auth0.com`)
- `NEXT_PUBLIC_AUTH0_CLIENT_ID` ✅ (Found: `dGtn0XOeaM572alLMcQAzOS7A9wb60wU`)
- `OPENAI_API_KEY` ✅ (Found in backup file)

### **3. Run Environment Validation**
Now that we have the actual values, you can run:
```bash
npm run test:env
```

This will validate that all the environment variables are properly formatted and ready for deployment.

---

## 🔒 **SECURITY NOTE**
The API keys found are from your backup files. For production deployment:
1. **Rotate the OpenAI API key** if this backup file is old
2. **Verify Auth0 credentials** are still valid for your production domain
3. **Update AUTH0_BASE_URL** from localhost to your production domain
4. **Ensure all keys match your current service configurations**

All the essential API keys for your SyncScript deployment have been located! 🎉
