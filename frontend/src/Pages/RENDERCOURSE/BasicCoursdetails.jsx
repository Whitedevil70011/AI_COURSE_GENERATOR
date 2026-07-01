import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, X } from "lucide-react";
import { FaEdit } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function BasicCourseDetails({ course, onCourseUpdate }) {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(course);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // modal open/close
  const [showModal, setShowModal] = useState(false);

  // form fields
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);

  const openModal = () => {
    setTitle(courseData.title);
    setDescription(courseData.description);
    setShowModal(true);
  };

  const updateCourse = async () => {
    const res = await fetch(`${BASE_URL}/api/courses/${courseData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    await res.json();

    const updated = { ...courseData, title, description };
    setCourseData(updated);
    onCourseUpdate(updated);
    setShowModal(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/courses/${courseData._id}/upload-thumbnail`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const updated = { ...courseData, thumbnail: data.thumbnailUrl };
    setCourseData(updated);
    onCourseUpdate(updated);

    setUploading(false);
  };

  const handleStart = () => {
    navigate(`/courses/${courseData._id}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(59,130,246,0.02)]">
      {/* Course Info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-extrabold text-[#0F1B3D] tracking-tight">{courseData.title}</h1>
          <button 
            onClick={openModal} 
            className="text-slate-400 hover:text-[#004c6d] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            title="Edit Title & Description"
          >
             <FaEdit className="w-4.5 h-4.5" />
          </button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{courseData.description}</p>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
            📚 {courseData.category}
          </span>
        </div>

        <button 
          onClick={handleStart}
          className="mt-3 bg-[#004c6d] hover:bg-[#003d58] text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#004c6d]/15 hover:shadow-[#004c6d]/25 w-fit cursor-pointer"
        >
          Start Course
        </button>
      </div>

      {/* Thumbnail */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="relative w-56 h-44 shrink-0 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-colors"
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

        {courseData.thumbnail ? (
          <img
            src={`${BASE_URL}${courseData.thumbnail}`}
            alt="thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
            <span className="text-3xl">🖼️</span>
            <span className="text-xs font-semibold">Upload thumbnail</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#0F1B3D]">Edit Course Settings</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  onClick={updateCourse}
                  className="bg-[#004c6d] hover:bg-[#003d58] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#004c6d]/10"
                >
                  Update Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}