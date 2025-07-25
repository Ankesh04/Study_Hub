// src/components/ProgressTracker.jsx
import React, { useState, useEffect } from "react";
import "./ProgressTracker.css";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ProgressTracker = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Not Started");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "progress"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(newTasks);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTask = async () => {
    if (!title || !subject) return;

    await addDoc(collection(db, "progress"), {
      title,
      subject,
      status,
      userId: user.uid,
    });

    setTitle("");
    setSubject("");
    setStatus("Not Started");
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "progress", id), { status: newStatus });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "progress", id));
  };

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  const progressPercent = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="tracker-container">
      <h2>📈 Progress Tracker</h2>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="summary">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Progress: {progressPercent}%</p>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.status.toLowerCase().replace(/ /g, "-")}`}>
            <div>
              <strong>{task.title}</strong> ({task.subject})
            </div>
            <div>
              <select
                value={task.status}
                onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;
