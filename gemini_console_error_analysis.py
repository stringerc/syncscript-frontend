#!/usr/bin/env python3
"""
Gemini CLI: Console Error Analysis and Fix Strategy
Trio Approach: Cursor + Gemini + Aider
"""

import os
import re
from pathlib import Path

def analyze_console_errors():
    """Analyze the JavaScript console errors"""
    print("🔍 GEMINI CLI: Console Error Analysis")
    print("=" * 50)
    
    errors = [
        {
            "type": "TypeError: e[o] is not a function",
            "files": ["webpack-7bea89162ca3bfbd.js", "layout-c068c9818e0f62fd.js"],
            "cause": "Webpack module loading failure - likely missing or corrupted imports",
            "priority": "HIGH"
        },
        {
            "type": "SyntaxError: Unexpected token ';'",
            "file": "sw.js:7",
            "cause": "Service worker has syntax error on line 7",
            "priority": "HIGH"
        },
        {
            "type": "CSS preload warning",
            "cause": "CSS file preloaded but not used efficiently",
            "priority": "LOW"
        }
    ]
    
    print("🚨 IDENTIFIED ERRORS:")
    for i, error in enumerate(errors, 1):
        print(f"\n{i}. {error['type']}")
        print(f"   Priority: {error['priority']}")
        print(f"   Cause: {error['cause']}")
        if 'files' in error:
            print(f"   Files: {', '.join(error['files'])}")
        elif 'file' in error:
            print(f"   File: {error['file']}")
    
    return errors

def check_service_worker():
    """Check service worker file for syntax errors"""
    print("\n🔍 Checking Service Worker...")
    
    sw_file = Path("public/sw.js")
    if not sw_file.exists():
        print("❌ Service worker file not found at public/sw.js")
        return False
    
    with open(sw_file, 'r') as f:
        content = f.read()
    
    lines = content.split('\n')
    if len(lines) >= 7:
        print(f"Line 7: {lines[6]}")
        if ';' in lines[6] and lines[6].strip().endswith(';'):
            print("✅ Line 7 syntax looks correct")
        else:
            print("❌ Potential syntax issue on line 7")
            return False
    
    print("✅ Service worker syntax check complete")
    return True

def check_webpack_issues():
    """Check for potential webpack/module loading issues"""
    print("\n🔍 Checking for Webpack Issues...")
    
    # Check for missing imports or broken module references
    issues = []
    
    # Check layout.tsx for potential issues
    layout_file = Path("src/app/layout.tsx")
    if layout_file.exists():
        with open(layout_file, 'r') as f:
            content = f.read()
        
        # Look for potential import issues
        if 'UserProvider' in content and '@auth0' in content:
            issues.append("Layout still references Auth0 UserProvider")
        
        if 'useUser' in content:
            issues.append("Layout still references Auth0 useUser hook")
    
    if issues:
        print("❌ Potential issues found:")
        for issue in issues:
            print(f"   - {issue}")
    else:
        print("✅ No obvious webpack issues found in layout")
    
    return len(issues) == 0

def generate_fix_strategy():
    """Generate comprehensive fix strategy"""
    print("\n🎯 FIX STRATEGY:")
    print("1. Fix service worker syntax error")
    print("2. Remove all Auth0 references from layout and components")
    print("3. Check for missing imports or broken module references")
    print("4. Optimize CSS preloading")
    print("5. Test build and deployment")
    
    print("\n🔧 IMMEDIATE ACTIONS:")
    print("1. Fix sw.js line 7 syntax error")
    print("2. Clean up any remaining Auth0 references")
    print("3. Check for missing dependencies")
    print("4. Rebuild and redeploy")

if __name__ == "__main__":
    print("🚀 GEMINI CLI: Starting Console Error Analysis")
    
    # Change to project directory
    os.chdir("/Users/Apple/syncscript-frontend")
    
    # Run analysis
    errors = analyze_console_errors()
    
    # Check specific files
    sw_ok = check_service_worker()
    webpack_ok = check_webpack_issues()
    
    # Generate fix strategy
    generate_fix_strategy()
    
    print(f"\n📊 SUMMARY:")
    print(f"Service Worker: {'✅ OK' if sw_ok else '❌ NEEDS FIX'}")
    print(f"Webpack Issues: {'✅ OK' if webpack_ok else '❌ NEEDS FIX'}")
    print(f"Total Errors: {len(errors)}")
    
    print("\n✅ Gemini CLI analysis complete!")
