# UX Components Usage Guide

Complete guide for using the production-ready UX components.

## 🎯 Components Overview

1. **ErrorBoundary** - Catches React errors globally
2. **Toast** - User feedback notifications
3. **LoadingSpinner** - Loading states
4. **EmptyState** - No data placeholders
5. **Error Pages** - 404 and error fallbacks

---

## 🛡️ ErrorBoundary

### Already Integrated!
The ErrorBoundary wraps the entire app in `layout.tsx` - no additional setup needed.

### Custom Error Boundaries
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

---

## 🔔 Toast Notifications

### Usage
```tsx
'use client'

import { useToast } from '@/components/Toast'

export function MyComponent() {
  const toast = useToast()
  
  const handleSuccess = () => {
    toast.success('Task created successfully!')
  }
  
  const handleError = () => {
    toast.error('Failed to save task')
  }
  
  const handleInfo = () => {
    toast.info('Your trial expires in 3 days')
  }
  
  const handleWarning = () => {
    toast.warning('This action cannot be undone')
  }
  
  return (
    <button onClick={handleSuccess}>
      Save Task
    </button>
  )
}
```

### Custom Duration
```tsx
// Default: 5000ms (5 seconds)
toast.success('Saved!', 3000) // 3 seconds
toast.error('Failed!', 0) // Never auto-dismiss
```

---

## ⏳ Loading States

### Full Screen Loading
```tsx
import { LoadingSpinner } from '@/components/LoadingSpinner'

<LoadingSpinner fullScreen text="Loading your data..." />
```

### Inline Loading
```tsx
<LoadingSpinner size="md" text="Processing..." />
```

### Sizes
- `sm` - 16px (small buttons)
- `md` - 32px (default)
- `lg` - 48px (cards)
- `xl` - 64px (full screen)

### Loading Skeletons
```tsx
import { LoadingSkeleton, CardSkeleton } from '@/components/LoadingSpinner'

// Single skeleton
<LoadingSkeleton width="w-full" height="h-4" />

// Card skeleton
<CardSkeleton />
```

---

## 📭 Empty State

### Basic Usage
```tsx
import { EmptyState } from '@/components/EmptyState'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={Inbox}
  title="No tasks yet"
  description="Create your first task to get started"
  action={{
    label: 'Create Task',
    onClick: () => openCreateModal()
  }}
/>
```

### Without Action
```tsx
<EmptyState
  icon={Search}
  title="No results found"
  description="Try adjusting your search filters"
/>
```

---

## 🚨 Error Pages

### 404 Page
Already created at `/src/app/not-found.tsx`
- Automatically shown for non-existent routes
- Custom design with helpful links

### Global Error Page
Already created at `/src/app/error.tsx`
- Catches unhandled errors in app routes
- Shows error details in development
- "Try Again" button to retry

---

## 📦 Complete Example

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/Toast'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { EmptyState } from '@/components/EmptyState'
import { Inbox } from 'lucide-react'

export function TaskList() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to load tasks')
      const data = await response.json()
      setTasks(data)
      toast.success('Tasks loaded!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    try {
      await fetch('/api/tasks', { method: 'POST', ... })
      toast.success('Task created!')
      loadTasks()
    } catch (err) {
      toast.error('Failed to create task')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading tasks..." />
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load tasks"
        description={error}
        action={{ label: 'Try Again', onClick: loadTasks }}
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No tasks yet"
        description="Create your first task to get started"
        action={{ label: 'Create Task', onClick: createTask }}
      />
    )
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
```

---

## 🎨 Styling

All components support dark mode automatically via Tailwind's `dark:` classes.

### Custom Colors
Toast colors are pre-defined:
- Success: Green
- Error: Red  
- Info: Blue
- Warning: Yellow

### Accessibility
All components include:
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

---

## 🚀 Best Practices

1. **Always use toast for user feedback**
   - Success: "Task created", "Saved successfully"
   - Error: "Failed to save", "Network error"
   - Info: "Trial expires soon", "New features available"
   - Warning: "Unsaved changes", "Cannot undo"

2. **Use loading states for async operations**
   - Show spinner immediately
   - Display helpful text
   - Don't block UI unnecessarily

3. **Empty states should be actionable**
   - Always provide next step
   - Make it easy to get started
   - Use friendly, encouraging copy

4. **Error boundaries for critical sections**
   - Wrap complex features
   - Provide custom fallback UI
   - Log errors for debugging

---

## 📝 Summary

✅ **Error Boundary** - Wraps entire app  
✅ **Toast Provider** - Available via `useToast()` hook  
✅ **Loading Components** - Multiple options for loading states  
✅ **Empty States** - Beautiful placeholders  
✅ **Error Pages** - 404 and global error handling  

**Everything is production-ready and integrated!**

