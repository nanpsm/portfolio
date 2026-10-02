'use client'
import { Timeline } from '@/components/ui/timeline'
import { useIsMobile } from '@/hooks/useIsMobile'

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
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B4E650', display: 'inline-block' }} />
          Available
        </span>
      </div>
      <h4 style={{
        fontFamily: 'var(--font-playfair), serif',
        fontWeight: 400, fontSize: '22px',
        color: '#14170F', margin: '0 0 4px',
      }}>
        Fresh Graduate, Singapore
      </h4>
      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '11px', letterSpacing: '0.06em',
        color: '#1E3B45', marginBottom: '12px',
      }}>
        BCS (Big Data), Distinction · 2026
      </div>
      <p style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '12px', lineHeight: 1.8,
        color: '#6E8388', margin: '0 0 16px', maxWidth: '52ch',
      }}>
        Shipped projects. Won hackathons. Earned certifications. Now looking for a team building something worth caring about — in full-stack, data, or AI engineering.
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
    title: '2024 – 2026',
    content: (
      <EntryCard
        degree="Bachelor of Computer Science (Big Data), Distinction"
        institution="University of Wollongong (SIM)"
        location="Singapore"
        years="Oct 2024 — Sep 2026"
        description="Specialised in Big Data and AI systems. Led hackathon teams to two first-place wins. Served as General Subcommittee Member of the SIM IT Club and received the Impetus Award at SIM Student Leaders Awards 2026."
        tags={['Big Data', 'AI / ML', 'Full Stack', 'Hackathons', 'Leadership']}
      />
    ),
  },
  {
    title: '2023 – 2024',
    content: (
      <EntryCard
        degree="Diploma in Information Technology"
        institution="Singapore Institute of Management"
        location="Singapore"
        years="Oct 2023 — Sep 2024"
        description="Graduated with a CGPA of 3.94 / 4.00. Awarded the Mapletree Bronze Award for academic excellence — the first formal credential that confirmed engineering was the right path."
        tags={['CGPA 3.94 / 4.00', 'Mapletree Bronze Award', 'Web Dev', 'OOP', 'Databases']}
      />
    ),
  },
]

export default function EducationSection() {
  const isMobile = useIsMobile()
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
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

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
            fontSize: '15px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#1E3B45', marginBottom: '14px',
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

        {/* Bottom divider */}
        <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)', margin: '0' }} />
      </div>
    </section>
  )
}
