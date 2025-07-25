// src/components/MyNotes.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./MyNotes.css";

const MyNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const editorRef = useRef(null);

  const fetchNotes = async () => {
    if (!user) return;
    const q = query(collection(db, "notes"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    setNotes(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const handleSave = async () => {
    const html = editorRef.current.innerHTML.trim();
    if (!html) return;

    setSaving(true);

    await addDoc(collection(db, "notes"), {
      userId: user.uid,
      subject,
      text: html,
      createdAt: Date.now(),
    });

    setSubject("");
    editorRef.current.innerHTML = "";
    setSaving(false);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  const toggleFormat = (format) => {
    document.execCommand(format, false, null);
    setActiveFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  return (
    <div className="mynotes-container">
      <h2>📝 My Notes</h2>

      <div className="note-editor">
        <input
          type="text"
          placeholder="Subject (e.g., Physics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="subject-input"
        />

        <div className="format-buttons">
          <button
            className={activeFormats.bold ? "active" : ""}
            onClick={() => toggleFormat("bold")}
          >
            <b>B</b>
          </button>
          <button
            className={activeFormats.italic ? "active" : ""}
            onClick={() => toggleFormat("italic")}
          >
            <i>I</i>
          </button>
          <button
            className={activeFormats.underline ? "active" : ""}
            onClick={() => toggleFormat("underline")}
          >
            <u>U</u>
          </button>
        </div>

        <div
          ref={editorRef}
          className="text-editor"
          contentEditable
          placeholder="Write your note here..."
        ></div>

        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            {note.subject && (
              <span className="note-subject">{note.subject}</span>
            )}
            <div
              className="note-text"
              dangerouslySetInnerHTML={{ __html: note.text }}
            />
            <button onClick={() => handleDelete(note.id)}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNotes;
