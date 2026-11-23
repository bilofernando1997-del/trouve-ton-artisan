// Fiche complète d'un artisan avec le formulaire de contact
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Stars from '../components/Stars.jsx';
import ContactForm from '../components/ContactForm.jsx';
import NotFound from './NotFound.jsx';
import { getArtisanById } from '../services/artisanService.js';
import useSeo from '../services/useSeo.js';

// N'accepte que les liens http(s) pour éviter les liens "javascript:..." malveillants
function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(undefined); // undefined = chargement, null = introuvable
  const [error, setError] = useState(false);

  useSeo(
    artisan ? artisan.name : 'Fiche artisan',
    artisan
      ? `${artisan.name}, ${artisan.specialty} à ${artisan.location}. Contactez cet artisan via notre formulaire.`
      : 'Fiche détaillée d’un artisan de la région Auvergne-Rhône-Alpes.'
  );

  useEffect(() => {
    getArtisanById(id)
      .then((result) => setArtisan(result ?? null))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return <p className="container py-5 alert alert-danger">Une erreur est survenue lors du chargement.</p>;
  }
  if (artisan === undefined) return <p className="container py-5">Chargement…</p>;
  if (artisan === null) return <NotFound />;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <article className="col-12 col-lg-6">
          <h1>{artisan.name}</h1>
          <Stars note={artisan.note} />
          <p className="mb-1"><span className="fw-semibold">Spécialité :</span> {artisan.specialty}</p>
          <p><span className="fw-semibold">Localisation :</span> {artisan.location}</p>

          <section aria-labelledby="titre-apropos">
            <h2 id="titre-apropos" className="h4">À propos</h2>
            <p>{artisan.about}</p>
          </section>

          {artisan.website && isSafeUrl(artisan.website) && (
            <p>
              <a href={artisan.website} target="_blank" rel="noopener noreferrer">
                Visiter le site web de {artisan.name}
                <span className="visually-hidden"> (nouvel onglet)</span>
              </a>
            </p>
          )}
        </article>

        <section className="col-12 col-lg-6" aria-labelledby="titre-contact">
          <h2 id="titre-contact" className="h4">Contacter {artisan.name}</h2>
          <ContactForm artisanId={artisan.id} />
        </section>
      </div>
    </div>
  );
}

export default ArtisanDetail;
