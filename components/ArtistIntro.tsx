'use client'

import { motion } from 'framer-motion'

const CARD_MAX_WIDTH = 1000
const PORTRAIT_COL   = 420
const CARD_PADDING_V = 100

export default function ArtistIntro() {
  return (
    <section style={{ background: '#F5F8ED', padding: `0 16px ${CARD_PADDING_V}px` }}>
      <style>{`
        .artist-tag {
          font-family: var(--font-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: #E9E3D6;
          border: 1px solid rgba(244,239,228,0.24);
          padding: 5px 14px;
          cursor: default;
          transition: background 0.2s, color 0.2s;
        }
        .artist-tag:hover {
          background: #F4EFE4;
          color: #1E3B45;
        }
        @media (max-width: 768px) {
          .artist-card { grid-template-columns: 1fr !important; }
          .artist-portrait { border-right: none !important; border-bottom: 1px solid rgba(244,239,228,0.08) !important; padding: 28px !important; }
          .artist-plaque { padding: 32px 28px !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.25 }}
        className="artist-card"
        style={{
          maxWidth: `${CARD_MAX_WIDTH}px`,
          margin: '0 auto',
          background: 'linear-gradient(135deg, #1E3B45 0%, #122730 100%)',
          borderRadius: '14px',
          display: 'grid',
          gridTemplateColumns: `${PORTRAIT_COL}px 1fr`,
          overflow: 'hidden',
          border: '1px solid rgba(244,239,228,0.1)',
        }}
      >
        {/* ── Left: Portrait + Caption ── */}
        <div className="artist-portrait" style={{
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          borderRight: '1px solid rgba(244,239,228,0.08)',
        }}>
          {/* Picture frame: dark with gold edge */}
          <div style={{
            background: '#0D1C22',
            padding: '10px',
            border: '1px solid rgba(170,221,0,0.35)',
          }}>
            {/* Mat */}
            <div style={{ background: '#F7F2E8', padding: '20px 20px 12px' }}>
              <img
                src="/portrait.jpg"
                alt="Portrait of the artist"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>

          {/* Caption plaque */}
          <div style={{ background: '#EFE8DA', padding: '14px 18px', width: 'fit-content', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-display), serif',
              fontStyle: 'italic',
              fontSize: '14px',
              color: '#1E3B45',
              margin: 0,
            }}>Nan Phyu Sin Maung</p>
          </div>
        </div>

        {/* ── Right: Plaque — with spotlight glow ── */}
        <div className="artist-plaque" style={{
          padding: '48px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,246,228,0.09) 0%, transparent 70%)',
        }}>
          {/* Gold label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <div style={{ width: '26px', height: '1px', background: '#AADD00' }} />
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '8px',
              letterSpacing: '0.36em',
              color: '#AADD00',
              textTransform: 'uppercase',
            }}>The Artist</span>
          </div>

          {/* Name */}
          <h2 style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 400,
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            lineHeight: 1.05,
            color: '#F4EFE4',
            margin: '0 0 12px',
          }}>
            Nan Phyu Sin Maung
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(244,239,228,0.62)',
            textTransform: 'uppercase',
            margin: '0 0 22px',
          }}>
            Full Stack Engineer · Data Engineer
          </p>

          {/* Gold short rule */}
          <div style={{ width: '36px', height: '1px', background: 'rgba(170,221,0,0.65)', marginBottom: '26px' }} />

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            color: 'rgba(244,239,228,0.82)',
            lineHeight: 1.9,
            margin: '0 0 32px',
            maxWidth: '36ch',
          }}>
            I build intelligent, data-driven applications with a focus on turning ideas into useful software.
          </p>

          {/* Dashed separator */}
          <div style={{ borderTop: '1px dashed rgba(244,239,228,0.15)', marginBottom: '24px' }} />

          {/* Medium + chips */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '8px',
              letterSpacing: '0.3em',
              color: 'rgba(244,239,228,0.42)',
              textTransform: 'uppercase',
              margin: '0 0 12px',
            }}>Medium</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['AI', 'DATA', 'SOFTWARE', 'CLOUD'].map(kw => (
                <span key={kw} className="artist-tag">{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
