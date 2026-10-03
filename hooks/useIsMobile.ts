'use client'
import { useState, useLayoutEffect } from 'react'

export function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(false)
  useLayoutEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return mobile
}
