// src/App.jsx
import { useEffect, useState } from "react";
import { useTasks } from "./hooks/useTasks";

import { AddTaskForm } from "./components/AddTaskForm";
import { NoTasks } from "./components/NoTasks";
import { TaskList } from "./components/TaskList";

import { DeletePopup } from "./components/popups/DeletePopup";
import { EditPopup } from "./components/popups/EditPopup";
import { SharePopup } from "./components/popups/SharePopup";

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [optionsForId, setOptionsForId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [sharingTask, setSharingTask] = useState(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      const clickedCard = event.target.closest(".todo-card");
      const clickedOptions = event.target.closest(".card-options");

      if (!clickedCard && !clickedOptions) {
        setOptionsForId(null);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleAddTask = (title, description) => {
    addTask(title, description);
  };

  const handleRequestDelete = (id) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId == null) return;
    deleteTask(deleteTargetId);
    setDeleteTargetId(null);

    if (optionsForId === deleteTargetId) {
      setOptionsForId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handleRequestEdit = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (id, title, description) => {
    updateTask(id, { title, description });
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleToggleOptions = (id) => {
    setOptionsForId((current) => (current === id ? null : id));
  };

  const handleOpenShare = (task) => {
    setSharingTask(task);
  };

  const handleCloseShare = () => {
    setSharingTask(null);
  };

  const handleShowInfo = (task) => {
    alert(`${task.title}\n\n${task.description || ""}`);
  };

  const handleShareAction = (action) => {
    shareTask(sharingTask, action);
  };

  return (
    <>
      <SharePopup
        isOpen={!!sharingTask}
        onClose={handleCloseShare}
        onAction={(action) => handleShareAction(sharingTask, action)}
      />

      <DeletePopup
        isOpen={deleteTargetId != null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <EditPopup
        task={editingTask}
        isOpen={!!editingTask}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      <AddTaskForm onAdd={handleAddTask} />

      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
        <TaskList
          tasks={tasks}
          optionsForId={optionsForId}
          onToggleOptions={handleToggleOptions}
          onRequestDelete={handleRequestDelete}
          onRequestEdit={handleRequestEdit}
          onRequestShare={handleOpenShare}
          onShowInfo={handleShowInfo}
        />
      )}
    </>
  );
}

export default App;
