'use client'

import { useState, useEffect, useRef } from 'react'

const ROOMS = [
  { name: 'Artist Intro', room: 'Lobby',            id: 'intro' },
  { name: 'Floor Map',    room: 'Grand Hall',        id: 'floor-map' },
  { name: 'Projects',     room: 'Room I',            id: 'projects' },
  { name: 'Skills',       room: 'Room II',           id: 'skills' },
  { name: 'Education',    room: 'Room III',          id: 'education' },
  { name: 'Certificates', room: 'Room IV',           id: 'certificates' },
  { name: 'Gift Shop',    room: 'Room V · Contact',  id: 'contact' },
]

const MARGIN = 32
const BADGE  = 76

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

function toCornerStyle(corner: Corner): React.CSSProperties {
  switch (corner) {
    case 'top-left':     return { top: MARGIN,    left: MARGIN,  bottom: 'auto', right: 'auto' }
    case 'top-right':    return { top: MARGIN,    right: MARGIN, bottom: 'auto', left: 'auto'  }
    case 'bottom-left':  return { bottom: MARGIN, left: MARGIN,  top: 'auto',    right: 'auto' }
    case 'bottom-right': return { bottom: MARGIN, right: MARGIN, top: 'auto',    left: 'auto'  }
  }
}

function nearestCorner(x: number, y: number): Corner {
  const h = y < window.innerHeight / 2 ? 'top' : 'bottom'
  const v = x < window.innerWidth  / 2 ? 'left' : 'right'
  return `${h}-${v}` as Corner
}

