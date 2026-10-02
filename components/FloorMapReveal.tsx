'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

const ROOM_DATA: Record<string, { name: string; note: string }> = {
  I:   { name: 'Projects',     note: 'Selected works & case studies' },
  II:  { name: 'Skills',       note: 'Tools, technologies & disciplines' },
  III: { name: 'Education',    note: 'Academic background & training' },
  IV:  { name: 'Certificates', note: 'Credentials & accomplishments' },
  V:   { name: 'Gift Shop',   note: 'Contact · Collaboration · Opportunities' },
}

function FloorMapSVG() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const roomFill = (room: string) => {
    if (selected === room) return 'rgba(180,230,80,0.22)'
    if (hovered === room) return 'rgba(180,230,80,0.11)'
    return 'transparent'
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          background: '#1E3B45',
          color: '#AADD00',
          padding: '5px 12px',
          fontSize: '10px',
          letterSpacing: '0.2em',
        }}>Floor Map</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(30,59,69,0.2)' }} />
        <span style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#8A8E7B',
        }}>Click a room to explore</span>
      </div>

      {/* Map container */}
      <div style={{
        position: 'relative',
        background: '#F7F6F0',
        border: '1px solid rgba(30,59,69,0.2)',
        padding: '32px 32px 20px',
      }}>
        {/* North indicator */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '3px',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#9A9E8D',
          pointerEvents: 'none',
          zIndex: 2,
          fontFamily: 'var(--font-mono), monospace',
          lineHeight: 1.4,
        }}>
          <span style={{ fontSize: '16px', lineHeight: 1, marginBottom: '2px' }}>↑</span>
          <span>N</span>
          <span style={{ marginTop: '8px' }}>Not to scale</span>
          <span>NPSM.GF.2026</span>
        </div>

        <svg viewBox="0 0 800 720" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <pattern id="hall-hatch-reveal" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(30,59,69,0.055)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Floor fills */}
          <rect x="60"  y="50"  width="250" height="480" fill="#FAF8F2" />
          <rect x="490" y="50"  width="250" height="480" fill="#FAF8F2" />
          <rect x="310" y="50"  width="180" height="480" fill="#F2EFE6" />
          <rect x="310" y="50"  width="180" height="480" fill="url(#hall-hatch-reveal)" />
          <rect x="490" y="370" width="250" height="160" fill="#F5F8ED" />
          <rect x="350" y="530" width="100" height="80"  fill="#F2EFE6" />
          <rect x="350" y="530" width="100" height="80"  fill="url(#hall-hatch-reveal)" />

          {/* Faint background numerals */}
          {[
            { x: 185, y: 130, t: 'I'   },
            { x: 185, y: 290, t: 'II'  },
            { x: 185, y: 450, t: 'III' },
            { x: 615, y: 130, t: 'IV'  },
            { x: 615, y: 290, t: 'V'   },
          ].map(({ x, y, t }) => (
            <text key={t} x={x} y={y} fontFamily="Georgia,serif" fontSize="90" fill="rgba(30,59,69,0.038)" textAnchor="middle" dominantBaseline="middle" fontStyle="italic">{t}</text>
          ))}

          {/* Interactive room overlays */}
          {[
            { room: 'I',   x: 60,  y: 50,  w: 250, h: 160 },
            { room: 'II',  x: 60,  y: 210, w: 250, h: 160 },
            { room: 'III', x: 60,  y: 370, w: 250, h: 160 },
            { room: 'IV',  x: 490, y: 50,  w: 250, h: 160 },
            { room: 'V',   x: 490, y: 210, w: 250, h: 160 },
          ].map(({ room, x, y, w, h }) => (
            <rect
              key={room}
              x={x} y={y} width={w} height={h}
              fill={roomFill(room)}
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHovered(room)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === room ? null : room)}
            />
          ))}

          {/* Outer walls */}
          <g stroke="#1E3B45" strokeWidth="2" strokeLinecap="square" fill="none">
            <line x1="60"  y1="50"  x2="740" y2="50"  />
            <line x1="60"  y1="50"  x2="60"  y2="530" />
            <line x1="740" y1="50"  x2="740" y2="370" />
            <line x1="60"  y1="530" x2="350" y2="530" />
            <line x1="450" y1="530" x2="490" y2="530" />
            <line x1="350" y1="530" x2="350" y2="610" />
            <line x1="450" y1="530" x2="450" y2="610" />
            <line x1="350" y1="610" x2="382" y2="610" />
            <line x1="418" y1="610" x2="450" y2="610" />
          </g>

          {/* Internal walls */}
          <g stroke="#1E3B45" strokeWidth="1.5" strokeLinecap="square" fill="none">
            <line x1="310" y1="50"  x2="310" y2="100" /><line x1="310" y1="154" x2="310" y2="210" />
            <line x1="310" y1="210" x2="310" y2="260" /><line x1="310" y1="314" x2="310" y2="370" />
            <line x1="310" y1="370" x2="310" y2="420" /><line x1="310" y1="474" x2="310" y2="530" />
            <line x1="490" y1="50"  x2="490" y2="100" /><line x1="490" y1="154" x2="490" y2="210" />
            <line x1="490" y1="210" x2="490" y2="260" /><line x1="490" y1="314" x2="490" y2="370" />
            <line x1="490" y1="370" x2="490" y2="530" />
            <line x1="60"  y1="210" x2="310" y2="210" /><line x1="60"  y1="370" x2="310" y2="370" />
            <line x1="490" y1="210" x2="740" y2="210" /><line x1="490" y1="370" x2="740" y2="370" />
          </g>

          {/* Door arcs */}
          <g stroke="#1E3B45" strokeWidth="0.9" fill="none">
            <path d="M310,100 L310,154 A54,54 0 0 1 256,100" />
            <path d="M310,260 L310,314 A54,54 0 0 1 256,260" />
            <path d="M310,420 L310,474 A54,54 0 0 1 256,420" />
            <path d="M490,100 L490,154 A54,54 0 0 0 544,100" />
            <path d="M490,260 L490,314 A54,54 0 0 0 544,260" />
          </g>

          {/* Structural columns */}
          <g fill="#1E3B45">
            {[
              [60,50],[740,50],[60,530],[310,50],[490,50],[310,530],[490,530],
            ].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" />)}
            {[
              [310,210],[490,210],[310,370],[490,370],
            ].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />)}
            {[
              [60,210],[740,210],[60,370],[740,370],[350,530],[450,530],
            ].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />)}
          </g>

          {/* Room labels */}
          {[
            { x: 80,  y: 72,  mono: 'ROOM I',   serif: 'Projects',     sY: 90  },
            { x: 80,  y: 232, mono: 'ROOM II',  serif: 'Skills',       sY: 250 },
            { x: 80,  y: 392, mono: 'ROOM III', serif: 'Education',    sY: 410 },
            { x: 508, y: 72,  mono: 'ROOM IV', serif: 'Certificates', sY: 90  },
            { x: 508, y: 232, mono: 'ROOM V',  serif: 'Gift Shop',    sY: 250 },
          ].map(({ x, y, mono, serif, sY }) => (
            <g key={mono}>
              <text x={x} y={y}  fontFamily="monospace" fontSize="8.5" letterSpacing="2.5" fill="#8A8E7B">{mono}</text>
              <text x={x} y={sY} fontFamily="Georgia,serif" fontSize="16" fontStyle="italic" fill="#1E3B45">{serif}</text>
            </g>
          ))}
          <text x="508" y="266" fontFamily="monospace" fontSize="8" letterSpacing="1.5" fill="#8A8E7B">(Contact)</text>

          {/* Hall label */}
          <text x="400" y="290" fontFamily="monospace" fontSize="9" letterSpacing="4" fill="rgba(30,59,69,0.42)" textAnchor="middle" dominantBaseline="middle" transform="rotate(-90,400,290)">GRAND HALL</text>

          {/* Vestibule */}
          <text x="400" y="573" fontFamily="monospace" fontSize="8" letterSpacing="2.5" fill="rgba(30,59,69,0.48)" textAnchor="middle">ENTRY</text>
          <line x1="382" y1="606" x2="382" y2="616" stroke="#1E3B45" strokeWidth="1.5" />
          <line x1="418" y1="606" x2="418" y2="616" stroke="#1E3B45" strokeWidth="1.5" />
          <text x="400" y="700" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="#8A8E7B" textAnchor="middle">▼  Main Entrance</text>

          {/* You are here */}
          <circle cx="400" cy="612" r="4.5" fill="#B4E650" />
          <circle cx="400" cy="612" r="9" fill="none" stroke="#B4E650" strokeWidth="1" opacity="0.45" />
        </svg>
      </div>

      {/* Room info panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            padding: '22px 32px',
            border: '1px solid rgba(30,59,69,0.22)',
            borderTop: '3px solid #AADD00',
            background: 'rgba(170,221,0,0.04)',
            marginTop: '0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8A8E7B',
            }}>Room {selected}</span>
            <span style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '22px',
              color: '#1E3B45',
              lineHeight: 1.1,
            }}>{ROOM_DATA[selected].name}</span>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              lineHeight: 1.8,
              color: '#5A6B66',
              marginTop: '2px',
            }}>{ROOM_DATA[selected].note}</span>
          </div>
          <button
            onClick={() => setSelected(null)}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1E3B45',
              border: '1px solid rgba(30,59,69,0.4)',
              padding: '13px 24px',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1E3B45'; (e.currentTarget as HTMLButtonElement).style.color = '#AADD00' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#1E3B45' }}
          >
            Enter Room {selected} →
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default function FloorMapReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const clipStart = useTransform(scrollYProgress, [0, 0.6], [32, 0])
  const clipEnd   = useTransform(scrollYProgress, [0, 0.6], [68, 100])
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  return (
    <section
      ref={ref}
      style={{ height: '300vh', background: '#0D1C22', position: 'relative' }}
    >
      {/* Sticky reveal container */}
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          clipPath,
          overflow: 'hidden',
          background: '#F3F4EA',
          willChange: 'clip-path',
        }}
      >
        {/* Inner scroll area for the map */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
            <div style={{
              borderTop: '1px solid rgba(20,23,15,0.1)',
              marginBottom: '32px',
            }} />
            <FloorMapSVG />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
