'use client'

import ScrollStrokePath from '@/components/ScrollStrokePath'

export default function Home() {
  return (
    <div style={{ background: '#F5F8ED', minHeight: '100vh' }}>
      <ScrollStrokePath />

      {/* ── Hero (100vh, fixed overlay effect via min-height) ── */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#8A9A7A', marginBottom: '24px', margin: '0 0 24px' }}>
          SCROLL PROGRESS DEMO
        </p>
        <h1 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.1, color: '#1A1F14', margin: '0 0 20px', maxWidth: '16ch' }}>
          The Stroke That Follows the Scroll Progress
        </h1>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', letterSpacing: '0.1em', color: '#8A9A7A', margin: 0 }}>
          Scroll down to see the effect
        </p>
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, #8A9A7A)' }} />
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.16em', color: '#8A9A7A' }}>SCROLL</span>
        </div>
      </section>

      {/* ── Scroll space ── */}
      <section style={{ height: '160vh', background: '#F5F8ED' }} />

      {/* ── Dark teal banner ── */}
      <section
        style={{
          background: '#1f3d4a',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.22em', color: '#B5F03A', marginBottom: '20px', opacity: 0.8, margin: '0 0 20px' }}>
          THE COLLECTION — 2026
        </p>
        <h2 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontSize: 'clamp(40px, 7vw, 90px)', lineHeight: 1.05, color: '#F5F8ED', margin: '0 0 24px' }}>
          Nan Phyu Sin Maung
        </h2>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(245,248,237,0.5)', margin: 0 }}>
          Full Stack Developer · Singapore
        </p>
      </section>
    </div>
  )
}
