import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddTaskForm } from "./components/AddTaskForm";
import { NoTasks } from "./components/NoTasks";
import { TaskList } from "./components/TaskList";

import { DeletePopup } from "./components/popups/DeletePopup";
import { EditPopup } from "./components/popups/EditPopup";
import { SharePopup } from "./components/popups/SharePopup";

import { shareTask } from "./utils/share";

import { SnowfallBackground } from "./components/background/SnowfallBackground";

import {
  addTask,
  updateTask,
  deleteTask,
  togglePinned,
  clearError,
  reorderTasks,
} from "./features/tasks/tasksSlice";

import { selectSortedTasks, selectError } from "./features/tasks/selectors";

function App() {
  const dispatch = useDispatch();

  const sortedTasksList = useSelector(selectSortedTasks);
  const tasksErrorMessage = useSelector(selectError);

  const [openedOptionsTaskIdentifier, setOpenedOptionsTaskIdentifier] =
    useState(null);
  const [taskIdentifierPendingDeletion, setTaskIdentifierPendingDeletion] =
    useState(null);
  const [taskPendingEdit, setTaskPendingEdit] = useState(null);
  const [taskPendingShare, setTaskPendingShare] = useState(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      const clickedTaskCard = event.target.closest(".todo-card");
      const clickedCardOptions = event.target.closest(".card-options");

      if (!clickedTaskCard && !clickedCardOptions) {
        setOpenedOptionsTaskIdentifier(null);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleAddTask = (title, description) => {
    dispatch(addTask(title, description));
  };

  const handleConfirmDelete = () => {
    if (taskIdentifierPendingDeletion == null) return;
    dispatch(deleteTask(taskIdentifierPendingDeletion));
    setTaskIdentifierPendingDeletion(null);

    if (openedOptionsTaskIdentifier === taskIdentifierPendingDeletion) {
      setOpenedOptionsTaskIdentifier(null);
    }
  };

  const handleSaveEdit = (id, title, description) => {
    dispatch(updateTask({ id, title, description }));
    setTaskPendingEdit(null);
  };

  const handleToggleOptions = (taskIdentifier) => {
    setOpenedOptionsTaskIdentifier((currentTaskIdentifier) =>
      currentTaskIdentifier === taskIdentifier ? null : taskIdentifier
    );
  };

  const handleTogglePinned = (taskIdentifier) => {
    dispatch(togglePinned(taskIdentifier));
  };

  const handleReorderTasks = (newTaskIdentifiersOrder) => {
    dispatch(reorderTasks(newTaskIdentifiersOrder));
  };

  const handleShowInfo = (task) => {
    alert(`${task.title}\n\n${task.description || ""}`);
  };

  const handleShareAction = (action) => {
    shareTask(taskPendingShare, action);
  };

  useEffect(() => {
    if (!tasksErrorMessage) return;
    const timeoutIdentifier = setTimeout(() => dispatch(clearError()), 2000);
    return () => clearTimeout(timeoutIdentifier);
  }, [tasksErrorMessage, dispatch]);

  return (
    <>
      <SnowfallBackground />

      <SharePopup
        isOpen={!!taskPendingShare}
        onClose={() => setTaskPendingShare(null)}
        onAction={handleShareAction}
      />

      <DeletePopup
        isOpen={taskIdentifierPendingDeletion != null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskIdentifierPendingDeletion(null)}
      />

      <EditPopup
        isOpen={!!taskPendingEdit}
        task={taskPendingEdit}
        onSave={handleSaveEdit}
        onCancel={() => setTaskPendingEdit(null)}
      />

      <AddTaskForm onAdd={handleAddTask} />

      {tasksErrorMessage && (
        <div style={{ textAlign: "center", marginTop: 8, opacity: 0.85 }}>
          {tasksErrorMessage}
        </div>
      )}

      {sortedTasksList.length === 0 ? (
        <NoTasks />
      ) : (
        <TaskList
          tasks={sortedTasksList}
          optionsForId={openedOptionsTaskIdentifier}
          onToggleOptions={handleToggleOptions}
          onRequestDelete={(taskIdentifier) =>
            setTaskIdentifierPendingDeletion(taskIdentifier)
          }
          onRequestEdit={(task) => setTaskPendingEdit(task)}
          onRequestShare={(task) => setTaskPendingShare(task)}
          onShowInfo={handleShowInfo}
          onPin={handleTogglePinned}
          onReorder={handleReorderTasks}
        />
      )}
    </>
  );
}

export default App;
