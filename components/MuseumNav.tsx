'use client'

import { useState, useEffect } from 'react'

const ROOMS = [
  { name: 'Artist Intro', room: 'Lobby',            id: 'intro' },
  { name: 'Floor Map',    room: 'Grand Hall',        id: 'floor-map' },
  { name: 'Projects',     room: 'Room I',            id: 'projects' },
  { name: 'Skills',       room: 'Room II',           id: 'skills' },
  { name: 'Education',    room: 'Room III',          id: 'education' },
  { name: 'Experience',   room: 'Room IV',           id: 'experience' },
  { name: 'Certificates', room: 'Room V',            id: 'certificates' },
  { name: 'Gift Shop',    room: 'Room VI · Contact', id: 'contact' },
]

export default function MuseumNav() {
  const [open, setOpen] = useState(false)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navigate = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const mapRooms = [
    { id: 'projects',     label: 'ROOM I',   name: 'Projects',     x: 20,  y: 10,  w: 118, h: 64 },
    { id: 'skills',       label: 'ROOM II',  name: 'Skills',       x: 20,  y: 74,  w: 118, h: 64 },
    { id: 'education',    label: 'ROOM III', name: 'Education',    x: 20,  y: 138, w: 118, h: 64 },
    { id: 'experience',   label: 'ROOM IV',  name: 'Experience',   x: 262, y: 10,  w: 118, h: 64 },
    { id: 'certificates', label: 'ROOM V',   name: 'Certificates', x: 262, y: 74,  w: 118, h: 64 },
    { id: 'contact',      label: 'ROOM VI',  name: 'Gift Shop',    x: 262, y: 138, w: 118, h: 64 },
  ]

  return (
    <>
      {/* ── Badge ── */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
        {/* Pulse ring */}
        {!open && (
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(30,59,69,0.4)',
            animation: 'museumPulse 2.4s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: '76px', height: '76px',
            borderRadius: '50%',
            background: open ? '#162D36' : '#1E3B45',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(20,23,15,0.28)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '5px',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLButtonElement).style.background = '#162D36' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.background = open ? '#162D36' : '#1E3B45' }}
        >
          <svg width="32" height="24" viewBox="0 0 24 18" fill="none">
            <rect x="1" y="1" width="9" height="7" stroke="#B4E650" strokeWidth="1.2"/>
            <rect x="14" y="1" width="9" height="7" stroke="rgba(180,230,80,.5)" strokeWidth="1.2"/>
            <rect x="1" y="10" width="9" height="7" stroke="rgba(180,230,80,.5)" strokeWidth="1.2"/>
            <rect x="14" y="10" width="9" height="7" stroke="rgba(180,230,80,.5)" strokeWidth="1.2"/>
            <line x1="10" y1="4.5" x2="14" y2="4.5" stroke="rgba(180,230,80,.35)" strokeWidth="1"/>
            <line x1="10" y1="13.5" x2="14" y2="13.5" stroke="rgba(180,230,80,.35)" strokeWidth="1"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '7.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.75)' }}>
            Guide
          </span>
        </button>
      </div>

      {/* ── Overlay ── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(14,27,30,0.72)',
          backdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Panel ── */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '440px',
          zIndex: 300,
          background: 'linear-gradient(160deg, #1E3B45, #122730)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.18, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Watermark */}
        <div style={{
          position: 'absolute', right: '-60px', bottom: '-80px',
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '420px', color: 'rgba(180,230,80,0.03)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>N</div>

        {/* ── Header ── */}
        <div style={{ padding: '20px 28px 0', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(180,230,80,0.6)',
            }}>Museum Guide</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '18px', color: 'rgba(244,239,228,0.4)',
                lineHeight: 1, padding: '0 0 0 12px',
                transition: 'color 0.18s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#F4EFE4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,239,228,0.4)' }}
            >×</button>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400, fontStyle: 'italic',
            fontSize: '20px', color: '#F4EFE4',
            margin: '0 0 14px',
          }}>Where would you like to go?</h2>
          <div style={{ height: '1px', background: 'rgba(180,230,80,0.14)' }} />
        </div>

        {/* ── Mini Floor Map ── */}
        <div style={{ padding: '12px 28px 0', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <svg viewBox="0 0 400 210" width="100%" style={{ display: 'block' }}>
            <defs>
              <pattern id="nav-hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(180,230,80,0.08)" strokeWidth="0.8"/>
              </pattern>
            </defs>

            {/* Grand Hall */}
            <rect x="138" y="10" width="124" height="192" fill="url(#nav-hatch)" stroke="rgba(180,230,80,0.2)" strokeWidth="0.8"/>
            <text x="200" y="106" fontFamily="monospace" fontSize="7" letterSpacing="3" fill="rgba(180,230,80,0.42)" textAnchor="middle" dominantBaseline="middle" transform="rotate(-90,200,106)">GRAND HALL</text>

            {/* Room zones */}
            {mapRooms.map(r => (
              <g key={r.id}>
                <rect
                  x={r.x} y={r.y} width={r.w} height={r.h}
                  fill={hoveredRoom === r.id ? 'rgba(180,230,80,0.12)' : 'rgba(30,59,69,0.3)'}
                  stroke="rgba(180,230,80,0.25)" strokeWidth="0.8"
                  style={{ cursor: 'pointer', transition: 'fill 0.15s' }}
                  onMouseEnter={() => setHoveredRoom(r.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => navigate(r.id)}
                />
                <text x={r.x + 8} y={r.y + 16} fontFamily="monospace" fontSize="6" letterSpacing="1.5" fill="rgba(180,230,80,0.5)" style={{ pointerEvents: 'none' }}>{r.label}</text>
                <text x={r.x + 8} y={r.y + 34} fontFamily="Georgia,serif" fontSize="11" fontStyle="italic" fill="rgba(244,239,228,0.8)" style={{ pointerEvents: 'none' }}>{r.name}</text>
              </g>
            ))}

          </svg>
        </div>

        {/* ── Room List ── */}
        <div style={{ padding: '8px 28px 0', flex: 1, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => navigate(r.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                width: '100%', padding: '8px 0',
                background: 'none', border: 'none',
                borderBottomWidth: i < ROOMS.length - 1 ? '1px' : '0',
                borderBottomStyle: 'solid',
                borderBottomColor: 'rgba(180,230,80,0.08)',
                cursor: 'pointer',
                color: 'rgba(244,239,228,0.7)',
                transition: 'color 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#B4E650' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,239,228,0.7)' }}
            >
              <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {r.name}
              </span>
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontSize: '11px', opacity: 0.5 }}>
                {r.room}
              </span>
            </button>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '10px 28px 16px',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(244,239,228,0.25)',
          position: 'relative', zIndex: 1, flexShrink: 0,
        }}>
          <span>Admission free</span>
          <span>NPSM · 2026</span>
        </div>
      </div>

      <style>{`
        @keyframes museumPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </>
  )
}
