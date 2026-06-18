'use client'

import { useState } from 'react'
import { SlotKey, PortfolioData } from '@/app/page'
import { Project, Skill, ContactLink, supabase } from '@/lib/supabase'

type Props = { dispensed: SlotKey | null; data: PortfolioData }

export default function ContentPanel({ dispensed, data }: Props) {
  if (!dispensed) {
    return (
      <div
        className="flex-1 min-h-[360px] rounded-3xl p-8"
        style={{ background: '#FAE8CC', border: '3px solid #D4844A', boxShadow: '6px 6px 0px #A85C2A', minWidth: 320 }}
      >
        <div style={{ fontFamily: 'monospace' }}>
          {/* User line */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#A09080', fontWeight: 700, marginBottom: 4 }}>USER:</p>
            <p style={{ fontSize: 13, letterSpacing: '0.08em', color: '#3D2B1F', fontWeight: 900 }}>
              {data.profile?.name?.toUpperCase() ?? 'NAN PHYU SIN MAUNG'}
            </p>
          </div>

          {/* Role */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#A09080', fontWeight: 700, marginBottom: 4 }}>ROLE:</p>
            <p style={{ fontSize: 13, letterSpacing: '0.08em', color: '#3D2B1F', fontWeight: 900 }}>
              {data.profile?.role?.toUpperCase() ?? 'FULL STACK DEVELOPER'}
            </p>
          </div>

          <div style={{ height: 1, background: '#D4844A40', marginBottom: 20 }} />

          {/* Interests */}
          {(data.profile?.interests?.length ?? 0) > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#A09080', fontWeight: 700, marginBottom: 8 }}>INTERESTS:</p>
              {data.profile!.interests.map(item => (
                <p key={item} style={{ fontSize: 12, letterSpacing: '0.06em', color: '#3D2B1F', fontWeight: 800, marginBottom: 4 }}>
                  {item.toUpperCase()}
                </p>
              ))}
            </div>
          )}

          {data.profile?.mission && (
            <>
              <div style={{ height: 1, background: '#D4844A40', marginBottom: 20 }} />
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#A09080', fontWeight: 700, marginBottom: 8 }}>MISSION:</p>
                <p style={{ fontSize: 11, letterSpacing: '0.04em', color: '#3D2B1F', fontWeight: 700, lineHeight: 1.7 }}>
                  {data.profile.mission.toUpperCase()}
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    )
  }

  return (
    <div
      className="flex-1 rounded-3xl p-6 drop-item overflow-auto max-h-[70vh]"
      style={{ background: '#FAE8CC', border: '3px solid #D4844A', boxShadow: '6px 6px 0px #A85C2A', minWidth: 320 }}
    >
      {dispensed === 'about'    && <AboutContent profile={data.profile} />}
      {dispensed === 'projects' && <ProjectsContent projects={data.projects} />}
      {dispensed === 'skills'   && <SkillsContent skills={data.skills} />}
      {dispensed === 'contact'  && <ContactContent links={data.contactLinks} />}
    </div>
  )
}

function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="mb-5 pb-3" style={{ borderBottom: '2px dashed #D4844A60' }}>
      <p style={{ fontFamily: 'monospace', fontSize: 19, letterSpacing: '0.18em', fontWeight: 900, color: '#A85C2A', textAlign: 'center' }}>
        ── {title.toUpperCase()} ──
      </p>
    </div>
  )
}

function AboutContent({ profile }: { profile: PortfolioData['profile'] }) {
  const focusAreas = profile?.focus_areas?.length
    ? profile.focus_areas
    : ['Full Stack Development', 'AI Integration', 'UI/UX Design', 'Database Systems']
  const exploring = profile?.interests?.length
    ? profile.interests
    : ['Next.js & React', 'AI-Powered Applications', 'System Design', 'Modern Web Technologies']

  const mono: React.CSSProperties = { fontFamily: 'monospace' }

  return (
    <div>
      <SectionTitle emoji="👾" title="User Profile" />

      {/* Two column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>

        {/* Left */}
        <div className="rounded-2xl p-4" style={{ background: '#FFFFFF80', border: '2px solid #D4844A40' }}>
          <p style={{ ...mono, fontSize: 13, fontWeight: 900, letterSpacing: '0.08em', color: 'var(--warm-dark)', marginBottom: 10 }}>
            Hi, I&apos;m {profile?.name?.split(' ')[0] ?? 'Nan'}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <p style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--warm-brown)' }}>
              {(profile?.role ?? 'Full Stack Developer').toUpperCase()}
            </p>
            {profile?.bio && (
              <p style={{ ...mono, fontSize: 10, fontWeight: 600, color: 'var(--warm-dark)', lineHeight: 1.7, marginTop: 4 }}>
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="rounded-2xl p-4" style={{ background: '#FFFFFF80', border: '2px solid #D4844A40' }}>
          <p style={{ ...mono, fontSize: 9, fontWeight: 900, letterSpacing: '0.2em', color: '#A09080', marginBottom: 10 }}>
            FOCUS AREAS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {focusAreas.map(f => (
              <p key={f} style={{ ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--warm-dark)' }}>
                {f}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom — Currently Exploring */}
      <div className="rounded-2xl p-4" style={{ background: '#FFFFFF80', border: '2px solid #D4844A40' }}>
        <p style={{ ...mono, fontSize: 9, fontWeight: 900, letterSpacing: '0.2em', color: '#A09080', marginBottom: 10 }}>
          CURRENTLY EXPLORING
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {exploring.map(item => (
            <span key={item} style={{
              ...mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
              padding: '4px 10px', borderRadius: 6,
              background: '#FAE8CC', border: '1.5px solid #D4844A60', color: 'var(--warm-dark)',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {profile?.resume_url && (
        <a
          href={profile.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'monospace', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em',
            padding: '10px 16px', borderRadius: 8, display: 'inline-block', marginTop: 12,
            background: '#FFFFFF80', color: '#3D2B1F',
            border: '2px solid #D4844A60', textDecoration: 'none',
          }}
        >
          [ DOWNLOAD RESUME ]
        </a>
      )}
    </div>
  )
}

const CAT_COLORS: Record<string, string> = {
  Frontend:  '#F87171',
  Backend:   '#34D399',
  Fullstack: '#C084FC',
  Other:     '#FBBF24',
}

const SLOT_ROWS = ['A', 'B', 'C', 'D']

function slotCode(index: number) {
  const row = SLOT_ROWS[Math.floor(index / 3)] ?? 'Z'
  const col = (index % 3) + 1
  return `${row}${col}`
}

function ProjectsContent({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const [dispensing, setDispensing] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category || 'Other')))]
  const filtered = activeCategory === 'All' ? projects : projects.filter(p => (p.category || 'Other') === activeCategory)

  function selectSlot(p: Project) {
    if (dispensing) return
    setDispensing(true)
    setSelected(null)
    setTimeout(() => {
      setSelected(p)
      setDispensing(false)
    }, 400)
  }

  const c = CAT_COLORS[selected?.category ?? ''] ?? '#FBBF24'

  return (
    <div>
      {/* Header */}
      <div className="mb-4 pb-3" style={{ borderBottom: '2px dashed #D4844A60' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 19, letterSpacing: '0.18em', fontWeight: 900, color: '#A85C2A', textAlign: 'center' }}>
          ── PROJECT INVENTORY ──
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.15em', color: '#A09080', textAlign: 'center', marginTop: 2 }}>
          {filtered.length} ITEM{filtered.length !== 1 ? 'S' : ''} IN STOCK · {activeCategory.toUpperCase()}
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {categories.map(cat => {
          const cc = CAT_COLORS[cat] ?? '#FBBF24'
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelected(null) }}
              style={{
                fontFamily: 'monospace', fontSize: 9, fontWeight: 900, letterSpacing: '0.15em',
                padding: '3px 10px', borderRadius: 4,
                background: isActive ? cc : cc + '20',
                border: `1.5px solid ${cc}80`,
                color: isActive ? '#fff' : 'var(--warm-dark)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* Slot grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {filtered.map((p, i) => {
          const sc = CAT_COLORS[p.category] ?? '#FBBF24'
          const isActive = selected?.id === p.id
          return (
            <button
              key={p.id}
              onClick={() => selectSlot(p)}
              style={{
                background: isActive ? sc + '25' : '#FFFFFF80',
                border: `2px solid ${isActive ? sc : '#D4844A50'}`,
                borderRadius: 10,
                padding: '8px 6px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                boxShadow: isActive ? `0 0 0 2px ${sc}50` : 'none',
                textAlign: 'center',
              }}
            >
              {/* Slot code badge */}
              <div style={{
                fontFamily: 'monospace', fontSize: 9, fontWeight: 900,
                color: isActive ? '#fff' : '#A09080',
                background: isActive ? sc : '#D4844A30',
                borderRadius: 4, padding: '1px 5px',
                display: 'inline-block', marginBottom: 5, letterSpacing: '0.1em',
              }}>
                {slotCode(i)}
              </div>
              {/* Color dot for category */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: sc, margin: '0 auto 4px',
              }} />
              {/* Title truncated */}
              <p style={{
                fontFamily: 'monospace', fontSize: 9, fontWeight: 800,
                color: 'var(--warm-dark)', letterSpacing: '0.05em',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}>
                {p.title}
              </p>
            </button>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#A09080' }}>NO ITEMS IN STOCK</p>
          </div>
        )}
      </div>

      {/* Dispensed project display */}
      <div style={{
        borderTop: '2px dashed #D4844A60',
        paddingTop: 14,
        minHeight: 120,
      }}>
        {dispensing && (
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', color: '#A09080', textAlign: 'center', paddingTop: 20 }}>
            DISPENSING...
          </p>
        )}
        {!dispensing && !selected && (
          <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.15em', color: '#C0B0A0', textAlign: 'center', paddingTop: 20 }}>
            SELECT A SLOT ABOVE
          </p>
        )}
        {!dispensing && selected && (
          <div className="drop-item">
            <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em', fontWeight: 900, color: '#A85C2A', marginBottom: 10 }}>
              ── DISPENSED PROJECT ──
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.15em', color: '#A09080', fontWeight: 700, marginBottom: 2 }}>
                  {selected.category?.toUpperCase() ?? 'PROJECT'}
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--warm-dark)', lineHeight: 1.2, marginBottom: 4 }}>
                  {selected.title}
                </h3>
              </div>
              <span style={{
                fontFamily: 'monospace', fontSize: 8, fontWeight: 900,
                background: c, color: '#fff',
                padding: '2px 7px', borderRadius: 4, letterSpacing: '0.1em', flexShrink: 0,
              }}>
                {slotCode(filtered.findIndex(p => p.id === selected.id))}
              </span>
            </div>

            {selected.description && (
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--warm-brown)', lineHeight: 1.5, marginBottom: 10 }}>
                {selected.description}
              </p>
            )}

            {selected.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {selected.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'monospace', fontSize: 9, fontWeight: 700,
                    padding: '2px 7px', borderRadius: 4,
                    background: c + '20', border: `1px solid ${c}60`, color: 'var(--warm-dark)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              {selected.link && (
                <a href={selected.link} target="_blank" rel="noopener noreferrer"
                  className="transition-all hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: 'monospace', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em',
                    padding: '6px 14px', borderRadius: 6,
                    background: 'linear-gradient(145deg, #E8834A, #C8531A)',
                    color: '#FAE8CC', border: '2px solid #A03010',
                    boxShadow: '0 2px 0 #A03010', textDecoration: 'none',
                  }}>
                  [ LIVE DEMO ]
                </a>
              )}
              {selected.image_url && selected.image_url.includes('github') && (
                <a href={selected.image_url} target="_blank" rel="noopener noreferrer"
                  className="transition-all hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: 'monospace', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em',
                    padding: '6px 14px', borderRadius: 6,
                    background: '#FFFFFF80', color: 'var(--warm-dark)',
                    border: '2px solid #D4844A60', textDecoration: 'none',
                  }}>
                  [ GITHUB ]
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CARD_ROTATIONS = [-4, 3, -2, 4, -3, 2]

const TAG_COLORS: Record<string, { bg: string; text: string; cord: string }> = {
  Frontend: { bg: '#E8834A', text: '#FFFFFF', cord: '#C8531A' },
  Backend:  { bg: '#4A7C6F', text: '#FFFFFF', cord: '#2A5C4F' },
  Design:   { bg: '#6B5B8E', text: '#FFFFFF', cord: '#FFFFFF' },
  Tools:    { bg: '#4A6FA8', text: '#FFFFFF', cord: '#2A4F88' },
  Other:    { bg: '#C8A050', text: '#FFFFFF', cord: '#8B6A20' },
}

const TAG_ACCENT: Record<string, string> = {
  Frontend: '#C8531A',
  Backend:  '#2A7A4A',
  Design:   '#6B2FA0',
  Tools:    '#1A5FA8',
  Other:    '#A07010',
}

function SkillsContent({ skills }: { skills: Skill[] }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const grouped = Object.entries(
    skills.reduce((acc, s) => {
      if (!acc[s.category]) acc[s.category] = []
      acc[s.category].push(s)
      return acc
    }, {} as Record<string, Skill[]>)
  )

  const total = grouped.length
  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(total - 1, c + 1))

  function onPointerDown(e: React.PointerEvent) {
    setDragging(true); setDragStart(e.clientX); setDragOffset(0)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return
    setDragOffset(e.clientX - dragStart)
  }
  function onPointerUp() {
    if (dragOffset < -50) next()
    else if (dragOffset > 50) prev()
    setDragging(false); setDragOffset(0)
  }

  if (total === 0) return <div><SectionTitle emoji="⚡" title="Skills" /><p style={{ color: 'var(--warm-brown)' }}>No skills yet.</p></div>

  const [cat, items] = grouped[current]
  const rotation = CARD_ROTATIONS[current % CARD_ROTATIONS.length]
  const accent = TAG_ACCENT[cat] ?? TAG_ACCENT.Other

  return (
    <div>
      <SectionTitle emoji="⚡" title="Skills" />

      {/* Spacer where rail was */}
      <div style={{ height: 8 }} />

      {/* Cards */}
      <div
        className="relative flex items-start justify-center select-none"
        style={{ minHeight: 260, cursor: dragging ? 'grabbing' : 'grab', paddingTop: 8 }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
      >
        {/* Ghost cards behind */}
        {[2, 1].filter(offset => current + offset < total).map(offset => (
          <div key={offset} className="absolute" style={{
            width: '68%',
            transform: `rotate(${CARD_ROTATIONS[(current + offset) % CARD_ROTATIONS.length]}deg) translateY(${offset * 6}px)`,
            opacity: offset === 1 ? 0.55 : 0.3,
            zIndex: offset === 1 ? 1 : 0,
            filter: 'blur(0.5px)',
          }}>
            <HangTag cat={grouped[current + offset][0]} items={[]} accent={TAG_ACCENT[grouped[current + offset][0]] ?? TAG_ACCENT.Other} ghost />
          </div>
        ))}

        {/* Active card */}
        <div className="relative z-10" style={{
          width: '72%',
          transform: `rotate(${rotation + dragOffset * 0.025}deg) translateX(${dragging ? dragOffset * 0.12 : 0}px)`,
          transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          transformOrigin: '50% 0%',
        }}>
          <HangTag cat={cat} items={items} accent={accent} counter={`${current + 1}/${total}`} />
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} disabled={current === 0}
          className="w-9 h-9 rounded-full font-black text-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-30"
          style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010', boxShadow: '0 2px 0 #A03010' }}>
          ◀
        </button>
        <div className="flex gap-2">
          {grouped.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all"
              style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? 'var(--warm-orange)' : '#D4844A60' }} />
          ))}
        </div>
        <button onClick={next} disabled={current === total - 1}
          className="w-9 h-9 rounded-full font-black text-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-30"
          style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010', boxShadow: '0 2px 0 #A03010' }}>
          ▶
        </button>
      </div>
      <p className="text-center text-xs font-bold mt-2" style={{ color: 'var(--warm-brown)', opacity: 0.5 }}>drag to browse</p>
    </div>
  )
}

function HangTag({ cat, items, accent, counter, ghost }: { cat: string; items: Skill[]; accent: string; counter?: string; ghost?: boolean }) {
  const colors = TAG_COLORS[cat] ?? TAG_COLORS.Other
  const bg = ghost ? '#D8D0C8' : colors.bg
  const cord = ghost ? '#B0A898' : colors.bg

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Cord loop above hole */}
      <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: -2 }}>
        {/* Loop of cord */}
        <path
          d="M 14 26 C 14 26, 4 18, 4 12 C 4 6, 10 3, 14 3 C 18 3, 24 6, 24 12 C 24 18, 14 26, 14 26 Z"
          fill="none"
          stroke={cord}
          strokeWidth={ghost ? 1.5 : 2}
          strokeLinecap="round"
        />
      </svg>

      {/* Tag card — portrait rectangle */}
      <div style={{
        background: bg,
        borderRadius: 10,
        boxShadow: ghost ? 'none' : '3px 6px 20px #00000025, 0 1px 4px #00000015',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: ghost ? 28 : 26,
        paddingBottom: ghost ? 24 : 28,
        paddingLeft: ghost ? 14 : 18,
        paddingRight: ghost ? 14 : 18,
      }}>
        {/* Hole at top */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: ghost ? 11 : 13, height: ghost ? 11 : 13,
          borderRadius: '50%',
          background: ghost ? '#C0B8B0' : 'radial-gradient(circle at 35% 35%, #F5D980, #C8960A 55%, #8B6400)',
          border: `1.5px solid ${ghost ? '#A09888' : '#7A5200'}`,
          boxShadow: ghost ? 'none' : '0 1px 3px #00000050, inset 0 1px 1px #FFE08040',
          zIndex: 2,
        }} />

        {/* Inset border */}
        {!ghost && (
          <div style={{
            position: 'absolute', inset: 8, borderRadius: 6,
            border: `1px solid ${colors.text}30`,
            pointerEvents: 'none',
          }} />
        )}

        {!ghost && (
          <>
            {/* Category label small */}
            <p style={{
              fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: colors.text, opacity: 0.75,
              textAlign: 'center', margin: '0 0 4px 0',
            }}>
              SKILLS
            </p>

            {/* Category name big */}
            <p style={{
              fontFamily: 'monospace', fontSize: 20, fontWeight: 900, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: colors.text,
              textAlign: 'center', margin: '0 0 14px 0', lineHeight: 1.1,
            }}>
              {cat}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: `${colors.text}30`, marginBottom: 12 }} />

            {/* Skills list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
              {items.map(s => (
                <p key={s.id} style={{
                  fontFamily: 'monospace', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: colors.text,
                  margin: 0, opacity: 0.92,
                }}>
                  {s.name}
                </p>
              ))}
            </div>

            {/* Counter */}
            {counter && (
              <>
                <div style={{ height: 1, background: `${colors.text}30`, marginTop: 14, marginBottom: 8 }} />
                <p style={{
                  fontFamily: 'monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.15em',
                  color: colors.text, opacity: 0.5, textAlign: 'center', margin: 0,
                }}>
                  {counter}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const PLATFORM_ICONS: Record<string, string> = {
  github: '🐙', linkedin: '💼', email: '📬', instagram: '📸',
  youtube: '🎬', dribbble: '🏀', behance: '🎨',
}

function ContactContent({ links }: { links: ContactLink[] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return
    setSubmitting(true)
    setError('')
    const { error: err } = await supabase.from('messages').insert({ name, email, message })
    setSubmitting(false)
    if (err) { setError('Failed to send. Please try again.'); return }
    setSubmitted(true)
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const ticketId = `#${Math.floor(10000 + Math.random() * 90000)}`

  return (
    <div>
      <SectionTitle emoji="📦" title="Customer Service" />

      {/* Receipt */}
      <div style={{
        fontFamily: 'monospace',
        background: '#FEFDF8',
        border: '1px solid #E0D8C8',
        borderRadius: 8,
        padding: '18px 20px',
        marginBottom: 20,
        boxShadow: '0 2px 8px #00000010',
        position: 'relative',
      }}>
        {/* Receipt tear top */}
        <div style={{
          position: 'absolute', top: -6, left: 0, right: 0, height: 6,
          backgroundImage: 'radial-gradient(circle at 50% 100%, #FAE8CC 6px, transparent 6px)',
          backgroundSize: '12px 6px', backgroundRepeat: 'repeat-x',
        }} />

        <p style={{ textAlign: 'center', fontWeight: 900, fontSize: 11, letterSpacing: '0.2em', color: '#3D2B1F', marginBottom: 2 }}>NAN PHYU SYSTEMS</p>
        <p style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.15em', color: '#A09080', marginBottom: 12 }}>{dateStr} · {timeStr}</p>

        <div style={{ borderTop: '1px dashed #D0C8B8', marginBottom: 12 }} />

        {links.map(link => (
          <div key={link.id} style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 8, letterSpacing: '0.2em', color: '#A09080', fontWeight: 700, marginBottom: 2 }}>
              {link.platform.toUpperCase()}
            </p>
            <a href={link.url}
              target={link.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#3D2B1F', fontWeight: 700, textDecoration: 'none', wordBreak: 'break-all' }}>
              {link.url.replace('mailto:', '').replace('https://', '')}
            </a>
          </div>
        ))}

        <div style={{ borderTop: '1px dashed #D0C8B8', margin: '12px 0' }} />

        <p style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.2em', color: '#E8834A', fontWeight: 900 }}>
          ★ AVAILABLE FOR WORK ★
        </p>

        {/* Receipt tear bottom */}
        <div style={{
          position: 'absolute', bottom: -6, left: 0, right: 0, height: 6,
          backgroundImage: 'radial-gradient(circle at 50% 0%, #FAE8CC 6px, transparent 6px)',
          backgroundSize: '12px 6px', backgroundRepeat: 'repeat-x',
        }} />
      </div>

      {/* Support ticket form */}
      <div style={{
        background: '#FFFFFF80',
        border: '2px solid #D4844A40',
        borderRadius: 12,
        padding: '16px 18px',
      }}>
        <p style={{
          fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em',
          fontWeight: 900, color: '#A85C2A', marginBottom: 12,
        }}>
          ── CUSTOMER SUPPORT PANEL ──
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', color: '#3D2B1F', marginBottom: 6 }}>
              TICKET ACCEPTED
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.12em', color: '#8B5E3C', marginBottom: 4 }}>
              THANK YOU FOR CONTACTING
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.12em', color: '#8B5E3C', marginBottom: 12 }}>
              NAN PHYU SYSTEMS.
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: 8, color: '#A09080' }}>REF {ticketId}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'NAME', value: name, onChange: setName, type: 'text' },
              { label: 'EMAIL', value: email, onChange: setEmail, type: 'email' },
            ].map(field => (
              <div key={field.label}>
                <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: '#A09080', fontWeight: 700, marginBottom: 4 }}>
                  {field.label}
                </p>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '7px 10px',
                    fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                    background: '#FEFDF8', border: '1.5px solid #D4844A60',
                    borderRadius: 6, color: '#3D2B1F', outline: 'none',
                  }}
                />
              </div>
            ))}
            <div>
              <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: '#A09080', fontWeight: 700, marginBottom: 4 }}>
                MESSAGE
              </p>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={3}
                style={{
                  width: '100%', padding: '7px 10px',
                  fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                  background: '#FEFDF8', border: '1.5px solid #D4844A60',
                  borderRadius: 6, color: '#3D2B1F', outline: 'none', resize: 'none',
                }}
              />
            </div>
            {error && (
              <p style={{ fontFamily: 'monospace', fontSize: 9, color: '#C8531A', letterSpacing: '0.1em', textAlign: 'center' }}>
                ⚠ {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:scale-100"
              style={{
                fontFamily: 'monospace', letterSpacing: '0.15em', fontSize: 11,
                padding: '10px', borderRadius: 8,
                background: 'linear-gradient(145deg, #E8834A, #C8531A)',
                color: '#FAE8CC', border: '2px solid #A03010',
                boxShadow: submitting ? 'none' : '0 3px 0 #A03010',
              }}
            >
              {submitting ? '[ SENDING... ]' : '[ SUBMIT TICKET ]'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
