
# 🔐 AUTH0 SETUP GUIDE FOR SYNCSCRIPT

## Step 1: Create Auth0 Account
1. Go to https://auth0.com
2. Sign up for free account
3. Choose your region (US, EU, AU)

## Step 2: Create Application
1. Go to Applications > Applications
2. Click "Create Application"
3. Name: "SyncScript Frontend"
4. Type: "Single Page Application"
5. Click "Create"

## Step 3: Configure Application
1. Go to Settings tab
2. Note down:
   - Domain (e.g., dev-abc123.us.auth0.com)
   - Client ID
   - Client Secret

## Step 4: Configure URLs
1. Allowed Callback URLs:
   - http://localhost:3000/api/auth/callback
   - https://syncscript-frontend-91noj4es3-christopher-stringers-projects.vercel.app/api/auth/callback
   
2. Allowed Logout URLs:
   - http://localhost:3000
   - https://syncscript-frontend-91noj4es3-christopher-stringers-projects.vercel.app

3. Allowed Web Origins:
   - http://localhost:3000
   - https://syncscript-frontend-91noj4es3-christopher-stringers-projects.vercel.app

## Step 5: Enable Social Connections
1. Go to Authentication > Social
2. Enable Google
3. Enable GitHub
4. Configure OAuth apps

## Step 6: Update Environment Variables
Replace placeholders in .env.local with real values:
- AUTH0_SECRET=generate-random-32-char-string
- AUTH0_BASE_URL=https://syncscript-frontend-91noj4es3-christopher-stringers-projects.vercel.app
- AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
- AUTH0_CLIENT_ID=your-client-id
- AUTH0_CLIENT_SECRET=your-client-secret

## Step 7: Add to Vercel
1. Go to Vercel dashboard
2. Project Settings > Environment Variables
3. Add all AUTH0_* variables
4. Redeploy
