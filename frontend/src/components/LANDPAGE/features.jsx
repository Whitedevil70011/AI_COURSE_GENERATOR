"use client"

import { motion } from "motion/react"
import { ListChecks, FileCheck2, Download, Clock, Sparkles, Layers } from "lucide-react"

const features = [
  {
    icon: ListChecks,
    title: "Instant Syllabus",
    description: "Enter any topic and get a week-by-week syllabus with modules, lessons, and learning objectives.",
  },
  {
    icon: FileCheck2,
    title: "AI-Generated Assessments",
    description: "Auto-create quizzes, projects, and checkpoints that adapt to your skill level and goals.",
  },
  {
    icon: Download,
    title: "Export to PDF",
    description: "Download polished, shareable course documents ready for classrooms or self-study.",
  },
  {
    icon: Clock,
    title: "Built in Seconds",
    description: "Skip weeks of planning. A complete learning path is ready before your coffee gets cold.",
  },
  {
    icon: Layers,
    title: "Curated Resources",
    description: "Every module links to hand-picked readings, videos, and exercises to reinforce concepts.",
  },
  {
    icon: Sparkles,
    title: "Personalized Paths",
    description: "Tailor pace, depth, and format to match beginners or advanced lifelong learners.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-primary">Everything you need</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            A complete course, generated for you
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Powerful building blocks that turn a single prompt into a ready-to-teach curriculum.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-border/70 bg-card/50 p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
