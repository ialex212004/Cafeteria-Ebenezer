'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    let exitTimer: number | undefined
    let hideTimer: number | undefined
    let frameId: number | undefined
    let hasStartedExit = false
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const splashStartedAt = performance.now()
    const minimumVisibleMs = 950
    const exitDurationMs = 720
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const restoreBody = () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }

    const startExit = () => {
      if (hasStartedExit) return
      hasStartedExit = true

      const elapsed = performance.now() - splashStartedAt
      const remaining = Math.max(minimumVisibleMs - elapsed, 0)

      exitTimer = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => {
          setIsExiting(true)
        })

        hideTimer = window.setTimeout(() => {
          setVisible(false)
          restoreBody()
        }, exitDurationMs)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      startExit()
    } else {
      window.addEventListener('load', startExit, { once: true })
    }

    return () => {
      window.removeEventListener('load', startExit)
      restoreBody()

      if (exitTimer !== undefined) {
        window.clearTimeout(exitTimer)
      }

      if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer)
      }

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, rgba(212,168,83,0.08), transparent 32%), linear-gradient(180deg, rgba(19,16,9,0.76) 0%, rgba(14,11,8,0.88) 100%)',
        backdropFilter: isExiting ? 'blur(8px)' : 'blur(18px)',
        WebkitBackdropFilter: isExiting ? 'blur(8px)' : 'blur(18px)',
        opacity: isExiting ? 0 : 1,
        pointerEvents: isExiting ? 'none' : 'all',
        transition: 'opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.72s cubic-bezier(0.22, 1, 0.36, 1), -webkit-backdrop-filter 0.72s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: 'min(92vw, 420px)',
          padding: '2rem 1.75rem',
          borderRadius: '28px',
          border: '1px solid rgba(212,168,83,0.12)',
          background: 'linear-gradient(180deg, rgba(32,26,17,0.74) 0%, rgba(19,16,9,0.58) 100%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.24), inset 0 1px 0 rgba(242,236,224,0.05)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transform: isExiting ? 'translateY(-6px) scale(0.988)' : 'translateY(0) scale(1)',
          opacity: isExiting ? 0 : 1,
          filter: isExiting ? 'blur(6px)' : 'blur(0px)',
          transition: 'transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.56s ease, filter 0.72s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid rgba(212,168,83,0.18)',
            background: 'linear-gradient(180deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.04) 100%)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/favicon.ico"
            alt="Logo de Cafetería Ébenezer"
            width={56}
            height={56}
            unoptimized
            priority
            style={{
              width: '56px',
              height: '56px',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.22))',
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              color: '#f2ece0',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Cafetería <span style={{ color: '#d4a853', fontStyle: 'italic', textTransform: 'none' }}>Ébenezer</span>
          </p>
          <p
            style={{
              margin: '0.45rem 0 0',
              color: '#a89880',
              fontFamily: 'Libre Baskerville, serif',
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Café de día · Pizza de noche
          </p>
        </div>
      </div>
    </div>
  )
}
