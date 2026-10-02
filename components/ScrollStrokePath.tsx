'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

// Vertical tear — mostly flat sections, a few small bumps, 2-3 proper spikes
const TEAR: [number, number][] = [
  [80,   0],
  [80.5, 3],  [82,   6],  [80,   9],   // small spike
  [80,  12],  [80,  15],               // flat
  [79,  18],  [80,  21],               // shallow dip
  [80,  25],  [83,  28],  [80,  31],   // proper spike
  [80,  34],  [80.5,37],  [80,  40],   // nearly flat
  [78.5,43],  [80,  46],               // shallow left dip
  [80,  49],  [80,  52],               // flat
  [82,  56],  [80,  59],               // small spike
  [79.5,62],  [80,  65],               // tiny dip
  [80,  68],  [80,  71],               // flat
  [83,  75],  [80,  78],               // proper spike
  [80,  81],  [79,  84],  [80,  87],   // shallow dip
  [80,  90],  [81.5,93],  [80,  96],   // small bump
  [80, 100],
]

// Main body — right edge follows the jagged tear line (top→bottom)
const LEFT_CLIP = `polygon(
  0% 0%, 80% 0%,
  ${TEAR.map(([x, y]) => `${x}% ${y}%`).join(', ')},
  0% 100%
)`

// Stub — left edge follows the same tear line (bottom→top) to interlock perfectly
const RIGHT_CLIP = `polygon(
  80% 0%, 100% 0%, 100% 100%, 80% 100%,
  ${[...TEAR].reverse().map(([x, y]) => `${x}% ${y}%`).join(', ')}
)`

function TicketContent() {
  return (
    <div className="ticket-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 148px',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* ── Body ── */}
      <div className="ticket-body" style={{
        background: 'linear-gradient(135deg, #E6EDDC 0%, #D8E5C8 100%)',
        padding: '36px 40px 32px 44px',
        boxShadow: 'inset 0 0 0 1px rgba(30,59,69,0.16)',
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', background: '#1E3B45', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '8px', letterSpacing: '0.26em', color: '#5A6B66', textTransform: 'uppercase' }}>
              The Collection Presents
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '8px', letterSpacing: '0.26em', color: '#1E3B45', textTransform: 'uppercase' }}>
            Admit One
          </span>
        </div>

        {/* Name */}
        <h2 style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 0.92, letterSpacing: '-0.01em', color: '#1E3B45', margin: '0 0 22px' }}>
          Nan Phyu Sin Maung
        </h2>

        {/* Two-part bar */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '22px' }}>
          <div style={{ width: '36px', height: '2px', background: '#1E3B45' }} />
          <div style={{ width: '14px', height: '2px', background: '#AADD00' }} />
        </div>

        {/* Role */}
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: '#1E3B45', margin: '0 0 6px', fontWeight: 500 }}>
          Full Stack Engineer · Data Engineer
        </p>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.1em', color: '#6E8388', margin: '0 0 20px' }}>
          Singapore-based · Available 2026
        </p>

        {/* Dashed divider */}
        <div style={{ borderTop: '1px dashed rgba(30,59,69,0.22)', marginBottom: '18px' }} />

        {/* Footer row */}
        <div style={{ display: 'flex', gap: '48px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '7.5px', letterSpacing: '0.22em', color: '#6E8388', textTransform: 'uppercase', margin: '0 0 5px' }}>Ticket No.</p>
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.1em', color: '#1E3B45', margin: 0 }}>NPSM · 0001</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '7.5px', letterSpacing: '0.22em', color: '#6E8388', textTransform: 'uppercase', margin: '0 0 5px' }}>Season</p>
            <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.1em', color: '#1E3B45', margin: 0 }}>2026</p>
          </div>
        </div>
      </div>

      {/* ── Stub ── */}
      <div className="ticket-stub" style={{
        background: 'linear-gradient(180deg, #1E3B45 0%, #122730 100%)',
        borderLeft: '1.5px dashed rgba(170,221,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 0',
      }}>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '7.5px', letterSpacing: '0.22em', color: 'rgba(170,221,0,0.85)', textTransform: 'uppercase', margin: 0 }}>
          No. 0001
        </p>
        <p style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400, fontSize: 'clamp(20px, 2.6vw, 30px)', letterSpacing: '0.1em', color: '#AADD00', writingMode: 'vertical-rl', transform: 'rotate(180deg)', margin: 0, lineHeight: 1 }}>
          ENTRY NOW
        </p>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(170,221,0,0.85)', margin: 0 }}>
          2026
        </p>
      </div>
    </div>
  )
}

