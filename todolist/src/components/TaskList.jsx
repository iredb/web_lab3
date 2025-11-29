import { TaskCard } from "./TaskCard";
import { CardOptions } from "./CardOptions";

export function TaskList({
  tasks,
  optionsForId,
  onToggleOptions,
  onRequestDelete,
  onRequestEdit,
  onRequestShare,
  onShowInfo,
}) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} style={{ width: "100%" }}>
          <TaskCard
            task={task}
            onDelete={() => onRequestDelete(task.id)}
            onToggleOptions={() => onToggleOptions(task.id)}
          />
          {optionsForId === task.id && (
            <CardOptions
              onShare={() => onRequestShare(task)}
              onInfo={() => onShowInfo(task)}
              onEdit={() => onRequestEdit(task)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
