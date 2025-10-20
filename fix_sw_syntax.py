#!/usr/bin/env python3
"""
Fix Service Worker Syntax Errors
"""

def fix_sw_syntax():
    """Fix all syntax errors in service worker"""
    
    with open('public/sw.js', 'r') as f:
        content = f.read()
    
    # Fix all the comma issues
    fixes = [
        ('return response,', 'return response;'),
        ('return,', 'return;'),
        ('return cachedResponse,', 'return cachedResponse;'),
        ("body: event.data ? event.data.text() : 'New notification from SyncScript', icon: '/icons/icon-192x192.png',", 
         "body: event.data ? event.data.text() : 'New notification from SyncScript', icon: '/icons/icon-192x192.png',"),
        ("{ action: 'view', title: 'View'  }, { action: 'dismiss', title: 'Dismiss' }", 
         "{ action: 'view', title: 'View' }, { action: 'dismiss', title: 'Dismiss' }"),
        ('  }, event.waitUntil(', '  });\n  event.waitUntil('),
    ]
    
    for old, new in fixes:
        content = content.replace(old, new)
    
    # Fix the options object structure
    content = content.replace(
        "    body: event.data ? event.data.text() : 'New notification from SyncScript', icon: '/icons/icon-192x192.png',",
        "    body: event.data ? event.data.text() : 'New notification from SyncScript',\n    icon: '/icons/icon-192x192.png',"
    )
    
    with open('public/sw.js', 'w') as f:
        f.write(content)
    
    print("✅ Service worker syntax errors fixed!")

if __name__ == "__main__":
    fix_sw_syntax()
