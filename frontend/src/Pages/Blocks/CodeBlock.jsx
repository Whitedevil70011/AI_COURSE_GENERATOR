// CodeBlock.jsx

// A slightly-more-than-simple block component.
// Still no state — but it uses TWO fields from block: language and text.

function CodeBlock({ block }) {
  // block.language -> e.g. "python", "javascript" (used just as a label here)
  // block.text     -> the actual code content

  return (
    <div className="mb-5 rounded-xl overflow-hidden border border-gray-700">
      {/* Top bar showing the language name, like VS Code / most code editors do */}
      <div className="bg-gray-800 text-gray-300 text-xs font-mono px-4 py-2 uppercase tracking-wide">
        {block.language || "code"}
      </div>

      {/* The actual code content */}
      <pre className="bg-gray-900 text-gray-100 text-sm font-mono p-4 overflow-x-auto">
        <code>{block.text}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;