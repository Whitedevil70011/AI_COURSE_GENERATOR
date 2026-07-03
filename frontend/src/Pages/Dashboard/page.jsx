import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../../_components/Header";
import DashboardLayout from "./dashboardlayout";
import AddCourse from "./Addcourse";
import CourseCard from "./CourseCard";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Dashboard() {
  const { user, isLoading: authLoading } = useAuth0();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleDeleteCourse = async (courseId) => {
    if (!courseId) return;

    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Failed to delete course');
      }

      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(error.message || 'Could not delete course.');
    }
  };

  React.useEffect(() => {
    if (authLoading) return;

    const fetchCourses = async () => {
      try {
        if (!user?.sub) {
          setCourses([]);
          return;
        }

        const response = await fetch(
          `${BASE_URL}/courses/user/${encodeURIComponent(user.sub)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <DashboardLayout
        header={<AddCourse userName={user?.name || "Learner"} courseCount={courses.length} />}
      >
        <section className="rounded-[28px] border border-slate-200/80 bg-white/75 p-4 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.35)] backdrop-blur-xl md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Your library
              </p>
              <h2 className="m-0 text-xl font-semibold text-slate-950 md:text-2xl">
                Continue from where you left off
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {courses.length} {courses.length === 1 ? "course" : "courses"} in your dashboard
            </p>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={{
                    _id: course._id,
                    title: course.title,
                    thumbnail: course.thumbnail,
                    category: course.category || "Uncategorized",
                    topic: course.topic || "",
                    duration: course.duration || "N/A",
                    difficulty: course.difficulty || "Beginner",
                  }}
                  onDelete={handleDeleteCourse}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center text-slate-500">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold text-slate-900">No courses yet</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Start by creating a new course and the dashboard will populate here automatically.
                </p>
              </div>
            </div>
          )}
        </section>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
