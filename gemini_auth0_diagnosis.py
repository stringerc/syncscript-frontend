#!/usr/bin/env python3
"""
Gemini CLI: Auth0 Configuration Diagnosis and Fix
Trio Approach: Cursor + Gemini + Aider
"""

import os
import json
import re
from pathlib import Path

def diagnose_auth0_issues():
    """Diagnose Auth0 configuration issues"""
    print("🔍 GEMINI CLI: Auth0 Configuration Diagnosis")
    print("=" * 50)
    
    # Check .env.local file
    env_file = Path(".env.local")
    if not env_file.exists():
        print("❌ .env.local file not found")
        return
    
    with open(env_file, 'r') as f:
        content = f.read()
    
    # Check for placeholder values
    placeholders = [
        "your-auth0-secret-here",
        "your-auth0-domain.auth0.com", 
        "your-auth0-client-id",
        "your-auth0-client-secret"
    ]
    
    issues = []
    for placeholder in placeholders:
        if placeholder in content:
            issues.append(f"❌ Placeholder found: {placeholder}")
    
    if issues:
        print("🚨 AUTH0 CONFIGURATION ISSUES:")
        for issue in issues:
            print(f"  {issue}")
        
        print("\n🔧 RECOMMENDED FIXES:")
        print("1. Create Auth0 account at https://auth0.com")
        print("2. Create new application (Single Page Application)")
        print("3. Get real credentials from Auth0 dashboard")
        print("4. Update .env.local with real values")
        print("5. Add Vercel environment variables")
        
        return False
    else:
        print("✅ Auth0 configuration looks valid")
        return True

def create_auth0_setup_guide():
    """Create comprehensive Auth0 setup guide"""
    guide = """
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
"""
    
    with open("AUTH0_SETUP_GUIDE.md", "w") as f:
        f.write(guide)
    
    print("📋 Created AUTH0_SETUP_GUIDE.md")

def generate_auth0_secret():
    """Generate a secure Auth0 secret"""
    import secrets
    import string
    
    # Generate 32-character random string
    alphabet = string.ascii_letters + string.digits
    secret = ''.join(secrets.choice(alphabet) for _ in range(32))
    
    print(f"🔑 Generated AUTH0_SECRET: {secret}")
    return secret

if __name__ == "__main__":
    print("🚀 GEMINI CLI: Starting Auth0 Diagnosis")
    
    # Change to project directory
    os.chdir("/Users/Apple/syncscript-frontend")
    
    # Run diagnosis
    is_valid = diagnose_auth0_issues()
    
    if not is_valid:
        # Create setup guide
        create_auth0_setup_guide()
        
        # Generate secret
        secret = generate_auth0_secret()
        
        print("\n🎯 NEXT STEPS:")
        print("1. Follow AUTH0_SETUP_GUIDE.md")
        print("2. Use generated secret for AUTH0_SECRET")
        print("3. Update .env.local with real Auth0 credentials")
        print("4. Redeploy to Vercel")
    
    print("\n✅ Gemini CLI diagnosis complete!")
