export function CardOptions({ onShare, onInfo, onEdit, onPin, isPinned }) {
  return (
    <div className="card-options">
      <button className="share-button" type="button" onClick={onShare} />
      <button className="info-button" type="button" onClick={onInfo} />
      <button className="edit-button" type="button" onClick={onEdit} />
      <button
        className="pin-button"
        type="button"
        onClick={onPin}
        title={isPinned ? "Открепить" : "Закрепить"}
      />
    </div>
  );
}
