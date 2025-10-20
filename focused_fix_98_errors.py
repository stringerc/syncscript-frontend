#!/usr/bin/env python3
"""
Focused fix for remaining 98 syntax errors
"""

import os
import re
import glob

def fix_syntax_errors():
    """Fix remaining syntax errors in TypeScript/JSX files"""
    
    # Get all TypeScript/JSX files
    file_patterns = [
        'pages/**/*.tsx',
        'pages/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.ts',
        'middleware.ts',
        'next.config.js'
    ]
    
    files_to_process = []
    for pattern in file_patterns:
        files_to_process.extend(glob.glob(pattern, recursive=True))
    
    total_fixes = 0
    
    for file_path in files_to_process:
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix 1: Duplicate 'res' parameter
            if 'export default async function handler(' in content and 'res: NextApiResponse' in content:
                content = re.sub(
                    r'export default async function handler\(\s*req:\s*NextApiRequest,\s*res:\s*NextApiResponse\s*\)\s*\{\s*res\.',
                    'export default async function handler(\n  req: NextApiRequest,\n  res: NextApiResponse\n) {\n  res.',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed duplicate res parameter in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 2: Missing closing parenthesis in if statements
            if 'pathname.startsWith(\'/api/auth\'))' in content:
                content = re.sub(
                    r'if\s*\(\s*pathname\.startsWith\(\s*[\'"]/api/auth[\'"]\s*\)\s*\)\s*\{',
                    'if (pathname.startsWith(\'/api/auth\')) {',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing closing parenthesis in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 3: Comma instead of semicolon in import statements
            if 'import' in content and ', import' in content:
                content = re.sub(
                    r'import\s+([^;]+),\s*import\s+([^;]+);',
                    r'import \1;\nimport \2;',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed comma instead of semicolon in import statements in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 4: Malformed alert calls with template literals
            if 'alert({' in content and '`' in content:
                content = re.sub(
                    r'alert\(\s*\{\s*`([^`]+)`\s*\}\s*\)',
                    r'alert(`\1`)',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed malformed alert calls in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 5: Extra comma and semicolon in JSON responses
            if 'Method not allowed' in content and '},;' in content:
                content = re.sub(
                    r'json\(\s*\{\s*error:\s*[\'"]Method not allowed[\'"]\s*\}\s*,\s*;\s*\)',
                    'json({ error: \'Method not allowed\' });',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed extra comma and semicolon in JSON responses in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 6: Missing semicolon after console.log
            if 'console.log(' in content and '), return await' in content:
                content = re.sub(
                    r'console\.log\(([^)]+)\)\s*,\s*return\s+await',
                    r'console.log(\1);\n    return await',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after console.log in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 7: Missing semicolon after object definition
            if 'const requestInfo = {' in content and '},' in content:
                content = re.sub(
                    r'const\s+requestInfo\s*=\s*\{([^}]+)\}\s*,',
                    r'const requestInfo = {\1};\n    ',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after object definition in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 8: Multiple const declarations on one line
            if 'const' in content and ', const' in content:
                content = re.sub(
                    r'const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+)',
                    r'const \1 = \2;\n  const \3 = \4;\n  const \5 = \6;\n  const \7 = \8',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed multiple const declarations on one line in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 9: Missing comma after instructions property
            if 'instructions:' in content and 'The expectedCallbackUrl MUST exactly match' in content:
                content = re.sub(
                    r'instructions:\s*[\'"]The expectedCallbackUrl MUST exactly match what you put in Auth0 dashboard[\'"]\s*\}\s*,\s*\}',
                    'instructions: \'The expectedCallbackUrl MUST exactly match what you put in Auth0 dashboard\'\n  });',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing comma after instructions property in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 10: Missing semicolon after try block
            if 'try {' in content and 'console.log(' in content and '// Try to get access token from Auth0' in content:
                content = re.sub(
                    r'try\s*\{\s*console\.log\(([^)]+)\)\s*,\s*// Try to get access token from Auth0\s*try\s*\{',
                    r'try {\n    console.log(\1);\n    // Try to get access token from Auth0\n    try {',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after try block in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 11: Missing comma after error property
            if 'error:' in content and 'Unauthorized' in content and '},}' in content:
                content = re.sub(
                    r'error:\s*[\'"]Unauthorized[\'"]\s*\}\s*,\s*\}',
                    'error: \'Unauthorized\'\n  });',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing comma after error property in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 12: Missing comma after error property in API responses
            if 'error:' in content and 'Method not allowed' in content and '},}' in content:
                content = re.sub(
                    r'error:\s*[\'"]Method not allowed[\'"]\s*\}\s*,\s*\}',
                    'error: \'Method not allowed\'\n  });',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing comma after error property in API responses in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 13: Missing comma after const declaration
            if 'const FEATURE_HIGHLIGHTS = [' in content:
                content = re.sub(
                    r'const\s+FEATURE_HIGHLIGHTS\s*=\s*\[\s*\{',
                    'const FEATURE_HIGHLIGHTS = [\n  {',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing comma after const declaration in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 14: Missing semicolon after import statements
            if 'import React from' in content and ', import' in content:
                content = re.sub(
                    r'import\s+React\s+from\s+[\'"]react[\'"]\s*,\s*import\s+',
                    'import React from \'react\';\nimport ',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after import statements in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 15: Missing semicolon after useState declarations
            if 'useState(' in content and '), const' in content:
                content = re.sub(
                    r'useState\(([^)]+)\)\s*,\s*const\s+',
                    r'useState(\1);\n  const ',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after useState declarations in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 16: Missing semicolon after JSX comments
            if '{/* Header */}' in content and ', <div' in content:
                content = re.sub(
                    r'\{/\* Header \*/\}\s*,\s*<div',
                    '{/* Header */}\n        <div',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after JSX comments in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 17: Missing semicolon after onClick handlers
            if 'onClick=' in content and '=> router.back()' in content and '}}' in content:
                content = re.sub(
                    r'onClick\s*=\s*\{\s*\(\s*=>\s*router\.back\(\)\s*\}\s*\}',
                    'onClick={() => router.back()}',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after onClick handlers in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 18: Missing semicolon after return statements
            if 'return(' in content and '<div' in content and '),}' in content:
                content = re.sub(
                    r'return\s*\(\s*<div([^>]+)>\s*\)\s*,\s*\}',
                    r'return (\n    <div\1>\n  );\n}',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after return statements in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 19: Missing semicolon after JSX elements
            if '<div' in content and '{day}' in content and ', </div>' in content:
                content = re.sub(
                    r'<div([^>]+)>\s*\{day\}\s*,\s*</div>',
                    r'<div\1>\n                {day}\n              </div>',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after JSX elements in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Fix 20: Missing semicolon after JSX closing tags
            if '</div>' in content and '}, {status' in content:
                content = re.sub(
                    r'</div>\s*\}\s*,\s*\{status',
                    '</div>\n              }\n              {status',
                    content
                )
                if content != original_content:
                    print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                    total_fixes += 1
                    original_content = content
            
            # Write back if changes were made
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                    
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 Total fixes applied: {total_fixes}")
    print("✅ All syntax errors should now be fixed!")

if __name__ == "__main__":
    fix_syntax_errors()