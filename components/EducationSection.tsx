'use client'
import { Timeline } from '@/components/ui/timeline'

const TAG_STYLE: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-jetbrains), monospace',
  fontSize: '8px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#1E3B45',
  background: 'rgba(180,230,80,0.18)',
  padding: '3px 9px',
  marginRight: '6px',
  marginBottom: '6px',
}

function EntryCard({
  degree,
  institution,
  location,
  years,
  description,
  tags,
}: {
  degree: string
  institution: string
  location: string
  years: string
  description: string
  tags: string[]
}) {
  return (
    <div style={{
      borderLeft: '2px solid rgba(30,59,69,0.12)',
      paddingLeft: '24px',
      marginBottom: '40px',
    }}>
      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#B4E650',
        marginBottom: '6px',
      }}>
        {years}
      </div>
      <h4 style={{
        fontFamily: 'var(--font-playfair), serif',
        fontWeight: 400,
        fontSize: '22px',
        color: '#14170F',
        margin: '0 0 4px',
      }}>
        {degree}
      </h4>
      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '11px',
        letterSpacing: '0.06em',
        color: '#1E3B45',
        marginBottom: '12px',
      }}>
        {institution} · {location}
      </div>
      <p style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '12px',
        lineHeight: 1.8,
        color: '#6E8388',
        margin: '0 0 16px',
        maxWidth: '52ch',
      }}>
        {description}
      </p>
      <div>
        {tags.map(t => <span key={t} style={TAG_STYLE}>{t}</span>)}
      </div>
    </div>
  )
}

function NowCard() {
  return (
    <div style={{
      borderLeft: '2px solid #B4E650',
      paddingLeft: '24px',
      marginBottom: '40px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#1E3B45', background: 'rgba(180,230,80,0.22)',
          padding: '4px 12px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B4E650', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Open to Opportunities
        </span>
      </div>
      <h4 style={{
        fontFamily: 'var(--font-playfair), serif',
        fontWeight: 400, fontSize: '22px',
        color: '#14170F', margin: '0 0 4px',
      }}>
        Seeking Full-Time Roles
      </h4>
      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '11px', letterSpacing: '0.06em',
        color: '#1E3B45', marginBottom: '12px',
      }}>
        Singapore · Remote-friendly
      </div>
      <p style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '12px', lineHeight: 1.8,
        color: '#6E8388', margin: '0 0 16px', maxWidth: '52ch',
      }}>
        Graduating 2026. Looking for roles in full-stack engineering, data engineering, or AI/ML — ideally somewhere that builds things that matter.
      </p>
      <div>
        {['Full Stack', 'Data Engineering', 'AI / ML', 'React', 'Python', 'Next.js'].map(t => (
          <span key={t} style={TAG_STYLE}>{t}</span>
        ))}
      </div>
    </div>
  )
}

const data = [
  {
    title: 'Now',
    content: <NowCard />,
  },
  {
    title: '2022 – 2026',
    content: (
      <EntryCard
        degree="Bachelor of Science in Computer Science"
        institution="Singapore Institute of Technology"
        location="Singapore"
        years="2022 — 2026"
        description="Focusing on software engineering, data engineering, and AI/ML systems. Thesis work on natural language processing and recommendation systems."
        tags={['Software Engineering', 'Data Engineering', 'AI / ML', 'Full Stack', 'Databases']}
      />
    ),
  },
  {
    title: '2020 – 2022',
    content: (
      <EntryCard
        degree="Diploma in Information Technology"
        institution="Singapore Polytechnic"
        location="Singapore"
        years="2020 — 2022"
        description="Core coursework in web development, network fundamentals, and object-oriented programming. Graduated with distinction."
        tags={['Web Development', 'Java', 'Networking', 'OOP', 'Databases']}
      />
    ),
  },
  {
    title: '2018 – 2020',
    content: (
      <EntryCard
        degree="GCE O-Level / Pre-Polytechnic"
        institution="Secondary School"
        location="Singapore"
        years="2018 — 2020"
        description="Completed secondary education with strong results in Mathematics and Sciences. First encounter with programming through school electives sparked the path into tech."
        tags={['Mathematics', 'Sciences', 'First code', 'Singapore']}
      />
    ),
  },
]

export default function EducationSection() {
  return (
    <section
      id="education"
      style={{
        background: '#F5F8ED',
        color: '#14170F',
        fontFamily: 'var(--font-jetbrains), monospace',
        minHeight: '100vh',
        paddingBottom: '80px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* Top border */}
        <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)', margin: '16px 0 0' }} />

        {/* Section label bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '18px',
          fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#8A8E7B', padding: '28px 0 40px',
        }}>
          <span style={{ background: '#1E3B45', color: '#B4E650', padding: '5px 12px', letterSpacing: '0.16em' }}>
            Room III
          </span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(30,59,69,0.18)' }} />
          <span>Scroll to trace the path</span>
        </div>

        {/* Title row */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#8A8E7B', marginBottom: '14px',
          }}>
            Nan Phyu Sin Maung
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#14170F',
          }}>
            Education
          </h1>
        </div>

        {/* Timeline */}
        <Timeline data={data} />
      </div>
    </section>
  )
}
