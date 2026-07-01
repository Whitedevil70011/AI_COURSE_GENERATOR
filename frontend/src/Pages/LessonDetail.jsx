import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import LessonRenderer from './LessonRenderer'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function LessonDetail() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchLesson() {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/lessons/${lessonId}`)
        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`)
        }

        const data = await response.json()
        if (!cancelled) {
          setLesson(data)
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

    fetchLesson()
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
    <div className="min-h-screen bg-[#F4F7FC] px-6 py-6 md:px-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(`/courses/${courseId}`)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
        >
          Back to course
        </button>
        {lesson.module?.title ? (
          <div className="text-sm text-slate-500">
            Module: <span className="font-semibold text-slate-700">{lesson.module.title}</span>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <LessonRenderer lesson={lesson} />
      </div>
    </div>
  )
}

export default LessonDetail
