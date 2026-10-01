'use client'

import { useRef, useState, useEffect } from 'react'
import BoxCarousel, { type BoxCarouselRef, type CarouselItem } from '@/components/ui/box-carousel'

// ── Roman numeral helpers ──────────────────────────────────────────────────
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
function toRoman(n: number) { return ROMAN[n] ?? String(n + 1) }

// ── Project data ───────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: 'I', title: 'FilmTwin', role: 'Personal Project · ML', year: '2025',
    desc: 'Film recommendation engine that matches your taste profile against 323,733 MovieLens viewers using Apache Spark ALS, 19-dimensional genre embeddings, and pgvector HNSW search.',
    stack: ['PySpark', 'pgvector', 'Next.js', 'Supabase'],
    github: 'https://github.com/nanpsm/video-recommender',
    url: 'https://filmtwin.vercel.app/',
    image: '',
  },
  {
    num: 'II', title: 'Tasking', role: 'Final Year Project', year: '2025',
    desc: 'Smart task allocation platform for SMEs — multi-role hierarchy, AI-assisted scheduling and job posting, Stripe subscriptions, and a full NFR test suite across 10 system modules.',
    stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
    github: 'https://github.com/ShuaiCheng-kk/fyp-tasking',
    url: 'https://fyp-tasking.vercel.app/',
    image: '',
  },
  {
    num: 'III', title: 'Emochi', role: 'Hackathon · 2 Awards', year: '2025',
    desc: 'AI emotion companion where 8 character agents — Cheer, Fear, Buzzy, and more — debate and support you through how you feel. Each character is a live Azure AI Foundry agent, not a scripted response. Built in 24 hours.',
    stack: ['Next.js', 'Azure AI', 'Prisma', 'Auth.js'],
    github: 'https://github.com/nanpsm/emochi',
    url: '',
    image: '',
  },
  {
    num: 'IV', title: 'Crimson Midnight', role: 'ITCAMP · 1st Place', year: '2024',
    desc: 'AI-powered murder mystery where players interrogate suspects with real, open-ended questions — not scripted options. Won 1st place and the Community Award, voted by university students at the project fair.',
    stack: ['Next.js', 'JavaScript', 'CSS', 'AI NPC'],
    github: 'https://github.com/moecrosoft/crimson_midnight',
    url: 'https://crimsonmidnight.vercel.app/',
    image: '',
  },
  {
    num: 'V', title: 'Oops Too Slow', role: 'Hackathon · 24 hrs', year: '2024',
    desc: 'Fast-paced reaction game where players respond to prompts via keyboard, mouse click, or hand gestures detected live by webcam. Solo and team modes with a shared Firebase leaderboard.',
    stack: ['React', 'MediaPipe', 'Firebase', 'Canvas API'],
    github: 'https://github.com/nanpsm/oops-too-slow',
    url: '',
    image: '',
  },
]

// ── Cube face cards ────────────────────────────────────────────────────────
function DarkFace({ num, title, role, stack, year, image }: typeof PROJECTS[0]) {
  if (image) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,39,48,0.92) 0%, rgba(18,39,48,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.7)', marginBottom: '8px' }}>
            Room I · No. {String(ROMAN.indexOf(num) + 1).padStart(3, '0')}
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.5)', marginBottom: '6px' }}>{role}</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: '36px', fontStyle: 'italic', lineHeight: 1.05, color: '#F4EFE4', margin: '0 0 16px' }}>{title}</h2>
          <div style={{ borderTop: '1px solid rgba(244,239,228,0.2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(244,239,228,0.4)' }}>{stack.join(' · ')}</span>
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: '#B4E650' }}>{year}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: num === 'III' || num === 'IV'
        ? 'linear-gradient(140deg,#24454F 0%,#16303A 100%)'
        : 'linear-gradient(140deg,#1E3B45 0%,#122730 100%)',
    }}>
      <div style={{
        position: 'absolute', right: '-20px', bottom: '-40px',
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '220px', lineHeight: 1,
        color: 'rgba(180,230,80,0.06)',
        pointerEvents: 'none', userSelect: 'none',
      }}>{num}</div>

      <div style={{ padding: '32px 36px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.7)' }}>
          Room I · No. {String(ROMAN.indexOf(num) + 1).padStart(3, '0')}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.45)', marginBottom: '10px' }}>{role}</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: '42px', fontStyle: 'italic', lineHeight: 1.05, color: '#F4EFE4', margin: 0 }}>
            {title.includes(' ')
              ? title.split(' ').map((w, i) => <span key={i} style={{ display: 'block' }}>{w}</span>)
              : title}
          </h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(244,239,228,0.15)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(244,239,228,0.45)' }}>{stack.join(' · ')}</span>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: '#B4E650' }}>{year}</span>
        </div>
      </div>
    </div>
  )
}

