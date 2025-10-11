/**
 * Optimistic Update Hook
 * Blocker #8: Backend API Timeouts - Make UI feel instant
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

interface OptimisticUpdateOptions<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useOptimisticUpdate<T>() {
  const [isUpdating, setIsUpdating] = useState(false);

  const executeOptimistically = async <TInput, TResult extends { id?: string }>(
    items: T[],
    setItems: (items: T[]) => void,
    optimisticItem: T & { id: string },
    apiCall: (input: TInput) => Promise<TResult>,
    apiInput: TInput,
    options: OptimisticUpdateOptions<TResult> = {}
  ) => {
    // 1. Update UI immediately (optimistic)
    setItems([...items, optimisticItem as T]);
    setIsUpdating(true);

    try {
      // 2. Send to backend
      const result = await apiCall(apiInput);
      
      // 3. Replace temp item with real result
      setItems(items.map(item => {
        const itemWithId = item as unknown as { id: string };
        return itemWithId.id === optimisticItem.id ? (result as unknown as T) : item;
      }));
      
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      
      options.onSuccess?.(result);
    } catch (error) {
      // 4. Rollback on failure
      setItems(items.filter(item => {
        const itemWithId = item as unknown as { id: string };
        return itemWithId.id !== optimisticItem.id;
      }));
      
      const message = options.errorMessage || 'Failed to save. Tap to retry.';
      toast.error(message);
      
      options.onError?.(error as Error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { executeOptimistically, isUpdating };
}

/**
 * Usage Example:
 * 
 * const { executeOptimistically } = useOptimisticUpdate();
 * 
 * const handleCreateTask = async (taskData) => {
 *   await executeOptimistically(
 *     tasks,
 *     setTasks,
 *     { ...taskData, id: 'temp-' + Date.now(), optimistic: true },
 *     api.createTask,
 *     taskData,
 *     { successMessage: 'Task created!' }
 *   );
 * };
 */

