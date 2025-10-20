#!/usr/bin/env python3
"""
🎯 CRITICAL COMMENT FIX SCRIPT
Fix malformed comments that are blocking compilation
"""

import os
import re
import glob

def fix_critical_comments():
    """Fix malformed comment syntax"""
    fixes_applied = 0
    files_processed = 0
    
    # Get all TypeScript/TSX files
    file_patterns = [
        "pages/**/*.tsx",
        "pages/**/*.ts", 
        "src/**/*.tsx",
        "src/**/*.ts"
    ]
    
    all_files = []
    for pattern in file_patterns:
        all_files.extend(glob.glob(pattern, recursive=True))
    
    all_files = list(set(all_files))
    
    print(f"🎯 Processing {len(all_files)} files for critical comment fixes...")
    
    for file_path in all_files:
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixes = 0
            
            # Fix 1: Malformed comments starting with / instead of //
            content = re.sub(r'^(\s*)/([^/][^\n]*)$', r'\1// \2', content, flags=re.MULTILINE)
            
            # Fix 2: Fix comments that got corrupted by automated fixes
            content = re.sub(r'(\s*)/([A-Z][^\n]*)$', r'\1// \2', content, flags=re.MULTILINE)
            
            # Fix 3: Fix malformed import comments
            content = re.sub(r"import\s+['\"]([^'\"]+)['\"]\s*;\s*/([^/]+)$", r"import '\1'; // \2", content, flags=re.MULTILINE)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixes_applied += 1
                file_fixes += 1
            
            files_processed += 1
            
            if file_fixes > 0:
                print(f"✅ Fixed {file_fixes} comment issues in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 CRITICAL COMMENT FIX COMPLETE!")
    print(f"📊 Files processed: {files_processed}")
    print(f"🔧 Files fixed: {fixes_applied}")
    
    return fixes_applied

if __name__ == "__main__":
    print("🎯 LAUNCHING CRITICAL COMMENT FIX...")
    fix_critical_comments()
