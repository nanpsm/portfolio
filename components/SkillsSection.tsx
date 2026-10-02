'use client'

import dynamic from 'next/dynamic'

const SkillsBook = dynamic(() => import('@/components/ui/book-slider'), { ssr: false })

export default function SkillsSection() {

  return (
    <section
      id="skills"
      style={{
        background: '#F5F8ED',
        color: '#14170F',
        fontFamily: 'var(--font-jetbrains), monospace',
        minHeight: '100vh',
        paddingBottom: '80px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>


        {/* ── Top border ── */}
        <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)', margin: '16px 0 0' }} />

        {/* ── Section label bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '18px',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#8A8E7B', padding: '28px 0 40px',
        }}>
          <span style={{
            background: '#1E3B45', color: '#B4E650',
            padding: '5px 12px', letterSpacing: '0.16em',
          }}>Room II</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(30,59,69,0.18)' }} />
          <span>Turn the pages to explore</span>
        </div>

        {/* ── Title row ── */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '15px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#1E3B45', marginBottom: '14px',
          }}>Nan Phyu Sin Maung</div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#14170F',
          }}>Skills</h1>

        </div>

        {/* ── Book ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SkillsBook />
        </div>

      </div>
    </section>
  )
}
