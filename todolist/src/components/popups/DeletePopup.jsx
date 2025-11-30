export function DeletePopup({ isOpen, onConfirm, onCancel }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="popup-stand"
      data-popup="delete"
      onClick={handleOverlayClick}
    >
      <div className="delete-confirm">
        <span>Delete this task?</span>
        <div className="confirm-buttons">
          <button
            className="small-button"
            data-action="confirm-delete"
            type="button"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="small-button"
            data-action="cancel-delete"
            type="button"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
