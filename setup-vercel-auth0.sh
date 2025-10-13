#!/bin/bash

echo "🚀 Setting up Auth0 environment variables in Vercel..."
echo ""

# Add all Auth0 variables to Vercel production environment
echo "9519d153ecf582be2ba69bcfccfd6c307bfdf88cd7c7a0cbb94394b7eea918c1" | vercel env add AUTH0_SECRET production
echo "https://www.syncscript.app" | vercel env add AUTH0_BASE_URL production
echo "https://dev-w3z7dv32hd5fqkwx.us.auth0.com" | vercel env add AUTH0_ISSUER_BASE_URL production
echo "dGtn0XOeaM572alLMcQAzOS7A9wb60wU" | vercel env add AUTH0_CLIENT_ID production
echo "RaCnn8olt9OJ3MW2WLcvxhLeftmH27cbCBYRaigbZ7jhwi_CdZJDwL58E1mc2AXh" | vercel env add AUTH0_CLIENT_SECRET production
echo "https://api.syncscript.app" | vercel env add AUTH0_AUDIENCE production
echo "dev-w3z7dv32hd5fqkwx.us.auth0.com" | vercel env add NEXT_PUBLIC_AUTH0_DOMAIN production
echo "dGtn0XOeaM572alLMcQAzOS7A9wb60wU" | vercel env add NEXT_PUBLIC_AUTH0_CLIENT_ID production
echo "https://api.syncscript.app" | vercel env add NEXT_PUBLIC_AUTH0_AUDIENCE production

echo ""
echo "✅ Auth0 environment variables added!"
echo ""
echo "Now triggering a redeploy..."
vercel --prod --yes

echo ""
echo "🎉 Done! Auth0 should work in ~60 seconds!"

