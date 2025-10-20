
import os
import re
import glob

def fix_utility_files():
    """Fix syntax errors in utility files"""
    utility_files = [
        "src/utils/achievementSystem.ts",
        "src/utils/customization.ts", 
        "src/utils/savingsGoals.ts",
        "src/utils/streakSystem.ts"
    ]
    
    fixes_applied = 0
    
    for file_path in utility_files:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Fix missing semicolons after variable declarations
                content = re.sub(r'(\w+),\s*$', r';', content, flags=re.MULTILINE)
                
                # Fix missing semicolons after return statements
                content = re.sub(r'return\s+([^;]+),\s*$', r'return ;', content, flags=re.MULTILINE)
                
                # Fix object property semicolons
                content = re.sub(r'([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^,;]+),\s*$', r': ;', content, flags=re.MULTILINE)
                
                # Fix malformed function returns
                content = re.sub(r'}\s*,\s*{', r'} {', content)
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    fixes_applied += 1
                    print(f"✅ Fixed {file_path}")
                    
            except Exception as e:
                print(f"❌ Error fixing {file_path}: {e}")
    
    print(f"🎯 Applied {fixes_applied} fixes to utility files")
    return fixes_applied

if __name__ == "__main__":
    fix_utility_files()
