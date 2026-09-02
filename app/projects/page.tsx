export default function Projects() {
  return (
    <main style={{ minHeight: '100vh', background: '#F5F8ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.22em', color: '#8A9A7A' }}>ROOM II</p>
      <h1 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 96px)', color: '#1A1F14', margin: 0 }}>Projects</h1>
      <a href="/" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.16em', color: '#8A9A7A', marginTop: '40px' }}>← BACK TO FLOOR MAP</a>
    </main>
  )
}
