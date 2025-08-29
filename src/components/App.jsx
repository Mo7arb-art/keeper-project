import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("keeper-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("keeper-notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  function addNote(newNote) {
    setNotes((prev) => [...prev, newNote]);
  }

  // Delete a note by id
  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  // Start editing a note
  function startEditing(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setEditingNote({ ...noteToEdit });
    }
  }

  // Update a note after editing
  function updateNote(updatedNote) {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);
  }

  // Toggle the 'done' state of a note
  function toggleDone(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  }

  return (
    <div>
      <Header />

      {/* CreateArea for adding or editing notes */}
      <CreateArea
        onAdd={editingNote ? updateNote : addNote}
        editingNote={editingNote}
      />

      {/* Render all notes */}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          color={note.color}
          done={note.done}
          onDelete={deleteNote}
          onEdit={startEditing}
          onToggleDone={toggleDone}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
