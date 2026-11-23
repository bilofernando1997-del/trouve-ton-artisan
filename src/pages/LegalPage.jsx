// Page légale vide (le contenu sera rédigé plus tard par un cabinet spécialisé)
import useSeo from '../services/useSeo.js';

function LegalPage({ title }) {
  useSeo(title, `${title} du site Trouve ton artisan de la région Auvergne-Rhône-Alpes.`);

  return (
    <section className="container py-5">
      <h1>{title}</h1>
      <p>Page en cours de rédaction.</p>
    </section>
  );
}

export default LegalPage;
