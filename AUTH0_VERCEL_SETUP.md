# Auth0 Setup for Vercel Deployment with Cross-Domain Redirects

**Goal:** Set up Auth0 on `syncscript.app` that redirects authenticated users to `dashboard.syncscript.app`

---

## 🎯 Overview

This guide will help you:
1. Configure Auth0 for cross-domain authentication
2. Set up Vercel environment variables
3. Configure Auth0 to allow redirects to both domains
4. Test the authentication flow

---

## 📋 Step 1: Create/Configure Auth0 Application

### 1.1 Go to Auth0 Dashboard
- Visit https://manage.auth0.com
- Sign in or create an account

### 1.2 Create Application (if not exists)
1. Navigate to **Applications** → **Applications**
2. Click **Create Application**
3. Name: **SyncScript Frontend**
4. Type: **Regular Web Application** (not SPA - needed for Next.js server-side auth)
5. Click **Create**

### 1.3 Get Your Credentials
From your application settings, copy:
- **Domain** (e.g., `dev-abc123.us.auth0.com`)
- **Client ID**
- **Client Secret**

### 1.4 Configure URLs in Auth0

In your Auth0 application settings, scroll to **Allowed Callback URLs** and add:

```
http://localhost:3000/api/auth/callback
https://syncscript.app/api/auth/callback
https://dashboard.syncscript.app/api/auth/callback
https://www.syncscript.app/api/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
https://syncscript.app
https://dashboard.syncscript.app
https://www.syncscript.app
```

**Allowed Web Origins:**
```
http://localhost:3000
https://syncscript.app
https://dashboard.syncscript.app
https://www.syncscript.app
```

**Allowed Origins (CORS):**
```
http://localhost:3000
https://syncscript.app
https://dashboard.syncscript.app
```

---

## 🔐 Step 2: Generate AUTH0_SECRET

Generate a random 32-character secret:

```bash
openssl rand -hex 32
```

Copy this value - you'll need it for Vercel environment variables.

---

## 🚀 Step 3: Configure Vercel Environment Variables

### 3.1 Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your **syncscript-frontend** project

### 3.2 Add Environment Variables

Go to **Settings** → **Environment Variables** and add:

#### For Production:

```
AUTH0_SECRET=<your-generated-secret-from-step-2>
AUTH0_BASE_URL=https://syncscript.app
AUTH0_ISSUER_BASE_URL=https://<your-auth0-domain>
AUTH0_CLIENT_ID=<your-client-id>
AUTH0_CLIENT_SECRET=<your-client-secret>
AUTH0_AUDIENCE=<your-api-audience-if-any>
NEXT_PUBLIC_AUTH0_AUDIENCE=<your-api-audience-if-any>
```

#### For Preview/Development (optional):

```
AUTH0_SECRET=<same-secret>
AUTH0_BASE_URL=https://<preview-url>.vercel.app
AUTH0_ISSUER_BASE_URL=https://<your-auth0-domain>
AUTH0_CLIENT_ID=<your-client-id>
AUTH0_CLIENT_SECRET=<your-client-secret>
AUTH0_AUDIENCE=<your-api-audience-if-any>
NEXT_PUBLIC_AUTH0_AUDIENCE=<your-api-audience-if-any>
```

### 3.3 Important Notes

- **AUTH0_BASE_URL** should be `https://syncscript.app` (main domain)
- **AUTH0_SECRET** must be the same across all environments for session compatibility
- Make sure to select the correct environment (Production, Preview, Development) when adding variables

---

## 🔄 Step 4: Update Auth0 Application Settings

After deploying to Vercel, you may need to add the Vercel preview URLs:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback
https://syncscript.app/api/auth/callback
https://dashboard.syncscript.app/api/auth/callback
https://*.vercel.app/api/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
https://syncscript.app
https://dashboard.syncscript.app
https://*.vercel.app
```

**Allowed Web Origins:**
```
http://localhost:3000
https://syncscript.app
https://dashboard.syncscript.app
https://*.vercel.app
```

---

## 📝 Step 5: How It Works

### Authentication Flow:

1. **User visits `syncscript.app`**
   - Clicks "Sign Up Free" or "Start Your Free Trial"
   - Redirects to `/login`

2. **User clicks "Login"**
   - Redirects to `/api/auth/login`
   - Auth0 SDK redirects to Auth0 login page

3. **User authenticates with Auth0**
   - Enters credentials
   - Auth0 validates and creates session

4. **Auth0 redirects back**
   - Returns to `/api/auth/callback` on `syncscript.app`
   - Callback handler creates session
   - Sets cross-domain cookie (domain: `.syncscript.app`)
   - Redirects to `dashboard.syncscript.app`

5. **User lands on `dashboard.syncscript.app`**
   - Dashboard reads cross-domain cookie
   - Syncs to localStorage
   - User is authenticated

---

## 🧪 Step 6: Test the Flow

### Local Testing:

1. **Set up local environment variables:**
   ```bash
   cd /Users/Apple/syncscript-frontend
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:
   ```env
   AUTH0_SECRET=<your-secret>
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=https://<your-auth0-domain>
   AUTH0_CLIENT_ID=<your-client-id>
   AUTH0_CLIENT_SECRET=<your-client-secret>
   AUTH0_AUDIENCE=<your-audience>
   NEXT_PUBLIC_AUTH0_AUDIENCE=<your-audience>
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Test login:**
   - Visit `http://localhost:3000/landing`
   - Click "Sign Up Free"
   - Click login button
   - Should redirect to Auth0
   - After login, should redirect to `/dashboard`

### Production Testing:

1. **Deploy to Vercel:**
   ```bash
   git push origin main
   ```

2. **Visit `https://syncscript.app/landing`**
   - Click "Sign Up Free"
   - Click login
   - Should redirect to Auth0
   - After login, should redirect to `https://dashboard.syncscript.app`

---

## 🔍 Troubleshooting

### Issue: Redirect loop
**Solution:** Check that callback URLs are correct in Auth0 dashboard

### Issue: "Invalid callback URL"
**Solution:** Add the exact callback URL to Auth0's Allowed Callback URLs

### Issue: Cookie not accessible on dashboard subdomain
**Solution:** 
- Ensure cookie domain is `.syncscript.app` (with leading dot)
- Check that both domains are using HTTPS
- Verify SameSite and Secure flags are set correctly

### Issue: Session not persisting
**Solution:**
- Check AUTH0_SECRET is set correctly
- Verify AUTH0_BASE_URL matches your domain
- Check browser console for cookie errors

---

## ✅ Checklist

Before deploying to production:

- [ ] Auth0 application created
- [ ] Auth0 URLs configured (callback, logout, web origins)
- [ ] AUTH0_SECRET generated and added to Vercel
- [ ] All Auth0 environment variables added to Vercel
- [ ] Local testing successful
- [ ] Preview deployment tested
- [ ] Production deployment tested
- [ ] Cross-domain redirect works (syncscript.app → dashboard.syncscript.app)

---

## 📚 Additional Resources

- [Auth0 Next.js SDK Docs](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Auth0 Application Settings](https://auth0.com/docs/get-started/applications)

---

## 🎉 You're Done!

Once configured, users will:
1. Visit `syncscript.app`
2. Click "Sign Up Free"
3. Login with Auth0
4. Get redirected to `dashboard.syncscript.app`
5. Be automatically authenticated on the dashboard

The cross-domain cookie ensures authentication persists across both domains!

