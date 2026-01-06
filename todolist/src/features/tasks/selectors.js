export const selectTasks = (state) => state.tasks.items;
export const selectError = (state) => state.tasks.error;

export const selectSortedTasks = (state) => {
  const tasksList = state.tasks.items;

  const pinnedTasksList = tasksList.filter((task) => task.pinned);
  const normalTasksList = tasksList.filter((task) => !task.pinned);

  return [...pinnedTasksList, ...normalTasksList];
};
