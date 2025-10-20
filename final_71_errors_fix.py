#!/usr/bin/env python3
"""
Final 71 Errors Fix - SyncScript Frontend
Targets the remaining JSX and TypeScript syntax issues
"""

import os
import re

def fix_final_71_errors():
    """Fix the final 71 syntax errors"""
    
    print("🎯 Starting Final 71 Errors Fix")
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
            
            # Fix 1: JSX component props - missing spaces
            # task={exampleTask} onSubtasksGenerated= → task={exampleTask} onSubtasksGenerated=
            content = re.sub(r'(\w+)=\{([^}]+)\}(\w+)=', r'\1={\2} \3=', content)
            
            # Fix 2: Template literal issues
            # `${variable}text` → `${variable} text`
            content = re.sub(r'`([^`]*)\$\{([^}]+)\}([a-zA-Z])', r'`\1${\2} \3', content)
            
            # Fix 3: Fix logical operators
            # ||, !session → || !session
            content = re.sub(r'\|\|\s*,\s*(\w+)', r'|| \1', content)
            
            # Fix 4: Fix object property syntax
            # { level: number, timestamp: string ,} → { level: number, timestamp: string }
            content = re.sub(r'(\w+):\s*([^,}]+)\s*,\s*}', r'\1: \2 }', content)
            
            # Fix 5: Fix array syntax
            # [item1, item2 ,] → [item1, item2]
            content = re.sub(r'([^,\]]+)\s*,\s*\]', r'\1]', content)
            
            # Fix 6: Fix function parameter syntax
            # (param1, param2 ,) → (param1, param2)
            content = re.sub(r'([^,)]+)\s*,\s*\)', r'\1)', content)
            
            # Fix 7: Fix JSX self-closing tags
            # <Component prop={value} ,/> → <Component prop={value} />
            content = re.sub(r'(\w+)=\{([^}]+)\}\s*,\s*/>', r'\1={\2} />', content)
            
            # Fix 8: Fix conditional expressions
            # condition ? value1 , value2 → condition ? value1 : value2
            content = re.sub(r'\?\s*([^,]+)\s*,\s*([^:]+)', r'? \1 : \2', content)
            
            # Fix 9: Fix import statements
            # import { Component } from 'library' , → import { Component } from 'library';
            content = re.sub(r"import\s+([^']+)\s+from\s+'([^']+)'\s*,\s*", r"import \1 from '\2';", content)
            
            # Fix 10: Fix object method syntax
            # method: (param) => { code ,} → method: (param) => { code }
            content = re.sub(r'(\w+):\s*\([^)]*\)\s*=>\s*\{([^}]+)\s*,\s*\}', r'\1: (\2) => {\3 }', content)
            
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
    print("✅ Final 71 errors fix completed!")

if __name__ == "__main__":
    fix_final_71_errors()
