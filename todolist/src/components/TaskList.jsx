import { useMemo } from "react";
import { TaskCardSortable } from "./TaskCardSortable";
import { CardOptions } from "./CardOptions";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

export function TaskList({
  tasks,
  optionsForId,
  onToggleOptions,
  onRequestDelete,
  onRequestEdit,
  onRequestShare,
  onShowInfo,
  onPin,
  onReorder,
}) {
  const tasksInPinnedSection = useMemo(
    () => tasks.filter((task) => task.pinned),
    [tasks]
  );
  const tasksInNormalSection = useMemo(
    () => tasks.filter((task) => !task.pinned),
    [tasks]
  );

  const pinnedTaskIdentifiers = useMemo(
    () => tasksInPinnedSection.map((task) => task.id),
    [tasksInPinnedSection]
  );
  const normalTaskIdentifiers = useMemo(
    () => tasksInNormalSection.map((task) => task.id),
    [tasksInNormalSection]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeIdentifier = active.id;
    const overIdentifier = over.id;

    if (activeIdentifier === overIdentifier) return;

    const isActiveTaskInPinnedSection =
      pinnedTaskIdentifiers.includes(activeIdentifier);
    const isOverTaskInPinnedSection =
      pinnedTaskIdentifiers.includes(overIdentifier);

    const isActiveTaskInNormalSection =
      normalTaskIdentifiers.includes(activeIdentifier);
    const isOverTaskInNormalSection =
      normalTaskIdentifiers.includes(overIdentifier);

    if (isActiveTaskInPinnedSection && isOverTaskInPinnedSection) {
      const oldPinnedIndex = pinnedTaskIdentifiers.indexOf(activeIdentifier);
      const newPinnedIndex = pinnedTaskIdentifiers.indexOf(overIdentifier);

      const newPinnedTaskIdentifiers = arrayMove(
        pinnedTaskIdentifiers,
        oldPinnedIndex,
        newPinnedIndex
      );

      onReorder([...newPinnedTaskIdentifiers, ...normalTaskIdentifiers]);
      return;
    }

    if (isActiveTaskInNormalSection && isOverTaskInNormalSection) {
      const oldNormalIndex = normalTaskIdentifiers.indexOf(activeIdentifier);
      const newNormalIndex = normalTaskIdentifiers.indexOf(overIdentifier);

      const newNormalTaskIdentifiers = arrayMove(
        normalTaskIdentifiers,
        oldNormalIndex,
        newNormalIndex
      );

      onReorder([...pinnedTaskIdentifiers, ...newNormalTaskIdentifiers]);
      return;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="task-list">
        {tasksInPinnedSection.length > 0 && (
          <div style={{ width: "100%", marginBottom: 14 }}>
            <div className="section-label">Закреплённые</div>

            <SortableContext
              items={pinnedTaskIdentifiers}
              strategy={verticalListSortingStrategy}
            >
              {tasksInPinnedSection.map((task) => (
                <div key={task.id} style={{ width: "100%" }}>
                  <TaskCardSortable
                    task={task}
                    onDelete={() => onRequestDelete(task.id)}
                    onToggleOptions={() => onToggleOptions(task.id)}
                  />

                  {optionsForId === task.id && (
                    <CardOptions
                      onShare={() => onRequestShare(task)}
                      onInfo={() => onShowInfo(task)}
                      onEdit={() => onRequestEdit(task)}
                      onPin={() => onPin(task.id)}
                      isPinned={task.pinned}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </div>
        )}

        <div className="section-divider" />

        <SortableContext
          items={normalTaskIdentifiers}
          strategy={verticalListSortingStrategy}
        >
          {tasksInNormalSection.map((task) => (
            <div key={task.id} style={{ width: "100%" }}>
              <TaskCardSortable
                task={task}
                onDelete={() => onRequestDelete(task.id)}
                onToggleOptions={() => onToggleOptions(task.id)}
              />

              {optionsForId === task.id && (
                <CardOptions
                  onShare={() => onRequestShare(task)}
                  onInfo={() => onShowInfo(task)}
                  onEdit={() => onRequestEdit(task)}
                  onPin={() => onPin(task.id)}
                  isPinned={task.pinned}
                />
              )}
            </div>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
