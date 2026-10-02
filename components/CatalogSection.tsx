'use client'

import { motion } from 'framer-motion'

const ROOMS = [
  { num: 'I',   name: 'Projects',     note: 'Selected works' },
  { num: 'II',  name: 'Skills',       note: 'Tools & technologies' },
  { num: 'III', name: 'Education',    note: 'Academic background' },
  { num: 'IV',  name: 'Credentials', note: 'Certifications & Awards' },
  { num: 'V',   name: 'Contact',      note: 'Contact · Collaboration' },
]

export default function CatalogSection() {
  return (
    <section style={{ background: '#1E3B45', padding: '100px 16px' }}>
      <style>{`
        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          max-width: 1000px;
          margin: 0 auto;
          border: 1px solid rgba(170,221,0,0.2);
        }
        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: 1fr; }
          .catalog-right { border-left: none !important; border-top: 1px solid rgba(170,221,0,0.15) !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        className="catalog-grid"
      >
        {/* ── Left: Title page ── */}
        <div style={{
          padding: '56px 52px 52px',
          background: 'linear-gradient(160deg, #1E3B45 0%, #0D1C22 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '480px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
              <div style={{ width: '22px', height: '1px', background: '#AADD00' }} />
              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                letterSpacing: '0.36em',
                color: '#AADD00',
                textTransform: 'uppercase',
              }}>Exhibition Catalog</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display), serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
              color: '#F4EFE4',
              margin: '0 0 20px',
            }}>
              The Collection<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(244,239,228,0.6)' }}>2026</span>
            </h2>

            <div style={{ width: '36px', height: '1px', background: 'rgba(170,221,0,0.65)', marginBottom: '24px' }} />

            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              lineHeight: 1.9,
              color: 'rgba(244,239,228,0.62)',
              maxWidth: '32ch',
              margin: 0,
            }}>
              A permanent exhibition of software, systems, and craft. Six rooms. One floor. No guided tours.
            </p>
          </div>

          <div style={{ borderTop: '1px dashed rgba(170,221,0,0.2)', paddingTop: '28px', marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(244,239,228,0.35)', textTransform: 'uppercase', margin: '0 0 6px' }}>Cat. No.</p>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#F4EFE4', margin: 0 }}>NPSM · 2026 · GF</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(244,239,228,0.35)', textTransform: 'uppercase', margin: '0 0 6px' }}>Rooms</p>
                <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#F4EFE4', margin: 0 }}>I – VI</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Room index ── */}
        <div className="catalog-right" style={{
          padding: '56px 52px 52px',
          borderLeft: '1px solid rgba(170,221,0,0.15)',
          background: '#0D1C22',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '8px',
            letterSpacing: '0.32em',
            color: 'rgba(170,221,0,0.7)',
            textTransform: 'uppercase',
            margin: '0 0 32px',
          }}>Contents</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {ROOMS.map(({ num, name, note }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: i < ROOMS.length - 1 ? '1px solid rgba(244,239,228,0.07)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display), serif',
                  fontStyle: 'italic',
                  fontSize: '12px',
                  color: '#AADD00',
                  opacity: 0.8,
                  minWidth: '28px',
                  flexShrink: 0,
                }}>{num}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '17px',
                    color: '#F4EFE4',
                    display: 'block',
                  }}>{name}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    color: 'rgba(244,239,228,0.38)',
                    display: 'block',
                    marginTop: '2px',
                  }}>{note}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: 'rgba(170,221,0,0.4)',
                  flexShrink: 0,
                }}>→</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
