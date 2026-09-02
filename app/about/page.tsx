'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.07 } }),
}

function Reveal({ children, i = 0, style }: { children: React.ReactNode; i?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -12% 0px' }} custom={i} variants={reveal} style={style}>
      {children}
    </motion.div>
  )
}

export default function About() {
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-SG', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit', hour12: false })
      setClock('SGT ' + t)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono), monospace' }
  const serif: React.CSSProperties = { fontFamily: 'var(--font-display), serif' }
  const muted = '#8A8E7B'
  const dark = '#1E3B45'
  const ink = '#14170F'
  const bg = '#EDEEE6'
  const accent = '#B4E650'

  return (
    <main style={{ background: bg, color: ink, minHeight: '100vh', padding: '0 0 96px', position: 'relative', overflow: 'hidden' }}>

      {/* Column grid overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', maxWidth: 1440, margin: '0 auto', padding: '0 56px', opacity: 0.5, left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
        {Array.from({ length: 11 }).map((_, i) => <div key={i} style={{ borderLeft: '1px solid rgba(20,23,15,.055)' }} />)}
        <div style={{ borderLeft: '1px solid rgba(20,23,15,.055)', borderRight: '1px solid rgba(20,23,15,.055)' }} />
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 56px', position: 'relative' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0 0', ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
          <a href="/" style={{ color: muted, display: 'flex', gap: 12, alignItems: 'center', textDecoration: 'none' }}>← Floor map</a>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <span>NPSM · 2026 · 01</span>
            <span style={{ width: 36, height: 1, background: 'rgba(20,23,15,.2)', display: 'inline-block' }} />
            <span style={{ color: ink }}>Room I — About</span>
          </div>
        </header>

        {/* Hero */}
        <section style={{ paddingTop: 120 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: dark, color: accent, padding: '5px 10px', whiteSpace: 'nowrap' }}>Room I</span>
              <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}, rgba(20,23,15,.12))`, display: 'inline-block' }} />
            </div>
          </Reveal>
          <div style={{ marginTop: 36 }}>
            <Reveal i={1}>
              <h1 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(84px, 13vw, 180px)', lineHeight: 0.86, letterSpacing: '-0.02em', margin: 0 }}>About</h1>
            </Reveal>
            <Reveal i={2}>
              <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.4, margin: '28px 0 0', maxWidth: '26ch', color: '#2E4A44', borderLeft: `3px solid ${accent}`, paddingLeft: 20 }}>
                Nan Phyu Sin Maung — b. 2004, Myanmar.
              </p>
            </Reveal>
          </div>
          <Reveal i={4}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginTop: 44, paddingBottom: 40, borderBottom: '1px solid rgba(20,23,15,.14)' }}>
              <p style={{ ...mono, fontSize: 14, lineHeight: 2, letterSpacing: '0.02em', maxWidth: '34ch', margin: 0, color: '#5A6B66' }}>
                Building things that hold up under inspection, from the interface to the pipeline.
              </p>
              <div style={{ display: 'flex', gap: 56, ...mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span>Based in</span><span style={{ color: ink, fontSize: 13, letterSpacing: '0.08em' }}>Singapore</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span>Status</span><span style={{ color: ink, fontSize: 13, letterSpacing: '0.08em' }}>Fresh graduate</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span>Open to</span><span style={{ display: 'flex', alignItems: 'center', gap: 8, color: dark, fontSize: 13, letterSpacing: '0.08em' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, display: 'inline-block' }} />Opportunities</span></div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Bio */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '96px 72px', paddingTop: 104, alignItems: 'start' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 34 }}>
              <span style={{ width: 7, height: 7, background: accent, display: 'inline-block' }} />
              <span>Biography · Wall text</span>
            </div>
            <p style={{ ...serif, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.24, letterSpacing: '-0.01em', margin: '0 0 40px' }}>
              I'm Nan Phyu Sin Maung, a 22-year-old fresh graduate from Myanmar, based in Singapore.
            </p>
          </Reveal>
          <Reveal i={1} style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(30,59,69,.28)', borderTop: `3px solid ${dark}`, background: 'linear-gradient(to bottom, rgba(180,230,80,0.1) 0%, rgba(237,238,230,0.4) 60%)' }}>
            <div style={{ padding: '0 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(20,23,15,.09)', ...mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8388' }}>
              <span>Artist label</span><span>NPSM.2026.01</span>
            </div>
            {[
              { label: 'Born', value: '2004, Myanmar' },
              { label: 'Medium', value: 'Full Stack Development' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '22px 0', borderBottom: '1px solid rgba(20,23,15,.09)' }}>
                <span style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>{r.label}</span>
                <span style={{ fontSize: 14, letterSpacing: '0.04em', color: dark }}>{r.value}</span>
              </div>
            ))}
            {['Data Engineering', 'UI / UX'].map(v => (
              <div key={v} style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 0', borderBottom: '1px solid rgba(20,23,15,.09)' }}>
                <span style={{ fontSize: 14, letterSpacing: '0.04em', color: dark }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '22px 0' }}>
              <span style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>Languages</span>
              <span style={{ fontSize: 14, letterSpacing: '0.04em', color: dark, textAlign: 'right' }}>Burmese · English</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '22px 0', borderTop: '1px solid rgba(20,23,15,.09)' }}>
              <span style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>On view</span>
              <span style={{ fontSize: 14, letterSpacing: '0.04em', color: dark, textAlign: 'right' }}>Singapore · 2026 —</span>
            </div>
            </div>
          </Reveal>
        </section>

        {/* Curator's note */}
        <section style={{ paddingTop: 140 }}>
          <Reveal>
            <div style={{ background: dark, borderRadius: 16, padding: '88px 72px', color: '#E9EFE2' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7E9AA0', marginBottom: 64 }}>
                <span>Curator's note</span>
                <span style={{ flex: 1, height: 1, background: 'rgba(233,239,226,.22)', display: 'inline-block' }} />
                <span>Room I · Panel 02</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, .4fr) minmax(0, 1.6fr)', gap: 72, alignItems: 'start' }}>
                <div style={{ ...serif, fontSize: 'clamp(80px, 10vw, 150px)', lineHeight: 0.8, color: 'rgba(180,230,80,.16)' }}>02</div>
                <div>
                  <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.32, margin: '0 0 48px', maxWidth: '24ch', color: accent }}>
                    Fresh graduate. Full stack + data. Ready now.
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 2, letterSpacing: '0.01em', color: 'rgba(233,239,226,.7)', margin: 0, maxWidth: '52ch' }}>I build across the whole stack — frontend, backend, and data pipelines. I can take a product from design to deployed, and I'm looking for a team to do that with. Open to full-time roles starting immediately.</p>
                  <div style={{ marginTop: 44, ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7E9AA0' }}>— Nan Phyu Sin Maung, Singapore, 2026</div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Resume */}
        <section style={{ paddingTop: 80 }}>
          <Reveal>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, border: '1px solid rgba(30,59,69,.22)', borderRadius: 12, padding: '32px 40px', textDecoration: 'none', color: 'inherit', transition: 'background .3s ease, border-color .3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(30,59,69,.04)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(30,59,69,.45)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(30,59,69,.22)' }}>
              <div>
                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>Take a catalogue</div>
                <div style={{ ...serif, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1, color: dark }}>Résumé — PDF</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, ...mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, flexShrink: 0 }}>
                <span>Updated Sep 2026 · 102 KB</span>
                <span style={{ fontSize: 20, color: dark }}>↓</span>
              </div>
            </a>
          </Reveal>
        </section>

        {/* Explore */}
        <section style={{ paddingTop: 120 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 48 }}>
              <span>Continue the tour</span>
              <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}, rgba(20,23,15,.12))`, display: 'inline-block' }} />
              <span>Rooms II — IV</span>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(20,23,15,.14)', borderTop: '1px solid rgba(20,23,15,.14)', borderBottom: '1px solid rgba(20,23,15,.14)' }}>
            {[{ room: 'Room II', label: 'Projects', href: '/projects' }, { room: 'Room III', label: 'Skills', href: '/skills' }, { room: 'Room IV', label: 'Contact', href: '/contact' }].map((r, i) => (
              <a key={r.href} href={r.href} style={{ background: bg, padding: '44px 32px', display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', color: 'inherit', transition: 'background .3s ease, color .3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = dark; el.style.color = accent; (el.querySelector('.room-label') as HTMLElement).style.color = 'rgba(181,240,58,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = bg; el.style.color = 'inherit'; (el.querySelector('.room-label') as HTMLElement).style.color = '#6E8388' }}>
                <span className="room-label" style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6E8388', transition: 'color .3s ease' }}>{r.room}</span>
                <span style={{ ...serif, fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 32 }}>{r.label} <span style={{ fontSize: '0.6em' }}>→</span></span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, paddingTop: 72, ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
          <span>Admission free · Open all hours</span>
          <span>{clock}</span>
          <a href="/" style={{ color: muted, textDecoration: 'none' }}>▲ Entrance</a>
        </footer>

      </div>
    </main>
  )
}
