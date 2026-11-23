// Affiche une note sur 5 avec des étoiles pleines, demi et vides
function Stars({ note }) {
  const value = Math.min(5, Math.max(0, Number(note) || 0));
  const stars = [];

  // Boucle sur les 5 étoiles : pleine, moitié ou vide selon la note
  for (let i = 1; i <= 5; i++) {
    let type = 'empty';
    if (value >= i) type = 'full';
    else if (value >= i - 0.5) type = 'half';
    stars.push(<span key={i} className={`star star-${type}`} aria-hidden="true">★</span>);
  }

  return (
    <p className="stars mb-1">
      {stars}
      <span className="visually-hidden">Note : {value} sur 5</span>
      <span className="ms-1 small" aria-hidden="true">{value}/5</span>
    </p>
  );
}

export default Stars;
