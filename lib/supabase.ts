import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  name: string
  role: string
  bio: string
  avatar_url: string
  interests: string[]
  focus_areas: string[]
  mission: string
  resume_url: string
}

export type Project = {
  id: string
  title: string
  description: string
  image_url: string
  link: string
  tags: string[]
  category: string
  sort_order: number
}

export type Skill = {
  id: string
  name: string
  category: string
  sort_order: number
}

export type Experience = {
  id: string
  company: string
  role: string
  period: string
  description: string
  sort_order: number
}

export type ContactLink = {
  id: string
  platform: string
  url: string
  icon: string
  sort_order: number
}

export type Message = {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}
