export function SharePopup({ isOpen, onClose, onAction }) {
  const handleOverlayClick = (event) =>
    event.target === event.currentTarget && onClose();

  if (!isOpen) return null;

  return (
    <div className="popup-stand" onClick={handleOverlayClick}>
      <div className="share-popup">
        <button
          className="share-option copy"
          type="button"
          onClick={() => onAction("copy")}
        />
        <button
          className="share-option vk"
          type="button"
          onClick={() => onAction("vk")}
        />
        <button
          className="share-option tg"
          type="button"
          onClick={() => onAction("tg")}
        />
        <button
          className="share-option whatsapp"
          type="button"
          onClick={() => onAction("whatsapp")}
        />
        <button
          className="share-option BAN"
          type="button"
          onClick={() => onAction("ban")}
        />
      </div>
    </div>
  );
}
