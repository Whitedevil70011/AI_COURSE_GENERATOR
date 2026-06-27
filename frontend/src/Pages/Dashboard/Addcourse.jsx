import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AddCourse() {
  const { user } = useAuth0();

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="flex items-center gap-1.5 flex-wrap">
            <span className="text-lg font-medium text-slate-500">Hello,</span>
            <span className="text-lg font-semibold text-indigo-600">
              {user?.name || "Guest"}
            </span>
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Learn new things from AI and share knowledge with your friends
          </p>
        </div>
        
        <Link to="/create-course">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white h-9 px-4 rounded-md text-sm font-medium">
            + Create AI Course
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AddCourse;