# 🚀 SYNCSCRIPT DEPLOYMENT CHECKLIST

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. Auth0 Configuration
- [ ] Go to Auth0 Dashboard: https://manage.auth0.com/dashboard/us/dev-w3z7dv32hd5fqkwx/applications/dGtn0XOeaM572alLMcQAzOS7A9wb60wU/settings
- [ ] Add these Allowed Callback URLs:
  ```
  http://localhost:3000/api/auth/callback,https://syncscript.app/api/auth/callback
  ```
- [ ] Add these Allowed Logout URLs:
  ```
  http://localhost:3000,https://syncscript.app
  ```
- [ ] Add these Allowed Web Origins:
  ```
  http://localhost:3000,https://syncscript.app
  ```
- [ ] Save changes

### 2. Vercel Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```
AUTH0_SECRET=9519d153ecf582be2ba69bcfccfd6c307bfdf88cd7c7a0cbb94394b7eea918c1
AUTH0_BASE_URL=https://syncscript.app
AUTH0_ISSUER_BASE_URL=https://dev-w3z7dv32hd5fqkwx.us.auth0.com
AUTH0_CLIENT_ID=dGtn0XOeaM572alLMcQAzOS7A9wb60wU
AUTH0_CLIENT_SECRET=eVFIukjrA7LHDTqgEwyb4YBz9M26ORphR8WERzB2hLd7lzEBhO8GnEhlm6-QiN0d
AUTH0_AUDIENCE=https://api.syncscript.app
NEXT_PUBLIC_API_URL=https://syncscript-backend-1.onrender.com
NEXT_PUBLIC_WS_URL=wss://ws.syncscript.app
NEXT_PUBLIC_AUTH0_DOMAIN=dev-w3z7dv32hd5fqkwx.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=dGtn0XOeaM572alLMcQAzOS7A9wb60wU
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.syncscript.app
```

### 3. Git & Deployment
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Deploy to Vercel

---

## 🎯 DEPLOYMENT STEPS

### Step 1: Configure Auth0 (5 minutes)
1. Open Auth0 Dashboard
2. Add callback URLs
3. Save changes

### Step 2: Push to GitHub (2 minutes)
```bash
cd /Users/Apple/syncscript-frontend
git add .
git commit -m "feat: Complete Auth0 integration with continuous ribbon animation"
git push origin main
```

### Step 3: Deploy to Vercel (5 minutes)
```bash
cd /Users/Apple/syncscript-frontend
vercel --prod
```

Or use Vercel Dashboard for automatic deployment from GitHub.

---

## ✅ POST-DEPLOYMENT VERIFICATION

### Test These Features:
1. **Landing Page**: https://syncscript.app
   - [ ] Continuous ribbon animation visible
   - [ ] "Get Started" button works
   - [ ] "View Features" button scrolls

2. **Authentication**: https://syncscript.app/api/auth/login
   - [ ] Redirects to Auth0 login
   - [ ] After login, redirects to dashboard
   - [ ] User profile loads

3. **Dashboard**: https://syncscript.app/dashboard
   - [ ] Energy selector works
   - [ ] Task cards display
   - [ ] Logout button works

4. **API Integration**:
   - [ ] Console shows successful API calls
   - [ ] No authentication errors
   - [ ] Backend responds correctly

---

## 🔥 QUICK DEPLOY COMMAND

```bash
# One-line deploy (after Auth0 is configured)
cd /Users/Apple/syncscript-frontend && git add . && git commit -m "feat: Production deployment" && git push origin main && vercel --prod
```

---

## 🆘 TROUBLESHOOTING

### Issue: Auth0 login fails
**Solution**: Verify callback URLs in Auth0 match exactly

### Issue: API calls fail
**Solution**: Check CORS settings on backend

### Issue: Environment variables not working
**Solution**: Redeploy on Vercel after adding env vars

---

## 📊 DEPLOYMENT STATUS

- **Backend**: ✅ Live at https://syncscript-backend-1.onrender.com
- **Frontend**: 🔄 Ready to deploy
- **Database**: ✅ Connected (Neon PostgreSQL)
- **Cache**: ✅ Connected (Upstash Redis)
- **Auth**: ⚠️ Needs production URLs in Auth0

---

## 🎉 READY TO DEPLOY!

Once Auth0 is configured, run:
```bash
vercel --prod
```

