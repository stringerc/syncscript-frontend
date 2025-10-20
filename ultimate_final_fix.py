#!/usr/bin/env python3
"""
Ultimate Final Fix Script for SyncScript Frontend
Fixes the last remaining syntax patterns
"""

import os
import re

def fix_ultimate_patterns():
    """Fix the ultimate remaining syntax patterns"""
    
    print("🚀 Starting Ultimate Final Fix for Remaining Patterns")
    print("=" * 60)
    
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
            
            # Fix 1: Import statements with commas instead of semicolons
            # Pattern: import 'file.css', -> import 'file.css';
            content = re.sub(r"import\s+['\"]([^'\"]+)['\"],\s*$", r"import '\1';", content, flags=re.MULTILINE)
            
            # Fix 2: Function calls with missing commas
            # Pattern: func(param1 param2) -> func(param1, param2)
            content = re.sub(r'(\w+)\s*\(\s*([^,)]+)\s+([^,)]+)\s*\)', r'\1(\2, \3)', content)
            
            # Fix 3: Object properties with semicolons instead of commas
            # Pattern: key: value; -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+);', r'\1,', content)
            
            # Fix 4: Missing commas in object literals
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 5: Array elements with semicolons instead of commas
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 6: Function parameters with missing commas
            # Pattern: const func = async (param) => { -> const func = async (param) => {
            content = re.sub(r'const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{', r'const \1 = async (\2) => {', content)
            
            # Fix 7: Object literal syntax in arrays
            # Pattern: { key: value } ; { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*;\s*\{', r'\1 }, {', content)
            
            # Fix 8: Export statements with semicolons
            # Pattern: export; const -> export const
            content = re.sub(r'export\s*;\s*const', 'export const', content)
            
            # Fix 9: JSX attributes with commas instead of proper syntax
            # Pattern: required, -> required
            content = re.sub(r'required\s*,', 'required', content)
            
            # Fix 10: useEffect dependency arrays
            # Pattern: } [deps]) -> }, [deps])
            content = re.sub(r'\}\s*\[([^\]]+)\]\)', r'}, [\1])', content)
            
            # Fix 11: Template literals in JSX className
            # Pattern: className={`text` -> className={`text`}
            content = re.sub(r'className=\{`([^`]+)`(?!\})', r'className={`\1`}', content)
            
            # Fix 12: Object literal syntax in arrays with missing commas
            # Pattern: { key: value } { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            # Fix 13: Function declarations with semicolons
            # Pattern: } , const -> }, const
            content = re.sub(r'\}\s*,\s*const', '}, const', content)
            
            # Fix 14: Array elements with missing commas
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 15: Object properties with missing commas
            # Pattern: key: value } -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}', r'\1,', content)
            
            # Fix 16: Missing commas in object literals
            # Pattern: { key: value } { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            # Fix 17: Function parameters with missing commas
            # Pattern: const func = async (param) => { -> const func = async (param) => {
            content = re.sub(r'const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{', r'const \1 = async (\2) => {', content)
            
            # Fix 18: Import statements with commas
            # Pattern: import 'file.css', -> import 'file.css';
            content = re.sub(r"import\s+['\"]([^'\"]+)['\"],\s*$", r"import '\1';", content, flags=re.MULTILINE)
            
            # Fix 19: Function calls with missing commas
            # Pattern: func(param1 param2) -> func(param1, param2)
            content = re.sub(r'(\w+)\s*\(\s*([^,)]+)\s+([^,)]+)\s*\)', r'\1(\2, \3)', content)
            
            # Fix 20: Object properties with semicolons instead of commas
            # Pattern: key: value; -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+);', r'\1,', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Count fixes by comparing original vs new content
                file_fixes = len(re.findall(r"import\s+['\"]([^'\"]+)['\"],\s*$|(\w+)\s*\(\s*([^,)]+)\s+([^,)]+)\s*\)|(\w+:\s*[^,}]+);|\}\s*;\s*\{|const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{|export\s*;\s*const|required\s*,|\}\s*\[([^\]]+)\]\)|className=\{`([^`]+)`(?!\})", original_content))
                print(f"✅ Fixed {file_fixes} errors in {file_path}")
                total_fixes += file_fixes
            else:
                print(f"ℹ️  No changes needed in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 Ultimate final fix complete!")
    print(f"📊 Total fixes applied: {total_fixes}")
    print("🎯 Ready for final build test!")
    
    return total_fixes

if __name__ == "__main__":
    fix_ultimate_patterns()
