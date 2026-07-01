import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AddCourse({ userName = "Learner", courseCount = 0 }) {
  const courseLabel = courseCount === 1 ? "course" : "courses";

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(29,78,216,0.88)_46%,rgba(109,40,217,0.92))] px-6 py-6 text-white shadow-[0_32px_80px_-44px_rgba(15,23,42,0.65)] md:px-8 md:py-7">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
            Dashboard overview
          </div>
          <h1 className="mt-4 mb-0 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Build better courses faster, with one focused workspace.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
            Welcome back, {userName}. You have {courseCount} {courseLabel} ready to manage, refine, and publish.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Current courses</p>
              <p className="mt-1 text-lg font-semibold text-white">{courseCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Focus mode</p>
              <p className="mt-1 text-lg font-semibold text-white">Create, review, ship</p>
            </div>
          </div>
        </div>

        <Link to="/create-course" className="sm:self-start">
          <Button className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 shadow-[0_18px_35px_-20px_rgba(255,255,255,0.7)] hover:bg-slate-100">
            + Create AI Course
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default AddCourse;