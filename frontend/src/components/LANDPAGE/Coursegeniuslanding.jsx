import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ListTree,
  BarChart3,
  Trophy,
  CheckCircle2,
  ListChecks,
  FileText,
  Download,
  Clock,
  Layers,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Zap,
  Target,
  PenSquare,
  Users,
} from "lucide-react";


const BUILD_STEPS = [
  { label: "Course title", value: "Low-Level Design (LLD) Mastery", kind: "type" },
  { label: "Module 1", value: "Fundamentals", kind: "check" },
  { label: "Module 2", value: "Designing LLD Systems", kind: "check" },
  { label: "Module 3", value: "Implementing & Testing LLD", kind: "check" },
  { label: "", value: "Curriculum ready", kind: "done" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.16,.84,.44,1) ${delay}ms, transform 0.7s cubic-bezier(.16,.84,.44,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function BuilderCard() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let t;
    if (step === 0) {
      const full = BUILD_STEPS[0].value;
      let i = 0;
      const type = () => {
        setTyped(full.slice(0, i));
        i++;
        if (i <= full.length) {
          t = setTimeout(type, 38);
        } else {
          t = setTimeout(() => setStep(1), 500);
        }
      };
      type();
    } else if (step < BUILD_STEPS.length) {
      t = setTimeout(() => setStep(step + 1), 700);
    } else {
      t = setTimeout(() => {
        setStep(0);
        setTyped("");
      }, 2200);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const pct = Math.min(100, Math.round((Math.max(step, 0) / (BUILD_STEPS.length - 1)) * 100));

  return (
    <div className="cg-builder-card">
      <div className="flex items-center justify-between mb-4">
        <span className="cg-mono text-[11px] tracking-widest text-indigo-200/70 uppercase">
          Create AI Course
        </span>
        <Sparkles size={16} className="text-violet-300" />
      </div>

      <div className="mb-5">
        <div className="cg-mono text-[10px] tracking-widest text-indigo-300/60 uppercase mb-1.5">
          Course title
        </div>
        <div className="text-white text-lg font-semibold min-h-[28px]" style={{ fontFamily: "'Sora', sans-serif" }}>
          {typed}
          <span className="cg-caret">|</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {BUILD_STEPS.slice(1, 4).map((s, i) => {
          const idx = i + 1;
          const active = step > idx || (step === idx && idx <= step);
          const shown = step >= idx;
          return (
            <div
              key={s.value}
              className="flex items-center gap-2.5"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              <CheckCircle2
                size={16}
                className={active ? "text-teal-300" : "text-white/20"}
                style={{ transition: "color 0.3s ease" }}
              />
              <span className="text-sm text-indigo-50/90">{s.value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-1.5">
          <span className="cg-mono text-[10px] tracking-widest text-indigo-300/60 uppercase">
            Curriculum progress
          </span>
          <span className="cg-mono text-[11px] text-teal-300">{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full cg-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: ListChecks,
    title: "Instant Syllabus",
    body:
      "Enter any topic and get a week-by-week syllabus with modules, lessons, and learning objectives.",
  },
  {
    icon: FileText,
    title: "AI-Generated Assessments",
    body:
      "Auto-create quizzes, projects, and checkpoints that adapt to your skill level and goals.",
  },
  {
    icon: Download,
    title: "Export to PDF",
    body:
      "Download polished, shareable course documents ready for classrooms or self-study.",
  },
  {
    icon: Clock,
    title: "Built in Seconds",
    body:
      "Skip weeks of planning. A complete learning path is ready before your coffee gets cold.",
  },
  {
    icon: Layers,
    title: "Curated Resources",
    body:
      "Every module links to hand-picked readings, videos, and exercises to reinforce concepts.",
  },
  {
    icon: Sparkles,
    title: "Personalized Paths",
    body:
      "Tailor pace, depth, and format to match beginners or advanced lifelong learners.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Describe the course",
    body: "Give it a topic, a level, and a goal. That's the whole brief.",
  },
  {
    n: "02",
    title: "Review the draft",
    body: "CourseGenius returns a full module and lesson outline you can reshape in place.",
  },
  {
    n: "03",
    title: "Publish and track",
    body: "Ship it to your workspace, then watch completion and engagement roll in.",
  },
];

const SHOWCASE = [
  { tag: "Programming", title: "Low-Level Design (LLD) Mastery", meta: "3 chapters · Beginner", grad: "from-indigo-600 to-violet-700" },
  { tag: "Programming", title: "High-Level Design for MNC Interviews", meta: "5 chapters · Intermediate", grad: "from-slate-700 to-indigo-800" },
  { tag: "Programming", title: "MERN Stack Full Course", meta: "8 chapters · Beginner", grad: "from-blue-700 to-cyan-700" },
  { tag: "Health", title: "Comprehensive Cancer Overview", meta: "4 chapters · Intermediate", grad: "from-teal-700 to-emerald-700" },
];

export default function CourseGeniusLanding({ loginWithRedirect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="cg-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .cg-root {
          font-family: 'Inter', sans-serif;
          background: #FAFAFC;
          color: #0B1120;
          overflow-x: hidden;
        }
        .cg-mono { font-family: 'JetBrains Mono', monospace; }
        .cg-display { font-family: 'Sora', sans-serif; }

        .cg-hero-bg {
          background: linear-gradient(120deg, #0f1030 0%, #241a5e 32%, #4c2a9e 62%, #2447c7 100%);
          position: relative;
        }
        .cg-hero-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(600px circle at 15% 20%, rgba(124,58,237,0.35), transparent 60%),
            radial-gradient(500px circle at 85% 15%, rgba(37,99,235,0.30), transparent 55%);
          pointer-events: none;
        }

        .cg-builder-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px -20px rgba(10,6,40,0.55);
        }
        .cg-caret {
          display: inline-block;
          width: 2px;
          margin-left: 2px;
          color: #5eead4;
          animation: cgBlink 1s steps(1) infinite;
        }
        @keyframes cgBlink { 50% { opacity: 0; } }

        .cg-progress-fill {
          background: linear-gradient(90deg, #2dd4bf, #0e7490);
          transition: width 0.5s cubic-bezier(.16,.84,.44,1);
        }

        .cg-float {
          animation: cgFloat 6s ease-in-out infinite;
        }
        .cg-float-delay {
          animation: cgFloat 6s ease-in-out infinite;
          animation-delay: 1.4s;
        }
        @keyframes cgFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-14px) rotate(var(--r, 0deg)); }
        }

        .cg-btn-primary {
          background: #0e7490;
          transition: transform 0.25s cubic-bezier(.16,.84,.44,1), background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 10px 30px -12px rgba(14,116,144,0.55);
        }
        .cg-btn-primary:hover {
          background: #155e75;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -12px rgba(14,116,144,0.7);
        }
        .cg-btn-ghost {
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .cg-btn-ghost:hover { transform: translateY(-2px); }

        .cg-fade-heading {
          background: linear-gradient(to bottom, rgba(15,23,42,0.28), #0f172a 85%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cg-feature-card {
          transition: transform 0.3s cubic-bezier(.16,.84,.44,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cg-feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 44px -22px rgba(15,23,42,0.18);
          border-color: rgba(15,23,42,0.16);
        }
        .cg-feature-card:hover > div:first-child {
          background: #eef0ff;
        }
        .cg-feature-card > div:first-child {
          transition: background 0.3s ease;
        }

        .cg-show-card {
          transition: transform 0.35s cubic-bezier(.16,.84,.44,1), box-shadow 0.35s ease;
        }
        .cg-show-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 26px 46px -20px rgba(15,23,42,0.35);
        }

        .cg-nav {
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }

        .cg-cta-band {
          background: linear-gradient(115deg, #1e1b4b, #4338ca 50%, #0e7490 130%);
        }

        @media (prefers-reduced-motion: reduce) {
          .cg-float, .cg-float-delay, .cg-caret { animation: none !important; }
          .cg-builder-card, .cg-feature-card, .cg-show-card, .cg-btn-primary { transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        className={`cg-nav fixed top-0 inset-x-0 z-50 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span
              className={`cg-display font-bold text-lg ${scrolled ? "text-slate-900" : "text-white"}`}
            >
              CourseGenius
            </span>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${scrolled ? "text-slate-600" : "text-indigo-100/90"}`}>
            <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
            <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How it works</a>
            <a href="#showcase" className="hover:opacity-70 transition-opacity">Courses</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => loginWithRedirect()} className={`cg-btn-ghost px-4 py-2 rounded-lg text-sm font-medium ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}>
              Log in
            </button>
            <button onClick={() => loginWithRedirect()} className="cg-btn-primary text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5">
              Get started <ArrowRight size={14} />
            </button>
          </div>

          <button
            className={`md:hidden ${scrolled ? "text-slate-900" : "text-white"}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-slate-700">Features</a>
            <a href="#how-it-works" className="block text-sm font-medium text-slate-700">How it works</a>
            <a href="#showcase" className="block text-sm font-medium text-slate-700">Courses</a>
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => loginWithRedirect()} className="w-full text-center py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700">Log in</button>
              <button onClick={() => loginWithRedirect()} className="cg-btn-primary w-full text-center py-2 rounded-lg text-sm font-semibold text-white">Get started</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="cg-hero-bg pt-32 pb-28 md:pt-40 md:pb-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] cg-mono tracking-widest uppercase text-indigo-200/80 bg-white/8 border border-white/15 rounded-full px-3 py-1.5">
              <Zap size={12} className="text-teal-300" /> AI course builder
            </span>

            <h1 className="cg-display text-white font-extrabold text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] mt-6">
              Build better courses<br />faster, with one<br />focused workspace.
            </h1>

            <p className="text-indigo-100/80 text-lg mt-6 max-w-md leading-relaxed">
              Describe what you want to teach. CourseGenius drafts the modules,
              lessons, and structure — you keep the judgment, it does the busywork.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-9">
              <button onClick={() => loginWithRedirect()} className="cg-btn-primary text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2">
                Start building free <ArrowRight size={16} />
              </button>
              <button onClick={() => loginWithRedirect()} className="cg-btn-ghost text-white font-medium px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10">
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <div className="cg-display text-2xl font-bold text-white">12,000+</div>
                <div className="text-indigo-200/60 text-xs mt-0.5">Courses drafted</div>
              </div>
              <div className="w-px h-9 bg-white/15" />
              <div>
                <div className="cg-display text-2xl font-bold text-white">4.8/5</div>
                <div className="text-indigo-200/60 text-xs mt-0.5">Creator rating</div>
              </div>
              <div className="w-px h-9 bg-white/15" />
              <div>
                <div className="cg-display text-2xl font-bold text-white">3 min</div>
                <div className="text-indigo-200/60 text-xs mt-0.5">To first draft</div>
              </div>
            </div>
          </div>

          <div className="relative h-[420px] hidden md:block">
            <div className="absolute top-0 right-6 w-80 cg-float" style={{ "--r": "-2deg" }}>
              <BuilderCard />
            </div>
            <div
              className="absolute bottom-2 left-0 w-52 bg-white rounded-xl shadow-2xl p-3 cg-float-delay"
              style={{ "--r": "3deg" }}
            >
              <div className="h-16 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 mb-2.5 flex items-center justify-center">
                <span className="cg-display text-white text-xs font-bold">MERN STACK</span>
              </div>
              <div className="text-xs font-semibold text-slate-800">MERN Stack Full Course</div>
              <div className="text-[10px] text-slate-400 mt-0.5">8 chapters · Beginner</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="cg-mono text-xs tracking-widest uppercase text-indigo-500 font-semibold">
            Everything you need
          </span>
          <h2 className="cg-display cg-fade-heading text-3xl md:text-[2.75rem] font-bold mt-4 leading-[1.15]">
            A complete course, generated for you
          </h2>
          <p className="text-slate-500 text-base md:text-lg mt-5 leading-relaxed">
            Powerful building blocks that turn a single prompt into a
            ready-to-teach curriculum.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="cg-feature-card h-full bg-white border border-slate-200 rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                  <f.icon size={20} className="text-slate-700" strokeWidth={1.8} />
                </div>
                <h3 className="cg-display font-bold text-slate-900 text-lg mb-2.5">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-slate-900 py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="cg-mono text-xs tracking-widest uppercase text-teal-400 font-medium">
              The process
            </span>
            <h2 className="cg-display text-3xl md:text-4xl font-bold text-white mt-3 max-w-xl">
              Three steps, start to published.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="relative pl-0">
                  <div className="cg-display text-5xl font-extrabold text-white/10 mb-3">
                    {s.n}
                  </div>
                  <h3 className="cg-display text-white font-semibold text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="showcase" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="cg-mono text-xs tracking-widest uppercase text-indigo-500 font-medium">
                From the workspace
              </span>
              <h2 className="cg-display text-3xl md:text-4xl font-bold text-slate-900 mt-3">
                Courses built with CourseGenius.
              </h2>
            </div>
            <a href="#" className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
              Browse library <ChevronRight size={16} />
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {SHOWCASE.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="cg-show-card bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${c.grad} relative p-3 flex flex-col justify-between`}>
                  <span className="self-start bg-white/90 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-full">
                    {c.tag}
                  </span>
                  <PenSquare size={14} className="self-end text-white/70" />
                </div>
                <div className="p-4">
                  <h3 className="cg-display font-semibold text-slate-900 text-sm leading-snug mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-slate-400 text-xs">{c.meta}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cg-cta-band px-6 md:px-10 py-20">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Target size={28} className="text-teal-300 mx-auto mb-5" />
            <h2 className="cg-display text-3xl md:text-4xl font-bold text-white mb-4">
              Your next course is one workspace away.
            </h2>
            <p className="text-indigo-100/75 max-w-lg mx-auto mb-9">
              Free to start. No credit card, no waiting on a template — just describe
              what you want to teach.
            </p>
            <button onClick={() => loginWithRedirect()} className="cg-btn-primary text-white font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2">
              Create your first course <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            <span className="cg-display font-bold text-slate-900">CourseGenius</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Pricing</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Support</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Users size={13} /> Built for creators, by creators
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
          © {new Date().getFullYear()} CourseGenius. All rights reserved.
        </div>
      </footer>
    </div>
  );
}