export default function MuseumNav() {
  const [open, setOpen]               = useState(false)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [corner, setCorner]           = useState<Corner>('bottom-right')
  const [dragPos, setDragPos]         = useState<{ x: number; y: number } | null>(null)

  // Drag state — all refs so event handlers never go stale
  const isDragging  = useRef(false)
  const hasMoved    = useRef(false)
  const dragStart   = useRef({ x: 0, y: 0 })
  const buttonStart = useRef({ x: 0, y: 0 })
  const dragPosRef  = useRef<{ x: number; y: number } | null>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)

  // Restore saved corner
  useEffect(() => {
    try {
      const saved = localStorage.getItem('museum-nav-corner') as Corner | null
      if (saved) setCorner(saved)
    } catch {}
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Global move / end listeners
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const dx = clientX - dragStart.current.x
      const dy = clientY - dragStart.current.y

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true

      const x = Math.max(0, Math.min(window.innerWidth  - BADGE, buttonStart.current.x + dx))
      const y = Math.max(0, Math.min(window.innerHeight - BADGE, buttonStart.current.y + dy))
      const pos = { x, y }
      dragPosRef.current = pos
      setDragPos(pos)
    }

    const handleEnd = () => {
      if (!isDragging.current) return
      isDragging.current = false

      if (hasMoved.current) {
        const pos = dragPosRef.current
        if (pos) {
          const next = nearestCorner(pos.x + BADGE / 2, pos.y + BADGE / 2)
          setCorner(next)
          try { localStorage.setItem('museum-nav-corner', next) } catch {}
        }
        dragPosRef.current = null
        setDragPos(null)
        // Keep hasMoved true for 50 ms so the trailing onClick is absorbed
        setTimeout(() => { hasMoved.current = false }, 50)
      }
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup',   handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend',  handleEnd)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup',   handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend',  handleEnd)
    }
  }, [])

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (open) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    isDragging.current  = true
    hasMoved.current    = false
    dragStart.current   = { x: clientX, y: clientY }
    if (badgeRef.current) {
      const r = badgeRef.current.getBoundingClientRect()
      buttonStart.current = { x: r.left, y: r.top }
    }
  }

  const handleClick = () => {
    if (!hasMoved.current) setOpen(o => !o)
  }

  // ── Derived values ──────────────────────────────────────────────────────
  const panelTranslate = open ? 'translateX(0)' : 'translateX(100%)'

  const badgeStyle: React.CSSProperties = dragPos
    ? { position: 'fixed', top: dragPos.y, left: dragPos.x, zIndex: 100 }
    : {
        position: 'fixed',
        ...toCornerStyle(corner),
        zIndex: 100,
        transition: 'top 0.35s cubic-bezier(0.34,1.56,0.64,1), bottom 0.35s cubic-bezier(0.34,1.56,0.64,1), left 0.35s cubic-bezier(0.34,1.56,0.64,1), right 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }

  const mapRooms = [
    { id: 'projects',     label: 'ROOM I',   name: 'Projects',     x: 20,  y: 10,  w: 118, h: 64 },
    { id: 'skills',       label: 'ROOM II',  name: 'Skills',       x: 20,  y: 74,  w: 118, h: 64 },
    { id: 'education',    label: 'ROOM III', name: 'Education',    x: 20,  y: 138, w: 118, h: 64 },
    { id: 'certificates', label: 'ROOM IV',  name: 'Certificates', x: 262, y: 10,  w: 118, h: 64 },
    { id: 'contact',      label: 'ROOM V',   name: 'Gift Shop',    x: 262, y: 74,  w: 118, h: 64 },
  ]

  const navigate = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      {/* ── Badge ── */}
      <div style={badgeStyle} ref={badgeRef}>
        {!open && !dragPos && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid rgba(30,59,69,0.4)',
            animation: 'museumPulse 2.4s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
        <button
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          onClick={handleClick}
          style={{
            width: `${BADGE}px`, height: `${BADGE}px`,
            borderRadius: '50%',
            background: open ? '#162D36' : '#1E3B45',
            border: 'none',
            cursor: dragPos ? 'grabbing' : 'grab',
            boxShadow: dragPos
              ? '0 16px 40px rgba(20,23,15,0.4)'
              : '0 8px 24px rgba(20,23,15,0.28)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '5px',
            transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s',
            transform: dragPos ? 'scale(1.1)' : 'scale(1)',
            userSelect: 'none',
            touchAction: 'none',
          }}
          onMouseEnter={e => { if (!dragPos) (e.currentTarget as HTMLButtonElement).style.background = '#162D36' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = open ? '#162D36' : '#1E3B45' }}
        >
          <svg width="32" height="24" viewBox="0 0 24 18" fill="none">
            <rect x="1"  y="1"  width="9" height="7" stroke="#B4E650"              strokeWidth="1.2"/>
            <rect x="14" y="1"  width="9" height="7" stroke="rgba(180,230,80,.5)"  strokeWidth="1.2"/>
            <rect x="1"  y="10" width="9" height="7" stroke="rgba(180,230,80,.5)"  strokeWidth="1.2"/>
            <rect x="14" y="10" width="9" height="7" stroke="rgba(180,230,80,.5)"  strokeWidth="1.2"/>
            <line x1="10" y1="4.5"  x2="14" y2="4.5"  stroke="rgba(180,230,80,.35)" strokeWidth="1"/>
            <line x1="10" y1="13.5" x2="14" y2="13.5" stroke="rgba(180,230,80,.35)" strokeWidth="1"/>
          </svg>
          <span style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '7.5px', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(180,230,80,0.75)', pointerEvents: 'none',
          }}>
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
          position: 'fixed', top: 0, bottom: 0,
          right: 0, left: 'auto',
          width: '440px',
          zIndex: 300,
          background: 'linear-gradient(160deg, #1E3B45, #122730)',
          transform: panelTranslate,
          transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.18, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          position: 'absolute', right: '-60px', bottom: '-80px',
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '420px', color: 'rgba(180,230,80,0.03)',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>N</div>

        {/* Header */}
        <div style={{ padding: '20px 28px 0', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.6)' }}>
              Museum Guide
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'rgba(244,239,228,0.4)', lineHeight: 1, padding: '0 0 0 12px', transition: 'color 0.18s', fontFamily: 'inherit' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#F4EFE4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,239,228,0.4)' }}
            >×</button>
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontStyle: 'italic', fontSize: '20px', color: '#F4EFE4', margin: '0 0 14px' }}>
            Where would you like to go?
          </h2>
          <div style={{ height: '1px', background: 'rgba(180,230,80,0.14)' }} />
        </div>

        {/* Mini Floor Map */}
        <div style={{ padding: '12px 28px 0', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <svg viewBox="0 0 400 210" width="100%" style={{ display: 'block' }}>
            <defs>
              <pattern id="nav-hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(180,230,80,0.08)" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect x="138" y="10" width="124" height="192" fill="url(#nav-hatch)" stroke="rgba(180,230,80,0.2)" strokeWidth="0.8"/>
            <text x="200" y="106" fontFamily="monospace" fontSize="7" letterSpacing="3" fill="rgba(180,230,80,0.42)" textAnchor="middle" dominantBaseline="middle" transform="rotate(-90,200,106)">GRAND HALL</text>
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

        {/* Room List */}
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
              <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{r.name}</span>
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontSize: '11px', opacity: 0.5 }}>{r.room}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
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
