'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const ORDER = ['artist', 'projects', 'materials', 'contact'] as const
type RoomId = typeof ORDER[number] | 'map'

interface Exhibit {
  glyph: string
  type: 'Front End' | 'Back End' | 'Full Stack'
  category: string
  title: string
  medium: string
  note: string
  stats: [string, string][]
  color: [string, string]
  link?: string
}

const EXHIBITS: Exhibit[] = [
  {
    glyph: 'I',
    type: 'Full Stack',
    category: 'WEB APPLICATION',
    title: 'Portfolio',
    medium: 'Personal project, <span>2024</span> — Next.js, TypeScript, Tailwind CSS',
    note: 'A museum-themed portfolio site built to showcase work through an immersive gallery experience rather than a traditional resume layout.',
    stats: [['FRAMEWORK', 'Next.js'], ['DEPLOY', 'Vercel'], ['DESIGN', 'Custom']],
    color: ['#1f4d3d', '#2e7a5c'],
  },
  {
    glyph: 'II',
    type: 'Full Stack',
    category: 'E-COMMERCE PLATFORM',
    title: 'Shopfront',
    medium: 'Team project, <span>2024</span> — React, Node.js, PostgreSQL',
    note: 'A full-featured e-commerce platform with cart, checkout, and order management. Built with a focus on clean UX and fast load times.',
    stats: [['PAGES', '12+'], ['API ROUTES', '30+'], ['UPTIME', '99.9%']],
    color: ['#20323d', '#3d5f70'],
  },
  {
    glyph: 'III',
    type: 'Front End',
    category: 'UI / COMPONENT LIBRARY',
    title: 'Design System',
    medium: 'Side project, <span>2023</span> — React, TypeScript, Storybook',
    note: 'A reusable component library with accessible, composable primitives. Documented in Storybook and published as an npm package.',
    stats: [['COMPONENTS', '40+'], ['TYPESCRIPT', '100%'], ['A11Y', 'WCAG AA']],
    color: ['#3b2a5c', '#5c3d8a'],
  },
  {
    glyph: 'IV',
    type: 'Back End',
    category: 'REST API',
    title: 'DataBridge',
    medium: 'Academic project, <span>2023</span> — Python, FastAPI, PostgreSQL',
    note: 'A high-throughput REST API for aggregating and serving sensor data. Designed for reliability and tested under simulated load.',
    stats: [['ENDPOINTS', '24'], ['LATENCY', '<80ms'], ['TESTS', '95%']],
    color: ['#5c2a1e', '#8a4a2f'],
  },
]

const CATEGORY_ICONS: Record<string, string> = {
  'Front End': '▢',
  'Back End': '▦',
  'Full Stack': '⌬',
}
const CATEGORIES = ['Full Stack', 'Front End', 'Back End'] as const

