export const toString = (task) =>
  `${task.title}${
    task.description && task.description.trim() ? `\n${task.description}` : ""
  }`;
