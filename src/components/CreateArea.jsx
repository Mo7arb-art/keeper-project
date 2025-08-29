import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function CreateArea({ onAdd, editingNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "#ffffff",
  });

  // Preload note if editing
  useEffect(() => {
    if (editingNote) {
      setNote({
        title: editingNote.title,
        content: editingNote.content,
        color: editingNote.color || "#ffffff",
        id: editingNote.id,
        done: editingNote.done || false,
      });
    }
  }, [editingNote]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function submitNote(event) {
    event.preventDefault();

    if (editingNote) {
      onAdd(note); // update existing note
    } else {
      onAdd({ ...note, id: uuidv4(), done: false }); // create new note
    }

    setNote({ title: "", content: "", color: "#ffffff" });
  }

  return (
    <form onSubmit={submitNote}>
      <input
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="Title"
      />

      <textarea
        name="content"
        onChange={handleChange}
        value={note.content}
        placeholder="Take a note..."
      />

      <input
        type="color"
        name="color"
        value={note.color}
        onChange={handleChange}
      />

      <button type="submit">{editingNote ? "✔ Update" : "➕ Add"}</button>
    </form>
  );
}

export default CreateArea;
