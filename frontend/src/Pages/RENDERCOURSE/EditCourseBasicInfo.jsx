import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function EditCourseBasicInfo({ course, onUpdate }) {
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({ title, description });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit className="cursor-pointer text-gray-500 hover:text-purple-600 ml-2" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Course Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;