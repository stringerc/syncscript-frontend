#!/bin/bash
# SyncScript Vercel Environment Variables Setup Script

echo "🔧 Setting up SyncScript environment variables in Vercel..."
echo "========================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login first:"
    echo "   vercel login"
    exit 1
fi

echo "📋 Setting up environment variables..."

# Read environment variables from .env.vercel
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key =~ ^#.*$ ]] || [[ -z "$key" ]]; then
        continue
    fi
    
    # Remove quotes from value
    value=$(echo "$value" | sed 's/^"//;s/"$//')
    
    echo "  🔧 Setting $key..."
    
    # Set environment variable in Vercel
    vercel env add "$key" "$value" production
    
    if [ $? -eq 0 ]; then
        echo "  ✅ $key: Set successfully"
    else
        echo "  ❌ $key: Failed to set"
    fi
done < .env.vercel

echo ""
echo "🎉 Environment variables setup completed!"
echo "You can now deploy your application to Vercel."
