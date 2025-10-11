#!/bin/bash

# Design Token Replacement - PASS 2
# Catching remaining hardcoded colors

echo "🎨 Design Token Replacement - PASS 2"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CSS_DIR="$HOME/syncscript-frontend/src/styles"
TOTAL=0

replace_all() {
    local pattern="$1"
    local replacement="$2"
    local desc="$3"
    
    local count=0
    for file in "$CSS_DIR"/*.css; do
        if [ -f "$file" ] && [[ $(basename "$file") != "variables.css" ]] && [[ $(basename "$file") != "tokens.css" ]]; then
            count=$(grep -io "$pattern" "$file" 2>/dev/null | wc -l | tr -d ' ')
            if [ "$count" -gt 0 ]; then
                sed -i '' "s/$pattern/$replacement/gI" "$file"
                echo "  ✓ $(basename "$file"): $count × $desc"
                TOTAL=$((TOTAL + count))
            fi
        fi
    done
}

echo ""
echo "⚪ Replacing gray/neutral colors..."
replace_all "#FFFFFF" "var(--color-neutral-0)" "White"
replace_all "#ffffff" "var(--color-neutral-0)" "White"
replace_all "#f5f5f5" "var(--color-neutral-100)" "Gray 100"
replace_all "#F5F5F5" "var(--color-neutral-100)" "Gray 100"
replace_all "#eeeeee" "var(--color-neutral-100)" "Gray 100"
replace_all "#EEEEEE" "var(--color-neutral-100)" "Gray 100"
replace_all "#cccccc" "var(--color-neutral-300)" "Gray 300"
replace_all "#CCCCCC" "var(--color-neutral-300)" "Gray 300"
replace_all "#999999" "var(--color-neutral-400)" "Gray 400"
replace_all "#888888" "var(--color-neutral-500)" "Gray 500"
replace_all "#666666" "var(--color-neutral-500)" "Gray 500"
replace_all "#555555" "var(--color-neutral-600)" "Gray 600"
replace_all "#444444" "var(--color-neutral-700)" "Gray 700"
replace_all "#404040" "var(--color-neutral-700)" "Gray 700"
replace_all "#333333" "var(--color-neutral-800)" "Gray 800"
replace_all "#2a2a2a" "var(--color-neutral-800)" "Gray 800"
replace_all "#1a1a1a" "var(--color-neutral-900)" "Gray 900"
replace_all "#000000" "var(--color-neutral-950)" "Black"

echo ""
echo "🔵 Replacing blue colors..."
replace_all "#3B82F6" "var(--color-info)" "Info Blue"
replace_all "#3b82f6" "var(--color-info)" "Info Blue"

echo ""
echo "🟢 Replacing green colors..."
replace_all "#059669" "var(--color-success)" "Success Green"

echo ""
echo "🔴 Replacing red colors..."
replace_all "#DC2626" "var(--color-error)" "Error Red"
replace_all "#EC4899" "var(--color-error)" "Pink/Error"

echo ""
echo "🟡 Replacing yellow/amber colors..."
replace_all "#D97706" "var(--color-warning)" "Warning Amber"
replace_all "#FFD700" "var(--color-gold)" "Gold"

echo ""
echo "🟣 Replacing remaining purple..."
replace_all "#8B5CF6" "var(--color-energy-5)" "Purple/Energy 5"

echo ""
echo "🟠 Replacing orange..."
replace_all "#FFA500" "var(--color-energy-2)" "Orange"
replace_all "#FF6B6B" "var(--color-energy-1)" "Red"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PASS 2 Complete! Total: $TOTAL replacements"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

