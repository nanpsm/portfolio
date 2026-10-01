'use client'

import { useState } from 'react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

const ROOM_SECTIONS: Record<string, string> = {
  I:   'projects',
  II:  'skills',
  III: 'education',
  IV:  'experience',
  V:   'certificates',
  VI:  'contact',
}

function FloorMapPage({ hovered, setHovered }: {
  hovered: string | null
  setHovered: (r: string | null) => void
}) {
  const roomFill = (room: string) => {
    if (hovered === room) return 'rgba(180,230,80,0.22)'
    return 'transparent'
  }

  const goToRoom = (room: string) => {
    const id = ROOM_SECTIONS[room]
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      background: '#F3F4EA',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 16px 8px',
      fontFamily: 'var(--font-mono), monospace',
      color: '#14170F',
    }}>

      {/* ── Plan label ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1E3B45', fontWeight: 500, whiteSpace: 'nowrap' }}>Ground Floor · Plan</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(30,59,69,0.18)' }} />
        <span style={{ fontSize: '8px', letterSpacing: '0.13em', color: '#9A9E8D', whiteSpace: 'nowrap' }}>Not to Scale · NPSM.GF.2026 ↑ N</span>
      </div>

      {/* ── Floor map SVG ── */}
      <div style={{
        flex: 1,
        border: '1px solid rgba(30,59,69,0.18)',
        background: '#F7F6F0',
        padding: '8px',
        minHeight: 0,
        position: 'relative',
      }}>
        <svg viewBox="0 0 800 720" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <pattern id="hall-hatch-cf" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(30,59,69,0.055)" strokeWidth="0.8" />
            </pattern>
          </defs>

          <rect x="60"  y="50"  width="250" height="480" fill="#FAF8F2" />
          <rect x="490" y="50"  width="250" height="480" fill="#FAF8F2" />
          <rect x="310" y="50"  width="180" height="480" fill="#F2EFE6" />
          <rect x="310" y="50"  width="180" height="480" fill="url(#hall-hatch-cf)" />
          <rect x="350" y="530" width="100" height="80"  fill="#F2EFE6" />
          <rect x="350" y="530" width="100" height="80"  fill="url(#hall-hatch-cf)" />

          {[
            { x: 185, y: 130, t: 'I' }, { x: 185, y: 290, t: 'II' }, { x: 185, y: 450, t: 'III' },
            { x: 615, y: 130, t: 'IV' }, { x: 615, y: 290, t: 'V' }, { x: 615, y: 450, t: 'VI' },
          ].map(({ x, y, t }) => (
            <text key={t} x={x} y={y} fontFamily="Georgia,serif" fontSize="90" fill="rgba(30,59,69,0.038)" textAnchor="middle" dominantBaseline="middle" fontStyle="italic">{t}</text>
          ))}

          {[
            { room: 'I', x: 60, y: 50, w: 250, h: 160 }, { room: 'II', x: 60, y: 210, w: 250, h: 160 },
            { room: 'III', x: 60, y: 370, w: 250, h: 160 }, { room: 'IV', x: 490, y: 50, w: 250, h: 160 },
            { room: 'V', x: 490, y: 210, w: 250, h: 160 }, { room: 'VI', x: 490, y: 370, w: 250, h: 160 },
          ].map(({ room, x, y, w, h }) => (
            <rect key={room} x={x} y={y} width={w} height={h}
              fill={roomFill(room)} style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHovered(room)} onMouseLeave={() => setHovered(null)}
              onClick={() => goToRoom(room)} />
          ))}

          <g stroke="#1E3B45" strokeWidth="2" strokeLinecap="square" fill="none">
            <line x1="60" y1="50" x2="740" y2="50" /><line x1="60" y1="50" x2="60" y2="530" />
            <line x1="740" y1="50" x2="740" y2="530" /><line x1="60" y1="530" x2="350" y2="530" />
            <line x1="450" y1="530" x2="740" y2="530" /><line x1="350" y1="530" x2="350" y2="610" />
            <line x1="450" y1="530" x2="450" y2="610" /><line x1="350" y1="610" x2="382" y2="610" />
            <line x1="418" y1="610" x2="450" y2="610" />
          </g>
          <g stroke="#1E3B45" strokeWidth="1.5" strokeLinecap="square" fill="none">
            <line x1="310" y1="50" x2="310" y2="100" /><line x1="310" y1="154" x2="310" y2="210" />
            <line x1="310" y1="210" x2="310" y2="260" /><line x1="310" y1="314" x2="310" y2="370" />
            <line x1="310" y1="370" x2="310" y2="420" /><line x1="310" y1="474" x2="310" y2="530" />
            <line x1="490" y1="50" x2="490" y2="100" /><line x1="490" y1="154" x2="490" y2="210" />
            <line x1="490" y1="210" x2="490" y2="260" /><line x1="490" y1="314" x2="490" y2="370" />
            <line x1="490" y1="370" x2="490" y2="420" /><line x1="490" y1="474" x2="490" y2="530" />
            <line x1="60" y1="210" x2="310" y2="210" /><line x1="60" y1="370" x2="310" y2="370" />
            <line x1="490" y1="210" x2="740" y2="210" /><line x1="490" y1="370" x2="740" y2="370" />
          </g>
          <g stroke="#1E3B45" strokeWidth="0.9" fill="none">
            <path d="M310,100 L310,154 A54,54 0 0 1 256,100" /><path d="M310,260 L310,314 A54,54 0 0 1 256,260" />
            <path d="M310,420 L310,474 A54,54 0 0 1 256,420" /><path d="M490,100 L490,154 A54,54 0 0 0 544,100" />
            <path d="M490,260 L490,314 A54,54 0 0 0 544,260" /><path d="M490,420 L490,474 A54,54 0 0 0 544,420" />
          </g>
          <g fill="#1E3B45">
            {([[60,50],[740,50],[60,530],[740,530],[310,50],[490,50],[310,530],[490,530]] as [number,number][]).map(([cx,cy]) => <circle key={`a${cx}${cy}`} cx={cx} cy={cy} r="4.5" />)}
            {([[310,210],[490,210],[310,370],[490,370]] as [number,number][]).map(([cx,cy]) => <circle key={`b${cx}${cy}`} cx={cx} cy={cy} r="4" />)}
            {([[60,210],[740,210],[60,370],[740,370],[350,530],[450,530]] as [number,number][]).map(([cx,cy]) => <circle key={`c${cx}${cy}`} cx={cx} cy={cy} r="3.5" />)}
          </g>

          {[
            { x: 80, y: 72, mono: 'ROOM I', serif: 'Projects', sY: 90 },
            { x: 80, y: 232, mono: 'ROOM II', serif: 'Skills', sY: 250 },
            { x: 80, y: 392, mono: 'ROOM III', serif: 'Education', sY: 410 },
            { x: 508, y: 72, mono: 'ROOM IV', serif: 'Experience', sY: 90 },
            { x: 508, y: 232, mono: 'ROOM V', serif: 'Certificates', sY: 250 },
            { x: 508, y: 392, mono: 'ROOM VI', serif: 'Gift Shop', sY: 410 },
          ].map(({ x, y, mono, serif, sY }) => (
            <g key={mono}>
              <text x={x} y={y} fontFamily="monospace" fontSize="8.5" letterSpacing="2.5" fill="#8A8E7B">{mono}</text>
              <text x={x} y={sY} fontFamily="Georgia,serif" fontSize="16" fontStyle="italic" fill="#1E3B45">{serif}</text>
            </g>
          ))}
          <text x="508" y="426" fontFamily="monospace" fontSize="8" letterSpacing="1.5" fill="#8A8E7B">(Contact)</text>
          <text x="400" y="290" fontFamily="monospace" fontSize="9" letterSpacing="4" fill="rgba(30,59,69,0.42)" textAnchor="middle" dominantBaseline="middle" transform="rotate(-90,400,290)">GRAND HALL</text>
          <text x="400" y="573" fontFamily="monospace" fontSize="8" letterSpacing="2.5" fill="rgba(30,59,69,0.48)" textAnchor="middle">ENTRY</text>
          <line x1="382" y1="606" x2="382" y2="616" stroke="#1E3B45" strokeWidth="1.5" />
          <line x1="418" y1="606" x2="418" y2="616" stroke="#1E3B45" strokeWidth="1.5" />
          <text x="400" y="700" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="#8A8E7B" textAnchor="middle">▼  Main Entrance</text>
          <circle cx="400" cy="612" r="4.5" fill="#B4E650" />
          <circle cx="400" cy="612" r="9" fill="none" stroke="#B4E650" strokeWidth="1" opacity="0.45" />
        </svg>
      </div>

      {/* ── Footer legend ── */}
      <div style={{ borderTop: '1px solid rgba(30,59,69,0.14)', marginTop: '6px', paddingTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: 'var(--font-mono), monospace', fontSize: '7px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8E7B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '9px', height: '9px', background: '#FAF8F2', border: '1px solid rgba(30,59,69,0.28)' }} />
            <span>Gallery</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '9px', height: '9px', background: '#EEECEA', border: '1px solid rgba(30,59,69,0.2)' }} />
            <span>Circulation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1E3B45' }} />
            <span>Column</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#B4E650' }} />
            <span>You are here</span>
          </div>
        </div>
        <span style={{ fontSize: '7px', letterSpacing: '0.16em', color: '#8A8E7B', textTransform: 'uppercase' }}>
          npsm.studio · Singapore · 2026
        </span>
      </div>
    </div>
  )
}

export default function CatalogFloorMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div id="floor-map" style={{ background: '#F5F8ED' }}>
      <ContainerScroll
        titleComponent={
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            <div style={{
              fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase',
              color: '#8A8E7B', marginBottom: '16px',
            }}>
              Museum of Personal Practice · NPSM · 2026
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif', fontWeight: 400,
              fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95,
              color: '#1E3B45', margin: '0 0 14px', letterSpacing: '-0.02em',
            }}>
              Floor Map
            </h2>
            <p style={{
              fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic',
              fontSize: '17px', color: '#6E8388', margin: 0,
            }}>
              A Portfolio in Six Rooms
            </p>
          </div>
        }
      >
        <FloorMapPage hovered={hovered} setHovered={setHovered} />
      </ContainerScroll>
    </div>
  )
}