export default function Home() {
  const [room, setRoom] = useState<RoomId>('map')
  const [projectLevel, setProjectLevel] = useState<'stacks' | 'category' | 'detail'>('stacks')
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [currentDetail, setCurrentDetail] = useState<number | null>(null)
  const roomIndexRef = useRef(0)

  const enterRoom = useCallback((id: RoomId) => {
    if (id !== 'map') {
      roomIndexRef.current = ORDER.indexOf(id as typeof ORDER[number])
    }
    setRoom(id)
    if (id === 'projects') {
      setProjectLevel('stacks')
      setCurrentCategory(null)
      setCurrentDetail(null)
    }
    window.scrollTo(0, 0)
  }, [])

  const next = useCallback(() => {
    roomIndexRef.current = (roomIndexRef.current + 1) % ORDER.length
    enterRoom(ORDER[roomIndexRef.current])
  }, [enterRoom])

  const prev = useCallback(() => {
    roomIndexRef.current = (roomIndexRef.current - 1 + ORDER.length) % ORDER.length
    enterRoom(ORDER[roomIndexRef.current])
  }, [enterRoom])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (room === 'projects') {
          if (projectLevel === 'detail') {
            if (currentCategory) { setProjectLevel('category'); setCurrentDetail(null) }
            else { setProjectLevel('stacks') }
          } else if (projectLevel === 'category') {
            setProjectLevel('stacks'); setCurrentCategory(null)
          } else {
            enterRoom('map')
          }
        } else {
          enterRoom('map')
        }
        return
      }
      if (room === 'map' || room === 'projects') return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [room, projectLevel, currentCategory, next, prev, enterRoom])

  const openCategory = (cat: string) => {
    setCurrentCategory(cat)
    setProjectLevel('category')
    setCurrentDetail(null)
  }

  const openDetail = (i: number) => {
    setCurrentDetail(i)
    setProjectLevel('detail')
  }

  const projectsHereLabel = () => {
    if (projectLevel === 'detail' && currentDetail !== null) {
      const ex = EXHIBITS[currentDetail]
      return `GALLERY 02 — PROJECTS · ${ex.type.toUpperCase()} · ${ex.title.toUpperCase()}`
    }
    if (projectLevel === 'category' && currentCategory) {
      return `GALLERY 02 — PROJECTS · ${currentCategory.toUpperCase()}`
    }
    return 'GALLERY 02 — PROJECTS'
  }

  const isActive = (id: RoomId) => room === id

  return (
    <div id="app">

      {/* ===== MAP ===== */}
      <div className={`view${isActive('map') ? ' active' : ''}`} id="map">
        <div className="map-head">
          <div className="map-eyebrow">THE COLLECTION — FLOOR PLAN</div>
          <h1>Where would you like to go?</h1>
          <p>Choose a gallery below, or step into any room to start walking through in order.</p>
        </div>
        <div className="floorplan">
          <div className="maproom area-artist" onClick={() => enterRoom('artist')}>
            <div className="tag">GALLERY 01</div><div className="icon">◍</div>
            <div className="name">The Artist</div><div className="sub">Profile & background</div>
          </div>
          <div className="maproom area-projects" onClick={() => enterRoom('projects')}>
            <div className="tag">GALLERY 02</div><div className="icon">▦</div>
            <div className="name">Projects</div><div className="sub">Selected works, 2022–2024</div>
          </div>
          <div className="hall"><div className="pin" /><div className="halltext">MAIN HALL</div></div>
          <div className="maproom area-materials" onClick={() => enterRoom('materials')}>
            <div className="tag">GALLERY 03</div><div className="icon">✎</div>
            <div className="name">Materials &amp; Techniques</div><div className="sub">Skills &amp; stack</div>
          </div>
          <div className="maproom area-contact" onClick={() => enterRoom('contact')}>
            <div className="tag">VISITOR CENTER</div><div className="icon">✉</div>
            <div className="name">Contact</div><div className="sub">Say hello</div>
          </div>
          <div className="blank" />
        </div>
        <div className="map-foot">click a gallery to enter — arrows inside each room walk you onward</div>
      </div>

      {/* ===== ARTIST ROOM ===== */}
      <div className={`view room-view${isActive('artist') ? ' active' : ''}`} id="artist">
        <div className="topbar">
          <button className="map-btn" onClick={() => enterRoom('map')}>← FLOOR PLAN</button>
          <div className="here">YOU ARE IN<strong>GALLERY 01 — THE ARTIST</strong></div>
        </div>
        <div className="room">
          <div className="artist-grid">
            <div className="artist-portrait-wrap">
              <div className="portrait"><span>NPS</span></div>
              <div className="fig-caption">FIG. 1 — THE ARTIST, 2026</div>
              <a className="cv-link" href="#">DOWNLOAD RESUME (PDF)</a>
            </div>
            <div>
              <h2 className="artist-name">Nan Phyu Sin Maung</h2>
              <div className="tombstone">b. 2005 · based in Singapore 🇸🇬 · working in full-stack development</div>
              <p className="pull-quote">I build software that solves real problems — clean on the surface, solid underneath.</p>
              <div className="bio-text">
                <p>Nan&apos;s practice spans the full stack: from crafting interfaces people actually enjoy using, to building the systems that make them reliable. The work in this collection was driven by genuine curiosity and a need to ship something that works.</p>
                <p>Currently a Software Engineering student with a growing interest in AI integration and system design, Nan approaches each project as a small piece of a larger practice — building skills one layer at a time.</p>
              </div>
              <div className="periods">
                <div className="plabel">CAREER PERIODS</div>
                <div className="period-row">
                  <div className="yr">2024—now</div>
                  <div className="pn"><strong>The Full-Stack Period</strong><span>Singapore Institute of Technology — Software Engineering</span></div>
                </div>
                <div className="period-row">
                  <div className="yr">2022—24</div>
                  <div className="pn"><strong>The Foundational Period</strong><span>Nanyang Polytechnic — Information Technology</span></div>
                </div>
                <div className="period-row">
                  <div className="yr">2023</div>
                  <div className="pn"><strong>First Internship</strong><span>Web development & systems integration</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="arrow left" onClick={prev}>←</button>
        <button className="arrow right" onClick={next}>→</button>
      </div>

      {/* ===== PROJECTS ROOM ===== */}
      <div className={`view room-view${isActive('projects') ? ' active' : ''}`} id="projects">
        <div className="topbar">
          <button className="map-btn" onClick={() => enterRoom('map')}>← FLOOR PLAN</button>
          <div className="here">YOU ARE IN<strong>{projectsHereLabel()}</strong></div>
        </div>

        {/* Level 1: stacks */}
        <div className={`proj-sub${projectLevel === 'stacks' ? ' active' : ''}`}>
          <div className="room">
            <div className="room-eyebrow">SELECTED WORKS, 2022–2024</div>
            <h2 className="room-title">Projects</h2>
            <div className="room-kicker">pick a stack to see the pieces filed under it</div>
            <div className="stacks-row">
              {CATEGORIES.map(cat => {
                const count = EXHIBITS.filter(e => e.type === cat).length
                return (
                  <div key={cat} className="stack-wrap" onClick={() => openCategory(cat)}>
                    <div className="stack">
                      <div className="mini"><span className="glyph">{CATEGORY_ICONS[cat]}</span></div>
                      <div className="mini"><span className="glyph">{CATEGORY_ICONS[cat]}</span></div>
                      <div className="mini"><span className="glyph">{CATEGORY_ICONS[cat]}</span></div>
                    </div>
                    <div className="stack-label">{cat}</div>
                    <div className="stack-count">{count} PIECE{count === 1 ? '' : 'S'}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Level 2: cards within category */}
        <div className={`proj-sub${projectLevel === 'category' ? ' active' : ''}`}>
          <button className="back-btn" onClick={() => { setProjectLevel('stacks'); setCurrentCategory(null) }}>← CATEGORIES</button>
          <div className="room">
            <div className="room-eyebrow">{EXHIBITS.filter(e => e.type === currentCategory).length} PIECES IN THIS CATEGORY</div>
            <h2 className="room-title">{currentCategory}</h2>
            <div className="room-kicker">choose a piece to view its full description, stack, and stats</div>
            <div className="cards-grid">
              {EXHIBITS.map((ex, i) => {
                if (ex.type !== currentCategory) return null
                return (
                  <TiltCard key={i} exhibit={ex} onClick={() => openDetail(i)} />
                )
              })}
            </div>
          </div>
        </div>

        {/* Level 3: detail */}
        <div className={`proj-sub${projectLevel === 'detail' ? ' active' : ''}`}>
          <button className="back-btn" onClick={() => { setProjectLevel('category'); setCurrentDetail(null) }}>← BACK</button>
          <div className="room">
            {currentDetail !== null && <ExhibitDetail exhibit={EXHIBITS[currentDetail]} />}
          </div>
        </div>

        <button className="arrow left" onClick={prev}>←</button>
        <button className="arrow right" onClick={next}>→</button>
      </div>

      {/* ===== MATERIALS ROOM ===== */}
      <div className={`view room-view${isActive('materials') ? ' active' : ''}`} id="materials">
        <div className="topbar">
          <button className="map-btn" onClick={() => enterRoom('map')}>← FLOOR PLAN</button>
          <div className="here">YOU ARE IN<strong>GALLERY 03 — MATERIALS &amp; TECHNIQUES</strong></div>
        </div>
        <div className="room">
          <div className="room-eyebrow">SKILLS &amp; STACK</div>
          <h2 className="room-title">Materials &amp; Techniques</h2>
          <div className="room-kicker">the tools and materials used throughout this collection</div>
          <div className="catalogue">
            <div className="cat-group">
              <div className="cat-label">LANGUAGES</div>
              <div className="specimen"><span className="sy">TypeScript</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">JavaScript</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">Python</span><span className="sn">working</span></div>
              <div className="specimen"><span className="sy">SQL</span><span className="sn">working</span></div>
              <div className="specimen"><span className="sy">Java</span><span className="sn">familiar</span></div>
            </div>
            <div className="cat-group">
              <div className="cat-label">FRONTEND</div>
              <div className="specimen"><span className="sy">React</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">Next.js</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">Tailwind CSS</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">Framer Motion</span><span className="sn">working</span></div>
              <div className="specimen"><span className="sy">Figma</span><span className="sn">familiar</span></div>
            </div>
            <div className="cat-group">
              <div className="cat-label">BACKEND &amp; INFRA</div>
              <div className="specimen"><span className="sy">Node.js</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">PostgreSQL</span><span className="sn">core</span></div>
              <div className="specimen"><span className="sy">FastAPI</span><span className="sn">working</span></div>
              <div className="specimen"><span className="sy">Supabase</span><span className="sn">working</span></div>
              <div className="specimen"><span className="sy">Vercel</span><span className="sn">core</span></div>
            </div>
          </div>
        </div>
        <button className="arrow left" onClick={prev}>←</button>
        <button className="arrow right" onClick={next}>→</button>
      </div>

      {/* ===== CONTACT ROOM ===== */}
      <div className={`view room-view${isActive('contact') ? ' active' : ''}`} id="contact">
        <div className="topbar">
          <button className="map-btn" onClick={() => enterRoom('map')}>← FLOOR PLAN</button>
          <div className="here">YOU ARE IN<strong>VISITOR CENTER</strong></div>
        </div>
        <div className="room">
          <div className="room-eyebrow">VISITOR CENTER</div>
          <h2 className="room-title">Contact</h2>
          <p className="sub2">The archive is always open. Say hello, or leave a note.</p>
          <div className="links">
            <a href="mailto:nanphyusinmg@gmail.com">EMAIL</a>
            <a href="https://github.com/nanpsm" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href="#">RESUME</a>
            <a href="https://linkedin.com/in/nan-phyu-sin-maung" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
        </div>
        <button className="arrow left" onClick={prev}>←</button>
        <button className="arrow right" onClick={next}>→</button>
      </div>

    </div>
  )
}

function TiltCard({ exhibit, onClick }: { exhibit: Exhibit; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const sheen = useRef<HTMLSpanElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotateY = (px - 0.5) * 18
    const rotateX = (0.5 - py) * 18
    el.style.transition = 'none'
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
    if (sheen.current) {
      sheen.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <button
      ref={ref}
      className="proj-card"
      style={{ background: `linear-gradient(155deg, ${exhibit.color[0]}, ${exhibit.color[1]})` }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span ref={sheen} className="sheen" />
      <span className="card-icon">{CATEGORY_ICONS[exhibit.type]}</span>
      <span className="card-dot" />
      <span className="card-tag">{exhibit.category}</span>
      <span className="card-title">{exhibit.title}</span>
      <span className="card-desc">{exhibit.note}</span>
    </button>
  )
}

function ExhibitDetail({ exhibit }: { exhibit: Exhibit }) {
  return (
    <div className="exhibit-inner">
      <div className="frame-stage">
        <div className="frame">
          <div className="mat" />
          <div className="spot" />
          <span className="glyph">{exhibit.glyph}</span>
        </div>
      </div>
      <div className="placard">
        <div className="num">{exhibit.category}</div>
        <h2>{exhibit.title}</h2>
        <div className="medium" dangerouslySetInnerHTML={{ __html: exhibit.medium }} />
        <p className="note">{exhibit.note}</p>
        <div className="stats">
          {exhibit.stats.map(([label, value]) => (
            <div key={label}>{label}<strong>{value}</strong></div>
          ))}
        </div>
        {exhibit.link && (
          <a className="proj-link" href={exhibit.link} target="_blank" rel="noopener noreferrer">VIEW PROJECT</a>
        )}
      </div>
    </div>
  )
}
