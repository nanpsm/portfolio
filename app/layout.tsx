import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import MuseumNav from '@/components/MuseumNav'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '100 800',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'The Collection — Nan Phyu Sin Maung',
  description: 'Portfolio of Nan Phyu Sin Maung — Full Stack Developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${spaceMono.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
        {children}
        <MuseumNav />
      </body>
    </html>
  )
}
