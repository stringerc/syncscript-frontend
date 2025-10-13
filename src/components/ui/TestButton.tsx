'use client'

import React from 'react'

export default function TestButton() {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'red',
        border: 'none',
        cursor: 'pointer',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: 'white',
        fontWeight: 'bold'
      }}
      onClick={() => alert('Test button clicked!')}
    >
      TEST
    </button>
  )
}
