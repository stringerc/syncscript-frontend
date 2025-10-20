#!/usr/bin/env python3
"""
🚀 TRIPLE-AI COMPREHENSIVE FIX SCRIPT
Mission: Fix remaining 86 syntax errors with maximum efficiency
"""

import os
import re
import glob
from pathlib import Path

def fix_syntax_errors():
    """Fix common syntax errors across all files"""
    fixes_applied = 0
    files_processed = 0
    
    # Define file patterns to process
    file_patterns = [
        "pages/api/**/*.ts",
        "pages/**/*.tsx", 
        "src/components/**/*.tsx",
        "src/app/**/*.tsx",
        "src/utils/**/*.ts"
    ]
    
    # Get all files matching patterns
    all_files = []
    for pattern in file_patterns:
        all_files.extend(glob.glob(pattern, recursive=True))
    
    # Remove duplicates
    all_files = list(set(all_files))
    
    print(f"🎯 Processing {len(all_files)} files...")
    
    for file_path in all_files:
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixes = 0
            
            # Fix 1: Malformed JSON responses
            content = re.sub(r'json\(\{\{\s*error:\s*([^}]+)\s*\},\s*;', r'json({ error: \1 });', content)
            content = re.sub(r'json\(\{\s*error:\s*([^}]+)\s*\},\s*;', r'json({ error: \1 });', content)
            
            # Fix 2: Missing semicolons after variable declarations
            content = re.sub(r'(\w+)\s*=\s*([^;]+),\s*$', r'\1 = \2;', content, flags=re.MULTILINE)
            
            # Fix 3: Missing semicolons after return statements
            content = re.sub(r'return\s+([^;]+),\s*$', r'return \1;', content, flags=re.MULTILINE)
            
            # Fix 4: Extra commas in object literals
            content = re.sub(r'([^,}])\s*,\s*;', r'\1;', content)
            
            # Fix 5: Malformed template literals
            content = re.sub(r"'([^']*)\s*//\s*([^']*)'", r"'\1/\2'", content)
            
            # Fix 6: Fix malformed if statements
            content = re.sub(r'if\s*\(\s*([^)]+),\s*([^)]+)\s*\)', r'if (\1; \2)', content)
            
            # Fix 7: Fix malformed for loops
            content = re.sub(r'for\s*\(\s*([^;]+),\s*([^;]+);\s*([^)]+)\s*\)', r'for (\1; \2; \3)', content)
            
            # Fix 8: Fix malformed JSX
            content = re.sub(r'(\w+)\s*,\s*</div>', r'\1</div>', content)
            
            # Fix 9: Fix missing commas in arrays
            content = re.sub(r'(\w+)\s*}\s*{', r'\1}, {', content)
            
            # Fix 10: Fix malformed function parameters
            content = re.sub(r'\(\s*([^,)]+),\s*([^)]+)\s*\)\s*=>', r'(\1, \2) =>', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixes_applied += 1
                file_fixes += 1
            
            files_processed += 1
            
            if file_fixes > 0:
                print(f"✅ Fixed {file_fixes} issues in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 TRIPLE-AI FIX COMPLETE!")
    print(f"📊 Files processed: {files_processed}")
    print(f"🔧 Files fixed: {fixes_applied}")
    print(f"⚡ Total fixes applied: Multiple patterns across all files")
    
    return fixes_applied

if __name__ == "__main__":
    print("🚀 LAUNCHING TRIPLE-AI COMPREHENSIVE FIX...")
    fix_syntax_errors()
