#!/bin/bash

# SyncScript Design Token Replacement Script v2
# Replaces all hardcoded values with CSS variables using sed

echo "🎨 Starting design token replacement..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CSS_DIR="$HOME/syncscript-frontend/src/styles"
TOTAL=0

# Function to replace and count
replace_in_files() {
    local pattern="$1"
    local replacement="$2"
    local description="$3"
    
    local count=0
    for file in "$CSS_DIR"/*.css; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            # Skip design system files
            if [[ "$filename" == "variables.css" || "$filename" == "tokens.css" ]]; then
                continue
            fi
            
            # Count occurrences before replacement
            local file_count=$(grep -io "$pattern" "$file" 2>/dev/null | wc -l | tr -d ' ')
            if [ "$file_count" -gt 0 ]; then
                # Do case-insensitive replacement
                sed -i '' "s/$pattern/$replacement/gI" "$file"
                count=$((count + file_count))
                echo "  ✓ $filename: $file_count × $description"
            fi
        fi
    done
    
    if [ $count -gt 0 ]; then
        echo "    Total: $count replacements"
    fi
    return $count
}

echo ""
echo "🎨 Replacing PRIMARY BRAND colors..."
replace_in_files "#4A90E2" "var(--color-primary-500)" "Primary Blue"
TOTAL=$((TOTAL + $?))
replace_in_files "#4a90e2" "var(--color-primary-500)" "Primary Blue (lowercase)"
TOTAL=$((TOTAL + $?))

echo ""
echo "🔴 Replacing ENERGY LEVEL 1 (Red/Low)..."
replace_in_files "#EF4444" "var(--color-energy-1)" "Energy 1"
TOTAL=$((TOTAL + $?))
replace_in_files "#ef4444" "var(--color-energy-1)" "Energy 1 (lowercase)"
TOTAL=$((TOTAL + $?))
replace_in_files "#FEE2E2" "var(--color-energy-1-light)" "Energy 1 Light"
TOTAL=$((TOTAL + $?))
replace_in_files "#fee2e2" "var(--color-energy-1-light)" "Energy 1 Light (lowercase)"
TOTAL=$((TOTAL + $?))

echo ""
echo "🟠 Replacing ENERGY LEVEL 2 (Orange)..."
replace_in_files "#F97316" "var(--color-energy-2)" "Energy 2"
TOTAL=$((TOTAL + $?))
replace_in_files "#f97316" "var(--color-energy-2)" "Energy 2 (lowercase)"
TOTAL=$((TOTAL + $?))
replace_in_files "#FFEDD5" "var(--color-energy-2-light)" "Energy 2 Light"
TOTAL=$((TOTAL + $?))

echo ""
echo "🟡 Replacing ENERGY LEVEL 3 (Amber/Yellow)..."
replace_in_files "#F59E0B" "var(--color-energy-3)" "Energy 3"
TOTAL=$((TOTAL + $?))
replace_in_files "#f59e0b" "var(--color-energy-3)" "Energy 3 (lowercase)"
TOTAL=$((TOTAL + $?))
replace_in_files "#FEF3C7" "var(--color-energy-3-light)" "Energy 3 Light"
TOTAL=$((TOTAL + $?))

echo ""
echo "🟢 Replacing ENERGY LEVEL 4 (Green)..."
replace_in_files "#10B981" "var(--color-energy-4)" "Energy 4"
TOTAL=$((TOTAL + $?))
replace_in_files "#10b981" "var(--color-energy-4)" "Energy 4 (lowercase)"
TOTAL=$((TOTAL + $?))
replace_in_files "#D1FAE5" "var(--color-energy-4-light)" "Energy 4 Light"
TOTAL=$((TOTAL + $?))

echo ""
echo "🟣 Replacing ENERGY LEVEL 5 (Purple)..."
replace_in_files "#8B5CF6" "var(--color-energy-5)" "Energy 5"
TOTAL=$((TOTAL + $?))
replace_in_files "#8b5cf6" "var(--color-energy-5)" "Energy 5 (lowercase)"
TOTAL=$((TOTAL + $?))
replace_in_files "#EDE9FE" "var(--color-energy-5-light)" "Energy 5 Light"
TOTAL=$((TOTAL + $?))

echo ""
echo "⚪ Replacing NEUTRAL colors..."
replace_in_files "#F9FAFB" "var(--color-neutral-50)" "Neutral 50"
TOTAL=$((TOTAL + $?))
replace_in_files "#F3F4F6" "var(--color-neutral-100)" "Neutral 100"
TOTAL=$((TOTAL + $?))
replace_in_files "#E5E7EB" "var(--color-neutral-200)" "Neutral 200"
TOTAL=$((TOTAL + $?))
replace_in_files "#D1D5DB" "var(--color-neutral-300)" "Neutral 300"
TOTAL=$((TOTAL + $?))
replace_in_files "#9CA3AF" "var(--color-neutral-400)" "Neutral 400"
TOTAL=$((TOTAL + $?))
replace_in_files "#6B7280" "var(--color-neutral-500)" "Neutral 500"
TOTAL=$((TOTAL + $?))
replace_in_files "#4B5563" "var(--color-neutral-600)" "Neutral 600"
TOTAL=$((TOTAL + $?))
replace_in_files "#374151" "var(--color-neutral-700)" "Neutral 700"
TOTAL=$((TOTAL + $?))
replace_in_files "#1F2937" "var(--color-neutral-800)" "Neutral 800"
TOTAL=$((TOTAL + $?))
replace_in_files "#111827" "var(--color-neutral-900)" "Neutral 900"
TOTAL=$((TOTAL + $?))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Design token replacement complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  • Files processed: $(find "$CSS_DIR" -name "*.css" ! -name "variables.css" ! -name "tokens.css" | wc -l | tr -d ' ')"
echo "  • Total color replacements: $TOTAL"
echo ""
echo "🧪 Next: Review changes with 'git diff src/styles/'"
echo ""

