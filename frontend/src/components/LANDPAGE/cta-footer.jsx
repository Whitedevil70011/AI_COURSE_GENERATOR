"use client"

import { motion } from "motion/react"
import { ArrowRight, GraduationCap, Send, Rss, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerNav = [
  {
    heading: "Product",
    links: ["Features", "How it works", "Pricing", "Changelog"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Guides", "Examples", "Support"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
]

export function CtaFooter() {
  return (
    <footer className="relative">
      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 px-6 py-14 text-center backdrop-blur-xl sm:px-12"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 size-[24rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Start building your first course today
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
              Join thousands of learners turning curiosity into structured knowledge — free to start.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                Generate Course
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-border bg-transparent hover:bg-secondary">
                Talk to us
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-5" />
                </span>
                <span className="font-heading text-lg font-semibold tracking-tight">Syllabify</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                The AI course generator for students and lifelong learners.
              </p>
              <div className="mt-5 flex gap-3">
                {[Send, Rss, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    aria-label="Social link"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {footerNav.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold">{col.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Syllabify. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
