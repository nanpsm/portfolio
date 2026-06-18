'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase, Profile, Project, Skill, ContactLink } from '@/lib/supabase'
import ContentPanel from '@/components/ContentPanel'
import VendingMachine from '@/components/VendingMachine'

export type SlotKey = 'about' | 'projects' | 'skills' | 'contact'

export type PortfolioData = {
  profile: Profile | null
  projects: Project[]
  skills: Skill[]
  contactLinks: ContactLink[]
}

export default function Home() {
  const [data, setData] = useState<PortfolioData>({
    profile: null, projects: [], skills: [], contactLinks: [],
  })
  const [selected, setSelected] = useState<SlotKey | null>(null)
  const [dispensed, setDispensed] = useState<SlotKey | null>(null)
  const [displayText, setDisplayText] = useState('SELECT A SLOT')
  const [isDispensing, setIsDispensing] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispensingRef = useRef(false)

  useEffect(() => {
    async function fetchData() {
      const [profileRes, projectsRes, skillsRes, contactRes] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
        supabase.from('contact_links').select('*').order('sort_order'),
      ])
      setData({
        profile: profileRes.data,
        projects: projectsRes.data ?? [],
        skills: skillsRes.data ?? [],
        contactLinks: contactRes.data ?? [],
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  function selectSlot(key: SlotKey) {
    if (dispensingRef.current) return
    setSelected(key)
    const labels: Record<SlotKey, string> = {
      about: 'A1 — ABOUT ME',
      projects: 'A2 — PROJECTS',
      skills: 'B1 — SKILLS',
      contact: 'B2 — CONTACT',
    }
    setDisplayText(labels[key])
  }

  function dispense() {
    if (dispensingRef.current) return
    if (!selected) { setDisplayText('SELECT A SLOT FIRST!'); return }

    dispensingRef.current = true
    setIsDispensing(true)
    setDisplayText('LOADING...')

    setTimeout(() => {
      setDispensed(selected)
      setIsDispensing(false)
      dispensingRef.current = false
      setDisplayText('READY — SELECT ANOTHER')
    }, 600)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--warm-bg)' }}>
        <div className="text-center">
          <div className="text-6xl float mb-4">🏪</div>
          <p className="font-black text-lg" style={{ color: 'var(--warm-brown)' }}>Loading the machine...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gap-6" style={{ background: 'var(--warm-bg)' }}>

      {/* Sun rays */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10" aria-hidden>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%]"
          style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 0deg, #F5C84230 8deg, transparent 16deg, #F5C84230 24deg, transparent 32deg, #F5C84230 40deg, transparent 48deg, #F5C84230 56deg, transparent 64deg, #F5C84230 72deg, transparent 80deg, #F5C84230 88deg, transparent 96deg, #F5C84230 104deg, transparent 112deg, #F5C84230 120deg, transparent 128deg, #F5C84230 136deg, transparent 144deg, #F5C84230 152deg, transparent 160deg, #F5C84230 168deg, transparent 176deg, #F5C84230 184deg)' }}
        />
      </div>

      {/* Header */}
      <div className="text-center z-10 mt-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-wide" style={{ color: 'var(--warm-dark)', textShadow: '4px 4px 0px #E8834A50' }}>
          {data.profile?.name ?? 'Portfolio'}
        </h1>
        <p className="font-bold text-lg mt-1" style={{ color: 'var(--warm-brown)' }}>
          {data.profile?.role ?? 'Developer'}
        </p>
      </div>

      {/* Machine + Panel */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 z-10 w-full max-w-5xl">
        <VendingMachine
          selected={selected}
          isDispensing={isDispensing}
          displayText={displayText}
          onSelectSlot={selectSlot}
          onDispense={dispense}
        />
        <ContentPanel dispensed={dispensed} data={data} />
      </div>

      <p className="text-sm font-bold z-10 pb-4" style={{ color: 'var(--warm-brown)', opacity: 0.5 }}>
        select a slot → press LOAD.EXE
      </p>
    </main>
  )
}
