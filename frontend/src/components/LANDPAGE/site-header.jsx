"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { GraduationCap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "FAQ", href: "#faq" },
]

export function SiteHeader() {
	const [open, setOpen] = useState(false)

	return (
		<motion.header
			initial={{ y: -24, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
		>
			<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<a href="#" className="flex items-center gap-2">
					<span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<GraduationCap className="size-5" />
					</span>
					<span className="font-heading text-lg font-semibold tracking-tight">Syllabify</span>
				</a>

				<div className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</div>

				<div className="hidden items-center gap-3 md:flex">
					<Button variant="ghost" className="text-muted-foreground hover:text-foreground">
						Log in
					</Button>
					<Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generate Course</Button>
				</div>

				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
				>
					{open ? <X className="size-5" /> : <Menu className="size-5" />}
				</button>
			</nav>

			{open && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					className="overflow-hidden border-t border-border/60 md:hidden"
				>
					<div className="flex flex-col gap-1 px-4 py-4">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={() => setOpen(false)}
								className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
							>
								{link.label}
							</a>
						))}
						<Button className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
							Generate Course
						</Button>
					</div>
				</motion.div>
			)}
		</motion.header>
	)
}

export default SiteHeader
