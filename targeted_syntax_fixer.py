#!/usr/bin/env python3
"""
Targeted Syntax Fixer for SyncScript Frontend
Fixes specific syntax patterns found in build errors
"""

import os
import re

def fix_targeted_syntax():
    """Fix specific syntax patterns"""
    
    print("🎯 Starting Targeted Syntax Fix")
    print("=" * 50)
    
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
            
            # Fix 1: route +, '/' → route + '/'
            content = re.sub(r'(\w+)\s*\+\s*,\s*([\'"])', r'\1 + \2', content)
            
            # Fix 2: &&, navigator → && navigator
            content = re.sub(r'&&\s*,\s*(\w+)', r'&& \1', content)
            
            # Fix 3: ===, 'string' → === 'string'
            content = re.sub(r'===\s*,\s*([\'"])', r'=== \1', content)
            
            # Fix 4: !==, 'string' → !== 'string'
            content = re.sub(r'!==\s*,\s*([\'"])', r'!== \1', content)
            
            # Fix 5: Fix JSX component props with trailing commas
            content = re.sub(r'(\w+)=\{([^}]+)\}\s*,\s*(\w+)=', r'\1={\2} \3=', content)
            
            # Fix 6: Fix object property syntax with trailing commas
            content = re.sub(r'(\w+):\s*([^,}]+)\s*,\s*,', r'\1: \2,', content)
            
            # Fix 7: Fix template literal syntax
            content = re.sub(r'`([^`]*),\s*([^`]*)`', r'`\1\2`', content)
            
            # Fix 8: Fix array element syntax
            content = re.sub(r'(\w+)\s*,\s*,', r'\1,', content)
            
            # Fix 9: Fix function parameter syntax
            content = re.sub(r'(\w+):\s*,\s*(\w+)', r'\1: \2', content)
            
            # Fix 10: Fix import statement syntax
            content = re.sub(r'import\s+(\w+)\s+from\s+([^;]+),\s*;', r'import \1 from \2;', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                file_fixes = len(re.findall(r'[^,]\s*,\s*[^,}]', original_content)) - len(re.findall(r'[^,]\s*,\s*[^,}]', content))
                total_fixes += file_fixes
                print(f"✅ Fixed {file_fixes} issues in {file_path}")
        
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print("=" * 50)
    print(f"🎉 Total fixes applied: {total_fixes}")
    print("✅ Targeted syntax fix completed!")

if __name__ == "__main__":
    fix_targeted_syntax()
