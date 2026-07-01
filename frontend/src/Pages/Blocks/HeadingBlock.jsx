// HeadingBlock.jsx

// This is one of the SIMPLE block components.
// It has NO state, NO logic — it just displays the text it's given.
// It receives "block" as a prop — one item from the content array.

function HeadingBlock({ block }) {
  // block.text -> the heading text coming from your database

  return (
    <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
      {block.text}
    </h2>
  );
}

export default HeadingBlock;