// CodeBlock.jsx

function CodeBlock({ block }) {
  const code = block.code || block.text || "";

  return (
    <div className="lr-code-block mb-5 rounded-xl overflow-hidden">
      {/* Top bar showing the language name */}
      <div className="lr-code-header">
        <span>{block.language || "code"}</span>
      </div>

      {/* The actual code content */}
      <pre className="lr-code-pre text-sm font-mono p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;