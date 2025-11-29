import { useEffect, useState } from "react";

const STORAGE_KEY = "WEB.LAB2";

function loadTasksFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (task) =>
        task &&
        (typeof task.id === "string" || typeof task.id === "number") &&
        typeof task.title === "string"
    );
  } catch {
    return [];
  }
}

function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // схавал
  }
}

// централизовать состояние задач и их синхронизацию с localStorage.
export function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: parseInt(Date.now() + Math.random(), 10),
      title,
      description,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, patch) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...patch } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}
