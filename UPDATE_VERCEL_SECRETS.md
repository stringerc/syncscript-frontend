# 🔐 UPDATE VERCEL SECRETS - STEP BY STEP

> **CRITICAL:** Do this NOW to complete the security fix  
> **Time:** 5 minutes  

---

## 🎯 **YOU NEED TO UPDATE THESE IN VERCEL:**

### New Auth0 Client Secret (Rotated)
```
RaCnn8olt9OJ3MW2WLcvxhLeftmH27cbCBYRaigbZ7jhwi_CdZJDwL58E1mc2AXh
```

---

## 📋 **STEP-BY-STEP INSTRUCTIONS:**

### 1. Open Vercel Dashboard
```
URL: https://vercel.com/dashboard
Login if needed
```

### 2. Select Your Project
```
Click on: syncscript-frontend
```

### 3. Go to Environment Variables
```
Click: Settings tab (top navigation)
Click: Environment Variables (left sidebar)
```

### 4. Update AUTH0_CLIENT_SECRET
```
Find: AUTH0_CLIENT_SECRET
Click: Edit button (pencil icon on right)
Delete: Old value
Paste: RaCnn8olt9OJ3MW2WLcvxhLeftmH27cbCBYRaigbZ7jhwi_CdZJDwL58E1mc2AXh
Select: Production, Preview, Development (all 3)
Click: Save
```

### 5. Verify Other Auth0 Variables
```
Check these are set correctly:

AUTH0_SECRET:
Value: 9519d153ecf582be2ba69bcfccfd6c307bfdf88cd7c7a0cbb94394b7eea918c1
(This one is fine, don't change)

AUTH0_CLIENT_ID:
Value: dGtn0XOeaM572alLMcQAzOS7A9wb60wU
(Should match - don't change)

AUTH0_ISSUER_BASE_URL:
Value: https://dev-w3z7dv32hd5fqkwx.us.auth0.com
(Should match - don't change)

If any are missing, add them!
```

### 6. Redeploy
```
Click: Deployments tab (top)
Click: Latest deployment (top of list)
Click: ... menu (3 dots on right)
Click: Redeploy
Check: ✅ Use existing build cache
Click: Redeploy
Wait: 2-3 minutes
```

---

## ✅ **VERIFICATION**

After redeploy completes:

1. Visit: https://www.syncscript.app/dashboard
2. Try to: Log in
3. Should: Work perfectly with new credentials!
4. If it works: ✅ Security fix complete!

---

## 🚨 **ALSO ROTATE THESE (Less Critical But Recommended):**

### OpenAI API Key
Your current key is also exposed. To rotate:

1. Go to: https://platform.openai.com/api-keys
2. Click: "Create new secret key"
3. Name it: "SyncScript Production (Oct 2025)"
4. Copy: The new key
5. Go back to Vercel Environment Variables
6. Update: OPENAI_API_KEY with new value
7. Delete: Old key from OpenAI dashboard

### Google OAuth
Your Google credentials might also be exposed. To rotate:

1. Go to: https://console.cloud.google.com/
2. Navigate to: APIs & Services → Credentials
3. Find: Your OAuth 2.0 Client ID
4. Click: Delete (trash icon)
5. Click: Create Credentials → OAuth client ID
6. Application type: Web application
7. Name: SyncScript Production
8. Authorized redirect URIs: https://www.syncscript.app/api/auth/callback/google
9. Click: Create
10. Copy: New Client ID and Secret
11. Update in Vercel Environment Variables

---

## 🎯 **PRIORITY ORDER:**

### Critical (Do NOW - 5 min)
1. ✅ Update AUTH0_CLIENT_SECRET in Vercel
2. ✅ Redeploy from Vercel

### High (Do Tomorrow - 10 min)
3. ⚠️ Rotate OpenAI API key
4. ⚠️ Update in Vercel

### Medium (Do This Week - 15 min)
5. ⚠️ Rotate Google OAuth credentials
6. ⚠️ Update in Vercel
7. ✅ Enable GitHub secret scanning

---

## 🔐 **AFTER YOU UPDATE VERCEL:**

Tell me and I'll verify everything is secure!

**Steps:**
1. Update AUTH0_CLIENT_SECRET in Vercel (5 min)
2. Redeploy (1 min)
3. Come back here and say "done"
4. I'll verify security is restored!

---

**Go do it now! Takes 5 minutes!** 🔒

**I'll be here waiting!** 😊
