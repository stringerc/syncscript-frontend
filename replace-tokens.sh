#!/bin/bash

# SyncScript Design Token Replacement Script
# Replaces all hardcoded values with CSS variables

echo "🎨 Starting design token replacement..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CSS_DIR="$HOME/syncscript-frontend/src/styles"
BACKUP_DIR="$HOME/syncscript-frontend/src/styles-backup-$(date +%Y%m%d-%H%M%S)"

# Create backup
echo "📦 Creating backup at: $BACKUP_DIR"
cp -r "$CSS_DIR" "$BACKUP_DIR"

# Counter
TOTAL_REPLACEMENTS=0

# Color replacements (case-insensitive)
declare -A COLOR_MAP=(
    # Primary Brand Colors
    ["#4A90E2"]="var(--color-primary-500)"
    ["#4a90e2"]="var(--color-primary-500)"
    ["#EFF6FF"]="var(--color-primary-50)"
    ["#eff6ff"]="var(--color-primary-50)"
    ["#DBEAFE"]="var(--color-primary-100)"
    ["#dbeafe"]="var(--color-primary-100)"
    ["#2563EB"]="var(--color-primary-600)"
    ["#2563eb"]="var(--color-primary-600)"
    ["#1D4ED8"]="var(--color-primary-700)"
    ["#1d4ed8"]="var(--color-primary-700)"
    
    # Energy Level 1 (Red/Low)
    ["#EF4444"]="var(--color-energy-1)"
    ["#ef4444"]="var(--color-energy-1)"
    ["#FEE2E2"]="var(--color-energy-1-light)"
    ["#fee2e2"]="var(--color-energy-1-light)"
    ["#B91C1C"]="var(--color-energy-1-dark)"
    ["#b91c1c"]="var(--color-energy-1-dark)"
    
    # Energy Level 2 (Orange)
    ["#F97316"]="var(--color-energy-2)"
    ["#f97316"]="var(--color-energy-2)"
    ["#FFEDD5"]="var(--color-energy-2-light)"
    ["#ffedd5"]="var(--color-energy-2-light)"
    ["#C2410C"]="var(--color-energy-2-dark)"
    ["#c2410c"]="var(--color-energy-2-dark)"
    
    # Energy Level 3 (Amber/Yellow)
    ["#F59E0B"]="var(--color-energy-3)"
    ["#f59e0b"]="var(--color-energy-3)"
    ["#FEF3C7"]="var(--color-energy-3-light)"
    ["#fef3c7"]="var(--color-energy-3-light)"
    ["#B45309"]="var(--color-energy-3-dark)"
    ["#b45309"]="var(--color-energy-3-dark)"
    
    # Energy Level 4 (Green)
    ["#10B981"]="var(--color-energy-4)"
    ["#10b981"]="var(--color-energy-4)"
    ["#D1FAE5"]="var(--color-energy-4-light)"
    ["#d1fae5"]="var(--color-energy-4-light)"
    ["#047857"]="var(--color-energy-4-dark)"
    ["#047857"]="var(--color-energy-4-dark)"
    
    # Energy Level 5 (Purple)
    ["#8B5CF6"]="var(--color-energy-5)"
    ["#8b5cf6"]="var(--color-energy-5)"
    ["#EDE9FE"]="var(--color-energy-5-light)"
    ["#ede9fe"]="var(--color-energy-5-light)"
    ["#6D28D9"]="var(--color-energy-5-dark)"
    ["#6d28d9"]="var(--color-energy-5-dark)"
    
    # Semantic Colors
    ["#3B82F6"]="var(--color-info)"
    ["#3b82f6"]="var(--color-info)"
    
    # Neutral/Gray Colors
    ["#FFFFFF"]="var(--color-neutral-0)"
    ["#ffffff"]="var(--color-neutral-0)"
    ["#F9FAFB"]="var(--color-neutral-50)"
    ["#f9fafb"]="var(--color-neutral-50)"
    ["#F3F4F6"]="var(--color-neutral-100)"
    ["#f3f4f6"]="var(--color-neutral-100)"
    ["#E5E7EB"]="var(--color-neutral-200)"
    ["#e5e7eb"]="var(--color-neutral-200)"
    ["#D1D5DB"]="var(--color-neutral-300)"
    ["#d1d5db"]="var(--color-neutral-300)"
    ["#9CA3AF"]="var(--color-neutral-400)"
    ["#9ca3af"]="var(--color-neutral-400)"
    ["#6B7280"]="var(--color-neutral-500)"
    ["#6b7280"]="var(--color-neutral-500)"
    ["#4B5563"]="var(--color-neutral-600)"
    ["#4b5563"]="var(--color-neutral-600)"
    ["#374151"]="var(--color-neutral-700)"
    ["#374151"]="var(--color-neutral-700)"
    ["#1F2937"]="var(--color-neutral-800)"
    ["#1f2937"]="var(--color-neutral-800)"
    ["#111827"]="var(--color-neutral-900)"
    ["#111827"]="var(--color-neutral-900)"
)

# Spacing replacements (common hardcoded values)
declare -A SPACING_MAP=(
    ["4px"]="var(--space-1)"
    ["8px"]="var(--space-2)"
    ["12px"]="var(--space-3)"
    ["16px"]="var(--space-4)"
    ["20px"]="var(--space-5)"
    ["24px"]="var(--space-6)"
    ["32px"]="var(--space-8)"
    ["40px"]="var(--space-10)"
    ["48px"]="var(--space-12)"
    ["64px"]="var(--space-16)"
)

# Replace colors in all CSS files
echo "🎨 Replacing colors..."
for file in "$CSS_DIR"/*.css; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # Skip our design system files
        if [[ "$filename" == "variables.css" || "$filename" == "tokens.css" ]]; then
            continue
        fi
        
        for hex in "${!COLOR_MAP[@]}"; do
            var="${COLOR_MAP[$hex]}"
            # Use perl for case-insensitive replacement
            COUNT=$(grep -io "$hex" "$file" | wc -l | tr -d ' ')
            if [ "$COUNT" -gt 0 ]; then
                perl -pi -e "s/$hex/$var/gi" "$file"
                TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + COUNT))
                echo "  ✓ $filename: $COUNT × $hex → $var"
            fi
        done
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Design token replacement complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  • Files processed: $(find "$CSS_DIR" -name "*.css" | wc -l | tr -d ' ')"
echo "  • Total replacements: $TOTAL_REPLACEMENTS"
echo "  • Backup location: $BACKUP_DIR"
echo ""
echo "🧪 Next steps:"
echo "  1. Review changes: git diff src/styles/"
echo "  2. Test the app: npm run dev"
echo "  3. If issues arise: cp -r $BACKUP_DIR/* $CSS_DIR/"
echo ""

