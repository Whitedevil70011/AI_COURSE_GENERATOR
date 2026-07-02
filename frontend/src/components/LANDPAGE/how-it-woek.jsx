"use client"

import { motion } from "motion/react"
import { PenLine, Cpu, ListTree } from "lucide-react"

const steps = [
  {
    icon: PenLine,
    step: "01",
    title: "Input your prompt",
    description: "Describe what you want to learn — a topic, a goal, or a skill. One sentence is enough to get started.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI processing",
    description: "Our model structures objectives, sequences modules, and drafts lessons and assessments in seconds.",
  },
  {
    icon: ListTree,
    step: "03",
    title: "Generated syllabus",
    description: "Review your complete learning path, tweak anything you like, and export it to PDF to start learning.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-112 -translate-x-1/2 rounded-full bg-accent/8 blur-[130px]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-accent">How it works</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            From idea to curriculum in three steps
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border sm:left-8" aria-hidden="true" />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative flex gap-6 pl-0"
              >
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background sm:size-16">
                  <s.icon className="size-5 text-primary sm:size-6" />
                </div>
                <div className="flex-1 rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6">
                  <span className="font-mono text-xs text-muted-foreground">{s.step}</span>
                  <h3 className="mt-1 font-heading text-lg font-semibold sm:text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
