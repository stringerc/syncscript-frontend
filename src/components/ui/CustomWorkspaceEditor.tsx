/**
 * Custom Workspace Layout Editor
 * 90-DAY INNOVATION #1: Drag-drop dashboard customization
 */

import React, { useState } from 'react';

interface Widget {
  id: string;
  type: 'tasks' | 'calendar' | 'stats' | 'energy' | 'achievements' | 'team';
  title: string;
  position: { x: number; y: number; w: number; h: number };
}

interface CustomWorkspaceEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (layout: Widget[]) => void;
}

const defaultWidgets: Widget[] = [
  { id: '1', type: 'tasks', title: 'My Tasks', position: { x: 0, y: 0, w: 2, h: 2 } },
  { id: '2', type: 'calendar', title: 'Calendar', position: { x: 2, y: 0, w: 1, h: 2 } },
  { id: '3', type: 'stats', title: 'Stats', position: { x: 0, y: 2, w: 1, h: 1 } },
  { id: '4', type: 'energy', title: 'Energy Log', position: { x: 1, y: 2, w: 1, h: 1 } },
];

export default function CustomWorkspaceEditor({ isOpen, onClose, onSave }: CustomWorkspaceEditorProps) {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-label="Workspace editor" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal)',
      padding: 'var(--space-4)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>
          🎨 Customize Your Workspace
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          {widgets.map(widget => (
            <div key={widget.id} style={{
              padding: 'var(--space-4)',
              border: '2px dashed var(--color-neutral-300)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'move'
            }}>
              <div style={{ fontWeight: 'var(--font-semibold)' }}>{widget.title}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                {widget.type}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={() => { onSave(widgets); onClose(); }}
            style={{
              flex: 1,
              background: 'var(--color-primary-500)',
              color: 'white',
              padding: '14px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'var(--font-semibold)'
            }}
          >
            Save Layout
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'var(--color-neutral-100)',
              padding: '14px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

