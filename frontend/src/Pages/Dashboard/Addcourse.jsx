import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AddCourse() {
  return (
    <div className="px-6 pt-6 pb-2 md:px-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage your AI courses from one place.
          </p>
        </div>

        <Link to="/create-course" className="sm:self-start">
          <Button className="h-10 rounded-full bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700">
            + Create AI Course
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AddCourse;