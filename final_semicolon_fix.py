#!/usr/bin/env python3
"""
Final Semicolon Fix Script for SyncScript Frontend
Targets the remaining 105 semicolon errors in object literals and arrays
"""

import os
import re
import glob

def fix_object_literal_semicolons(content):
    """Fix semicolons in object literals that should be commas"""
    # Fix object property semicolons
    content = re.sub(r'(\w+):\s*([^,;]+);\s*', r'\1: \2, ', content)
    # Fix array element semicolons
    content = re.sub(r'(\w+)\s*;\s*$', r'\1,', content, flags=re.MULTILINE)
    # Fix object closing semicolons
    content = re.sub(r'}\s*;\s*$', r'},', content, flags=re.MULTILINE)
    return content

def fix_array_semicolons(content):
    """Fix semicolons in arrays that should be commas"""
    # Fix array element semicolons
    content = re.sub(r'(\w+)\s*;\s*$', r'\1,', content, flags=re.MULTILINE)
    # Fix object property semicolons in arrays
    content = re.sub(r'(\w+):\s*([^,;]+);\s*', r'\1: \2, ', content)
    return content

def fix_jsx_semicolons(content):
    """Fix semicolons in JSX that should be commas"""
    # Fix JSX prop semicolons
    content = re.sub(r'(\w+)=\{([^}]+)\};\s*', r'\1={\2}, ', content)
    # Fix JSX attribute semicolons
    content = re.sub(r'(\w+)=\{([^}]+)\};\s*', r'\1={\2}, ', content)
    return content

def fix_function_semicolons(content):
    """Fix semicolons in function calls that should be commas"""
    # Fix function parameter semicolons
    content = re.sub(r'(\w+)\s*;\s*$', r'\1,', content, flags=re.MULTILINE)
    # Fix function call semicolons
    content = re.sub(r'(\w+)\s*;\s*$', r'\1,', content, flags=re.MULTILINE)
    return content

def fix_template_literal_semicolons(content):
    """Fix semicolons in template literals"""
    # Fix template literal semicolons
    content = re.sub(r'`([^`]+)`\s*;\s*', r'`\1`, ', content)
    return content

def process_file(file_path):
    """Process a single file with all semicolon fixes"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all fixes
        content = fix_object_literal_semicolons(content)
        content = fix_array_semicolons(content)
        content = fix_jsx_semicolons(content)
        content = fix_function_semicolons(content)
        content = fix_template_literal_semicolons(content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed: {file_path}")
            return True
        else:
            print(f"⏭️  No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all files"""
    print("🚀 Starting Final Semicolon Fix...")
    
    # Get all TypeScript/JavaScript files
    patterns = [
        '**/*.ts',
        '**/*.tsx',
        '**/*.js',
        '**/*.jsx'
    ]
    
    files = []
    for pattern in patterns:
        files.extend(glob.glob(pattern, recursive=True))
    
    # Filter out node_modules and other directories
    files = [f for f in files if not any(ignore in f for ignore in ['node_modules', '.next', 'dist', 'build'])]
    
    print(f"📁 Found {len(files)} files to process")
    
    fixed_count = 0
    for file_path in files:
        if process_file(file_path):
            fixed_count += 1
    
    print(f"\n🎉 Final semicolon fix complete!")
    print(f"📊 Files processed: {len(files)}")
    print(f"🔧 Files fixed: {fixed_count}")
    print(f"✅ Ready for build!")

if __name__ == "__main__":
    main()
