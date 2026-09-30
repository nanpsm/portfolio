'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  wall:   '#F4F0E8',
  bg:     '#EDEEE6',
  dark:   '#1E3B45',
  ink:    '#14170F',
  muted:  '#8A8E7B',
  accent: '#B4E650',
  line:   'rgba(20,23,15,0.1)',
  spot:   'rgba(255,220,140,0.22)',
}
const serif = { fontFamily: 'var(--font-display), serif' } as const
const mono  = { fontFamily: 'var(--font-mono), monospace' } as const

// ─── Fade-up helper ───────────────────────────────────────────────────────────
function FadeUp({
  children, delay = 0, style,
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.2, 0.7, 0.2, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Room divider ─────────────────────────────────────────────────────────────
function RoomDivider({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      background: C.dark, padding: '28px 56px',
      display: 'flex', alignItems: 'center', gap: 24,
    }}>
      <span style={{ ...mono, fontSize: 9, letterSpacing: '0.28em', color: 'rgba(181,230,80,0.5)', textTransform: 'uppercase' }}>
        {num}
      </span>
      <span style={{ flex: 1, height: 1, background: 'rgba(233,239,226,0.12)' }} />
      <span style={{ ...mono, fontSize: 9, letterSpacing: '0.28em', color: 'rgba(181,230,80,0.5)', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { cat: 'Languages',      items: ['Python', 'TypeScript', 'SQL', 'Go', 'Java'] },
  { cat: 'Frontend',       items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { cat: 'Backend',        items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
  { cat: 'Data',           items: ['Apache Airflow', 'dbt', 'Spark', 'Kafka', 'Snowflake'] },
  { cat: 'Infrastructure', items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform'] },
  { cat: 'Practices',      items: ['System Design', 'Data Modeling', 'CI/CD', 'Code Review'] },
]

const PROJECTS = [
  {
    num: '01',
    title: 'Video Recommender',
    medium: 'Python · FastAPI · React · PostgreSQL',
    year: '2025',
    desc: 'A full-stack recommendation engine surfacing relevant video content through collaborative filtering and real-time data pipelines.',
    bg: '#2E4A3E',
    href: 'https://github.com/nanpsm',
  },
  {
    num: '02',
    title: 'The Collection',
    medium: 'Next.js · TypeScript · Framer Motion',
    year: '2026',
    desc: 'This portfolio — designed as a single-scroll museum experience so browsing feels like walking through a gallery.',
    bg: '#3E2E4A',
    href: '#ticket',
  },
  {
    num: '03',
    title: 'Data Pipeline',
    medium: 'Apache Airflow · dbt · Snowflake',
    year: '2024',
    desc: 'End-to-end ETL pipeline processing millions of records daily with automated quality checks and data lineage tracking.',
    bg: '#4A3A2E',
    href: '#',
  },
]

// ─── Section 1: Ticket ────────────────────────────────────────────────────────
function TicketSection() {
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).toUpperCase()

  return (
    <section
      id="ticket"
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: C.wall,
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 20% 0%, ${C.spot}, transparent 70%),
          radial-gradient(ellipse 40% 30% at 50% 0%, ${C.spot}, transparent 70%),
          radial-gradient(ellipse 55% 38% at 82% 0%, ${C.spot}, transparent 70%)
        `,
        padding: '80px 24px',
      }}
    >
      <FadeUp style={{ marginBottom: 56, textAlign: 'center' }}>
        <p style={{ ...mono, fontSize: 9, letterSpacing: '0.3em', color: C.muted, textTransform: 'uppercase', margin: 0 }}>
          The Collection · Portfolio Exhibition
        </p>
      </FadeUp>

      {/* Physical ticket */}
      <FadeUp delay={0.12}>
        <div style={{
          width: 'min(720px, 92vw)',
          display: 'grid',
          gridTemplateColumns: '1fr 140px',
          background: '#FBF7EF',
          boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.07)',
          position: 'relative',
        }}>

          {/* Main body */}
          <div style={{ padding: '52px 44px 52px 52px', borderRight: '2px dashed rgba(28,24,20,0.18)' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.26em', color: C.muted, textTransform: 'uppercase', margin: '0 0 30px' }}>
              Admission · 2026 Season
            </p>
            <h1 style={{ ...serif, fontWeight: 300, fontSize: 'clamp(40px, 5.5vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.01em', color: C.ink, margin: '0 0 10px' }}>
              The Collection
            </h1>
            <p style={{ ...serif, fontStyle: 'italic', fontSize: 17, color: '#6B5A48', margin: '0 0 36px' }}>
              Works by Nan Phyu Sin Maung
            </p>
            <div style={{ width: 44, height: 1, background: 'rgba(28,24,20,0.2)', margin: '0 0 32px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {['Full Stack Developer', 'Data Engineer', 'Singapore · Open to work'].map(t => (
                <p key={t} style={{ ...mono, fontSize: 10.5, letterSpacing: '0.08em', color: C.muted, margin: 0 }}>{t}</p>
              ))}
            </div>
          </div>

          {/* Stub */}
          <div style={{
            padding: '48px 20px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center', textAlign: 'center',
          }}>
            <div>
              <p style={{ ...mono, fontSize: 8, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', margin: '0 0 12px' }}>Admit</p>
              <p style={{ ...serif, fontSize: 52, fontWeight: 300, color: C.ink, margin: 0, lineHeight: 1 }}>1</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <p style={{ ...mono, fontSize: 8, letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', margin: '0 0 6px' }}>No.</p>
              <p style={{ ...serif, fontSize: 22, color: C.ink, margin: '0 0 22px' }}>0001</p>
              <p style={{ ...mono, fontSize: 8, letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', margin: '0 0 6px' }}>Date</p>
              <p style={{ ...mono, fontSize: 9.5, color: C.ink, margin: 0, letterSpacing: '0.04em' }}>{today}</p>
            </div>
            <p style={{
              ...mono, fontSize: 7, letterSpacing: '0.14em', color: C.muted,
              textTransform: 'uppercase', writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}>
              Non-transferable
            </p>
          </div>

          {/* Punch holes */}
          {[-1, 1].map(side => (
            <div key={side} style={{
              position: 'absolute',
              left:  side === -1 ? -13 : undefined,
              right: side ===  1 ? -13 : undefined,
              top: '50%', transform: 'translateY(-50%)',
              width: 26, height: 26, borderRadius: '50%',
              background: C.wall,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.18)',
            }} />
          ))}
        </div>
      </FadeUp>

      {/* Scroll hint */}
      <FadeUp delay={0.4} style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ ...mono, fontSize: 9, letterSpacing: '0.24em', color: C.muted, textTransform: 'uppercase', margin: 0 }}>
          Scroll to enter
        </p>
        <div style={{
          width: 1, height: 44,
          background: `linear-gradient(to bottom, transparent, ${C.muted})`,
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </FadeUp>
    </section>
  )
}

// ─── Section 2: Artist Introduction ──────────────────────────────────────────
function ArtistSection() {
  return (
    <section
      id="artist"
      style={{
        minHeight: '100vh',
        background: C.bg,
        padding: '104px 56px 96px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Column grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        maxWidth: 1440, margin: '0 auto', padding: '0 56px',
        opacity: 0.5, left: '50%', transform: 'translateX(-50%)', width: '100%',
      }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} style={{ borderLeft: '1px solid rgba(20,23,15,.055)' }} />
        ))}
        <div style={{ borderLeft: '1px solid rgba(20,23,15,.055)', borderRight: '1px solid rgba(20,23,15,.055)' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.dark, color: C.accent, padding: '5px 10px', whiteSpace: 'nowrap' }}>
              Room II
            </span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}, rgba(20,23,15,.12))` }} />
          </div>
        </FadeUp>

        {/* Big name */}
        <FadeUp delay={0.08}>
          <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(72px, 11vw, 160px)', lineHeight: 0.88, letterSpacing: '-0.02em', margin: '0 0 28px', color: C.ink }}>
            Artist
          </h2>
        </FadeUp>
        <FadeUp delay={0.14}>
          <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.4, margin: '0 0 44px', maxWidth: '28ch', color: '#2E4A44', borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
            Nan Phyu Sin Maung — b. 2004, Myanmar.
          </p>
        </FadeUp>

        {/* Stats row */}
        <FadeUp delay={0.18}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, paddingBottom: 44, borderBottom: `1px solid ${C.line}`, marginBottom: 80 }}>
            <p style={{ ...mono, fontSize: 13, lineHeight: 2, letterSpacing: '0.02em', maxWidth: '34ch', margin: 0, color: '#5A6B66' }}>
              Building things that hold up under inspection,<br />from the interface to the pipeline.
            </p>
            <div style={{ display: 'flex', gap: 48, ...mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted }}>
              {[
                { label: 'Based in',  value: 'Singapore' },
                { label: 'Status',    value: 'Fresh graduate' },
                { label: 'Open to',   value: 'Opportunities', dot: true },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span>{s.label}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.ink, fontSize: 13, letterSpacing: '0.08em' }}>
                    {s.dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, display: 'inline-block' }} />}
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Bio + artist label */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '64px 72px', alignItems: 'start' }}>
          <FadeUp>
            <div style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 7, height: 7, background: C.accent, display: 'inline-block' }} />
              <span>Biography · Wall text</span>
            </div>
            <p style={{ ...serif, fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.26, letterSpacing: '-0.01em', margin: '0 0 36px', color: C.ink }}>
              I'm Nan Phyu Sin Maung, a 22-year-old fresh graduate from Myanmar, based in Singapore.
            </p>
            <p style={{ ...serif, fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: '#4A5545', margin: '0 0 18px' }}>
              I build across the whole stack — frontend, backend, and data pipelines. I can take a product from design to deployed, and I'm looking for a team to do that with.
            </p>
            <p style={{ ...serif, fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: '#4A5545', margin: 0 }}>
              Open to full-time roles starting immediately.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginTop: 36, ...mono, fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: C.ink, textDecoration: 'none',
              borderBottom: `1px solid rgba(20,23,15,0.3)`, paddingBottom: 4,
            }}>
              Take a catalogue — Résumé PDF ↓
            </a>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ border: '1px solid rgba(30,59,69,.28)', borderTop: `3px solid ${C.dark}`, background: 'linear-gradient(to bottom, rgba(180,230,80,0.1) 0%, rgba(237,238,230,0.4) 60%)' }}>
              <div style={{ padding: '0 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: `1px solid ${C.line}`, ...mono, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8388' }}>
                  <span>Artist label</span><span>NPSM.2026.01</span>
                </div>
                {[
                  { label: 'Born',   value: '2004, Myanmar' },
                  { label: 'Medium', value: 'Full Stack Development' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0', borderBottom: `1px solid ${C.line}` }}>
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>{r.label}</span>
                    <span style={{ fontSize: 14, letterSpacing: '0.04em', color: C.dark }}>{r.value}</span>
                  </div>
                ))}
                {['Data Engineering', 'UI / UX'].map(v => (
                  <div key={v} style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 0', borderBottom: `1px solid ${C.line}` }}>
                    <span style={{ fontSize: 14, letterSpacing: '0.04em', color: C.dark }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0', borderBottom: `1px solid ${C.line}` }}>
                  <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>Languages</span>
                  <span style={{ fontSize: 14, letterSpacing: '0.04em', color: C.dark, textAlign: 'right' }}>Burmese · English</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0' }}>
                  <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>On view</span>
                  <span style={{ fontSize: 14, letterSpacing: '0.04em', color: C.dark, textAlign: 'right' }}>Singapore · 2026 —</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Curator's note */}
        <FadeUp delay={0.08} style={{ marginTop: 96 }}>
          <div style={{ background: C.dark, borderRadius: 16, padding: '72px 64px', color: '#E9EFE2' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, ...mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7E9AA0', marginBottom: 56 }}>
              <span>Curator's note</span>
              <span style={{ flex: 1, height: 1, background: 'rgba(233,239,226,.22)' }} />
              <span>Room II · Panel 02</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, .35fr) minmax(0, 1.65fr)', gap: 64, alignItems: 'start' }}>
              <div style={{ ...serif, fontSize: 'clamp(72px, 9vw, 140px)', lineHeight: 0.8, color: 'rgba(180,230,80,.14)' }}>02</div>
              <div>
                <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.36, margin: '0 0 40px', maxWidth: '26ch', color: C.accent }}>
                  Fresh graduate. Full stack + data. Ready now.
                </p>
                <p style={{ fontSize: 14, lineHeight: 2, letterSpacing: '0.01em', color: 'rgba(233,239,226,.7)', margin: '0 0 36px', maxWidth: '52ch' }}>
                  I build across the whole stack — frontend, backend, and data pipelines. I can take a product from design to deployed, and I'm looking for a team to do that with. Open to full-time roles starting immediately.
                </p>
                <div style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7E9AA0' }}>
                  — Nan Phyu Sin Maung, Singapore, 2026
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Section 3: Catalog (Skills) ──────────────────────────────────────────────
function CatalogSection() {
  return (
    <section
      id="catalog"
      style={{
        minHeight: '100vh',
        background: '#F8F5EE',
        padding: '104px 56px 96px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.dark, color: C.accent, padding: '5px 10px', whiteSpace: 'nowrap' }}>
              Room III
            </span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}, rgba(20,23,15,.12))` }} />
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(72px, 11vw, 160px)', lineHeight: 0.88, letterSpacing: '-0.02em', margin: '0 0 28px', color: C.ink }}>
            Catalogue
          </h2>
          <p style={{ ...serif, fontStyle: 'italic', fontSize: 18, color: '#6B5A48', margin: '0 0 56px', borderLeft: `3px solid ${C.accent}`, paddingLeft: 20, maxWidth: '36ch', lineHeight: 1.6 }}>
            A complete inventory of materials used in the making of these works.
          </p>
        </FadeUp>

        {/* Catalog number header */}
        <FadeUp delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 0', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, marginBottom: 2, ...mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted }}>
            <span>Category</span>
            <span>Specimen</span>
            <span style={{ textAlign: 'right' }}>Ref.</span>
          </div>
        </FadeUp>

        {/* Skill rows */}
        {SKILLS.map((group, gi) => (
          <FadeUp key={group.cat} delay={0.08 + gi * 0.06}>
            <div style={{ borderBottom: `1px solid ${C.line}` }}>
              {group.items.map((item, ii) => (
                <div
                  key={item}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                    alignItems: 'center', padding: '18px 0',
                    borderBottom: ii < group.items.length - 1 ? `1px solid rgba(20,23,15,0.05)` : 'none',
                  }}
                >
                  {ii === 0 ? (
                    <span style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent }}>{group.cat}</span>
                  ) : (
                    <span />
                  )}
                  <span style={{ ...serif, fontSize: 22, fontWeight: 400, color: C.ink }}>{item}</span>
                  <span style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', color: C.muted, textAlign: 'right' }}>
                    {String(gi + 1).padStart(2, '0')}.{String(ii + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        ))}

        <FadeUp delay={0.12} style={{ marginTop: 64 }}>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>
            {SKILLS.reduce((acc, g) => acc + g.items.length, 0)} specimens catalogued · Updated Sep 2026
          </p>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Section 4: Gallery (Projects) ────────────────────────────────────────────
function GallerySection() {
  return (
    <section
      id="gallery"
      style={{
        minHeight: '100vh',
        backgroundColor: C.wall,
        backgroundImage: `
          radial-gradient(ellipse 50% 45% at 15% 0%, ${C.spot}, transparent 65%),
          radial-gradient(ellipse 40% 38% at 50% 0%, ${C.spot}, transparent 65%),
          radial-gradient(ellipse 50% 42% at 85% 0%, ${C.spot}, transparent 65%),
          linear-gradient(to bottom, ${C.wall} 0%, #EDE8DE 65%, #E0D9CE 100%)
        `,
        padding: '104px 56px 80px',
        position: 'relative',
      }}
    >
      {/* Baseboard */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '5%', background: '#2E2118', boxShadow: '0 -3px 12px rgba(0,0,0,0.18) inset', zIndex: 1 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
            <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.dark, color: C.accent, padding: '5px 10px', whiteSpace: 'nowrap' }}>
              Room IV
            </span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}, rgba(20,23,15,.12))` }} />
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(72px, 11vw, 160px)', lineHeight: 0.88, letterSpacing: '-0.02em', margin: '0 0 56px', color: C.ink }}>
            Gallery
          </h2>
        </FadeUp>

        {/* Works */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
          {PROJECTS.map((proj, i) => (
            <FadeUp key={proj.num} delay={0.06 * i}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
                gap: 80, alignItems: 'center',
              }}>

                {/* Frame */}
                <div style={{ order: i % 2 === 0 ? 0 : 1, perspective: 1400 }}>
                  <div style={{
                    aspectRatio: '4/3',
                    background: `linear-gradient(155deg, ${proj.bg}cc, ${proj.bg}88)`,
                    border: '14px solid #2E2118',
                    boxShadow: '0 28px 60px rgba(0,0,0,0.22)',
                    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                    animation: `frameSettle 0.85s cubic-bezier(.16,1,.3,1) both`,
                  }}>
                    <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div style={{
                      position: 'absolute', top: '-30%', left: '50%', width: '160%', height: '160%',
                      transform: 'translateX(-50%)',
                      background: 'radial-gradient(ellipse at center top, rgba(255,220,140,0.3), transparent 55%)',
                      pointerEvents: 'none',
                    }} />
                    <span style={{ ...serif, fontSize: 'clamp(48px, 9vw, 100px)', color: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                      {proj.num}
                    </span>
                  </div>
                </div>

                {/* Placard */}
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 24 }}>
                    <p style={{ ...mono, fontSize: 9.5, letterSpacing: '0.18em', color: C.accent, textTransform: 'uppercase', margin: '0 0 16px' }}>
                      {proj.num} / 03
                    </p>
                    <h3 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(28px, 3.2vw, 44px)', margin: '0 0 10px', color: C.ink }}>
                      {proj.title}
                    </h3>
                    <p style={{ ...mono, fontSize: 11, color: C.muted, margin: '0 0 22px', letterSpacing: '0.04em' }}>
                      <span style={{ color: C.ink }}>{proj.medium}</span> · {proj.year}
                    </p>
                    <p style={{ ...serif, fontWeight: 300, fontSize: 17, lineHeight: 1.72, color: '#4A4540', margin: '0 0 28px', maxWidth: '44ch' }}>
                      {proj.desc}
                    </p>
                    {proj.href !== '#' && (
                      <a href={proj.href} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.ink, textDecoration: 'none', borderBottom: '1px solid rgba(20,23,15,0.35)', paddingBottom: 3 }}>
                        View work →
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* Contact footer */}
        <FadeUp delay={0.1} style={{ marginTop: 120, paddingTop: 64, borderTop: `1px solid ${C.line}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.muted, margin: '0 0 20px' }}>
                End of exhibition · Say hello
              </p>
              <h3 style={{ ...serif, fontWeight: 300, fontSize: 'clamp(32px, 4vw, 56px)', margin: '0 0 10px', color: C.ink }}>
                Let's work together.
              </h3>
              <p style={{ ...serif, fontStyle: 'italic', fontSize: 17, color: '#6B5A48', margin: '0 0 32px', lineHeight: 1.6 }}>
                The gallery is always open.
              </p>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  { label: 'Email', href: 'mailto:nanphyusinmg@gmail.com' },
                  { label: 'GitHub', href: 'https://github.com/nanpsm' },
                  { label: 'LinkedIn', href: '#' },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', borderBottom: `1px solid rgba(20,23,15,0.2)`, paddingBottom: 3, transition: 'color .2s, border-color .2s' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = C.ink; (e.target as HTMLElement).style.borderColor = 'rgba(20,23,15,0.6)' }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = C.muted; (e.target as HTMLElement).style.borderColor = 'rgba(20,23,15,0.2)' }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, margin: '0 0 12px' }}>
                Admission free · Open all hours
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                ▲ Return to entrance
              </button>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function MuseumScroll() {
  return (
    <main style={{ background: C.wall }}>
      <TicketSection />
      <RoomDivider num="Room II" label="Artist Introduction" />
      <ArtistSection />
      <RoomDivider num="Room III" label="The Catalogue" />
      <CatalogSection />
      <RoomDivider num="Room IV" label="The Gallery" />
      <GallerySection />
    </main>
  )
}