export default function ScrollStrokePath() {
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  // Stub flies right — rotates from center so it looks like it's flung away
  const stubX      = useTransform(scrollYProgress, [0.80, 0.92], [0, 480])
  const stubY      = useTransform(scrollYProgress, [0.80, 0.92], [0, -24])
  const stubRotate = useTransform(scrollYProgress, [0.80, 0.92], [0, 14])
  const stubOpa    = useTransform(scrollYProgress, [0.80, 0.90], [1, 0])

  // Body stays — tiny recoil left like it snapped back when paper tore
  const bodyX      = useTransform(scrollYProgress, [0.80, 0.92], [0, -80])

  const notchOpa   = useTransform(scrollYProgress, [0.70, 0.77], [1, 0])

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[300vh] w-full flex-col items-center overflow-hidden bg-[#F5F8ED] px-4 text-[#1C1814]"
    >
      <style>{`
        @media (max-width: 640px) {
          .ticket-grid { grid-template-columns: 1fr 90px !important; }
          .ticket-body { padding: 20px 16px 18px 20px !important; }
          .ticket-stub { padding: 14px 0 !important; }
        }
      `}</style>
      {/* ── Hero ── */}
      <div className="mt-40 relative flex w-fit flex-col items-center justify-center gap-5 text-center">
        <LinePath className="hidden sm:block absolute -right-[40%] top-0" scrollYProgress={scrollYProgress} />
        <p className="relative" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#8A9A7A', marginBottom: '16px' }}>
          THE COLLECTION · 2026 · SINGAPORE
        </p>
        <h1 className="relative" style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.05, color: '#1A1F14', margin: '0 0 18px' }}>
          Nan Phyu Sin Maung
        </h1>
        <p className="relative" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: isMobile ? '13px' : '19px', letterSpacing: '0.14em', color: '#1E3B45', margin: '0 0 12px', textAlign: 'center', fontWeight: 500 }}>
          Full Stack Engineer · Data Engineer
        </p>
        <p className="relative" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.1em', color: '#8A9A7A', margin: '0 0 8px', maxWidth: '40ch', textAlign: 'center' }}>
          Building products and data systems — Singapore, 2026
        </p>
      </div>

      {/* ── Ticket ── */}
      <div className="w-full translate-y-[120vh] pt-12 pb-16">
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 32px' }}>
          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.26em', color: '#8A9A7A', textTransform: 'uppercase', marginBottom: '28px', textAlign: 'center' }}>
            The Collection · Portfolio Exhibition · 2026
          </p>

          <div style={{ position: 'relative' }}>

            {/* MAIN BODY — stays, jagged right edge exposed after tear */}
            <motion.div
              style={{
                clipPath: LEFT_CLIP,
                filter: 'drop-shadow(0 8px 40px rgba(22,48,58,0.18)) drop-shadow(0 2px 8px rgba(22,48,58,0.10))',
                x: bodyX,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <TicketContent />
            </motion.div>

            {/* STUB — flies right like the reference images */}
            <motion.div
              style={{
                clipPath: RIGHT_CLIP,
                filter: 'drop-shadow(8px 4px 28px rgba(22,48,58,0.22)) drop-shadow(0 2px 8px rgba(22,48,58,0.12))',
                x: stubX,
                y: stubY,
                rotate: stubRotate,
                opacity: stubOpa,
                transformOrigin: '50% 50%',
                position: 'absolute',
                inset: 0,
                zIndex: 3,
              }}
            >
              <TicketContent />
            </motion.div>

            {/* Punch-hole notches */}
            <motion.div style={{ opacity: notchOpa, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 'calc(100% - 148px)', top: '-14px', width: '28px', height: '28px', borderRadius: '50%', background: '#F5F8ED', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)', zIndex: 4, transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', left: 'calc(100% - 148px)', bottom: '-14px', width: '28px', height: '28px', borderRadius: '50%', background: '#F5F8ED', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)', zIndex: 4, transform: 'translateX(-50%)' }} />
            </motion.div>

          </div>

          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '9px', letterSpacing: '0.18em', color: '#6E8388', textTransform: 'uppercase', marginTop: '20px', textAlign: 'center' }}>
            Admission free <span style={{ color: '#AADD00' }}>·</span> Non-transferable <span style={{ color: '#AADD00' }}>·</span> Open all hours
          </p>
        </div>
      </div>

    </section>
  )
}

function LinePath({ className, scrollYProgress }: { className: string; scrollYProgress: any }) {
  // Start at 0.22 so the flower is pre-drawn on page load; tail draws as user scrolls
  const pathLength = useTransform(scrollYProgress, [0.05, 0.60], [0.22, 1])
  return (
    <svg width="1278" height="2319" viewBox="0 0 1278 2319" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#B5F03A"
        strokeWidth="20"
        style={{ pathLength }}
      />
    </svg>
  )
}
