import * as React from "react"

const OPTIONS = ["Easy", "Medium", "Hard", "Extreme"]

export default function SingleSelect({ options = OPTIONS, value, onChange }) {
  const [selected, setSelected] = React.useState(value ?? options[0])

  const handleSelect = (option) => {
    setSelected(option)
    if (onChange) onChange(option)
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => handleSelect(opt)}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 14,
            cursor: "pointer",
            border: selected === opt ? "1px solid transparent" : "1px solid var(--border-strong)",
            background: selected === opt ? "var(--text-primary)" : "transparent",
            color: selected === opt ? "var(--surface-2)" : "var(--text-primary)",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}