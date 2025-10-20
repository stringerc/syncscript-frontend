#!/usr/bin/env python3
"""
Final Comprehensive Fix Script for Remaining 45 Syntax Errors
"""

import os
import re

def final_comprehensive_fix():
    """Fix the remaining 45 syntax errors with comprehensive patterns"""
    
    print("🚀 Starting Final Comprehensive Fix for Remaining 45 Errors")
    print("=" * 60)
    
    # Get all TypeScript/TSX files
    project_root = "/Users/Apple/syncscript-frontend"
    
    # Find all TypeScript files
    ts_files = []
    for root, dirs, files in os.walk(project_root):
        # Skip node_modules and .next
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.git']]
        for file in files:
            if file.endswith(('.ts', '.tsx')) and not file.endswith('.d.ts'):
                ts_files.append(os.path.join(root, file))
    
    print(f"Found {len(ts_files)} TypeScript files to process")
    
    fixes_applied = 0
    
    for file_path in ts_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix 1: Missing comma after object properties in JSON responses
            content = re.sub(r'(message:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(config,\s*)(\n\s*instructions:)', r'\1\2', content)
            content = re.sub(r'(instructions:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 2: Missing comma after array elements in object properties
            content = re.sub(r'(keywords:\s*\[[^\]]+\])(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(authors:\s*\[[^\]]+\])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 3: Missing comma after date properties
            content = re.sub(r'(createdAt:\s*new\s+Date\(\)\.toISOString\(\))(\s*)(\n\s*updatedAt:)', r'\1,\2\3', content)
            content = re.sub(r'(updatedAt:\s*new\s+Date\(\)\.toISOString\(\))(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 4: Missing comma after string properties
            content = re.sub(r'(timezone:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*language:)', r'\1,\2\3', content)
            content = re.sub(r'(language:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*createdAt:)', r'\1,\2\3', content)
            
            # Fix 5: Missing comma after boolean properties
            content = re.sub(r'(nextDayPrep:\s*(?:true|false))(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(tone:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 6: Missing comma after object properties in nested objects
            content = re.sub(r'(morning:\s*\{[^}]+\})(\s*)(\n\s*evening:)', r'\1,\2\3', content)
            content = re.sub(r'(evening:\s*\{[^}]+\})(\s*)(\n\s*nextDayPrep:)', r'\1,\2\3', content)
            
            # Fix 7: Missing comma after interface properties
            content = re.sub(r'(id:\s*string)(\s*)(\n\s*title:)', r'\1,\2\3', content)
            content = re.sub(r'(title:\s*string)(\s*)(\n\s*description:)', r'\1,\2\3', content)
            content = re.sub(r'(description:\s*string)(\s*)(\n\s*priority:)', r'\1,\2\3', content)
            content = re.sub(r'(priority:\s*string)(\s*)(\n\s*energy:)', r'\1,\2\3', content)
            content = re.sub(r'(energy:\s*string)(\s*)(\n\s*estimatedTime:)', r'\1,\2\3', content)
            content = re.sub(r'(estimatedTime:\s*number)(\s*)(\n\s*tags:)', r'\1,\2\3', content)
            content = re.sub(r'(tags:\s*string\[\])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 8: Missing comma after className properties
            content = re.sub(r'(base:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*sm:)', r'\1,\2\3', content)
            content = re.sub(r'(sm:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*md:)', r'\1,\2\3', content)
            content = re.sub(r'(md:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*lg:)', r'\1,\2\3', content)
            content = re.sub(r'(lg:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*xl:)', r'\1,\2\3', content)
            content = re.sub(r'(xl:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 9: Missing comma after icon properties
            content = re.sub(r'(width:\s*\d+)(\s*)(\n\s*height:)', r'\1,\2\3', content)
            content = re.sub(r'(height:\s*\d+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 10: Missing comma after status properties
            content = re.sub(r'(status:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*latency:)', r'\1,\2\3', content)
            content = re.sub(r'(latency:\s*\d+)(\s*)(\n\s*uptime:)', r'\1,\2\3', content)
            content = re.sub(r'(uptime:\s*[\d.]+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 11: Missing comma after metric properties
            content = re.sub(r'(id:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*name:)', r'\1,\2\3', content)
            content = re.sub(r'(name:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*value:)', r'\1,\2\3', content)
            content = re.sub(r'(value:\s*[^,\n]+)(\s*)(\n\s*unit:)', r'\1,\2\3', content)
            content = re.sub(r'(unit:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 12: Missing comma after label properties
            content = re.sub(r'(label:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*value:)', r'\1,\2\3', content)
            content = re.sub(r'(value:\s*[^,\n]+)(\s*)(\n\s*status:)', r'\1,\2\3', content)
            content = re.sub(r'(status:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 13: Missing comma after API response properties
            content = re.sub(r'(data:\s*\{[^}]+\})(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(error:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*message:)', r'\1,\2\3', content)
            content = re.sub(r'(message:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 14: Missing comma after array elements
            content = re.sub(r'(\'[^\']+\')(\s*)(\n\s*\])', r'\1,\2\3', content)
            content = re.sub(r'(\"[^\"]+\")(\s*)(\n\s*\])', r'\1,\2\3', content)
            content = re.sub(r'(\{[^}]+\})(\s*)(\n\s*\])', r'\1,\2\3', content)
            
            # Fix 15: Missing comma after template literal properties
            content = re.sub(r'(expectedCallbackUrl:\s*`[^`]+`)(\s*)(\n\s*currentUrl:)', r'\1,\2\3', content)
            content = re.sub(r'(currentUrl:\s*`[^`]+`)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixes_applied += 1
                print(f"✅ Fixed {os.path.relpath(file_path, project_root)}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print("=" * 60)
    print(f"✅ Final comprehensive fix completed! Applied fixes to {fixes_applied} files")

if __name__ == "__main__":
    final_comprehensive_fix()
