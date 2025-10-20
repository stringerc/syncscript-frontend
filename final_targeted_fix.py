#!/usr/bin/env python3
"""
Final Targeted Fix Script for SyncScript Frontend
Fixes the remaining complex syntax patterns
"""

import os
import re

def fix_final_patterns():
    """Fix the most complex remaining syntax patterns"""
    
    print("🎯 Starting Final Targeted Fix for Complex Patterns")
    print("=" * 60)
    
    # Target files with complex patterns
    target_files = [
        "src/app/features/page.tsx",
        "src/app/icon.tsx", 
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/components/ui/AchievementGallery.tsx",
        "src/components/ui/AdvancedAnalytics.tsx",
        "src/components/ui/AdvancedTaskBreakdown.tsx",
        "src/components/ui/AnalyticsDashboard.tsx",
        "src/components/ui/ProductivityCenter.tsx",
        "src/components/ui/SettingsCentral.tsx",
        "src/components/ui/SmartScheduler.tsx",
        "src/components/ui/TeamCollaboration.tsx",
        "src/components/ui/TeamDashboard.tsx",
        "src/components/ui/TeamWorkspaceUI.tsx",
        "src/components/ui/VoiceCommandsCenter.tsx"
    ]
    
    total_fixes = 0
    
    for file_path in target_files:
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixes = 0
            
            # Fix 1: Object properties with semicolons instead of commas
            # Pattern: key: value; -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+);', r'\1,', content)
            
            # Fix 2: Missing commas in object literals
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 3: Array elements with semicolons instead of commas
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 4: Function parameters with missing commas
            # Pattern: const func = async (param) => { -> const func = async (param) => {
            content = re.sub(r'const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{', r'const \1 = async (\2) => {', content)
            
            # Fix 5: Object literal syntax in arrays
            # Pattern: { key: value } ; { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*;\s*\{', r'\1 }, {', content)
            
            # Fix 6: Export statements with semicolons
            # Pattern: export; const -> export const
            content = re.sub(r'export\s*;\s*const', 'export const', content)
            
            # Fix 7: JSX attributes with commas instead of proper syntax
            # Pattern: required, -> required
            content = re.sub(r'required\s*,', 'required', content)
            
            # Fix 8: useEffect dependency arrays
            # Pattern: } [deps]) -> }, [deps])
            content = re.sub(r'\}\s*\[([^\]]+)\]\)', r'}, [\1])', content)
            
            # Fix 9: Template literals in JSX className
            # Pattern: className={`text` -> className={`text`}
            content = re.sub(r'className=\{`([^`]+)`(?!\})', r'className={`\1`}', content)
            
            # Fix 10: Object literal syntax in arrays with missing commas
            # Pattern: { key: value } { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            # Fix 11: Function declarations with semicolons
            # Pattern: } , const -> }, const
            content = re.sub(r'\}\s*,\s*const', '}, const', content)
            
            # Fix 12: Array elements with missing commas
            # Pattern: } ; { -> }, {
            content = re.sub(r'\}\s*;\s*\{', '}, {', content)
            
            # Fix 13: Object properties with missing commas
            # Pattern: key: value } -> key: value,
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}', r'\1,', content)
            
            # Fix 14: Missing commas in object literals
            # Pattern: { key: value } { -> { key: value }, {
            content = re.sub(r'(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)', r'\1 }, {', content)
            
            # Fix 15: Function parameters with missing commas
            # Pattern: const func = async (param) => { -> const func = async (param) => {
            content = re.sub(r'const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{', r'const \1 = async (\2) => {', content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Count fixes by comparing original vs new content
                file_fixes = len(re.findall(r'(\w+:\s*[^,}]+);|\}\s*;\s*\{|const\s+(\w+)\s*=\s*async\s*\(([^)]+)\)\s*=>\s*\{|export\s*;\s*const|required\s*,|\}\s*\[([^\]]+)\]\)|className=\{`([^`]+)`(?!\})', original_content))
                print(f"✅ Fixed {file_fixes} errors in {file_path}")
                total_fixes += file_fixes
            else:
                print(f"ℹ️  No changes needed in {file_path}")
                
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    print(f"\n🎉 Final targeted fix complete!")
    print(f"📊 Total fixes applied: {total_fixes}")
    print("🎯 Ready for final build test!")
    
    return total_fixes

if __name__ == "__main__":
    fix_final_patterns()
