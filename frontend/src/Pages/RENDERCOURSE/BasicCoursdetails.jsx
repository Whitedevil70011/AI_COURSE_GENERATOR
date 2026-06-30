import { useState, useRef } from "react";
import { Pencil, X } from "lucide-react";
import { FaEdit } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function BasicCourseDetails({ course, onCourseUpdate }) {
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

  return (
    <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Course Info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1>
          <button onClick={openModal} className="text-gray-400 hover:text-violet-600">
             <FaEdit />
          </button>
        </div>
        <p className="text-sm text-gray-500">{courseData.description}</p>
        <span className="text-sm text-violet-600 font-medium">⌂ {courseData.category}</span>
        <button className="mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Start
        </button>
      </div>

      {/* Thumbnail */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="relative w-56 h-44 shrink-0 rounded-xl border-2 border-dashed border-slate-300 hover:border-violet-400 bg-slate-100 flex items-center justify-center cursor-pointer overflow-hidden group"
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

        {courseData.thumbnail ? (
          <img
            src={`${BASE_URL}${courseData.thumbnail}`}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-4xl">🖼️</span>
            <span className="text-xs font-medium">Upload thumbnail</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Edit Course</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  onClick={updateCourse}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}