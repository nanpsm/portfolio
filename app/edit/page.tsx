'use client'

import { useEffect, useState } from 'react'
import { supabase, Profile, Project, Skill, ContactLink, Message } from '@/lib/supabase'

const EDIT_PASSWORD = '061105'

type Tab = 'profile' | 'projects' | 'skills' | 'contact' | 'messages'

export default function EditPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<Tab>('profile')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [contactLinks, setContactLinks] = useState<ContactLink[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  function login() {
    if (pw === EDIT_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true) }
  }

  useEffect(() => {
    if (!authed) return
    Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('contact_links').select('*').order('sort_order'),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
    ]).then(([p, pr, sk, co, msg]) => {
      setProfile(p.data ?? {})
      setProjects(pr.data ?? [])
      setSkills(sk.data ?? [])
      setContactLinks(co.data ?? [])
      setMessages(msg.data ?? [])
    })
  }, [authed])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  async function saveProfile() {
    setSaving(true)
    const { id, ...rest } = profile as Profile
    if (id) await supabase.from('profile').update(rest).eq('id', id)
    else await supabase.from('profile').insert(rest)
    setSaving(false)
    showToast('Profile saved!')
  }

  async function saveProject(p: Project) {
    setSaving(true)
    const { id, ...rest } = p
    if (id && !id.startsWith('new-')) await supabase.from('projects').update(rest).eq('id', id)
    else { const { data } = await supabase.from('projects').insert(rest).select().single(); if (data) setProjects(ps => ps.map(x => x.id === id ? data : x)) }
    setSaving(false)
    showToast('Project saved!')
  }

  async function deleteProject(id: string) {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects(ps => ps.filter(p => p.id !== id))
    showToast('Deleted!')
  }

  function addProject() {
    const newP: Project = { id: `new-${Date.now()}`, title: '', description: '', image_url: '', link: '', tags: [], category: 'Fullstack', sort_order: projects.length }
    setProjects(ps => [...ps, newP])
  }

  async function saveSkill(s: Skill) {
    setSaving(true)
    const { id, ...rest } = s
    if (id && !id.startsWith('new-')) await supabase.from('skills').update(rest).eq('id', id)
    else { const { data } = await supabase.from('skills').insert(rest).select().single(); if (data) setSkills(ss => ss.map(x => x.id === id ? data : x)) }
    setSaving(false)
    showToast('Skill saved!')
  }

  async function deleteSkill(id: string) {
    await supabase.from('skills').delete().eq('id', id)
    setSkills(ss => ss.filter(s => s.id !== id))
  }

  function addSkill() {
    setSkills(ss => [...ss, { id: `new-${Date.now()}`, name: '', category: 'Frontend', sort_order: ss.length }])
  }

  async function saveContact(c: ContactLink) {
    setSaving(true)
    const { id, ...rest } = c
    if (id && !id.startsWith('new-')) await supabase.from('contact_links').update(rest).eq('id', id)
    else { const { data } = await supabase.from('contact_links').insert(rest).select().single(); if (data) setContactLinks(cs => cs.map(x => x.id === id ? data : x)) }
    setSaving(false)
    showToast('Contact saved!')
  }

  async function deleteContact(id: string) {
    await supabase.from('contact_links').delete().eq('id', id)
    setContactLinks(cs => cs.filter(c => c.id !== id))
  }

  function addContact() {
    setContactLinks(cs => [...cs, { id: `new-${Date.now()}`, platform: '', url: '', icon: '', sort_order: cs.length }])
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--warm-bg)' }}>
        <div className="w-full max-w-sm rounded-3xl p-8 text-center" style={{ background: '#FAE8CC', border: '3px solid #D4844A', boxShadow: '6px 6px 0 #A85C2A' }}>
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="font-black text-2xl mb-2" style={{ color: 'var(--warm-dark)' }}>Edit Mode</h1>
          <p className="text-sm font-semibold mb-6" style={{ color: 'var(--warm-brown)' }}>Enter your password to continue</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Password"
            className="w-full rounded-xl px-4 py-3 font-bold text-sm mb-3 outline-none"
            style={{ background: '#FFFFFF', border: `2px solid ${pwError ? '#F87171' : '#D4844A'}`, color: 'var(--warm-dark)' }}
          />
          {pwError && <p className="text-xs font-bold mb-3" style={{ color: '#F87171' }}>Wrong password!</p>}
          <button
            onClick={login}
            className="w-full py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010', boxShadow: '0 3px 0 #A03010' }}
          >
            ENTER ▶
          </button>
          <a href="/" className="block mt-4 text-xs font-bold" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>← Back to portfolio</a>
        </div>
      </div>
    )
  }

  async function markRead(id: string) {
    await supabase.from('messages').update({ read: true }).eq('id', id)
    setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))
  }

  async function deleteMessage(id: string) {
    await supabase.from('messages').delete().eq('id', id)
    setMessages(ms => ms.filter(m => m.id !== id))
  }

  const unreadCount = messages.filter(m => !m.read).length

  const tabs: { key: Tab; label: string; emoji: string; badge?: number }[] = [
    { key: 'profile', label: 'Profile', emoji: '👾' },
    { key: 'projects', label: 'Projects', emoji: '🕹️' },
    { key: 'skills', label: 'Skills', emoji: '⚡' },
    { key: 'contact', label: 'Contact', emoji: '📡' },
    { key: 'messages', label: 'Messages', emoji: '📬', badge: unreadCount },
  ]

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--warm-bg)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-black text-3xl" style={{ color: 'var(--warm-dark)' }}>✏️ Edit Portfolio</h1>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--warm-brown)' }}>Changes save directly to the database</p>
          </div>
          <a
            href="/"
            className="px-4 py-2 rounded-xl font-black text-sm"
            style={{ background: '#FAE8CC', border: '2px solid #D4844A', color: 'var(--warm-dark)' }}
          >
            ← View Site
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-xl font-black text-sm transition-all"
              style={{
                background: tab === t.key ? 'var(--warm-orange)' : '#FAE8CC',
                color: tab === t.key ? '#FAE8CC' : 'var(--warm-dark)',
                border: `2px solid ${tab === t.key ? '#A03010' : '#D4844A'}`,
                boxShadow: tab === t.key ? '0 3px 0 #A03010' : 'none',
              }}
            >
              {t.emoji} {t.label}
              {t.badge ? (
                <span style={{
                  marginLeft: 6, background: '#F87171', color: '#fff',
                  borderRadius: '50%', fontSize: 9, fontWeight: 900,
                  padding: '1px 5px', lineHeight: 1.4,
                }}>
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-3xl p-6" style={{ background: '#FAE8CC', border: '3px solid #D4844A', boxShadow: '6px 6px 0 #A85C2A' }}>

          {tab === 'profile' && (
            <div className="flex flex-col gap-4">
              <h2 className="font-black text-xl" style={{ color: 'var(--warm-dark)' }}>👾 Profile</h2>
              {(['name', 'role'] as const).map(field => (
                <div key={field}>
                  <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>{field}</label>
                  <input
                    value={(profile as any)[field] ?? ''}
                    onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none"
                    style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>Bio</label>
                <textarea
                  value={profile.bio ?? ''}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none resize-none"
                  style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>Focus Areas <span className="normal-case font-semibold">(one per line, include emoji e.g. ⚡ Full Stack)</span></label>
                <textarea
                  value={(profile.focus_areas ?? []).join('\n')}
                  onChange={e => setProfile(p => ({ ...p, focus_areas: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))}
                  rows={4}
                  placeholder={'⚡ Full Stack Development\n🤖 AI Integration\n🎨 UI/UX Design'}
                  className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none resize-none"
                  style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>Currently Exploring <span className="normal-case font-semibold">(one per line)</span></label>
                <textarea
                  value={(profile.interests ?? []).join('\n')}
                  onChange={e => setProfile(p => ({ ...p, interests: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))}
                  rows={4}
                  placeholder={'Next.js & React\nAI-Powered Applications\nSystem Design'}
                  className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none resize-none"
                  style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>Mission</label>
                <textarea
                  value={profile.mission ?? ''}
                  onChange={e => setProfile(p => ({ ...p, mission: e.target.value }))}
                  rows={3}
                  placeholder="Build useful software that solves real-world problems."
                  className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none resize-none"
                  style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1" style={{ color: 'var(--warm-brown)' }}>Resume</label>
                {profile.resume_url && (
                  <div className="flex items-center gap-3 mb-2">
                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold underline" style={{ color: 'var(--warm-orange)' }}>
                      Current resume ↗
                    </a>
                    <button onClick={() => setProfile(p => ({ ...p, resume_url: '' }))}
                      className="text-xs font-black px-2 py-1 rounded-lg" style={{ background: '#F87171', color: '#fff', border: '2px solid #C05050' }}>
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const fileName = `resume_${Date.now()}.${file.name.split('.').pop()}`
                    const { data, error } = await supabase.storage.from('resumes').upload(fileName, file, { upsert: true })
                    if (error) { showToast('Upload failed'); return }
                    const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(data.path)
                    setProfile(p => ({ ...p, resume_url: urlData.publicUrl }))
                    showToast('Resume uploaded!')
                  }}
                  className="w-full rounded-xl px-4 py-2.5 font-bold text-sm outline-none"
                  style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                />
                <p className="text-xs font-semibold mt-1" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>
                  Upload a PDF or Word file. Saves to cloud automatically.
                </p>
              </div>
              <SaveBtn onClick={saveProfile} saving={saving} />
            </div>
          )}

          {tab === 'projects' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-xl" style={{ color: 'var(--warm-dark)' }}>🕹️ Projects</h2>
                <button onClick={addProject} className="px-3 py-1.5 rounded-xl font-black text-xs" style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010' }}>+ Add</button>
              </div>
              {projects.map(p => (
                <div key={p.id} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: '#FFFFFF80', border: '2px solid #D4844A40' }}>
                  <div className="flex gap-2">
                    <input
                      value={p.title}
                      onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))}
                      placeholder="Project title"
                      className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
                      style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                    />
                    <button onClick={() => deleteProject(p.id)} className="px-3 py-2 rounded-xl font-black text-xs" style={{ background: '#F87171', color: '#FFF', border: '2px solid #C05050' }}>✕</button>
                  </div>
                  <textarea
                    value={p.description}
                    onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))}
                    placeholder="Description"
                    rows={2}
                    className="w-full rounded-xl px-3 py-2 font-bold text-sm outline-none resize-none"
                    style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                  />
                  <div className="flex gap-2">
                    <input
                      value={p.link}
                      onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, link: e.target.value } : x))}
                      placeholder="Link (https://...)"
                      className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
                      style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                    />
                    <input
                      value={p.image_url}
                      onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, image_url: e.target.value } : x))}
                      placeholder="Image URL"
                      className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
                      style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={p.category || 'Web'}
                      onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, category: e.target.value } : x))}
                      className="rounded-xl px-3 py-2 font-bold text-sm outline-none"
                      style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                    >
                      {['Frontend', 'Backend', 'Fullstack', 'Other'].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input
                      value={p.tags?.join(', ') ?? ''}
                      onChange={e => setProjects(ps => ps.map(x => x.id === p.id ? { ...x, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } : x))}
                      placeholder="Tags (comma separated: React, Node.js, ...)"
                      className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
                      style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                    />
                  </div>
                  <SaveBtn onClick={() => saveProject(p)} saving={saving} />
                </div>
              ))}
            </div>
          )}

          {tab === 'skills' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-xl" style={{ color: 'var(--warm-dark)' }}>⚡ Skills</h2>
                <button onClick={addSkill} className="px-3 py-1.5 rounded-xl font-black text-xs" style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010' }}>+ Add</button>
              </div>
              {skills.map(s => (
                <div key={s.id} className="flex gap-2 items-center">
                  <input
                    value={s.name}
                    onChange={e => setSkills(ss => ss.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))}
                    placeholder="Skill name"
                    className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
                    style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                  />
                  <select
                    value={s.category}
                    onChange={e => setSkills(ss => ss.map(x => x.id === s.id ? { ...x, category: e.target.value } : x))}
                    className="rounded-xl px-3 py-2 font-bold text-sm outline-none"
                    style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }}
                  >
                    {['Frontend', 'Backend', 'Design', 'Tools', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <button onClick={() => saveSkill(s)} className="px-3 py-2 rounded-xl font-black text-xs" style={{ background: '#34D399', color: '#FFF', border: '2px solid #10B981' }}>✓</button>
                  <button onClick={() => deleteSkill(s.id)} className="px-3 py-2 rounded-xl font-black text-xs" style={{ background: '#F87171', color: '#FFF', border: '2px solid #C05050' }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'contact' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-xl" style={{ color: 'var(--warm-dark)' }}>📡 Contact Links</h2>
                <button onClick={addContact} className="px-3 py-1.5 rounded-xl font-black text-xs" style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010' }}>+ Add</button>
              </div>
              <p className="text-xs font-bold" style={{ color: 'var(--warm-brown)' }}>Icon options: github, linkedin, email, instagram, youtube, dribbble, behance</p>
              {contactLinks.map(c => (
                <div key={c.id} className="flex gap-2 items-center flex-wrap">
                  <input value={c.platform} onChange={e => setContactLinks(cs => cs.map(x => x.id === c.id ? { ...x, platform: e.target.value } : x))} placeholder="Platform" className="w-28 rounded-xl px-3 py-2 font-bold text-sm outline-none" style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }} />
                  <input value={c.url} onChange={e => setContactLinks(cs => cs.map(x => x.id === c.id ? { ...x, url: e.target.value } : x))} placeholder="URL or mailto:..." className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none" style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }} />
                  <input value={c.icon} onChange={e => setContactLinks(cs => cs.map(x => x.id === c.id ? { ...x, icon: e.target.value } : x))} placeholder="icon" className="w-24 rounded-xl px-3 py-2 font-bold text-sm outline-none" style={{ background: '#FFF', border: '2px solid #D4844A50', color: 'var(--warm-dark)' }} />
                  <button onClick={() => saveContact(c)} className="px-3 py-2 rounded-xl font-black text-xs" style={{ background: '#34D399', color: '#FFF', border: '2px solid #10B981' }}>✓</button>
                  <button onClick={() => deleteContact(c.id)} className="px-3 py-2 rounded-xl font-black text-xs" style={{ background: '#F87171', color: '#FFF', border: '2px solid #C05050' }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'messages' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-xl" style={{ color: 'var(--warm-dark)' }}>📬 Messages</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: unreadCount > 0 ? '#F87171' : '#D4844A40', color: unreadCount > 0 ? '#fff' : 'var(--warm-brown)' }}>
                  {unreadCount} unread
                </span>
              </div>
              {messages.length === 0 && (
                <p className="text-sm font-bold text-center py-8" style={{ color: 'var(--warm-brown)', opacity: 0.5 }}>No messages yet.</p>
              )}
              {messages.map(m => (
                <div key={m.id} className="rounded-2xl p-4" style={{
                  background: m.read ? '#FFFFFF60' : '#FFFFFF',
                  border: `2px solid ${m.read ? '#D4844A30' : '#E8834A'}`,
                  opacity: m.read ? 0.7 : 1,
                }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-black text-sm" style={{ color: 'var(--warm-dark)' }}>{m.name}</span>
                      <span className="ml-2 text-xs font-bold" style={{ color: 'var(--warm-brown)' }}>{m.email}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 items-center">
                      {!m.read && (
                        <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: '#E8834A', color: '#fff' }}>NEW</span>
                      )}
                      <span className="text-xs" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>
                        {new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--warm-dark)', whiteSpace: 'pre-wrap' }}>{m.message}</p>
                  <div className="flex gap-2">
                    {!m.read && (
                      <button onClick={() => markRead(m.id)} className="px-3 py-1.5 rounded-xl font-black text-xs" style={{ background: '#34D399', color: '#fff', border: '2px solid #10B981' }}>
                        Mark read ✓
                      </button>
                    )}
                    <button onClick={() => deleteMessage(m.id)} className="px-3 py-1.5 rounded-xl font-black text-xs" style={{ background: '#F87171', color: '#fff', border: '2px solid #C05050' }}>
                      Delete ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl font-black text-sm slide-up" style={{ background: '#34D399', color: '#FFF', boxShadow: '0 4px 0 #10B981', zIndex: 50 }}>
          ✓ {toast}
        </div>
      )}
    </div>
  )
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="self-start px-4 py-2 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
      style={{ background: 'var(--warm-orange)', color: '#FAE8CC', border: '2px solid #A03010', boxShadow: '0 3px 0 #A03010' }}
    >
      {saving ? 'Saving...' : 'Save ✓'}
    </button>
  )
}
