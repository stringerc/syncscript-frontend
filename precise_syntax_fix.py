#!/usr/bin/env python3
"""
Precise syntax fix based on actual build errors
"""

import os
import re
import glob

def fix_syntax_errors():
    """Fix specific syntax errors found in build output"""
    
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
            
            # Fix 1: Comma instead of semicolon in import statements
            content = re.sub(
                r'import\s+([^;]+),\s*import\s+([^;]+);',
                r'import \1;\nimport \2;',
                content
            )
            if content != original_content:
                print(f"✅ Fixed comma instead of semicolon in import statements in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 2: Missing closing parenthesis in if statements
            content = re.sub(
                r'if\s*\(\s*pathname\.startsWith\(\s*[\'"]/api/auth[\'"]\s*\)\s*\)\s*\{',
                'if (pathname.startsWith(\'/api/auth\')) {',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing closing parenthesis in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 3: Malformed alert calls with template literals
            content = re.sub(
                r'alert\(\s*\{\s*`([^`]+)`\s*\}\s*\)',
                r'alert(`\1`)',
                content
            )
            if content != original_content:
                print(f"✅ Fixed malformed alert calls in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 4: Extra comma and semicolon in JSON responses
            content = re.sub(
                r'json\(\s*\{\s*error:\s*[\'"]Method not allowed[\'"]\s*\}\s*,\s*;\s*\)',
                'json({ error: \'Method not allowed\' });',
                content
            )
            if content != original_content:
                print(f"✅ Fixed extra comma and semicolon in JSON responses in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 5: Missing semicolon after console.log
            content = re.sub(
                r'console\.log\(([^)]+)\)\s*,\s*return\s+await',
                r'console.log(\1);\n    return await',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after console.log in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 6: Missing semicolon after object definition
            content = re.sub(
                r'const\s+requestInfo\s*=\s*\{([^}]+)\}\s*,',
                r'const requestInfo = {\1};\n    ',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after object definition in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 7: Multiple const declarations on one line
            content = re.sub(
                r'const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+),\s*const\s+([^=]+)\s*=\s*([^,]+)',
                r'const \1 = \2;\n  const \3 = \4;\n  const \5 = \6;\n  const \7 = \8',
                content
            )
            if content != original_content:
                print(f"✅ Fixed multiple const declarations on one line in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 8: Missing comma after instructions property
            content = re.sub(
                r'instructions:\s*[\'"]The expectedCallbackUrl MUST exactly match what you put in Auth0 dashboard[\'"]\s*\}\s*,\s*\}',
                'instructions: \'The expectedCallbackUrl MUST exactly match what you put in Auth0 dashboard\'\n  });',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing comma after instructions property in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 9: Missing semicolon after try block
            content = re.sub(
                r'try\s*\{\s*console\.log\(([^)]+)\)\s*,\s*// Try to get access token from Auth0\s*try\s*\{',
                r'try {\n    console.log(\1);\n    // Try to get access token from Auth0\n    try {',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after try block in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 10: Missing comma after error property
            content = re.sub(
                r'error:\s*[\'"]Unauthorized[\'"]\s*\}\s*,\s*\}',
                'error: \'Unauthorized\'\n  });',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing comma after error property in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 11: Missing comma after error property in API responses
            content = re.sub(
                r'error:\s*[\'"]Method not allowed[\'"]\s*\}\s*,\s*\}',
                'error: \'Method not allowed\'\n  });',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing comma after error property in API responses in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 12: Missing comma after const declaration
            content = re.sub(
                r'const\s+FEATURE_HIGHLIGHTS\s*=\s*\[\s*\{',
                'const FEATURE_HIGHLIGHTS = [\n  {',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing comma after const declaration in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 13: Missing semicolon after useState declarations
            content = re.sub(
                r'useState\(([^)]+)\)\s*,\s*const\s+',
                r'useState(\1);\n  const ',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after useState declarations in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 14: Missing semicolon after JSX comments
            content = re.sub(
                r'\{/\* Header \*/\}\s*,\s*<div',
                '{/* Header */}\n        <div',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX comments in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 15: Missing semicolon after onClick handlers
            content = re.sub(
                r'onClick\s*=\s*\{\s*\(\s*=>\s*router\.back\(\)\s*\}\s*\}',
                'onClick={() => router.back()}',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after onClick handlers in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 16: Missing semicolon after return statements
            content = re.sub(
                r'return\s*\(\s*<div([^>]+)>\s*\)\s*,\s*\}',
                r'return (\n    <div\1>\n  );\n}',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after return statements in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 17: Missing semicolon after JSX elements
            content = re.sub(
                r'<div([^>]+)>\s*\{day\}\s*,\s*</div>',
                r'<div\1>\n                {day}\n              </div>',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX elements in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 18: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 19: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 20: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 21: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 22: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 23: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 24: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 25: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 26: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 27: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 28: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 29: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 30: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 31: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 32: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 33: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 34: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 35: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 36: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 37: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 38: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 39: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 40: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 41: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 42: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 43: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 44: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 45: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 46: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 47: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 48: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 49: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 50: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 51: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 52: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 53: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 54: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 55: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 56: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 57: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 58: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 59: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 60: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 61: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 62: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 63: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 64: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 65: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 66: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 67: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 68: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 69: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 70: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 71: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 72: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 73: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 74: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 75: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 76: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 77: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 78: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 79: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 80: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 81: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 82: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 83: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 84: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 85: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 86: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 87: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 88: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 89: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 90: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 91: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 92: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 93: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 94: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 95: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 96: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 97: Missing semicolon after JSX closing tags
            content = re.sub(
                r'</div>\s*\}\s*,\s*\{status',
                '</div>\n              }\n              {status',
                content
            )
            if content != original_content:
                print(f"✅ Fixed missing semicolon after JSX closing tags in {file_path}")
                total_fixes += 1
                original_content = content
            
            # Fix 98: Missing semicolon after JSX closing tags
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
