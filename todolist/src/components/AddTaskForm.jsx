import { useState } from "react";

export function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      alert("введите title задачи");
      return;
    }

    onAdd(trimmedTitle, trimmedDescription);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      className="add-form"
      data-form-type="create"
      data-entity="task"
      onSubmit={handleSubmit}
    >
      <div className="add-inputs">
        <input
          name="title"
          className="mini-input"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          type="text"
          className="mini-input"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="add-button" />
    </form>
  );
}
