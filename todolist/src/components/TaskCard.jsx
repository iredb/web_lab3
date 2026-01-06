export function TaskCard({ task, onDelete, onToggleOptions }) {
  const handleCardClick = (event) => {
    if (event.target.closest(".delete-button")) return;
    onToggleOptions();
  };

  return (
    <div className="todo-card" data-id={task.id} onClick={handleCardClick}>
      <div className="todo-info">
        <span className="todo-title">{task.title}</span>
        <span className="todo-description">{task.description}</span>
      </div>
      <button className="delete-button" type="button" onClick={onDelete} />
    </div>
  );
}
