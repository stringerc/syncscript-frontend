#!/bin/bash
# Final cleanup pass

CSS_DIR="$HOME/syncscript-frontend/src/styles"
TOTAL=0

for pattern in "8B5CF6:var(--color-energy-5)" "F97316:var(--color-energy-2)" "F59E0B:var(--color-energy-3)" "EF4444:var(--color-energy-1)" "FFFFFF:var(--color-neutral-0)" "b0b0b0:var(--color-neutral-400)" "F5F5F4:var(--color-neutral-100)" "FAFAF9:var(--color-neutral-50)" "FCD34D:var(--color-gold)" "F5A623:var(--color-gold)"; do
    hex="${pattern%:*}"
    var="${pattern#*:}"
    for file in "$CSS_DIR"/*.css; do
        if [ -f "$file" ] && [[ $(basename "$file") != "variables.css" ]] && [[ $(basename "$file") != "tokens.css" ]]; then
            count=$(grep -io "#$hex" "$file" 2>/dev/null | wc -l | tr -d ' ')
            if [ "$count" -gt 0 ]; then
                sed -i '' "s/#$hex/$var/gI" "$file"
                TOTAL=$((TOTAL + count))
            fi
        fi
    done
done

echo "✅ Final pass: $TOTAL colors replaced"
