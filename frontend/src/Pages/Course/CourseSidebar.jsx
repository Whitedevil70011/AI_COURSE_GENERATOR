import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import { Progress } from "../../components/ui/progress";

function CourseSidebar({ course, modules, activeLessonId, courseId }) {
  const navigate = useNavigate();

  // Collapsible states
  const [openModules, setOpenModules] = useState({});
  // Sidebar collapsed state (mini / full)
  const [collapsed, setCollapsed] = useState(false);

  // Automatically expand the module containing the active lesson
  useEffect(() => {
    if (!activeLessonId || !modules || modules.length === 0) return;
    
    const index = modules.findIndex(m => 
      m.lessons?.some(l => (l._id || l.id) === activeLessonId)
    );

    if (index !== -1) {
      setOpenModules(prev => ({ ...prev, [index]: true }));
    }
  }, [activeLessonId, modules]);

  // Load persisted collapsed state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("courseSidebarCollapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleModule = (index) => {
    setOpenModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const goToLesson = (lessonId) => {
    if (!lessonId) return;
    navigate(`/courses/${courseId}/lesson/${lessonId}`);
  };

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem("courseSidebarCollapsed", next ? "true" : "false"); } catch (e) {}
      return next;
    });
  };

  // Calculate course completion progress
  const totalLessons = modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = modules?.reduce((acc, m) => 
    acc + (m.lessons?.filter(l => l.completed)?.length || 0), 0
  ) || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-80'} shrink-0 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl flex flex-col h-[calc(100vh-73px)] sticky top-[73px] text-slate-900 select-none shadow-[10px_0_30px_-24px_rgba(15,23,42,0.25)] transition-all duration-200`}>
      
      {/* ── Header ── */}
      <div className="p-5 flex flex-col gap-4 border-b border-slate-100/80 relative">
        
        {/* Workspace Brand / Back Indicator */}
        <button
          onClick={() => navigate("/dashboard")}
          className="group flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors text-left"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {/* Title branding block */}
        <div 
          onClick={() => navigate(`/courses/${courseId}`)}
          className={`flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/70 hover:ring-slate-300 transition-all duration-200 cursor-pointer ${collapsed ? 'px-3 py-2 justify-center' : ''}`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7c3aed,#2563eb)] text-white shadow-md shadow-violet-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            {!collapsed && (
              <>
                <p className="text-[11.5px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1.5">
                  {course?.category || "AI Course"}
                </p>
                <h2 className="m-0 text-[15px] font-bold text-slate-900 leading-tight truncate">
                  {course?.title || "Course Details"}
                </h2>
              </>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          className="absolute right-3 top-3 p-1 rounded-full hover:bg-slate-100 text-slate-600"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Progress Tracker */}
        <div className={`px-1 mt-1 ${collapsed ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between text-[12.5px] font-semibold text-slate-500 mb-1.5">
            <span>Course Progress</span>
            <span className="font-bold text-emerald-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5 bg-slate-100 [&>div]:bg-emerald-500" />
        </div>
      </div>

      {/* ── Curriculum Modules ── */}
      <div className={`flex-1 overflow-y-auto p-5 flex flex-col gap-3.5 scrollbar-thin ${collapsed ? 'px-2' : ''}`}>
        <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-0.5">
          Curriculum Outline
        </p>

        <div className="flex flex-col gap-2">
          {modules?.map((module, mIndex) => {
            const isOpen = !!openModules[mIndex];
            if (collapsed) {
              // compact collapsed view: show only icon button per module
              const firstLessonId = module.lessons?.[0]?._id || module.lessons?.[0]?.id;
              return (
                <button
                  key={module._id || mIndex}
                  onClick={() => {
                    if (firstLessonId) goToLesson(firstLessonId);
                    else navigate(`/courses/${courseId}`);
                  }}
                  className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
                  title={module.title}
                >
                  <BookOpen className="h-4 w-4 text-slate-600" />
                </button>
              );
            }

            return (
              <div key={module._id || mIndex} className="flex flex-col gap-1.5">
                {/* Module Header Button */}
                <button
                  onClick={() => toggleModule(mIndex)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[#0f172a] hover:bg-slate-100/80 transition-all duration-200 text-left group border
                    ${isOpen 
                      ? 'bg-slate-50/70 border-slate-200/50 shadow-xs' 
                      : 'bg-transparent border-transparent'}`}
                >
                  <div className="flex gap-3 flex-1 min-w-0 pr-1">
                    <BookOpen className={`h-4.5 w-4.5 mt-0.5 shrink-0 transition-colors duration-200 
                      ${isOpen ? 'text-violet-600' : 'text-slate-400 group-hover:text-violet-600'}`} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                        Module {mIndex + 1}
                      </p>
                      <h4 className="text-[14px] font-bold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors break-words">
                        {module.title}
                      </h4>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-1.5" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-1.5" />
                  )}
                </button>

                {/* Lessons list under this module */}
                {isOpen && (
                  <div className="pl-4 pr-1 flex flex-col gap-1 border-l border-slate-200/80 ml-5.5 mt-0.5 animate-fadeIn">
                    {module.lessons?.map((lesson, lIndex) => {
                      const id = lesson._id || lesson.id;
                      const isActive = id === activeLessonId;
                      return (
                        <button
                          key={id || lIndex}
                          onClick={() => goToLesson(id)}
                          className={`group w-full text-left px-3.5 py-2.5 text-[13.5px] rounded-xl transition-all duration-200 flex items-center justify-between gap-2.5 font-medium
                            ${isActive 
                              ? 'bg-slate-950 text-white font-semibold shadow-lg shadow-slate-950/15' 
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                        >
                          <span className="flex-1 truncate pr-1">
                            {mIndex + 1}.{lIndex + 1} {lesson.title}
                          </span>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            {lesson.completed && (
                              <CheckCircle2 className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                            )}
                            <span className={`text-[11.5px] ${isActive ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                              {lesson.duration || "—"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </aside>
  );
}

export default CourseSidebar;
