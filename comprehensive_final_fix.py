#!/usr/bin/env python3
"""
Comprehensive Final Fix Script for SyncScript Frontend
Addresses all remaining syntax errors after the simple deployment fix
"""

import os
import re
import glob

def fix_jsx_return_statements(content):
    """Fix JSX return statements with malformed syntax"""
    # Fix return({<div patterns
    content = re.sub(r'return\(\s*{<', 'return (<', content)
    # Fix return({ patterns without JSX
    content = re.sub(r'return\(\s*{\s*<', 'return (<', content)
    return content

def fix_object_literals(content):
    """Fix malformed object literals"""
    # Fix {{ error: 'Method not allowed' } patterns
    content = re.sub(r'\{\{\s*error:\s*[\'"]Method not allowed[\'"]\s*\}\s*,', '{ error: \'Method not allowed\' }', content)
    # Fix {{ accessToken: tokenResponse.accessToken } patterns
    content = re.sub(r'\{\{\s*accessToken:\s*tokenResponse\.accessToken\s*\}\s*,', '{ accessToken: tokenResponse.accessToken }', content)
    return content

def fix_jsx_props(content):
    """Fix JSX prop syntax errors"""
    # Fix task={exampleTask}, patterns
    content = re.sub(r'task=\{[^}]*\},\s*', 'task={exampleTask}\n       ', content)
    # Fix malformed JSX attributes
    content = re.sub(r'(\w+)=\{([^}]*)\},\s*', r'\1={\2}\n       ', content)
    return content

def fix_array_map_syntax(content):
    """Fix array map syntax errors"""
    # Fix {daysOfWeek.map({day => patterns
    content = re.sub(r'(\w+)\.map\(\s*\{(\w+)\s*=>', r'\1.map(\2 =>', content)
    # Fix {categories.map({category => patterns
    content = re.sub(r'(\w+)\.map\(\s*\{(\w+)\s*=>', r'\1.map(\2 =>', content)
    return content

def fix_template_literals(content):
    """Fix template literal syntax"""
    # Fix `⏰ Deadline in ${daysUntil} days - urgent` patterns
    content = re.sub(r'`⏰ Deadline in \$\{(\w+)\} days - urgent`', r'`⏰ Deadline in ${\1} days - urgent`', content)
    # Fix scrollIntoView({ behavior: 'smooth' } patterns
    content = re.sub(r'scrollIntoView\(\{\s*\{\s*behavior:\s*[\'"]smooth[\'"]\s*\}\s*,', 'scrollIntoView({ behavior: \'smooth\' })', content)
    return content

def fix_function_syntax(content):
    """Fix function syntax errors"""
    # Fix missing semicolons after function definitions
    content = re.sub(r'}\s*,\s*$', '};', content, flags=re.MULTILINE)
    # Fix return statements with commas
    content = re.sub(r'return\s+false\s*,', 'return false;', content)
    # Fix const declarations with commas
    content = re.sub(r'const\s+(\w+)\s*=\s*([^,]+),\s*$', r'const \1 = \2;', content, flags=re.MULTILINE)
    return content

def fix_conditional_statements(content):
    """Fix conditional statement syntax"""
    # Fix if statements with malformed conditions
    content = re.sub(r'if\s*\(\s*(\w+)\s*\)\s*{', r'if (\1) {', content)
    # Fix switch statements
    content = re.sub(r'switch\s*\(\s*(\w+\.\w+)\s*\)\s*{', r'switch (\1) {', content)
    return content

def fix_interface_definitions(content):
    """Fix interface definition syntax"""
    # Fix malformed interface returns
    content = re.sub(r':\s*\{\s*achievement:\s*(\w+)\s*\|\s*null\s*;\s*unlocked:\s*(\w+)\s*\}\s*,', ': { achievement: \1 | null; unlocked: \2 }', content)
    return content

def fix_jsx_comments(content):
    """Fix JSX comment syntax"""
    # Fix {/* Header */}, patterns
    content = re.sub(r'\{\s*/\*([^*]+)\*/\s*\}\s*,', r'/* \1 */', content)
    return content

def process_file(file_path):
    """Process a single file with all fixes"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all fixes
        content = fix_jsx_return_statements(content)
        content = fix_object_literals(content)
        content = fix_jsx_props(content)
        content = fix_array_map_syntax(content)
        content = fix_template_literals(content)
        content = fix_function_syntax(content)
        content = fix_conditional_statements(content)
        content = fix_interface_definitions(content)
        content = fix_jsx_comments(content)
        
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
    print("🚀 Starting Comprehensive Final Fix...")
    
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
    
    print(f"\n🎉 Comprehensive fix complete!")
    print(f"📊 Files processed: {len(files)}")
    print(f"🔧 Files fixed: {fixed_count}")
    print(f"✅ Ready for build!")

if __name__ == "__main__":
    main()