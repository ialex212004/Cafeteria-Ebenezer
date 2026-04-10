'use client';

import { useEffect, useState } from 'react';

const MINIMUM_VISIBLE_MS = 1400;
const EXIT_DURATION_MS = 900;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let exitTimer: number | undefined;
    let hideTimer: number | undefined;
    let frameId: number | undefined;
    let exited = false;

    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const restoreBody = () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };

    const beginExit = () => {
      if (exited) return;
      exited = true;

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(MINIMUM_VISIBLE_MS - elapsed, 0);

      exitTimer = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => setIsExiting(true));
        hideTimer = window.setTimeout(
          () => {
            setVisible(false);
            restoreBody();
          },
          reducedMotion ? 0 : EXIT_DURATION_MS
        );
      }, remaining);
    };

    if (document.readyState === 'complete') {
      beginExit();
    } else {
      window.addEventListener('load', beginExit, { once: true });
    }

    return () => {
      window.removeEventListener('load', beginExit);
      restoreBody();
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style jsx>{`
        .splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background:
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201, 169, 110, 0.09) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(180, 92, 50, 0.06) 0%, transparent 70%),
            linear-gradient(180deg, #080603 0%, #0c0905 100%);
          opacity: ${isExiting ? 0 : 1};
          transform: scale(${isExiting ? 1.04 : 1});
          filter: blur(${isExiting ? '6px' : '0px'});
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: ${isExiting ? 'none' : 'all'};
          overflow: hidden;
        }
        .splash::before,
        .splash::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          opacity: ${isExiting ? 0 : 0.5};
          transition: opacity 0.9s ease;
          pointer-events: none;
        }
        .splash::before {
          width: 520px;
          height: 520px;
          top: -180px;
          left: -180px;
          background: radial-gradient(circle, rgba(201, 169, 110, 0.14) 0%, transparent 60%);
          animation: drift 14s ease-in-out infinite alternate;
        }
        .splash::after {
          width: 480px;
          height: 480px;
          bottom: -160px;
          right: -160px;
          background: radial-gradient(circle, rgba(180, 92, 50, 0.1) 0%, transparent 60%);
          animation: drift 18s ease-in-out infinite alternate-reverse;
        }

        .splash-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
          text-align: center;
          padding: 2rem;
          opacity: ${isExiting ? 0 : 1};
          transform: translateY(${isExiting ? '-14px' : '0'});
          transition: opacity 0.75s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .splash-mark {
          font-family: 'Italiana', 'Cormorant Garamond', serif;
          font-size: clamp(0.72rem, 1.4vw, 0.82rem);
          letter-spacing: 0.62em;
          text-transform: uppercase;
          color: #c9a96e;
          opacity: 0;
          animation: fadeIn 1.2s 0.15s forwards cubic-bezier(0.16, 1, 0.3, 1);
          padding-left: 0.62em;
        }

        .splash-mono {
          font-family: 'Italiana', 'Cormorant Garamond', serif;
          font-size: clamp(3.4rem, 8vw, 6.4rem);
          font-weight: 400;
          color: #f6eedd;
          line-height: 0.95;
          letter-spacing: 0.015em;
          display: flex;
          gap: 0.02em;
        }

        .splash-mono span {
          display: inline-block;
          opacity: 0;
          transform: translateY(28px);
          animation: charUp 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        .splash-mono span:nth-child(1) { animation-delay: 0.25s; }
        .splash-mono span:nth-child(2) { animation-delay: 0.31s; }
        .splash-mono span:nth-child(3) { animation-delay: 0.37s; }
        .splash-mono span:nth-child(4) { animation-delay: 0.43s; }
        .splash-mono span:nth-child(5) { animation-delay: 0.49s; }
        .splash-mono span:nth-child(6) { animation-delay: 0.55s; }
        .splash-mono span:nth-child(7) { animation-delay: 0.61s; }
        .splash-mono span:nth-child(8) { animation-delay: 0.67s; }

        .splash-rule {
          position: relative;
          width: 140px;
          height: 1px;
          overflow: hidden;
        }
        .splash-rule::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%);
          transform: scaleX(0);
          animation: ruleGrow 1.3s 0.55s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }

        .splash-sub {
          font-family: 'Jost', sans-serif;
          font-size: 0.66rem;
          letter-spacing: 0.46em;
          text-transform: uppercase;
          color: #b4a284;
          font-weight: 300;
          opacity: 0;
          animation: fadeIn 1s 0.95s forwards cubic-bezier(0.16, 1, 0.3, 1);
          padding-left: 0.46em;
        }
        .splash-sub b {
          color: #c9a96e;
          font-weight: 400;
        }

        .splash-stars {
          display: flex;
          gap: 0.45rem;
          margin-top: 0.45rem;
          opacity: 0;
          animation: fadeIn 0.9s 1.1s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        .splash-stars span {
          color: #c9a96e;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes charUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ruleGrow {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 30px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-mono span,
          .splash-mark,
          .splash-sub,
          .splash-stars,
          .splash-rule::before {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="splash" aria-hidden="true">
        <div className="splash-inner">
          <p className="splash-mark">Est · MMXXV</p>
          <h1 className="splash-mono">
            {'ÉBENEZER'.split('').map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </h1>
          <div className="splash-rule" />
          <p className="splash-sub">
            Café de <b>día</b> &nbsp;·&nbsp; Pizza de <b>noche</b>
          </p>
          <div className="splash-stars" aria-hidden="true">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      </div>
    </>
  );
}
