#!/usr/bin/env python3
"""
🎯 CRITICAL OBJECT FIX SCRIPT
Fix malformed object syntax that's blocking compilation
"""

import os
import re
import glob

def fix_critical_objects():
    """Fix malformed object syntax"""
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
    
    print(f"🎯 Processing {len(all_files)} files for critical object fixes...")
    
    for file_path in all_files:
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixes = 0
            
            # Fix 1: Fix object property semicolons (should be commas)
            content = re.sub(r'(\w+)\s*:\s*([^,;]+);\s*$', r'\1: \2,', content, flags=re.MULTILINE)
            
            # Fix 2: Fix missing commas in object literals
            content = re.sub(r'([^,}])\s*}\s*$', r'\1\n  },', content, flags=re.MULTILINE)
            
            # Fix 3: Fix extra commas in object definitions
            content = re.sub(r'([^,}])\s*,\s*;', r'\1;', content)
            
            # Fix 4: Fix malformed object property assignments
            content = re.sub(r'(\w+)\s*=\s*([^;]+);\s*(\w+)', r'\1 = \2, \3', content)
            
            # Fix 5: Fix missing commas in arrays
            content = re.sub(r'(\w+)\s*]\s*,\s*(\w+)', r'\1],\n        \2', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixes_applied += 1
                file_fixes += 1
            
            files_processed += 1
            
            if file_fixes > 0:
                print(f"✅ Fixed {file_fixes} object issues in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 CRITICAL OBJECT FIX COMPLETE!")
    print(f"📊 Files processed: {files_processed}")
    print(f"🔧 Files fixed: {fixes_applied}")
    
    return fixes_applied

if __name__ == "__main__":
    print("🎯 LAUNCHING CRITICAL OBJECT FIX...")
    fix_critical_objects()
