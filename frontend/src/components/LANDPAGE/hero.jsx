"use client"

import { ArrowRight, Sparkles, BookOpen, CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const modules = [
  { title: "Foundations & Core Concepts", weeks: "Week 1–2", icon: BookOpen, tint: "text-primary" },
  { title: "Applied Techniques", weeks: "Week 3–4", icon: Sparkles, tint: "text-accent" },
  { title: "Assessment & Projects", weeks: "Week 5–6", icon: CheckCircle2, tint: "text-primary" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute -top-32 left-1/2 size-144 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 size-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            AI-powered learning path generator
          </div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Turn any topic into a {" "}
            <span className="text-primary">structured course</span> in seconds
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Syllabify builds complete learning paths — syllabi, assessments, and resources — so students and lifelong
            learners can start mastering anything instantly.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
              Generate Course
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-transparent hover:bg-secondary">
              See example
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-accent" />
              No credit card
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-accent" />
              Export to PDF
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-primary/25 to-accent/20 blur-2xl" />
          <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <FileText className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Machine Learning 101</p>
                  <p className="text-xs text-muted-foreground">Generated syllabus · 6 weeks</p>
                </div>
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">Ready</span>
            </div>

            <div className="mt-4 space-y-3">
              {modules.map((m, i) => (
                <div
                  key={m.title}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/40 p-3"
                >
                  <span className={`flex size-9 items-center justify-center rounded-lg bg-background/60 ${m.tint}`}>
                    <m.icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.weeks}</p>
                  </div>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-background/60">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${70 - i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-xs text-primary">
              <Sparkles className="size-3.5" />
              AI generated 12 lessons and 3 assessments
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
