"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Play } from "lucide-react"

const YOUTUBE_ID = "dQw4w9WgXcQ"

export function VideoDemo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/4 size-[26rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-primary">See it in action</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Watch a course build itself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            A two-minute walkthrough of turning a single prompt into a complete, structured syllabus with lessons and
            assessments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12"
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-2xl backdrop-blur-sm ring-1 ring-primary/10">
            {playing ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Syllabify product demo"
                allow="accelerated-hd; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex size-full items-center justify-center"
                aria-label="Play product demo video"
              >
                <img
                  src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-60 transition-opacity group-hover:opacity-75"
                  crossOrigin="anonymous"
                />
                <span className="absolute inset-0 bg-background/40" aria-hidden="true" />
                <span className="relative flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Play className="size-8 translate-x-0.5 fill-current" />
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}