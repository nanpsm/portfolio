'use client'

import React, { forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

// ── Types ──────────────────────────────────────────────────────────────────
interface Skill {
  name: string
}

interface SkillPageProps {
  panel: string
  title: string
  subtitle: string
  skills: Skill[]
  since: string
}

// ── Skill page — forwardRef required for react-pageflip child refs ─────────

const SkillPage = forwardRef<HTMLDivElement, SkillPageProps>(
  function SkillPage({ panel, title, subtitle, skills, since }, ref) {
    return (
      <div ref={ref} className="page page-face">
        <div style={{ padding: '36px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8A8E7B', marginBottom: '4px' }}>
            Room II · Panel {panel}
          </div>
          <div style={{ width: '24px', height: '2px', background: '#B4E650', marginBottom: '16px' }} />
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '26px', fontStyle: 'italic', color: '#1E3B45', margin: '0 0 6px' }}>
            {title}
          </h3>
          <div style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A8E7B', marginBottom: '20px' }}>
            {subtitle}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {skills.map((skill, i) => (
              <div key={skill.name} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '9px 0',
                borderBottom: i < skills.length - 1 ? '1px solid rgba(30,59,69,0.08)' : 'none',
              }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.04em', color: '#1E3B45', fontFamily: 'JetBrains Mono, monospace' }}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(30,59,69,0.12)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8E7B' }}>
            {since}
          </div>
        </div>
      </div>
    )
  }
)

// ── Skill data (sourced from resume) ──────────────────────────────────────
const pages: SkillPageProps[] = [
  {
    panel: 'I', title: 'Front of House', subtitle: 'Frontend Engineering', since: '2023 — present',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'REST APIs' },
      { name: 'WebSocket' },
      { name: 'Prisma' },
    ],
  },
  {
    panel: 'II', title: 'Engineering', subtitle: 'Backend & Systems', since: '2024 — present',
    skills: [
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'Java' },
      { name: 'Node.js' },
      { name: 'SQL' },
      { name: 'C++' },
    ],
  },
  {
    panel: 'III', title: 'The Archive', subtitle: 'Data Engineering', since: '2024 — present',
    skills: [
      { name: 'Apache Spark' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Pandas' },
      { name: 'Hadoop' },
      { name: 'MongoDB' },
      { name: 'Matplotlib' },
    ],
  },
  {
    panel: 'IV', title: 'Applied Intelligence', subtitle: 'ML & AI', since: '2025 — present',
    skills: [
      { name: 'HuggingFace Transformers' },
      { name: 'OpenAI API' },
      { name: 'Azure AI Foundry' },
      { name: 'NLP & Fine-tuning' },
    ],
  },
  {
    panel: 'V', title: 'The Studio', subtitle: 'Cloud & Tools', since: '2023 — present',
    skills: [
      { name: 'Git / GitHub' },
      { name: 'AWS' },
      { name: 'Microsoft Azure' },
      { name: 'Supabase' },
      { name: 'Vercel' },
      { name: 'Playwright' },
      { name: 'Vitest' },
    ],
  },
]

const PAGE_W = 370
const PAGE_H = 500

// ── Main export ────────────────────────────────────────────────────────────
export default function SkillsBook() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
      {/* Book */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0 36px' }}>
        <HTMLFlipBook
          ref={null}
          width={PAGE_W}
          height={PAGE_H}
          size="fixed"
          minWidth={PAGE_W}
          maxWidth={PAGE_W}
          minHeight={PAGE_H}
          maxHeight={PAGE_H}
          drawShadow={true}
          flippingTime={700}
          usePortrait={false}
          startPage={0}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          className=""
          style={{}}
        >
          {/* 1. Front cover */}
          <div className="page page-cover" data-density="hard">
            <div style={{
              background: 'linear-gradient(140deg, #1E3B45 0%, #122730 100%)',
              width: '100%', height: '100%',
              padding: '44px 40px',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
              color: '#F4EFE4',
            }}>
              <div style={{ position: 'absolute', right: '-30px', bottom: '-60px', fontFamily: 'Playfair Display, serif', fontSize: '320px', color: 'rgba(180,230,80,0.05)', pointerEvents: 'none', userSelect: 'none' }}>II</div>

              <div style={{ fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.75)' }}>
                Museum of Personal Practice
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '40px', height: '2px', background: '#B4E650' }} />
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.5)' }}>Room II</div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '48px', fontStyle: 'italic', lineHeight: 1.05, margin: 0, color: '#F4EFE4' }}>
                  Skills<br />Compendium
                </h2>
                <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(244,239,228,0.6)', maxWidth: '22ch', margin: 0 }}>
                  A catalogue of technical methods and materials used in practice.
                </p>
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.35)' }}>
                Established 2026 · Singapore
              </div>
            </div>
          </div>

          {/* 2. Index / Contents */}
          <div className="page page-face">
            <div style={{ padding: '24px 30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8A8E7B', marginBottom: '4px' }}>Room II · Contents</div>
              <div style={{ width: '32px', height: '2px', background: '#B4E650', marginBottom: '24px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '24px', fontStyle: 'italic', color: '#1E3B45', margin: '0 0 28px' }}>
                What&apos;s inside
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
                {[
                  { panel: 'I',   title: 'Front of House',      sub: 'Frontend Engineering' },
                  { panel: 'II',  title: 'Engineering',          sub: 'Backend & Systems' },
                  { panel: 'III', title: 'The Archive',          sub: 'Data Engineering' },
                  { panel: 'IV',  title: 'Applied Intelligence', sub: 'ML & AI' },
                  { panel: 'V',   title: 'The Studio',           sub: 'Cloud & Tools' },
                ].map((item, i, arr) => (
                  <div key={item.panel} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '7px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(30,59,69,0.1)' : 'none',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A8E7B' }}>Panel {item.panel}</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontStyle: 'italic', color: '#1E3B45' }}>{item.title}</span>
                      <span style={{ fontSize: '9px', color: '#6E8388' }}>{item.sub}</span>
                    </div>
                    <span style={{ fontSize: '9px', letterSpacing: '0.14em', color: '#8A8E7B' }}>p.{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3–7. Skill category pages */}
          {pages.map(p => (
            <SkillPage key={p.panel} {...p} />
          ))}

          {/* 8. Back cover */}
          <div className="page page-cover" data-density="hard">
            <div style={{
              background: 'linear-gradient(140deg, #24454F 0%, #16303A 100%)',
              width: '100%', height: '100%',
              padding: '44px 40px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
              color: '#F4EFE4',
            }}>
              <div style={{ position: 'absolute', left: '-20px', top: '-40px', fontFamily: 'Playfair Display, serif', fontSize: '320px', color: 'rgba(180,230,80,0.04)', pointerEvents: 'none', userSelect: 'none' }}>II</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(180,230,80,0.6)', marginBottom: '16px' }}>End of Room II</div>
                <div style={{ width: '32px', height: '1px', background: '#B4E650', marginBottom: '24px' }} />
                <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', lineHeight: 1.55, color: 'rgba(244,239,228,0.8)', maxWidth: '22ch', margin: 0 }}>
                  Building things that hold up under inspection.
                </p>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,0.3)' }}>
                  NPSM · 2026 · Skills Compendium
                </div>
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>

    </div>
  )
}
