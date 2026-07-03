import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LessonRenderer from './LessonRenderer'
import CourseSidebar from './Course/CourseSidebar'
import Header from '../_components/Header'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function LessonDetail() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadLesson() {
    const response = await fetch(`${BASE_URL}/lessons/${lessonId}`)
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`)
    }

    return response.json()
  }

  async function loadCourse() {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`)
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`)
    }
    return response.json()
  }

  async function enrichLessonVideoIfNeeded(lessonData) {
    if (lessonData?.videoUrl || !lessonData?.videoSearchQuery) {
      return lessonData
    }

    const enrichResponse = await fetch(`${BASE_URL}/lessons/${lessonId}/enrich-video`, {
      method: 'POST',
    })

    if (!enrichResponse.ok) {
      return lessonData
    }

    const enrichedLesson = await enrichResponse.json()
    return enrichedLesson || lessonData
  }

  async function getLessonById() {
    try {
      setLoading(true)
      const data = await loadLesson()
      const lessonData = await enrichLessonVideoIfNeeded(data)
      setLesson(lessonData)
      setError(null)
    } catch (err) {
      setError('Failed to load lesson.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        const [data, courseData] = await Promise.all([
          loadLesson(),
          loadCourse(),
        ])

        const lessonData = await enrichLessonVideoIfNeeded(data)

        if (!cancelled) {
          setLesson(lessonData)
          setCourse(courseData.course || courseData)
          setModules(courseData.modules || courseData.course?.modules || [])
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load lesson.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [lessonId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center text-slate-500">
        Loading lesson...
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm text-red-500">{error || 'Lesson not found.'}</p>
          <button
            type="button"
            onClick={() => navigate(`/courses/${courseId}`)}
            className="mt-4 rounded-full bg-[#0F1B3D] px-5 py-2 text-sm font-semibold text-white"
          >
            Back to course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FC]">
      <Header />
      
      <div className="flex flex-1 w-full min-h-[calc(100vh-73px)]">
        {/* Course Navigation Sidebar */}
        <CourseSidebar
          course={course}
          modules={modules}
          activeLessonId={lessonId}
          courseId={courseId}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-8 py-8 md:px-12 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="max-w-[1200px] w-full">
            
            {/* Header breadcrumb/navigation */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(`/courses/${courseId}`)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-xs"
              >
                Course Overview
              </button>
              
              {lesson.module?.title ? (
                <div className="text-sm text-slate-500">
                  Module: <span className="font-semibold text-slate-750">{lesson.module.title}</span>
                </div>
              ) : null}
            </div>

            {/* Lesson Content Container */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <LessonRenderer
                lesson={lesson}
                courseId={courseId}
                onLessonUpdate={getLessonById}
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default LessonDetail
