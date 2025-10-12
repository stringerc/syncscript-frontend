/**
 * Undo/Redo System
 * Allows users to reverse destructive actions (M15)
 */

export interface Action {
  id: string
  type: string
  description: string
  timestamp: Date
  undo: () => void | Promise<void>
  redo: () => void | Promise<void>
  data?: Record<string, unknown>
}

export class UndoRedoManager {
  private undoStack: Action[] = []
  private redoStack: Action[] = []
  private maxStackSize: number = 50
  private listeners: Array<(state: UndoRedoState) => void> = []

  // Execute an action and add to undo stack
  async execute(action: Omit<Action, 'id' | 'timestamp'>): Promise<void> {
    const fullAction: Action = {
      ...action,
      id: this.generateId(),
      timestamp: new Date()
    }

    // Execute the redo (initial action)
    await fullAction.redo()

    // Add to undo stack
    this.undoStack.push(fullAction)
    
    // Clear redo stack (new action invalidates redo history)
    this.redoStack = []

    // Limit stack size
    if (this.undoStack.length > this.maxStackSize) {
      this.undoStack.shift()
    }

    this.notifyListeners()
    this.saveToStorage()
  }

  // Undo last action
  async undo(): Promise<boolean> {
    if (!this.canUndo()) return false

    const action = this.undoStack.pop()!
    await action.undo()

    this.redoStack.push(action)
    this.notifyListeners()
    this.saveToStorage()

    return true
  }

  // Redo last undone action
  async redo(): Promise<boolean> {
    if (!this.canRedo()) return false

    const action = this.redoStack.pop()!
    await action.redo()

    this.undoStack.push(action)
    this.notifyListeners()
    this.saveToStorage()

    return true
  }

  canUndo(): boolean {
    return this.undoStack.length > 0
  }

  canRedo(): boolean {
    return this.redoStack.length > 0
  }

  getLastUndoAction(): Action | null {
    return this.undoStack[this.undoStack.length - 1] || null
  }

  getLastRedoAction(): Action | null {
    return this.redoStack[this.redoStack.length - 1] || null
  }

  clear(): void {
    this.undoStack = []
    this.redoStack = []
    this.notifyListeners()
    this.saveToStorage()
  }

  getState(): UndoRedoState {
    return {
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      undoCount: this.undoStack.length,
      redoCount: this.redoStack.length,
      lastUndoAction: this.getLastUndoAction(),
      lastRedoAction: this.getLastRedoAction()
    }
  }

  // Subscribe to state changes
  subscribe(listener: (state: UndoRedoState) => void): () => void {
    this.listeners.push(listener)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(): void {
    const state = this.getState()
    this.listeners.forEach(listener => listener(state))
  }

  private generateId(): string {
    return `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      // Only save metadata, not the actual undo/redo functions
      const serializable = {
        undoStack: this.undoStack.map(a => ({
          id: a.id,
          type: a.type,
          description: a.description,
          timestamp: a.timestamp,
          data: a.data
        })),
        redoStack: this.redoStack.map(a => ({
          id: a.id,
          type: a.type,
          description: a.description,
          timestamp: a.timestamp,
          data: a.data
        }))
      }
      
      localStorage.setItem('undo_redo_history', JSON.stringify(serializable))
    } catch (error) {
      console.error('Error saving undo/redo history:', error)
    }
  }
}

export interface UndoRedoState {
  canUndo: boolean
  canRedo: boolean
  undoCount: number
  redoCount: number
  lastUndoAction: Action | null
  lastRedoAction: Action | null
}

// Global instance
export const globalUndoRedo = new UndoRedoManager()

// Common action creators
export function createDeleteAction(
  item: { id: string; type: string },
  onRestore: () => void,
  onDelete: () => void
): Omit<Action, 'id' | 'timestamp'> {
  return {
    type: 'delete',
    description: `Deleted ${item.type}`,
    undo: onRestore,
    redo: onDelete,
    data: { itemId: item.id, itemType: item.type }
  }
}

export function createUpdateAction(
  item: { id: string; type: string },
  oldValue: unknown,
  newValue: unknown,
  onUpdate: (value: unknown) => void
): Omit<Action, 'id' | 'timestamp'> {
  return {
    type: 'update',
    description: `Updated ${item.type}`,
    undo: () => onUpdate(oldValue),
    redo: () => onUpdate(newValue),
    data: { itemId: item.id, oldValue, newValue }
  }
}

export function createBulkDeleteAction(
  items: Array<{ id: string; type: string }>,
  onRestore: () => void,
  onDelete: () => void
): Omit<Action, 'id' | 'timestamp'> {
  return {
    type: 'bulk-delete',
    description: `Deleted ${items.length} ${items[0]?.type}s`,
    undo: onRestore,
    redo: onDelete,
    data: { items }
  }
}

