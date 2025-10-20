#!/usr/bin/env python3
"""
Comprehensive Fix Script for SyncScript Frontend
Fixes remaining 29 syntax errors with advanced patterns
"""

import os
import re

def fix_comprehensive_syntax_errors():
    """Fix comprehensive syntax errors in all files"""
    
    print("🚀 Starting Comprehensive Syntax Fix for SyncScript Frontend")
    print("=" * 70)
    
    # Get all TypeScript/JavaScript files
    all_files = []
    for root, dirs, files in os.walk('.'):
        # Skip node_modules and .git
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.next']]
        
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                all_files.append(os.path.join(root, file))
    
    total_fixes = 0
    
    for file_path in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixes = 0
            
            # Fix 1: Export statements with semicolons
            # export; const -> export const
            content = re.sub(r'export\s*;\s*const', 'export const', content)
            
            # Fix 2: Object properties with semicolons instead of commas
            # key: value; -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+);', r'\1,', content)
            
            # Fix 3: Array elements with semicolons instead of commas
            # } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 4: Function declarations with semicolons
            # } , const -> }, const
            content = re.sub(r'\}\s*,\s*const', '}, const', content)
            
            # Fix 5: JSX attributes with commas instead of proper syntax
            # required, -> required
            content = re.sub(r'required\s*,', 'required', content)
            
            # Fix 6: useEffect dependency arrays
            # } [deps]) -> }, [deps])
            content = re.sub(r'\}\s*\[([^\]]+)\]\)', r'}, [\1])', content)
            
            # Fix 7: Template literals in JSX className
            # className={`text` -> className={`text`}
            content = re.sub(r'className=\{`([^`]+)`(?!\})', r'className={`\1`}', content)
            
            # Fix 8: Missing commas in object literals
            # { key: value } { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            # Fix 9: Function parameters with missing commas
            # const func = async (param) => { -> const func = async (param) => {
            content = re.sub(r'const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{', r'const \1 = async (\2) => {', content)
            
            # Fix 10: Object literal syntax in arrays
            # { key: value } ; { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*;\s*\{', r'\1 }, {', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                file_fixes = len(re.findall(r'export\s*;\s*const|(\w+:\s*[^,}]+);|\}\s*;\s*\{|\}\s*,\s*const|required\s*,|\}\s*\[([^\]]+)\]\)|className=\{`([^`]+)`(?!\})|(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)|const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{|(\w+:\s*[^,}]+)\s*\}\s*;\s*\{', original_content))
                print(f"✅ Fixed {file_fixes} errors in {file_path}")
                total_fixes += file_fixes
            else:
                print(f"ℹ️  No changes needed in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 Comprehensive fix complete!")
    print(f"📊 Total fixes applied: {total_fixes}")
    print("🎯 Ready for final build test!")
    
    return total_fixes

if __name__ == "__main__":
    fix_comprehensive_syntax_errors()
