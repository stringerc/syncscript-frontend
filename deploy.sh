#!/bin/bash

# SyncScript Deployment Script
# Deploys frontend to Vercel

echo "🚀 SyncScript Deployment Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in syncscript-frontend directory"
    exit 1
fi

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Pre-flight checks..."
echo ""

# Build check
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy confirmation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Ready to deploy SyncScript to production!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This will:"
echo "  • Deploy to Vercel production"
echo "  • Make SyncScript publicly accessible"
echo "  • Use production environment variables"
echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "🚀 Deploying to Vercel production..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DEPLOYMENT COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 SyncScript is now LIVE!"
echo ""
echo "Next steps:"
echo "  1. Verify deployment: Visit your production URL"
echo "  2. Test core features: Create task, log energy, use AI"
echo "  3. Monitor: Check Vercel Analytics"
echo "  4. Announce: Share on social media!"
echo ""
echo "🌟 Congratulations on launching SyncScript! 🌟"
echo ""

