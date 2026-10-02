'use client'

import { useState, useEffect, useRef } from 'react'


// ── Resume SVG icon ────────────────────────────────────────────────────────
function ResumeIcon() {
  return (
    <svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L32 0 L44 12 L44 54 L0 54 Z" fill="#F4EFE4" stroke="#1E3B45" strokeWidth="1.5" />
      <path d="M32 0 L32 12 L44 12" fill="none" stroke="#1E3B45" strokeWidth="1.5" />
      <line x1="7" y1="22" x2="37" y2="22" stroke="#1E3B45" strokeWidth="1" opacity="0.35" />
      <line x1="7" y1="29" x2="33" y2="29" stroke="#1E3B45" strokeWidth="1" opacity="0.35" />
      <line x1="7" y1="36" x2="35" y2="36" stroke="#1E3B45" strokeWidth="1" opacity="0.35" />
      <line x1="7" y1="43" x2="27" y2="43" stroke="#1E3B45" strokeWidth="1" opacity="0.35" />
    </svg>
  )
}

// ── Gift shop item card ────────────────────────────────────────────────────
function ShopItem({ href, icon, label, sublabel, plaque, plaqueStyle }: {
  href: string
  icon: React.ReactNode
  label: string
  sublabel: string
  plaque: string
  plaqueStyle?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'block',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.25s ease',
      }}
    >
      {/* outer frame */}
      <div style={{
        background: '#0D1C22',
        padding: '10px',
        boxShadow: '0 24px 48px rgba(0,0,0,.14), 0 0 0 1px rgba(200,169,110,.15)',
      }}>
        {/* mat */}
        <div style={{
          background: '#F0EDE4',
          padding: '40px 32px',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
        }}>
          {icon}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic',
              fontSize: '17px',
              color: '#1E3B45',
              marginBottom: '6px',
            }}>{label}</div>
            <div style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#8A8E7B',
            }}>{sublabel}</div>
          </div>
        </div>
        {/* brass plaque */}
        <div style={{
          background: '#C8A96E',
          padding: '9px 22px',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,.12)',
        }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '9px',
            color: '#2A1A08',
            fontWeight: 500,
            ...plaqueStyle,
          }}>{plaque}</span>
        </div>
      </div>
    </a>
  )
}

