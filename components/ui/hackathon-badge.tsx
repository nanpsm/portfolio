'use client'

import React, { MouseEvent, useEffect, useRef, useState } from 'react'

export interface HackathonBadgeProps {
  hackathon: string
  award: string
  place?: 1 | 2 | 3
}

const identityMatrix =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1'

const maxRotate = 0.25
const minRotate = -0.25
const maxScale  = 1
const minScale  = 0.97

const bgColor = (place?: number) =>
  place === 1 ? '#f3e3ac' : place === 3 ? '#f1cfa6' : '#e0ddd8'

const overlayAnimations = [...Array(10).keys()].map(e => `
  @keyframes hackBadgeOverlay${e + 1} {
    0%   { transform: rotate(${e * 10}deg); }
    50%  { transform: rotate(${(e + 1) * 10}deg); }
    100% { transform: rotate(${e * 10}deg); }
  }
`).join(' ')

export function HackathonBadge({ hackathon, award, place }: HackathonBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0)
  const [matrix,        setMatrix]        = useState(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix)
  const [disableInOut,  setDisableInOut]  = useState(true)
  const [disableAnim,   setDisableAnim]   = useState(false)
  const [timeoutDone,   setTimeoutDone]   = useState(false)

  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveT1      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveT2      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveT3      = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getDim = () => {
    const r = ref.current?.getBoundingClientRect()
    return { left: r?.left ?? 0, right: r?.right ?? 0, top: r?.top ?? 0, bottom: r?.bottom ?? 0 }
  }

  const getMatrix = (cx: number, cy: number) => {
    const { left, right, top, bottom } = getDim()
    const xC = (left + right) / 2
    const yC = (top + bottom) / 2
    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xC - cx) / (xC - left),
      maxScale - (maxScale - minScale) * Math.abs(yC - cy) / (yC - top),
      maxScale - (maxScale - minScale) * (Math.abs(xC - cx) + Math.abs(yC - cy)) / (xC - left + yC - top),
    ]
    const r = {
      x1: 0.25 * ((yC - cy) / yC - (xC - cx) / xC),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left),
      y2: maxRotate - (maxRotate - minRotate) * (top - cy) / (top - bottom),
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - cy) / (top - bottom),
    }
    return `${scale[0]}, 0, ${r.z0}, 0, ${r.x1}, ${scale[1]}, ${r.z1}, 0, ${r.x2}, ${r.y2}, ${scale[2]}, 0, 0, 0, 0, 1`
  }

  const getOpposite = (_m: string, cy: number, onEnter?: boolean) => {
    const { top, bottom } = getDim()
    const oY  = bottom - cy + top
    const w   = onEnter ? 0.7 : 4
    const mul = onEnter ? -1 : 1
    return _m.split(', ').map((v, i) => {
      if (i === 2 || i === 4 || i === 8) return -parseFloat(v) * mul / w
      if (i === 0 || i === 5 || i === 10) return '1'
      if (i === 6)  return mul * (maxRotate - (maxRotate - minRotate) * (top - oY) / (top - bottom)) / w
      if (i === 9)  return      (maxRotate - (maxRotate - minRotate) * (top - oY) / (top - bottom)) / w
      return v
    }).join(', ')
  }

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    [leaveT1, leaveT2, leaveT3, enterTimeout].forEach(t => { if (t.current) clearTimeout(t.current) })
    setDisableAnim(true)
    const { left, right, top, bottom } = getDim()
    const xC = (left + right) / 2; const yC = (top + bottom) / 2
    setDisableInOut(false)
    enterTimeout.current = setTimeout(() => setDisableInOut(true), 350)
    requestAnimationFrame(() => requestAnimationFrame(() =>
      setFirstOverlayPosition((Math.abs(xC - e.clientX) + Math.abs(yC - e.clientY)) / 1.5)
    ))
    const m = getMatrix(e.clientX, e.clientY)
    setMatrix(getOpposite(m, e.clientY, true))
    setTimeoutDone(false)
    setTimeout(() => setTimeoutDone(true), 200)
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } = getDim()
    const xC = (left + right) / 2; const yC = (top + bottom) / 2
    setTimeout(() => setFirstOverlayPosition((Math.abs(xC - e.clientX) + Math.abs(yC - e.clientY)) / 1.5), 150)
    if (timeoutDone) setCurrentMatrix(getMatrix(e.clientX, e.clientY))
  }

  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current)
    const opp = getOpposite(matrix, e.clientY)
    setCurrentMatrix(opp)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setDisableInOut(false)
      leaveT1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150)
      leaveT2.current = setTimeout(() => setFirstOverlayPosition(0), 300)
      leaveT3.current = setTimeout(() => { setDisableAnim(false); setDisableInOut(true) }, 500)
    }))
  }

  useEffect(() => {
    if (timeoutDone) setMatrix(currentMatrix)
  }, [currentMatrix, timeoutDone])

  const overlayColors = [
    'hsl(358,100%,62%)', 'hsl(30,100%,50%)', 'hsl(60,100%,50%)',
    'hsl(96,100%,50%)', 'hsl(233,85%,47%)', 'hsl(271,85%,47%)',
    'hsl(300,20%,35%)', 'transparent', 'transparent', 'white',
  ]

  return (
    <div
      ref={ref}
      style={{ display: 'inline-block', cursor: 'default', userSelect: 'none' }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <style>{overlayAnimations}</style>
      <div style={{
        transform: `perspective(700px) matrix3d(${matrix})`,
        transformOrigin: 'center center',
        transition: 'transform 200ms ease-out',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" style={{ width: '220px', height: 'auto', display: 'block' }}>
          <defs>
            <filter id="hb-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="hb-mask">
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>

          {/* Background */}
          <rect width="260" height="54" rx="10" fill={bgColor(place)} />
          <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke="#bbb" strokeWidth="1" />

          {/* Trophy icon */}
          <g transform="translate(8, 9)" fill="#777">
            <path d="M10 1h16l-1.8 13c-.4 2.5-3.2 4-6.2 4s-5.8-1.5-6.2-4L10 1Z" />
            <rect x="15" y="18" width="6" height="3.5" />
            <rect x="11.5" y="21.5" width="13" height="3" rx="1.5" />
            <path d="M10 4.5H7a3.5 3.5 0 0 0 3 3.5" fill="none" stroke="#777" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M26 4.5h3a3.5 3.5 0 0 1-3 3.5" fill="none" stroke="#777" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Hackathon label */}
          <text fontFamily="Helvetica, Arial, sans-serif" fontSize="8.5" fontWeight="bold" fill="#666" x="53" y="20" letterSpacing="0.5">
            {hackathon}
          </text>
          {/* Award name */}
          <text fontFamily="Helvetica, Arial, sans-serif" fontSize="13" fontWeight="bold" fill="#555" x="53" y="40">
            {award}
          </text>

          {/* Shimmer overlay */}
          <g style={{ mixBlendMode: 'overlay' }} mask="url(#hb-mask)">
            {overlayColors.map((color, i) => (
              <g key={i} style={{
                transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                transformOrigin: 'center center',
                transition: !disableInOut ? 'transform 200ms ease-out' : 'none',
                animation: disableAnim ? 'none' : `hackBadgeOverlay${i + 1} 5s infinite`,
                willChange: 'transform',
              }}>
                <polygon points="0,0 260,54 260,0 0,54" fill={color} filter="url(#hb-blur)" opacity="0.5" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
