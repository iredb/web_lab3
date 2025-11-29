export function CardOptions({ onShare, onInfo, onEdit }) {
  return (
    <div className="card-options">
      <button className="share-button" type="button" onClick={onShare} />
      <button className="info-button" type="button" onClick={onInfo} />
      <button className="edit-button" type="button" onClick={onEdit} />
    </div>
  );
}