// ── Guest Book ─────────────────────────────────────────────────────────────
function GuestBook() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) { setError(true); return }
    setError(false)
    setSubmitting(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b307e29b-5bf7-4254-b99f-64171b02db05',
          subject: 'Guest Book — Portfolio',
          name: name.trim() || 'Anonymous Visitor',
          message: message.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setName('')
        setMessage('')
        setSuccess(true)
        if (successTimer.current) clearTimeout(successTimer.current)
        successTimer.current = setTimeout(() => setSuccess(false), 2800)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(175deg, #1E3B45 0%, #152D35 60%, #0F2028 100%)',
      padding: '72px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* decorative grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ borderLeft: '1px solid rgba(180,230,80,.04)', height: '100%' }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(180,230,80,.35)',
          marginBottom: '52px',
        }}>
          Guest Book · Room VI
        </div>

        {/* form card */}
        <div style={{
          background: '#0D1C22',
          padding: '12px',
          boxShadow: '0 40px 80px rgba(0,0,0,.5)',
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          {/* page */}
          <div style={{ background: '#FAF8F2', padding: '36px 32px', minHeight: '360px' }}>
            <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.24em', color: '#8A8E7B', marginBottom: '8px' }}>
              Sign the book
            </div>
            <div style={{ width: '24px', height: '2px', background: '#B4E650', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontWeight: 400, fontSize: '22px', color: '#1E3B45', margin: '0 0 28px' }}>
              Leave a message
            </h3>

            {success && (
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontStyle: 'italic',
                fontSize: '15px',
                color: '#1E3B45',
                textAlign: 'center',
                borderTop: '1px solid rgba(30,59,69,.1)',
                borderBottom: '1px solid rgba(30,59,69,.1)',
                padding: '20px 0',
                marginBottom: '24px',
              }}>
                Thank you for signing. ✓
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8A8E7B', marginBottom: '8px' }}>
                  Name (optional)
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Anonymous Visitor"
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid rgba(30,59,69,.25)',
                    background: 'transparent',
                    padding: '8px 0',
                    color: '#1E3B45',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderBottomColor = 'rgba(30,59,69,.6)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'rgba(30,59,69,.25)')}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8A8E7B', marginBottom: '8px' }}>
                  Message *
                </div>
                <textarea
                  value={message}
                  onChange={e => { setMessage(e.target.value); if (error) setError(false) }}
                  placeholder="Write something..."
                  rows={5}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: `1px solid ${error ? 'rgba(180,50,50,.5)' : 'rgba(30,59,69,.25)'}`,
                    background: 'transparent',
                    padding: '8px 0',
                    color: '#1E3B45',
                    fontFamily: 'var(--font-playfair), serif',
                    fontStyle: 'italic',
                    fontSize: '14px',
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderBottomColor = 'rgba(30,59,69,.6)')}
                  onBlur={e => (e.target.style.borderBottomColor = error ? 'rgba(180,50,50,.5)' : 'rgba(30,59,69,.25)')}
                />
              </div>
              <SubmitButton submitting={submitting} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ submitting }: { submitting: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="submit"
      disabled={submitting}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        background: submitting ? 'rgba(30,59,69,.5)' : hovered ? '#B4E650' : '#1E3B45',
        color: hovered && !submitting ? '#1E3B45' : '#B4E650',
        border: 'none',
        cursor: submitting ? 'default' : 'pointer',
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        padding: '14px 28px',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {submitting ? 'Sending...' : 'Sign the Book →'}
    </button>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [backHovered, setBackHovered] = useState(false)

  return (
    <section id="contact">
      {/* ── Gift Shop header ── */}
      <div style={{ background: '#F5F8ED', padding: '72px 48px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)', marginBottom: '24px' }} />
          {/* room badge strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{
              background: '#1E3B45',
              color: '#B4E650',
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              whiteSpace: 'nowrap',
            }}>
              Room VI
            </div>
            <span style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8A8E7B',
            }}>
              Final stop
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.9,
            color: '#14170F',
            margin: '0 0 28px',
          }}>
            The Gift Shop
          </h1>

          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#5A6B66',
            borderLeft: '3px solid #B4E650',
            paddingLeft: '18px',
            margin: '0 0 56px',
          }}>
            Take something with you before you go.
          </p>

          {/* 4-column item grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}>
            <ShopItem
              href="/resume.pdf"
              icon={<ResumeIcon />}
              label="Exhibition Catalogue"
              sublabel="Resume · PDF"
              plaque="DOWNLOAD →"
              plaqueStyle={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}
            />
            <ShopItem
              href="https://github.com/nanpsm"
              icon={
                <span style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '36px',
                  color: '#1E3B45',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}>
                  {'</>'}
                </span>
              }
              label="The Repository"
              sublabel="GitHub · Source"
              plaque="github.com/nanpsm"
              plaqueStyle={{ letterSpacing: '0.06em' }}
            />
            <ShopItem
              href="mailto:nanphyusinmaung@gmail.com"
              icon={
                <span style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '36px',
                  color: '#1E3B45',
                  lineHeight: 1,
                }}>
                  @
                </span>
              }
              label="Direct Correspondence"
              sublabel="Email · Write"
              plaque="nanphyusinmaung@gmail.com"
              plaqueStyle={{ letterSpacing: '0.04em', fontSize: '7px' }}
            />
            <ShopItem
              href="https://www.linkedin.com/in/nan-phyu-sin-maung/"
              icon={
                <span style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '44px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#1E3B45',
                  lineHeight: 1,
                }}>
                  in
                </span>
              }
              label="Professional Record"
              sublabel="LinkedIn · Connect"
              plaque="linkedin.com/in/nan-phyu-sin-maung"
              plaqueStyle={{ letterSpacing: '0.08em', fontSize: '7px' }}
            />
          </div>
        </div>
      </div>

      {/* ── Guest Book ── */}
      <GuestBook />

      {/* ── Exit ── */}
      <div style={{
        background: '#F5F8ED',
        padding: '64px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid rgba(30,59,69,.1)',
      }}>
        <div style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#8A8E7B',
          marginBottom: '28px',
        }}>
          End of Tour
        </div>
        <h2 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontWeight: 400,
          fontSize: 'clamp(32px, 4vw, 56px)',
          color: '#14170F',
          margin: '0 0 16px',
        }}>
          Thank you for visiting.
        </h2>
        <p style={{
          fontFamily: 'var(--font-playfair), serif',
          fontStyle: 'italic',
          fontSize: '17px',
          color: '#5A6B66',
          margin: '0 0 36px',
        }}>
          The collection is still growing.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: backHovered ? '#B4E650' : '#1E3B45',
            color: backHovered ? '#1E3B45' : '#B4E650',
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            padding: '14px 32px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          ↑ Back to Entrance
        </button>
      </div>

      {/* bottom divider */}
      <div style={{ borderTop: '1px solid rgba(20,23,15,0.1)' }} />
    </section>
  )
}