function LightFace({ num, title, role, stack, year, image }: typeof PROJECTS[0]) {
  if (image) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,39,48,0.92) 0%, rgba(18,39,48,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.7)', marginBottom: '8px' }}>
            Room I · No. {String(ROMAN.indexOf(num) + 1).padStart(3, '0')}
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.5)', marginBottom: '6px' }}>{role}</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: '36px', fontStyle: 'italic', lineHeight: 1.05, color: '#F4EFE4', margin: '0 0 16px' }}>{title}</h2>
          <div style={{ borderTop: '1px solid rgba(244,239,228,0.2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(244,239,228,0.4)' }}>{stack.join(' · ')}</span>
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: '#B4E650' }}>{year}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#FAF8F2', border: '1px solid rgba(30,59,69,0.2)' }}>
      <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontFamily: 'var(--font-playfair), serif', fontSize: '220px', lineHeight: 1, color: 'rgba(30,59,69,0.04)', pointerEvents: 'none', userSelect: 'none' }}>{num}</div>
      <div style={{ padding: '32px 36px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8A8E7B' }}>
          Room I · No. {String(ROMAN.indexOf(num) + 1).padStart(3, '0')}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8E7B', marginBottom: '10px' }}>{role}</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: '42px', fontStyle: 'italic', lineHeight: 1.05, color: '#1E3B45', margin: 0 }}>{title}</h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(30,59,69,0.14)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: '#6E8388' }}>{stack.join(' · ')}</span>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '9px', letterSpacing: '0.14em', color: '#1E3B45' }}>{year}</span>
        </div>
      </div>
    </div>
  )
}

function buildItems(): CarouselItem[] {
  return PROJECTS.map((p, i) => ({
    id: p.num,
    type: 'content' as const,
    content: i % 2 === 0 ? <DarkFace {...p} /> : <LightFace {...p} />,
  }))
}

