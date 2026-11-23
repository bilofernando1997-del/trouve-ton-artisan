// Liste des artisans : par catégorie (/categorie/:slug) ou par recherche (/recherche?q=...)
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import ArtisanCard from '../components/ArtisanCard.jsx';
import NotFound from './NotFound.jsx';
import { CATEGORIES, getArtisansByCategory, searchArtisans } from '../services/artisanService.js';
import useSeo from '../services/useSeo.js';

function ArtisanList() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Si on est sur une catégorie, on vérifie qu'elle existe
  const category = slug ? CATEGORIES.find((c) => c.slug === slug) : null;
  const unknownCategory = slug && !category;

  const title = category ? `Artisans – ${category.name}` : `Résultats pour « ${query} »`;
  useSeo(
    unknownCategory ? null : category ? category.name : 'Recherche',
    category
      ? `Découvrez les artisans de la catégorie ${category.name} en Auvergne-Rhône-Alpes.`
      : 'Résultats de recherche des artisans en Auvergne-Rhône-Alpes.'
  );

  useEffect(() => {
    if (unknownCategory) return;
    setLoading(true);
    setError(false);
    const request = category ? getArtisansByCategory(category.name) : searchArtisans(query);
    request
      .then(setArtisans)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug, query]); // eslint-disable-line react-hooks/exhaustive-deps

  if (unknownCategory) return <NotFound />;

  return (
    <section className="container py-5">
      <h1 className="mb-4">{title}</h1>

      {loading && <p>Chargement…</p>}
      {error && <p className="alert alert-danger">Une erreur est survenue lors du chargement.</p>}
      {!loading && !error && artisans.length === 0 && (
        <p>Aucun artisan ne correspond à votre recherche.</p>
      )}

      <div className="row g-4">
        {artisans.map((artisan) => (
          <div className="col-12 col-md-6 col-lg-4" key={artisan.id}>
            <ArtisanCard artisan={artisan} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArtisanList;
