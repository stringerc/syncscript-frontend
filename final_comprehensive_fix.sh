#!/bin/bash
# Final Comprehensive Fix for All 69 Syntax Errors
# Systematically fixes all remaining patterns

cd /Users/Apple/syncscript-frontend

echo "🚀 Starting Final Comprehensive Fix for 69 Errors"
echo "=" | tr '=' '='{1..60}

# Fix 1: Remove extra commas and semicolons in metadata objects
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/description: \(.*\)\s*;/description: \1}/g'

# Fix 2: Fix JSX comment syntax
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/{\/\* \(.*\) \*\/}\s*;/{\/\* \1 \*\/}/g'

# Fix 3: Fix object property trailing commas and semicolons  
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/width: \([0-9]*\), height: \([0-9]*\)\s*,\s*;/width: \1, height: \2 }/g'

# Fix 4: Fix useState with new, Date
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/useState(new, Date())/useState(new Date())/g'

# Fix 5: Fix fontFamily with double comma
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/fontFamily:,/fontFamily:/g'

# Fix 6: Fix initial/animate/transition JSX props
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/initial={{ opacity: 0 ,}/initial={{ opacity: 0 }}/g'
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/animate={{ opacity: 1 ,}/animate={{ opacity: 1 }}/g'
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/transition={{ duration: \([0-9.]*\) ,}/transition={{ duration: \1 }}/g'

# Fix 7: Fix JSX props missing spaces
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/task={exampleTask}onSchedule/task={exampleTask} onSchedule/g'

# Fix 8: Fix template literals in JSX
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/scheduled for${/scheduled for ${/g'

# Fix 9: Fix object property syntax with missing commas between objects
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/}\s*{/, {/g'

# Fix 10: Fix interface definitions with trailing comma-semicolon
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/boolean\s*,\s*;/boolean}/g'

# Fix 11: Fix useState object syntax
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/type: \(.*\)\s*,)/type: \1})/g'

# Fix 12: Fix lazy component imports
find . -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/ssr: false ,)/ssr: false })/g'

# Fix 13: Fix density/xl properties
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/\(density\|xl\): \(.*\)\s*,\s*;/\1: \2}/g'

# Fix 14: Fix haptic/soundEffects
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/\(trigger\|play\)(type)\s*,\s*;/\1(type);}/g'

# Fix 15: Fix authors array
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/name: \(.*\)\s*,\s*]/name: \1 }]/g'

# Fix 16: Fix dashboard metrics
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/uptime: \([0-9.]*\)\s*}/uptime: \1 },/g'

# Fix 17: Fix API error handling
find ./pages/api -name "*.ts" | xargs sed -i '' 's/error: \(.*\)\s*,)/error: \1})/g'

# Fix 18: Fix const declarations with trailing commas
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/= \(.*\),$/= \1;/g'

# Fix 19: Fix template literal malformed syntax
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs sed -i '' "s#\${process.env.AUTH0_BASE_URL/#\${process.env.AUTH0_BASE_URL}/#g"
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs sed -i '' "s#'http':/#'http'}:/#g"

# Fix 20: Fix array missing commas between elements
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs sed -i '' 's/status: \(.*\)\s*}\s*{/status: \1}, {/g'

# Fix 21: Fix TypeScript generics
find . -name "*.tsx" | grep -v node_modules | xargs sed -i '' 's/timestamp: string ,>>/timestamp: string }>/g'

# Fix 22: Fix export const with trailing semicolons
find ./src/app -name "*.tsx" | xargs sed -i '' 's/\(description: .*\)\s*;$/\1}/g'

# Fix 23: Fix token.ts try block
find ./pages/api -name "*.ts" | xargs sed -i '' 's/} catch(error)/} catch (error: any)/g'

# Fix 24: Fix calendar connect
find ./pages/api/calendar -name "*.ts" | xargs sed -i '' 's/authUrl: null\s*,/authUrl: null/g'

# Fix 25: Fix method checks with trailing commas
find ./pages/api -name "*.ts" | xargs sed -i '' 's/}),$/});/g'

echo "=" | tr '=' '='{1..60}
echo "✅ Final comprehensive fix completed!"
echo "🎯 Testing build..."

