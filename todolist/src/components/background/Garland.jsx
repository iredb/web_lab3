export function Garland() {
  return (
    <header className="garland-header" aria-label="Новогодняя шапка">
      <div className="garland-wire" aria-hidden="true" />
      <div className="garland-bulbs" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span key={index} className="garland-bulb" />
        ))}
      </div>
    </header>
  );
}
