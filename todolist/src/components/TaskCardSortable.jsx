import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";

export function TaskCardSortable({ task, onDelete, onToggleOptions }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const cardWrapperStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={cardWrapperStyle}
      {...attributes}
      {...listeners}
    >
      <TaskCard
        task={task}
        onDelete={onDelete}
        onToggleOptions={onToggleOptions}
      />
    </div>
  );
}
