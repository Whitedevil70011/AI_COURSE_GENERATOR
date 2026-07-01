// LessonObjectives.jsx

// Displays the "By the end of this lesson, you will..." list
// Receives objectives as a prop -> an array of strings

function LessonObjectives({ objectives }) {
  // Safety check: don't render anything if there are no objectives
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
        Learning Objectives
      </h3>

      <ul className="list-disc list-inside space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="text-gray-700 text-sm">
            {objective}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonObjectives;