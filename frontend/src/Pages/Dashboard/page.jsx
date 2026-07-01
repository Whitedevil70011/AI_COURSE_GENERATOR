import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../../_components/Header";
import DashboardLayout from "./dashboardlayout";
import CourseCard from "./CourseCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Dashboard() {
  const { user, isLoading: authLoading } = useAuth0();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      <DashboardLayout>
        <main className="flex-1 p-6 md:p-10">
          {/* <Card className="bg-slate-900 border-purple-500/10 text-slate-100 shadow-xl shadow-purple-950/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome, {user?.name || "Learner"}!
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your personalized learning journey starts here.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Here's a summary of your progress and upcoming lessons.</p>
            </CardContent>
          </Card> */}
        </main>
        <div>
        {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
              No courses found. Start by creating a new course!
            </div>
          )
        }

        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
