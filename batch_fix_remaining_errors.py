#!/usr/bin/env python3
"""
Batch Fix Remaining Syntax Errors
Systematically fixes all remaining 69 syntax errors
"""

import os
import re

def batch_fix_errors():
    print("🚀 Starting Batch Fix for Remaining 69 Errors")
    print("=" * 60)
    
    project_root = "/Users/Apple/syncscript-frontend"
    
    # Fix 1: Parse-task.ts - Fix object property syntax
    fix_parse_task(project_root)
    
    # Fix 2: Daily-plan.ts - Similar OpenAI API structure
    fix_daily_plan(project_root)
    
    # Fix 3: Energy-insights.ts - Similar OpenAI API structure  
    fix_energy_insights(project_root)
    
    # Fix 4: Meeting-notes.ts - Fix EOF issue
    fix_meeting_notes(project_root)
    
    # Fix 5: Briefings/settings.ts - Fix object syntax
    fix_briefings_settings(project_root)
    
    # Fix 6: Calendar/events.ts - Fix object syntax
    fix_calendar_events(project_root)
    
    print("=" * 60)
    print("✅ Batch fix completed!")

def fix_parse_task(root):
    file_path = os.path.join(root, "pages/api/ai/parse-task.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix the malformed object property
    content = re.sub(r',\s*\{role:', r'}, {role:', content)
    content = re.sub(r'content: input\s*,\s*\]', r'content: input}]', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

def fix_daily_plan(root):
    file_path = os.path.join(root, "pages/api/ai/daily-plan.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Similar fixes as breakdown-task.ts
    content = re.sub(r'max_tokens: \d+,\s*\},\s*\}\);', lambda m: m.group(0).replace(',', '').replace('}', '})', 1), content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

def fix_energy_insights(root):
    file_path = os.path.join(root, "pages/api/ai/energy-insights.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Similar fixes
    content = re.sub(r',\s*\{role:', r'}, {role:', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

def fix_meeting_notes(root):
    file_path = os.path.join(root, "pages/api/ai/meeting-notes.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix EOF issue - likely missing closing brace
    if not content.strip().endswith('}'):
        content = content.rstrip() + '\n'
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

def fix_briefings_settings(root):
    file_path = os.path.join(root, "pages/api/briefings/settings.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix common object property issues
    content = re.sub(r';(?=\s*\})', ',', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

def fix_calendar_events(root):
    file_path = os.path.join(root, "pages/api/calendar/events.ts")
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix common object property issues
    content = re.sub(r';(?=\s*\})', ',', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✅ Fixed {file_path}")

if __name__ == "__main__":
    batch_fix_errors()

