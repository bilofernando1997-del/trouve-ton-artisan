// Page d'accueil : fonctionnement du site en 4 étapes + les 3 artisans du mois
import { useEffect, useState } from 'react';
import ArtisanCard from '../components/ArtisanCard.jsx';
import { getTopArtisans } from '../services/artisanService.js';
import useSeo from '../services/useSeo.js';

const STEPS = [
  'Choisir la catégorie d’artisanat dans le menu.',
  'Choisir un artisan.',
  'Le contacter via le formulaire de contact.',
  'Une réponse sera apportée sous 48h.',
];

function Home() {
  const [topArtisans, setTopArtisans] = useState([]);
  const [error, setError] = useState(false);

  useSeo(
    'Accueil',
    'Trouvez un artisan qualifié en Auvergne-Rhône-Alpes et contactez-le facilement : bâtiment, services, fabrication et alimentation.'
  );

  // Chargement asynchrone des artisans du mois
  useEffect(() => {
    getTopArtisans()
      .then(setTopArtisans)
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <section className="hero py-5">
        <div className="container">
          <h1>Trouvez l’artisan qu’il vous faut près de chez vous</h1>
          <p className="lead mb-0">
            La région Auvergne-Rhône-Alpes vous met en relation avec les artisans de votre territoire.
          </p>
        </div>
      </section>

      <section className="container py-5" aria-labelledby="titre-etapes">
        <h2 id="titre-etapes" className="mb-4">Comment trouver mon artisan ?</h2>
        <ol className="row g-3 list-unstyled steps">
          {STEPS.map((step, index) => (
            <li className="col-12 col-md-6 col-lg-3" key={step}>
              <div className="step h-100 p-3 bg-white rounded shadow-sm">
                <span className="step-number" aria-hidden="true">{index + 1}</span>
                <p className="mb-0"><span className="visually-hidden">Étape {index + 1} : </span>{step}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-5" aria-labelledby="titre-top">
        <h2 id="titre-top" className="mb-4">Les artisans du mois</h2>
        {error && <p className="alert alert-danger">Les artisans n’ont pas pu être chargés. Veuillez réessayer plus tard.</p>}
        <div className="row g-4">
          {topArtisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id}>
              <ArtisanCard artisan={artisan} headingLevel="h3" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
