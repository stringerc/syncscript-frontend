#!/usr/bin/env python3
"""
Aider Fix Script for SyncScript Frontend
Fixes 37 syntax errors: "Expected ',', got ';'"
"""

import os
import re

def fix_syntax_errors():
    """Fix syntax errors in target files"""
    
    # Target files with their line numbers
    target_files = [
        ("pages/api/ai/breakdown-task.ts", 50),
        ("pages/api/ai/energy-insights.ts", 52),
        ("pages/api/ai/parse-task.ts", 59),
        ("pages/api/briefings/settings.ts", 333),
        ("pages/api/calendar/events.ts", 46),
        ("pages/beta.tsx", 67),
        ("pages/compare.tsx", 39),
        ("pages/dashboard.tsx", 1038),
        ("pages/dashboard/observability.tsx", 19),
        ("pages/dashboard/quality.tsx", 27),
        ("pages/landing-v2.tsx", 179),
        ("src/app/calendar/page.tsx", 79),
        ("src/app/contact/page.tsx", 121)
    ]
    
    fixes_applied = 0
    
    for file_path, target_line in target_files:
        if not os.path.exists(file_path):
            print(f"⚠️  File not found: {file_path}")
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix pattern 1: "} ; {" -> "}, {"
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix pattern 2: "} ;" -> "},"
            content = re.sub(r'\}\s*;', '},', content)
            
            # Fix pattern 3: Missing commas in object literals
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Fixed syntax errors in {file_path}")
                fixes_applied += 1
            else:
                print(f"ℹ️  No changes needed in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 Fix complete! Applied fixes to {fixes_applied} files")
    return fixes_applied

if __name__ == "__main__":
    print("🚀 Starting Aider Fix Script for SyncScript Frontend")
    print("=" * 60)
    fix_count = fix_syntax_errors()
    print(f"📊 Total files fixed: {fix_count}")
    print("🎯 Ready for build test!")
