'use client'

import { motion } from 'framer-motion'

const CERTS = [
  {
    id: 'aws-saa',
    issuer: 'Amazon Web Services',
    name: 'AWS Certified Solutions Architect',
    level: 'Associate',
    date: 'Oct 2026',
    abbr: 'SAA-C03',
    color: '#FF9900',
  },
  {
    id: 'aws-ccp',
    issuer: 'Amazon Web Services',
    name: 'AWS Certified Cloud Practitioner',
    level: 'Foundational',
    date: 'Sep 2026',
    abbr: 'CLF-C02',
    color: '#FF9900',
  },
  {
    id: 'ibm-de',
    issuer: 'IBM / Coursera',
    name: 'Data Engineering Professional Certificate',
    level: 'Professional',
    date: 'Oct 2026',
    abbr: 'IBM-DE',
    color: '#006699',
  },
]

const AWARDS = [
  {
    id: 'impetus',
    title: 'Impetus Award',
    body: 'SIM Student Leaders Awards 2026',
    year: '2026',
    kind: 'stamp',
  },
  {
    id: 'simclub',
    title: 'General Subcommittee Member',
    body: 'SIM IT Club',
    year: '2025 – 2026',
    kind: 'badge',
  },
]

function CertCard({ cert, i }: { cert: typeof CERTS[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      viewport={{ once: true }}
      style={{
        background: '#F5F2E8',
        border: '1px solid rgba(30,59,69,0.18)',
        borderTop: `3px solid ${cert.color}`,
        padding: '28px 26px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark abbr */}
      <span style={{
        position: 'absolute',
        right: '16px',
        bottom: '10px',
        fontFamily: 'var(--font-playfair), serif',
        fontStyle: 'italic',
        fontSize: '52px',
        color: 'rgba(30,59,69,0.05)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>{cert.abbr}</span>

      {/* Seal circle */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: cert.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '14px' }}>✦</span>
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '8px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8A8074',
          margin: '0 0 6px',
        }}>{cert.issuer}</p>
        <p style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '16px',
          color: '#1E3B45',
          margin: '0 0 3px',
          lineHeight: 1.3,
        }}>{cert.name}</p>
        <p style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '10px',
          color: '#5A6B66',
          margin: 0,
        }}>{cert.level}</p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px dashed rgba(30,59,69,0.16)',
        paddingTop: '12px',
        marginTop: 'auto',
      }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: '#8A8074',
          textTransform: 'uppercase',
        }}>Issued {cert.date}</span>
        <span style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '8px',
          color: cert.color,
          letterSpacing: '0.08em',
        }}>Verified ✓</span>
      </div>
    </motion.div>
  )
}

function StampAward({ award, i }: { award: typeof AWARDS[0]; i: number }) {
  const isStamp = award.kind === 'stamp'
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: i * 0.12 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: isStamp ? 'column' : 'row',
        alignItems: isStamp ? 'center' : 'flex-start',
        gap: isStamp ? '14px' : '20px',
        padding: '28px 32px',
        border: isStamp
          ? '1.5px solid rgba(180,230,80,0.4)'
          : '1px solid rgba(30,59,69,0.22)',
        background: isStamp
          ? 'rgba(180,230,80,0.06)'
          : 'rgba(30,59,69,0.12)',
        textAlign: isStamp ? 'center' : 'left',
        flex: 1,
        minWidth: 0,
      }}
    >
      {isStamp ? (
        <>
          {/* Stamp circle */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: '2px solid #B4E650',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '22px', lineHeight: 1 }}>★</span>
            <span style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '7px',
              letterSpacing: '0.12em',
              color: '#B4E650',
              textTransform: 'uppercase',
            }}>Award</span>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '17px',
              color: '#F4EFE4',
              margin: '0 0 5px',
              lineHeight: 1.25,
            }}>{award.title}</p>
            <p style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '10px',
              color: 'rgba(244,239,228,0.6)',
              margin: '0 0 4px',
            }}>{award.body}</p>
            <p style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: 'rgba(180,230,80,0.75)',
              margin: 0,
              textTransform: 'uppercase',
            }}>{award.year}</p>
          </div>
        </>
      ) : (
        <>
          {/* Badge hexagon-ish */}
          <div style={{
            width: '48px',
            height: '48px',
            border: '1.5px solid rgba(180,230,80,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transform: 'rotate(45deg)',
          }}>
            <div style={{ transform: 'rotate(-45deg)', fontSize: '18px' }}>◈</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(180,230,80,0.7)',
              margin: '0 0 5px',
            }}>Membership · {award.year}</p>
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '17px',
              color: '#F4EFE4',
              margin: '0 0 3px',
              lineHeight: 1.25,
            }}>{award.title}</p>
            <p style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '10px',
              color: 'rgba(244,239,228,0.55)',
              margin: 0,
            }}>{award.body}</p>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default function CertificatesSection() {
  return (
    <section id="certificates" style={{ background: '#1E3B45', padding: '100px 16px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: '56px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '22px', height: '1px', background: '#B4E650' }} />
            <span style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '8px',
              letterSpacing: '0.36em',
              color: '#B4E650',
              textTransform: 'uppercase',
            }}>Room IV</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(180,230,80,0.18)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 54px)',
            lineHeight: 1.0,
            color: '#F4EFE4',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            Credentials
          </h2>
        </motion.div>

        {/* ── Certificate cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(180,230,80,0.12)',
          border: '1px solid rgba(180,230,80,0.12)',
          marginBottom: '2px',
        }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} i={i} />
          ))}
        </div>

        {/* ── Awards & badges ── */}
        <div style={{
          display: 'flex',
          gap: '1px',
          background: 'rgba(180,230,80,0.12)',
          border: '1px solid rgba(180,230,80,0.12)',
          borderTop: 'none',
          flexWrap: 'wrap',
        }}>
          {AWARDS.map((award, i) => (
            <StampAward key={award.id} award={award} i={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
