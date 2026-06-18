'use client'

import { useState } from 'react'
import { SlotKey } from '@/app/page'

type Slot = { key: SlotKey; code: string; label: string; emoji: string; color: string }

const SLOTS: Slot[] = [
  { key: 'about',    code: 'A1', label: 'Profile',   emoji: '👾', color: '#FBBF24' },
  { key: 'projects', code: 'A2', label: 'Projects', emoji: '🕹️', color: '#F87171' },
  { key: 'skills',   code: 'B1', label: 'Skills',   emoji: '⚡', color: '#34D399' },
  { key: 'contact',  code: 'B2', label: 'Contact',  emoji: '📡', color: '#C084FC' },
]

type Props = {
  selected: SlotKey | null
  isDispensing: boolean
  displayText: string
  onSelectSlot: (key: SlotKey) => void
  onDispense: () => void
}

export default function VendingMachine({ selected, isDispensing, displayText, onSelectSlot, onDispense }: Props) {
  const [wiggling, setWiggling] = useState<SlotKey | null>(null)

  function handleSlotClick(key: SlotKey) {
    setWiggling(key)
    setTimeout(() => setWiggling(null), 350)
    onSelectSlot(key)
  }

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: 300,
          background: 'linear-gradient(160deg, #E8924E 0%, #C8692A 100%)',
          boxShadow: '6px 6px 0px #A85C2A, inset -3px -3px 0px #A85C2A40, inset 3px 3px 0px #F5C84240',
          border: '3px solid #A85C2A',
        }}
      >
        {/* Top label */}
        <div
          className="py-3 text-center font-black text-sm tracking-widest"
          style={{ background: '#A85C2A', color: '#FAE8CC', letterSpacing: '0.15em' }}
        >
          ✦ PORTFOLIO.EXE ✦
        </div>

        {/* Glass display */}
        <div className="p-4">
          <div
            className="rounded-2xl p-3 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #C8E8F8 0%, #A0D4EE 100%)',
              border: '3px solid #7BBDD4',
              boxShadow: 'inset 2px 2px 6px #7BBDD440',
              minHeight: 260,
            }}
          >
            <div className="absolute top-2 left-2 right-2 h-8 rounded-xl pointer-events-none" style={{ background: 'linear-gradient(180deg, #FFFFFF60 0%, transparent 100%)' }} aria-hidden />

            <div className="grid grid-cols-3 gap-2 relative z-10">
              {SLOTS.map((slot) => {
                const isSelected = selected === slot.key
                return (
                  <button
                    key={slot.key}
                    onClick={() => handleSlotClick(slot.key)}
                    className={`rounded-xl p-2 flex flex-col items-center gap-1 transition-all cursor-pointer border-2 ${wiggling === slot.key ? 'wiggle' : ''}`}
                    style={{
                      background: isSelected ? slot.color + '30' : '#FFFFFFAA',
                      borderColor: isSelected ? slot.color : '#FFFFFF80',
                      boxShadow: isSelected ? `0 0 0 2px ${slot.color}80` : 'none',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <span className="text-2xl leading-none">{slot.emoji}</span>
                    <span className="text-xs font-black" style={{ color: '#3D2B1F' }}>{slot.label}</span>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: isSelected ? slot.color : '#3D2B1F20', color: isSelected ? '#fff' : '#3D2B1F80', fontSize: 9 }}
                    >
                      {slot.code}
                    </span>
                  </button>
                )
              })}

              {['C1', 'C2'].map(code => (
                <div
                  key={code}
                  className="rounded-xl p-2 flex flex-col items-center gap-1 opacity-30"
                  style={{ background: '#FFFFFF60', border: '2px dashed #3D2B1F40' }}
                >
                  <span className="text-2xl leading-none">🔒</span>
                  <span style={{ color: '#3D2B1F', fontSize: 9 }} className="font-black text-xs">SOON</span>
                  <span style={{ color: '#3D2B1F80', fontSize: 9 }} className="font-bold text-xs">{code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Display screen */}
        <div className="px-4 pb-2">
          <div
            className="rounded-xl px-3 py-2 screen-flicker"
            style={{ background: '#1a3a1a', border: '2px solid #2a5a2a', boxShadow: 'inset 0 2px 8px #00000060' }}
          >
            <p className="font-black text-xs text-center truncate" style={{ color: '#7CFC00', fontFamily: 'monospace', letterSpacing: '0.05em', textShadow: '0 0 8px #7CFC0080' }}>
              {displayText}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="px-4 pb-4">
          <button
            onClick={onDispense}
            disabled={isDispensing}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100"
            style={{
              background: isDispensing ? '#888' : 'linear-gradient(145deg, #E8834A, #C8531A)',
              color: '#FAE8CC',
              border: `2px solid ${isDispensing ? '#666' : '#A03010'}`,
              boxShadow: isDispensing ? 'none' : '0 3px 0 #A03010',
              letterSpacing: '0.05em',
            }}
          >
            {isDispensing ? 'LOADING...' : '▶ LOAD.EXE'}
          </button>
        </div>

        {/* Tray */}
        <div
          className="mx-4 mb-4 rounded-xl flex items-center justify-center"
          style={{ background: '#2a1a0a', border: '2px solid #1a0a00', height: 28, boxShadow: 'inset 0 3px 6px #00000080' }}
        >
          <span className="text-xs font-bold" style={{ color: '#8B5E3C', letterSpacing: '0.1em', fontSize: 9 }}>▲ VENDING TRAY ▲</span>
        </div>
      </div>

    </div>
  )
}
