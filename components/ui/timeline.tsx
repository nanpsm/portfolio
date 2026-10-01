'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-32 md:gap-10">
            {/* Sticky year label + dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center"
                style={{ background: '#F5F8ED', border: '1px solid rgba(30,59,69,0.2)' }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: '#B4E650' }}
                />
              </div>
              <h3
                className="hidden md:block md:pl-20 md:text-4xl"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#1E3B45',
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#1E3B45',
                }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Scroll progress line */}
        <div
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
          style={{
            height: height + 'px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(30,59,69,0.15) 10%, rgba(30,59,69,0.15) 90%, transparent 100%)',
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: 'linear-gradient(to bottom, #B4E650, #1E3B45, transparent)',
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
