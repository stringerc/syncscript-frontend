#!/usr/bin/env python3
"""
Targeted Fix Script for Remaining 64 Syntax Errors
"""

import os
import re

def targeted_fix_errors():
    """Fix the remaining 64 syntax errors with targeted patterns"""
    
    print("🚀 Starting Targeted Fix for Remaining 64 Errors")
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
            
            # Fix 1: Missing comma after max_tokens in API calls
            content = re.sub(r'(max_tokens:\s*\d+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 2: Missing comma after temperature in API calls  
            content = re.sub(r'(temperature:\s*[\d.]+)(\s*)(\n\s*max_tokens)', r'\1,\2\3', content)
            
            # Fix 3: Missing comma after role in messages arrays
            content = re.sub(r'(role:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*content:)', r'\1,\2\3', content)
            
            # Fix 4: Missing comma after content in messages arrays
            content = re.sub(r'(content:\s*[^,\n]+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 5: Missing comma in object properties (metadata, etc.)
            content = re.sub(r'(description:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(keywords:\s*\[[^\]]+\])(\s*)(\n\s*})', r'\1,\2\3', content)
            content = re.sub(r'(authors:\s*\[[^\]]+\])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 6: Missing comma in icon size objects
            content = re.sub(r'(width:\s*\d+)(\s*)(\n\s*height:)', r'\1,\2\3', content)
            content = re.sub(r'(height:\s*\d+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 7: Missing comma in className objects
            content = re.sub(r'(base:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*sm:)', r'\1,\2\3', content)
            content = re.sub(r'(sm:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*md:)', r'\1,\2\3', content)
            content = re.sub(r'(md:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*lg:)', r'\1,\2\3', content)
            content = re.sub(r'(lg:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*xl:)', r'\1,\2\3', content)
            content = re.sub(r'(xl:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 8: Missing comma in interface properties
            content = re.sub(r'(id:\s*string)(\s*)(\n\s*title:)', r'\1,\2\3', content)
            content = re.sub(r'(title:\s*string)(\s*)(\n\s*description:)', r'\1,\2\3', content)
            content = re.sub(r'(description:\s*string)(\s*)(\n\s*priority:)', r'\1,\2\3', content)
            content = re.sub(r'(priority:\s*string)(\s*)(\n\s*energy:)', r'\1,\2\3', content)
            content = re.sub(r'(energy:\s*string)(\s*)(\n\s*estimatedTime:)', r'\1,\2\3', content)
            content = re.sub(r'(estimatedTime:\s*number)(\s*)(\n\s*tags:)', r'\1,\2\3', content)
            content = re.sub(r'(tags:\s*string\[\])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 9: Missing comma in array elements
            content = re.sub(r'(\'[^\']+\')(\s*)(\n\s*\])', r'\1,\2\3', content)
            content = re.sub(r'(\"[^\"]+\")(\s*)(\n\s*\])', r'\1,\2\3', content)
            
            # Fix 10: Missing comma in object elements within arrays
            content = re.sub(r'(\{[^}]+\})(\s*)(\n\s*\])', r'\1,\2\3', content)
            
            # Fix 11: Missing comma in status objects
            content = re.sub(r'(status:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*latency:)', r'\1,\2\3', content)
            content = re.sub(r'(latency:\s*\d+)(\s*)(\n\s*uptime:)', r'\1,\2\3', content)
            content = re.sub(r'(uptime:\s*[\d.]+)(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 12: Missing comma in label objects
            content = re.sub(r'(label:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*value:)', r'\1,\2\3', content)
            content = re.sub(r'(value:\s*[^,\n]+)(\s*)(\n\s*status:)', r'\1,\2\3', content)
            content = re.sub(r'(status:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            # Fix 13: Missing comma in metric objects
            content = re.sub(r'(id:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*name:)', r'\1,\2\3', content)
            content = re.sub(r'(name:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*value:)', r'\1,\2\3', content)
            content = re.sub(r'(value:\s*[^,\n]+)(\s*)(\n\s*unit:)', r'\1,\2\3', content)
            content = re.sub(r'(unit:\s*[\'"][^\'"]+[\'"])(\s*)(\n\s*})', r'\1,\2\3', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixes_applied += 1
                print(f"✅ Fixed {os.path.relpath(file_path, project_root)}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print("=" * 60)
    print(f"✅ Targeted fix completed! Applied fixes to {fixes_applied} files")

if __name__ == "__main__":
    targeted_fix_errors()
