import { createSlice, nanoid } from "@reduxjs/toolkit";

const LOCAL_STORAGE_TASKS_KEY = "WEB.LAB2";

function loadTasksFromLocalStorage() {
  try {
    const rawStorageValue = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (!rawStorageValue) return [];

    const parsedValue = JSON.parse(rawStorageValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue
      .filter(
        (taskCandidate) =>
          taskCandidate &&
          (typeof taskCandidate.id === "string" ||
            typeof taskCandidate.id === "number") &&
          typeof taskCandidate.title === "string"
      )
      .map((taskCandidate) => ({
        id: String(taskCandidate.id),
        title: taskCandidate.title,
        description: taskCandidate.description ?? "",
        pinned: Boolean(taskCandidate.pinned),
      }));
  } catch {
    return [];
  }
}

function saveTasksToLocalStorage(tasksList) {
  try {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasksList));
  } catch {
    // ладно
  }
}

const initialState = {
  items: loadTasksFromLocalStorage(),
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
        state.error = null;
        saveTasksToLocalStorage(state.items);
      },
      prepare(title, description) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            pinned: false,
          },
        };
      },
    },

    updateTask(state, action) {
      const { id, title, description } = action.payload;
      const taskToUpdate = state.items.find((task) => task.id === id);
      if (!taskToUpdate) return;

      taskToUpdate.title = title;
      taskToUpdate.description = description;
      state.error = null;
      saveTasksToLocalStorage(state.items);
    },

    deleteTask(state, action) {
      const taskIdentifierToDelete = action.payload;
      state.items = state.items.filter(
        (task) => task.id !== taskIdentifierToDelete
      );
      state.error = null;
      saveTasksToLocalStorage(state.items);
    },

    togglePinned(state, action) {
      const taskIdentifierToPin = action.payload;
      const taskToTogglePinned = state.items.find(
        (task) => task.id === taskIdentifierToPin
      );
      if (!taskToTogglePinned) return;

      if (!taskToTogglePinned.pinned) {
        const pinnedTasksCount = state.items.filter(
          (task) => task.pinned
        ).length;
        if (pinnedTasksCount >= 5) {
          state.error = "Можно закрепить максимум 5 задач";
          return;
        }
      }

      taskToTogglePinned.pinned = !taskToTogglePinned.pinned;
      state.error = null;
      saveTasksToLocalStorage(state.items);
    },

    clearError(state) {
      state.error = null;
    },

    reorderTasks(state, action) {
      const newIdentifiersOrder = action.payload;

      const tasksByIdentifierMap = new Map(
        state.items.map((task) => [task.id, task])
      );

      const reorderedTasksList = [];
      for (const taskIdentifier of newIdentifiersOrder) {
        const taskFromMap = tasksByIdentifierMap.get(taskIdentifier);
        if (taskFromMap) reorderedTasksList.push(taskFromMap);
      }

      for (const task of state.items) {
        if (!newIdentifiersOrder.includes(task.id))
          reorderedTasksList.push(task);
      }

      state.items = reorderedTasksList;
      state.error = null;
      saveTasksToLocalStorage(state.items);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  togglePinned,
  reorderTasks,
  clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
