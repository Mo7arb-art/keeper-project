import React from "react";

function Note({
  id,
  title,
  content,
  color,
  done,
  onDelete,
  onEdit,
  onToggleDone,
}) {
  return (
    <div
      className={`note ${done ? "done" : ""}`}
      style={{ backgroundColor: color }}
    >
      <h1>
        {done && "✅ "} {title}
      </h1>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>❌</button>
      <button onClick={() => onEdit(id)}>✏️</button>
      <button onClick={() => onToggleDone(id)}>{done ? "Undo" : "✔"}</button>
    </div>
  );
}

export default Note;
