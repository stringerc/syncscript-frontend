#!/bin/bash

# Disable Vercel Protection
echo "Disabling Vercel protection..."

# Try to remove protection environment variable
vercel env rm VERCEL_PROTECTION_BYPASS --yes 2>/dev/null || echo "Protection env var not found"

# Deploy without protection
echo "Deploying without protection..."
vercel deploy --prod --yes --confirm

echo "Deployment complete!"

