// ParagraphBlock.jsx

// Another SIMPLE block component — no state, no logic.
// Just displays paragraph text passed in through the "block" prop.

function ParagraphBlock({ block }) {
  // block.text -> the paragraph text coming from your database

  return (
    <p className="text-base text-gray-700 leading-relaxed mb-4">
      {block.text}
    </p>
  );
}

export default ParagraphBlock;