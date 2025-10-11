#!/bin/bash

# SyncScript Accessibility Audit
# Checks for common accessibility issues

echo "🔍 SyncScript Accessibility Audit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

PROJECT_DIR="$HOME/syncscript-frontend"
ISSUES=0

# Check for ARIA labels on buttons
echo "📋 Checking for ARIA labels on buttons..."
BUTTONS_WITHOUT_ARIA=$(grep -r "<button" "$PROJECT_DIR/pages" "$PROJECT_DIR/src/components" --include="*.tsx" | grep -v "aria-label" | grep -v "// " | wc -l | tr -d ' ')
echo "   Buttons without aria-label: $BUTTONS_WITHOUT_ARIA"
if [ "$BUTTONS_WITHOUT_ARIA" -gt 0 ]; then
    ISSUES=$((ISSUES + 1))
fi

# Check for skip links
echo ""
echo "⏭️  Checking for skip links..."
SKIP_LINKS=$(grep -r "skip-link\|Skip to" "$PROJECT_DIR/pages" --include="*.tsx" | wc -l | tr -d ' ')
if [ "$SKIP_LINKS" -gt 0 ]; then
    echo "   ✅ Skip link found!"
else
    echo "   ❌ No skip link found"
    ISSUES=$((ISSUES + 1))
fi

# Check for main landmark
echo ""
echo "🏛️  Checking for main landmark..."
MAIN_LANDMARK=$(grep -r "id=\"main-content\"\|role=\"main\"" "$PROJECT_DIR/pages" --include="*.tsx" | wc -l | tr -d ' ')
if [ "$MAIN_LANDMARK" -gt 0 ]; then
    echo "   ✅ Main landmark found!"
else
    echo "   ❌ No main landmark found"
    ISSUES=$((ISSUES + 1))
fi

# Check for ARIA live regions
echo ""
echo "📢 Checking for ARIA live regions..."
LIVE_REGIONS=$(grep -r "aria-live\|role=\"status\"" "$PROJECT_DIR" --include="*.tsx" | wc -l | tr -d ' ')
echo "   ARIA live regions: $LIVE_REGIONS"

# Check for alt text on images
echo ""
echo "🖼️  Checking for images without alt text..."
IMG_WITHOUT_ALT=$(grep -r "<img" "$PROJECT_DIR/pages" "$PROJECT_DIR/src/components" --include="*.tsx" | grep -v "alt=" | wc -l | tr -d ' ')
echo "   Images without alt: $IMG_WITHOUT_ALT"
if [ "$IMG_WITHOUT_ALT" -gt 5 ]; then
    ISSUES=$((ISSUES + 1))
fi

# Check for focus management
echo ""
echo "🎯 Checking for focus trap implementation..."
FOCUS_TRAP=$(find "$PROJECT_DIR/src" -name "*focusTrap*" -o -name "*FocusTrap*" | wc -l | tr -d ' ')
if [ "$FOCUS_TRAP" -gt 0 ]; then
    echo "   ✅ Focus trap implementation found!"
else
    echo "   ⚠️  No focus trap found (recommended for modals)"
fi

# Check accessibility CSS
echo ""
echo "🎨 Checking for accessibility CSS..."
if [ -f "$PROJECT_DIR/src/styles/accessibility.css" ]; then
    echo "   ✅ accessibility.css exists!"
    LINES=$(wc -l < "$PROJECT_DIR/src/styles/accessibility.css" | tr -d ' ')
    echo "   Lines: $LINES"
else
    echo "   ❌ No accessibility.css found"
    ISSUES=$((ISSUES + 1))
fi

# Check for reduced motion support
echo ""
echo "⚡ Checking for reduced motion support..."
REDUCED_MOTION=$(grep -r "prefers-reduced-motion" "$PROJECT_DIR/src/styles" --include="*.css" | wc -l | tr -d ' ')
if [ "$REDUCED_MOTION" -gt 0 ]; then
    echo "   ✅ Reduced motion support found!"
else
    echo "   ❌ No reduced motion support"
    ISSUES=$((ISSUES + 1))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 AUDIT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$ISSUES" -eq 0 ]; then
    echo "✅ No critical issues found!"
    echo "   Your app has good accessibility foundations."
else
    echo "⚠️  Found $ISSUES potential issues"
    echo "   Review the items above marked with ❌"
fi

echo ""
echo "📝 Next Steps:"
echo "   1. Run axe-core or WAVE for detailed audit"
echo "   2. Test with screen reader (VoiceOver/NVDA)"
echo "   3. Test keyboard-only navigation"
echo "   4. Test at 200% zoom"
echo ""

