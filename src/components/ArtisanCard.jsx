// Petite fiche cliquable d'un artisan (utilisée sur l'accueil et dans les listes)
import { Link } from 'react-router';
import Stars from './Stars.jsx';

// headingLevel : niveau du titre (h2 dans les listes, h3 sur l'accueil) pour une hiérarchie correcte
function ArtisanCard({ artisan, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <article className="card artisan-card h-100">
      <div className="card-body">
        <Heading className="h5 card-title">
          {/* stretched-link rend toute la carte cliquable */}
          <Link to={`/artisan/${artisan.id}`} className="stretched-link">{artisan.name}</Link>
        </Heading>
        <Stars note={artisan.note} />
        <p className="mb-1"><span className="fw-semibold">Spécialité :</span> {artisan.specialty}</p>
        <p className="mb-0"><span className="fw-semibold">Localisation :</span> {artisan.location}</p>
      </div>
    </article>
  );
}

export default ArtisanCard;
