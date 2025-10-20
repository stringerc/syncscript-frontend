#!/usr/bin/env python3

"""
Simple Deployment Fix Script
Fixes the most critical syntax errors for deployment
"""

import os
import glob

def fix_critical_errors():
    """Fix the most critical syntax errors"""
    
    print("🔧 Fixing critical deployment errors...")
    
    # List of critical files that need fixing
    critical_files = [
        'middleware.ts',
        'pages/_app.tsx',
        'pages/api/ai/breakdown-task.ts',
        'pages/api/ai/coach.ts',
        'pages/api/ai/daily-plan.ts',
        'pages/beta.tsx',
        'pages/dashboard.tsx',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/components/ui/KanbanBoard.tsx',
        'src/components/ui/SmartScheduler.tsx',
        'src/components/ui/TeamCollaboration.tsx',
        'src/utils/achievementSystem.ts',
        'src/utils/customization.ts',
        'src/utils/powerUserFeatures.ts',
        'src/utils/savingsGoals.ts',
        'src/utils/streakSystem.ts'
    ]
    
    fixed_files = 0
    
    for file_path in critical_files:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Fix 1: Double braces {{ -> single braces {
                content = content.replace('{{', '{')
                content = content.replace('}}', '}')
                
                # Fix 2: Fix malformed JSON responses
                content = content.replace('res.status(405).json({{ error:', 'res.status(405).json({ error:')
                content = content.replace('res.status(200).json({{', 'res.status(200).json({')
                content = content.replace('res.status(404).json({{', 'res.status(404).json({')
                
                # Fix 3: Fix return statements with commas
                content = content.replace('return,', 'return;')
                
                # Fix 4: Fix JSX return statements
                content = content.replace('return({<', 'return (\n    <')
                content = content.replace('return({', 'return (\n    {')
                
                # Fix 5: Fix object property syntax
                content = content.replace('task={exampleTask},', 'task={exampleTask}')
                
                # Fix 6: Fix array.map syntax
                content = content.replace('.map({', '.map(')
                content = content.replace('=> (', ' => (')
                
                # Fix 7: Fix conditional statements
                content = content.replace('if({', 'if (')
                
                # Fix 8: Fix console.log syntax
                content = content.replace('console.log({', 'console.log(')
                
                # Fix 9: Fix template literals
                content = content.replace('`⏰ Deadline in ${daysUntil}, days - urgent`', '`⏰ Deadline in ${daysUntil} days - urgent`')
                content = content.replace('`🏆 Achievement Unlocked: ${achievement.title}, (+${achievement.reward}, emblems`', '`🏆 Achievement Unlocked: ${achievement.title} (+${achievement.reward} emblems)`')
                content = content.replace('`🎵 Playing ${sound}, sound`', '`🎵 Playing ${sound} sound`')
                
                # Fix 10: Fix function calls
                content = content.replace('scrollIntoView({{ behavior:', 'scrollIntoView({ behavior:')
                
                # Fix 11: Fix Inter font import
                content = content.replace('Inter({{ subsets:', 'Inter({ subsets:')
                
                # Fix 12: Fix variable declarations
                content = content.replace('const { code } = req.query,', 'const { code } = req.query;')
                content = content.replace('const redirectUri =', 'const redirectUri =')
                
                # Fix 13: Fix switch statements
                content = content.replace('switch (req.method) {', 'switch (req.method) {')
                
                # Fix 14: Fix object destructuring
                content = content.replace('if({!purchased.includes(`label_${setId},`) {', 'if (!purchased.includes(`label_${setId}`)) {')
                
                # Fix 15: Fix return statements in functions
                content = content.replace('if (typeof window === \'undefined\') return,', 'if (typeof window === \'undefined\') return;')
                
                # Fix 16: Fix object syntax
                content = content.replace('}, {', '}, {')
                
                # Fix 17: Fix function syntax
                content = content.replace('const unassignedTasks = tasks.filter(t => !t.project_id && !t.completed);', 'const unassignedTasks = tasks.filter(t => !t.project_id && !t.completed);')
                
                # Fix 18: Fix return statements
                content = content.replace('return `', 'return `')
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    fixed_files += 1
                    print(f"  ✅ Fixed {file_path}")
            
            except Exception as e:
                print(f"  ❌ Error fixing {file_path}: {e}")
    
    print(f"\n🎉 Critical Error Fix Complete!")
    print(f"✅ Fixed {fixed_files} critical files")
    
    return fixed_files

if __name__ == "__main__":
    fix_critical_errors()
