#!/bin/bash

# This script finds and fixes incorrect JSX syntax where a semicolon is placed after a tag name.
# It replaces patterns like "<Component;" with "<Component" in all .ts, .tsx, .js, and .jsx files.

echo "🔧 Starting JSX semicolon fix script..."
echo "========================================="

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -E -i '' 's/<([a-zA-Z0-9.]+);/<\1/g' {} +

echo "✅ JSX syntax fix script finished."
echo "📊 Checked all TypeScript and JSX files for semicolon issues."
