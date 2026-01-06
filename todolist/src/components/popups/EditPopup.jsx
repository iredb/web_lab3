import { useEffect, useState } from "react";

export function EditPopup({ task, isOpen, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
    }
  }, [task]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      alert("введите title задачи");
      return;
    }

    onSave(task.id, trimmedTitle, trimmedDescription);
  };

  if (!isOpen || !task) return null;

  return (
    <div className="popup-stand" onClick={handleOverlayClick}>
      <form
        className="edit-popup"
        data-form-type="edit"
        data-entity="task"
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
      >
        <input
          name="title"
          type="text"
          className="mini-input"
          placeholder="input..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          className="giga-input"
          placeholder="input..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="confirm-buttons">
          <button
            type="button"
            className="small-button confirm-edit"
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            type="button"
            className="small-button cancel-edit"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
}
