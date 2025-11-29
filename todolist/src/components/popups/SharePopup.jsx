export function SharePopup({ isOpen, onClose }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-stand" onClick={handleOverlayClick}>
      <div className="share-popup">
        <button
          className="share-option copy"
          type="button"
          aria-label="Copy link"
        />
        <button
          className="share-option vk"
          type="button"
          aria-label="Share to VK"
        />
        <button
          className="share-option tg"
          type="button"
          aria-label="Share to Telegram"
        />
        <button
          className="share-option whatsapp"
          type="button"
          aria-label="Share to WhatsApp"
        />
        <button
          className="share-option BAN"
          type="button"
          aria-label="Secret BAN button"
        />
      </div>
    </div>
  );
}