// ── NavButton with hover ───────────────────────────────────────────────────
function NavBtn({ onClick, children, borderSide }: {
  onClick: () => void
  children: React.ReactNode
  borderSide: 'right' | 'left'
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1E3B45' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: hovered ? '#B4E650' : '#1E3B45',
        padding: '14px 28px',
        [borderSide === 'right' ? 'borderRight' : 'borderLeft']: '1px solid rgba(30,59,69,0.22)',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {children}
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const carouselRef = useRef<BoxCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = buildItems()
  const currentProject = PROJECTS[currentIndex]
  const totalRoman = toRoman(PROJECTS.length - 1)

  // Responsive width
  const [width, setWidth] = useState(520)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 600) setWidth(Math.min(w - 48, 340))
      else if (w < 900) setWidth(420)
      else setWidth(520)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const height = Math.round(width * (340 / 520))

  return (
    <section
      id="projects"
      style={{
        background: '#F3F4EA',
        color: '#14170F',
        fontFamily: 'var(--font-jetbrains), monospace',
        minHeight: '100vh',
        paddingBottom: '96px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* ── Top border ── */}
        <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)', margin: '24px 0 0' }} />

        {/* ── Section label bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '18px',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#8A8E7B', padding: '28px 0 40px',
        }}>
          <span style={{
            background: '#1E3B45', color: '#B4E650',
            padding: '5px 12px', letterSpacing: '0.16em',
          }}>Room I</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(30,59,69,0.18)' }} />
          <span>Drag or use arrows to navigate</span>
        </div>

        {/* ── Title row ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'end', gap: '32px', marginBottom: '56px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#14170F',
          }}>Projects</h1>

          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            gap: '8px',
            fontSize: '10px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#8A8E7B',
          }}>
            <span>{currentProject.num} of {totalRoman}</span>
            <span style={{
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic', fontSize: '14px',
              letterSpacing: '0.02em', color: '#1E3B45',
              textTransform: 'none',
            }}>{currentProject.title}</span>
          </div>
        </div>

        {/* ── Gallery stage + carousel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            {/* gallery wall gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(30,59,69,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0 36px' }}>
              <BoxCarousel
                ref={carouselRef}
                items={items}
                width={width}
                height={height}
                direction="left"
                perspective={1200}
                transition={{ duration: 0.88, ease: [0.53, 0.01, 0.01, 0.99] }}
                onIndexChange={setCurrentIndex}
                enableDrag
              />
            </div>
          </div>

          {/* ── Navigation bar ── */}
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid rgba(30,59,69,0.22)',
            width: 'fit-content',
          }}>
            <NavBtn onClick={() => carouselRef.current?.prev()} borderSide="right">← Prev</NavBtn>
            <div style={{
              padding: '14px 32px',
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#8A8E7B',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-jetbrains), monospace',
            }}>
              {currentProject.num} of {totalRoman}
            </div>
            <NavBtn onClick={() => carouselRef.current?.next()} borderSide="left">Next →</NavBtn>
          </div>

          {/* ── Project detail panel ── */}
          <div style={{
            marginTop: '48px', width: '100%', maxWidth: '680px',
            borderLeft: '3px solid #B4E650',
            paddingLeft: '28px',
          }}>
            {/* meta row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '24px',
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#8A8E7B',
              marginBottom: '16px',
              fontFamily: 'var(--font-jetbrains), monospace',
            }}>
              <span>{currentProject.role}</span>
              <span style={{ width: '20px', height: '1px', background: 'rgba(30,59,69,0.3)', flexShrink: 0 }} />
              <span>{currentProject.year}</span>
            </div>

            {/* description */}
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(18px, 2vw, 22px)',
              lineHeight: 1.6,
              color: '#2E4A44',
              margin: '0 0 24px',
            }}>
              {currentProject.desc}
            </p>

            {/* stack tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {currentProject.stack.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '9px', letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '7px 14px',
                    border: '1px solid rgba(30,59,69,0.28)',
                    color: '#5A6B66',
                  }}
                >{tag}</span>
              ))}
            </div>

            {/* links */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {currentProject.url && (
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#F4EFE4', background: '#1E3B45',
                    padding: '13px 24px', textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#162D36'; (e.currentTarget as HTMLAnchorElement).style.color = '#B4E650' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1E3B45'; (e.currentTarget as HTMLAnchorElement).style.color = '#F4EFE4' }}
                >
                  Live Site <span style={{ fontSize: '13px', lineHeight: 1 }}>↗</span>
                </a>
              )}
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#1E3B45',
                    border: '1px solid rgba(30,59,69,0.28)',
                    padding: '13px 24px', textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1E3B45'; (e.currentTarget as HTMLAnchorElement).style.color = '#1E3B45' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(30,59,69,0.28)'; (e.currentTarget as HTMLAnchorElement).style.color = '#1E3B45' }}
                >
                  GitHub <span style={{ fontSize: '13px', lineHeight: 1 }}>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
