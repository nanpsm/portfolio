'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const SkillsBook = dynamic(() => import('@/components/ui/book-slider'), { ssr: false })

function useSGTClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-SG', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function SkillsSection() {
  const clock = useSGTClock()

  return (
    <section
      id="skills"
      style={{
        background: '#F3F4EA',
        color: '#14170F',
        fontFamily: 'var(--font-jetbrains), monospace',
        minHeight: '100vh',
        paddingBottom: '80px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* ── Top nav row ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '28px 0 0',
          fontSize: '11px', letterSpacing: '0.1em',
        }}>
          <button
            onClick={() => {
              const el = document.getElementById('map')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '11px', letterSpacing: '0.1em',
              color: '#7C806F',
            }}
          >
            ← Floor Map
          </button>
          <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8E7B' }}>
            NPSM · 2026 · Room II — Skills
          </span>
        </div>

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
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            color: '#14170F',
          }}>Skills</h1>

          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            fontSize: '17px',
            lineHeight: 1.65,
            color: '#4A4540',
            margin: 0,
            borderLeft: '3px solid #B4E650',
            paddingLeft: '18px',
            maxWidth: '44ch',
          }}>
            A physical catalogue of methods, materials, and tools accumulated over five years of practice.
          </p>
        </div>

        {/* ── Book ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SkillsBook />
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid rgba(30,59,69,0.12)',
          marginTop: '64px', paddingTop: '20px',
          fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#8A8E7B',
        }}>
          <span>Admission free · Open all hours</span>
          <span>SGT {clock}</span>
        </div>
      </div>
    </section>
  )
}
