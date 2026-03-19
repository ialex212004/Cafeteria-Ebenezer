'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 600)
      }, 300)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1a0a00',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <span
        style={{
          color: '#c8a96e',
          fontSize: '1.5rem',
          fontFamily: 'serif',
          letterSpacing: '0.15em',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        ☕ Ébenezer
      </span>
    </div>
  )
}