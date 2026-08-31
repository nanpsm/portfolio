'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollStrokePath() {
  const pathRef = useRef<SVGPathElement>(null)
  const [vw, setVw] = useState(1280)
  const [vh, setVh] = useState(800)

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const len = path.getTotalLength()
    path.style.strokeDasharray = String(len)
    path.style.strokeDashoffset = String(len)

    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      path.style.strokeDashoffset = String(len * (1 - Math.min(progress, 1)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [vw, vh])

  // Scale path coordinates from design space (1280x800) to actual viewport
  const sx = vw / 1280
  const sy = vh / 800
  const s = Math.min(sx, sy)  // uniform scale

  // Path defined in design space 0 0 1280 800, scaled to actual viewport
  const d = `
    M ${1100*sx},${60*sy}
    C ${1140*sx},${40*sy} ${1200*sx},${80*sy} ${1180*sx},${130*sy}
    C ${1160*sx},${180*sy} ${1100*sx},${170*sy} ${1080*sx},${130*sy}
    C ${1060*sx},${90*sy} ${1090*sx},${50*sy} ${1130*sx},${60*sy}
    C ${1160*sx},${68*sy} ${1175*sx},${100*sy} ${1155*sx},${125*sy}
    C ${1135*sx},${150*sy} ${1105*sx},${145*sy} ${1095*sx},${125*sy}
    C ${1085*sx},${105*sy} ${1095*sx},${80*sy} ${1110*sx},${72*sy}

    C ${1060*sx},${100*sy} ${980*sx},${160*sy} ${880*sx},${200*sy}
    C ${760*sx},${250*sy} ${620*sx},${230*sy} ${500*sx},${290*sy}
    C ${380*sx},${350*sy} ${300*sx},${440*sy} ${200*sx},${480*sy}
    C ${120*sx},${510*sy} ${60*sx},${500*sy} ${40*sx},${540*sy}
    C ${20*sx},${580*sy} ${50*sx},${630*sy} ${110*sx},${640*sy}

    C ${180*sx},${652*sy} ${260*sx},${610*sy} ${320*sx},${580*sy}
    C ${420*sx},${530*sy} ${500*sx},${460*sy} ${600*sx},${430*sy}
    C ${700*sx},${400*sy} ${820*sx},${410*sy} ${920*sx},${370*sy}
    C ${1020*sx},${330*sy} ${1100*sx},${260*sy} ${1140*sx},${200*sy}
    C ${1180*sx},${140*sy} ${1170*sx},${100*sy} ${1140*sx},${90*sy}

    C ${1080*sx},${70*sy} ${1010*sx},${120*sy} ${980*sx},${180*sy}
    C ${950*sx},${240*sy} ${960*sx},${310*sy} ${920*sx},${360*sy}
    C ${880*sx},${410*sy} ${820*sx},${430*sy} ${760*sx},${460*sy}
    C ${680*sx},${500*sy} ${580*sx},${520*sy} ${500*sx},${560*sy}
    C ${420*sx},${600*sy} ${360*sx},${650*sy} ${300*sx},${680*sy}
    C ${240*sx},${710*sy} ${180*sx},${730*sy} ${150*sx},${760*sy}
    C ${130*sx},${778*sy} ${120*sx},${790*sy} ${130*sx},${800*sy}
  `

  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
      aria-hidden
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="#B5F03A"
        strokeWidth={Math.max(vw, vh) * 0.018}
        strokeLinecap="round"
        strokeLinejoin="round"
        d={d}
      />
    </svg>
  )
}
