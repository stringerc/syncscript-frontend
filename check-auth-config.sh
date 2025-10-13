#!/bin/bash

echo "🔍 SYNCSCRIPT AUTH0 DIAGNOSTIC CHECK"
echo "======================================"
echo ""

echo "1️⃣ FRONTEND LOCAL CONFIG:"
echo "   AUTH0_CLIENT_SECRET: $(grep AUTH0_CLIENT_SECRET .env.local | cut -d'=' -f2 | cut -c1-20)..."
echo "   AUTH0_BASE_URL: $(grep AUTH0_BASE_URL .env.local | cut -d'=' -f2)"
echo "   AUTH0_CLIENT_ID: $(grep AUTH0_CLIENT_ID .env.local | cut -d'=' -f2 | grep -v NEXT_PUBLIC)"
echo ""

echo "2️⃣ BACKEND CONFIG:"
cd ~/syncscript-backend 2>/dev/null
if [ $? -eq 0 ]; then
  echo "   AUTH0_CLIENT_SECRET: $(grep AUTH0_CLIENT_SECRET .env | cut -d'=' -f2 | cut -c1-20)..."
  echo "   AUTH0_CLIENT_ID: $(grep AUTH0_CLIENT_ID .env | cut -d'=' -f2)"
  echo "   AUTH0_DOMAIN: $(grep AUTH0_DOMAIN .env | cut -d'=' -f2)"
  cd ~/syncscript-frontend
else
  echo "   ❌ Backend not found"
fi
echo ""

echo "3️⃣ VERCEL ENV VARS:"
echo "   $(vercel env ls | grep -c "AUTH0") Auth0 variables found"
echo ""

echo "4️⃣ TESTING API ROUTE:"
echo "   Checking if /api/auth/login is accessible..."
curl -s -o /dev/null -w "   Status: %{http_code}\n" https://www.syncscript.app/api/auth/login || echo "   ❌ Failed to connect"
echo ""

echo "5️⃣ RECOMMENDED ACTIONS:"
echo "   [ ] Verify AUTH0_CLIENT_SECRET in Vercel matches backend"
echo "   [ ] Clear browser cache/cookies for syncscript.app"
echo "   [ ] Try login in incognito mode"
echo "   [ ] Check Auth0 dashboard callback URLs"
echo ""

echo "🔧 QUICK FIX: Update Vercel secret"
echo "   vercel env rm AUTH0_CLIENT_SECRET production"
echo "   echo 'eVFIukjrA7LHDTqgEwyb4YBz9M26ORphR8WERzB2hLd7lzEBhO8GnEhlm6-QiN0d' | vercel env add AUTH0_CLIENT_SECRET production"

